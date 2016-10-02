#!/usr/bin/env node
var showVersion = () => {
  // exports version
  var meta = require('./package.json')
  console.log(`${meta.name} v${meta.version}`)
}

// exports completion script
var showCompletionScript = () => {
  var fs = require('fs')
  var data = '';
  fs.createReadStream(`${__dirname}/bin/git-browse-completion.sh`)
    .on('data', (chunk) => data += chunk)
    .on('end', () => {
      console.log(`GIT_BROWSE_BINARY_PATH=${__dirname}/node_modules/.bin/git-browse-github-search`)
      console.log(data)
    })
}

var openInBrowser = (username, reponame) => {
  (new Promise((fulfilled, rejected) => {
    var exec = require('child_process').exec
    if (!username) {
      // case username not found
      var getGitUser = 'echo $(git config --get user.name)'
      exec(getGitUser, (err, stdout) => {
        if (err) {
          // execution failed
          rejected(err)
        } else {
          // git user found
          username = stdout.replace('\n', '')
          console.log(`[info] locating to ${username}'s ${reponame ? 'repository' : 'profile'}..`)
          fulfilled(username)
        }
      })
    } else {
      // case username found
      fulfilled(username)
    }
  })).then((username) => {
    var os = require('os')
    var exec = require('child_process').exec
    var meta = require('./package.json')

    reponame = reponame ? reponame : ''
    var open = 'Win32'  == os.type() ? 'start' : 'open'
    var slug = username.toUpperCase() == reponame.toUpperCase() ? username : `${username}/${reponame}`
    var url = `${meta.config.protocol}://${meta.config.host}/${slug}`
    var locator = `${open} ${url}`
    console.log(`[info] Executing \`${locator}\``)
    exec(locator, () => {
      console.log('[info] done.')
    })
  }).catch((err) => {
    console.log('[error] An error occured.')
    throw err
  })
}

var username
var reponame

// arguments parsing
if (process.argv.length == 2) {
  showVersion()
} else if (process.argv.length == 3) {
  if (process.argv[2] == '--completion') {
    showCompletionScript()
  }
  else if (process.argv[2].includes('/')) {
    // case `git browse user/repo`
    username = process.argv[2].split('/')[0]
    reponame = process.argv[2].split('/')[1]
    openInBrowser(username, reponame)
  } else {
    // case `git browse repo`
    reponame = process.argv[2]
    openInBrowser(username, reponame)
  }
} else if (process.argv.length > 3) {
  // case `git browse user repo`
  username = process.argv[2]
  reponame = process.argv[3]
  openInBrowser(username, reponame)
}

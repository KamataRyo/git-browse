#!/usr/bin/env node
(() => {

    var exec = require('child_process').exec
    var os = require('os')
    var meta = require('./package.json')

    var username
    var reponame

    // arguments parsing
    if (process.argv.length == 3) {
        if (process.argv[2].includes('/')) {
            // case `git browse user/repo`
            [username, reponame] = process.argv[2].split('/')
        } else {
            // case `git browse repo`
            reponame = process.argv[2]
        }
    } else if (process.argv.length > 3) {
        // case `git browse user repo`
        [username, reponame] = [process.argv[2], process.argv[3]]
    }

    if (!reponame) {
        console.log(`${meta.name} v${meta.version}`)
        return
    }

    // Asynchronization
    (new Promise((fulfilled, rejected) => {
        if (!username) {
            // case username not found
            var getGitUser = 'echo $(git config --get user.name)'
            exec(getGitUser, (err, stdout, stdin) => {
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
        reponame = reponame ? reponame : ''
        var open = 'Win32'  == os.type() ? 'start' : 'open'
        var url = `${meta.config.protocol}://${meta.config.host}/${username}/${reponame}`
        var locator = `${open} ${url}`
        console.log(`[info] Executing \`${locator}\``)
        exec(locator, (err, stdout, stdin) => {
            console.log('[info] done.')
        })
    }).catch(() => {
        console.log('[error] An error occured.')
        throw error
    })
})()

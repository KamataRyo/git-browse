#!/usr/bin/env node
var exec = require('child_process').exec
var username, reponame

if (process.argv.length == 3) {
	if (process.argv[2].includes('/')) {
		[username, reponame] = process.argv[2].split('/')
	} else {
		reponame = process.argv[2]
	}
} else if (process.argv.length > 3) {
	[username, reponame] = [process.argv[2], process.argv[3]]
}

(new Promise((fulfilled, rejected) =>{
	if (!username) {
		var commandGetUser = 'echo $(git config --get user.name)'
		exec(commandGetUser, (err, stdout, stdin) => {
			if (err) {
				rejected(err)
			} else {
				username = stdout.replace('\n', '')
				console.log(`[info] locating to ${username}'s repository..`)
				fulfilled(username)
			}
		})
	} else {
		fulfilled(username)
	}
})).then((username) => {
	// var host = process.env.npm_package_config_host
	// var protocol = process.env.npm_package_config_protocol
	// console.log(process.env)
	// openHost = `open ${protocol}://${host}/${username}/${reponame}`
	commandOpenHost = `open https://github.com/${username}/${reponame}`
	console.log(`[info] Executing \`${commandOpenHost}\``)
	exec(commandOpenHost, (err, stdout, stdin) => {
		console.log('[info] done.')
	})
}).catch(() => {
	console.log('[error] An error occured.')
	console.log(error)
})

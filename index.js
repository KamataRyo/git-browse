#!/usr/bin/env node
(() => {
	
	var exec = require('child_process').exec
	var username, reponame

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

	// Asynchronization
	(new Promise((fulfilled, rejected) => {
		if (!username) {
			// case username not found
			var commandGetUser = 'echo $(git config --get user.name)'
			exec(commandGetUser, (err, stdout, stdin) => {
				if (err) {
					// execution failed
					rejected(err)
				} else {
					// git user found
					username = stdout.replace('\n', '')
					console.log(`[info] locating to ${username}'s repository..`)
					fulfilled(username)
				}
			})
		} else {
			// case username found
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
})()

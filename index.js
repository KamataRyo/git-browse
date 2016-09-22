#!/usr/bin/env node
var exec = require('child_process').exec
var user, repo

if (process.argv.length == 3) {
	if (process.argv[2].includes('/')) {
		[user, repo] = process.argv[2].split('/')
	} else {
		repo = process.argv[2]
	}
} else if (process.argv.length > 3) {
	[user, repo] = [process.argv[2], process.argv[3]]
}

(new Promise((fulfilled, rejected) =>{
	if (!user) {
		var getUser = 'echo $(git config --get user.name)'
		exec(getUser, (err, stdout, stdin) => {
			if (err) {
				rejected(err)
			} else {
				fulfilled(stdout.replace('\n', ''))
			}
		})
	} else {
		fulfilled(user)
	}
})).then((user) => {
	// var host = process.env.npm_package_config_host
	// var protocol = process.env.npm_package_config_protocol
	// console.log(process.env)
	// openHost = `open ${protocol}://${host}/${user}/${repo}`
	openHost = `open https://github.com/${user}/${repo}`
	console.log(openHost)
	exec(openHost, (err, stdout, stdin) => {

	})
})

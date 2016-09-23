#!/bin/bash
set -eu
export location=''
export testCount=0
export failureCount=0

# switch path in this child process
PATH='./test':$PATH

function assertContains() {
    testCount=$(expr $testCount + 1)
    if [[ $2 == *"$3"* ]]; then
        echo "[success] $1"
    else
        failureCount=$(expr $failureCount + 1)
        echo "[failure] $1"
        echo "expected $3 is contained,"
        echo $2
    fi
}

function summerize() {
    echo "Tests count: $testCount"
    echo "failures: $failureCount/$testCount"
}

user=$(git config --get user.name)

stdout=$(node ./index.js 'user1' 'repo1')
assertContains 'case of 2 arguments `user repo` type.' "$(echo $stdout)" 'https://github.com/user1/repo1'
#
node ./index.js 'user2/repo2'
assertContains 'case of 1 argument `user/repo` type.' "$(echo $stdout)" 'https://github.com/user2/repo2'

node ./index.js 'repo3'
assertContains 'case of 1 argument `repo` type.' "$(echo $stdout)" "https://github.com/$user/repo3"

node ./index.js
assertContains 'case of No arguments.' "$(echo $stdout)" "https://github.com/$user"

summerize

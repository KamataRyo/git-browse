# git-browse

[![npm version](https://badge.fury.io/js/git-browse.svg)](https://badge.fury.io/js/git-browse)

git-browse opens your Github repository with browser.

## Dependency

- Mac OS only.
- Depends on `git`

## Install

```
$ npm i -g git-browse
```

## Usage

The commands below open browser and locate the Github repositories.
Without username argument, the command locates your repository.

```
$ git browse user repo
$ git browse user/repo
$ git browse repo
```

## tab completion

it's Beta. Unfortunately, this version overwrites existing tab completion for git. (i.e. [git-completion](https://github.com/git/git/blob/master/contrib/completion/git-completion.bash))

```
$ npm i -g git-browse@0.0.8beta
$ curl https://raw.githubusercontent.com/KamataRyo/git-browse/master/bin/git-browse-competion.sh > ~/.git-browse-competion.sh
$ echo 'source ~/.git-browse-competion.sh' >> ~/.bashrc
```

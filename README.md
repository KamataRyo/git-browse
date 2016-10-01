# git-browse

[![npm version](https://badge.fury.io/js/git-browse.svg)](https://badge.fury.io/js/git-browse)

git-browse opens your Github repository with browser.

## Dependency

- Depends on `git`

## Install

```
$ npm install -g git-browse
```

## Usage

The commands below open browser and locate the Github repositories.
Without username argument, the command locates your repository.

```
$ git browse user repo
$ git browse user/repo
$ git browse repo
$ git-browse user repo
$ git-browse user/repo
$ git-browse repo
```

## Tab Completion

```
$ git-browse --completion >> ~/.bashrc
```

`git-browse-completion` works against `git-browse` command only, not for `git browse` subcommand.
Completion for 1st argument completes your git username.
Completion for 2nd argument completes repository name for the user on 1st argument.

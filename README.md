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
```

## tab completion

```
$ git-browse --completion >> ~/.bashrc
```

`git-browse-completion` works against `git-browse` command.
Completion for 1st argument complete your git username.
Completion for 2nd argument complete repository name for the user on 1st argument.

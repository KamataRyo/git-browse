#!/bin/bash
_git-browse() {
    local user
    local repo
    if [[ $COMP_CWORD == 1 ]]; then
        user=$(git config --get user.name)
        COMPREPLY=( $(compgen -W "$user" -- $user) )
    elif [[ $COMP_CWORD == 2 ]]; then
        user=${COMP_WORDS[1]}
        repo=${COMP_WORDS[2]}
        COMPREPLY=( $(compgen -W "$(git-browse-github-search $user $repo)" -- $repo) )
    # else
        # need to load git-completion, Without git-completion, ls should be comp
        # local path=${COMP_WORDS[COMP_CWORD]}
        # COMPREPLY=( $(compgen -W "$(ls)" -- $path) )
    fi
}

_git-browse_sub() {
    local user
    local repo
    if [[ $COMP_CWORD == 2 ]]; then
        user=$(git config --get user.name)
        COMPREPLY=( $(compgen -W "$user" -- $user) )
    elif [[ $COMP_CWORD == 3 ]]; then
        user=${COMP_WORDS[2]}
        repo=${COMP_WORDS[3]}
        COMPREPLY=( $(compgen -W "$(git-browse-github-search $user $repo)" -- $repo) )
    # else
        # need to load git-completion, Without git-completion, ls should be comp
        # local path=${COMP_WORDS[COMP_CWORD]}
        # COMPREPLY=( $(compgen -W "$(ls)" -- $path) )
    fi
}
complete -F _git-browse git-browse
complete -F _git-browse_sub git

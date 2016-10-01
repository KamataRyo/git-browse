###-begin-git-browse-completion-###
_git-browse() {
    local user
    local repo
    if [[ $COMP_CWORD == 1 ]]; then
        user=$(git config --get user.name)
        COMPREPLY=( $(compgen -W "$user" -- $user) )
    elif [[ $COMP_CWORD == 2 ]]; then
        user=${COMP_WORDS[1]}
        repo=${COMP_WORDS[2]}
        COMPREPLY=( $(compgen -W "$($GIT_BROWSE_BINARY_PATH $user $repo)" -- $repo) )
    fi
}
complete -F _git-browse git-browse
###-end-git-browse-completion-###

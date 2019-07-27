# MaseTravel
Steps for Conflict-Free Git Collaboration

1. One of the group members creates a repo. This repo should be completely independent of the class repo, and hosted on github.com. Add your other group members as **collaborators** by using the collaborators menu. There should be just ONE git repo for the whole project.

1. Everyone clones a copy of the project onto their computer.
1. WHENEVER you start working, start your work in your own branch with the command `git checkout -b your-branch-name-here`. Make sure you're inside of the project folder when you run this command.

1. When you're done working and ready to push, do the following to make sure your version is synced up with any updates:
`git add .`
`git commit -m "commit message"`
`git checkout master`
`git pull`
`git checkout your-branch-name-here`
`git push`

(It will sometimes tell you there is no upstream version of your branch, but it will also tell you EXACTLY what to do to fix that, so just run the command it tells you to run)

1. Once your branch is on github.com, create a new pull request to pull the changes from your branch into the master branch.

1. SOMEONE ELSE in your group should review your pull request and merge it in with master. You can then safely delete the branch and continue on, repeating the above steps for every piece of code you're adding to the project.

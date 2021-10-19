export const gitSubmit = [
  { name: '克隆远程版本库', description: 'git clone <url>' },
  { name: '初始化本地版本库', description: 'git init' },
  { name: '查看远程版本库信息', description: 'git remote -v' },
  { name: '查看提交历史', description: 'git log ' },

  { name: '查看状态', description: 'git status' },
  { name: '查看变更内容', description: 'git diff' },

  { name: '显示所有本地分支', description: 'git branch' },
  { name: '创建新分支', description: 'git branch <new branch>' },
  { name: '删除本地分支', description: 'git branch -d <branch>' },
  { name: '合并指定分支到当前分支', description: 'git merge <branch>' },

  { name: 'add 操作', description: 'git add .' },
  { name: '删除文件', description: 'git rm <file>' },
  { name: '文件改名', description: 'git mv <old> <new>' },
  { name: 'commit 操作', description: 'git commit -m "commit message"' },
  { name: 'pull 操作', description: 'git pull ' },
  { name: 'push 操作', description: 'git push -u <url> master' }
]

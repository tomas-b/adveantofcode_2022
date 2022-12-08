import { readFile } from 'fs/promises'

const data = await readFile('demo', 'utf8')
const commands = data.split('$')

let currentPath = '/'

for(const command of commands) {

  const [ cmd, ...results ] = command.trim().split('\n')
  
  if(cmd.startsWith('cd')) {
    const path = cmd.slice(3)

    if(path.startsWith('/')) {
      currentPath = path
      continue
    }

    if(path === '..') {
      currentPath = path.split('/').slice(0,-1).join('/')
      continue
    }

    currentPath = (currentPath.at(-1) === '/')
      ? `${currentPath}${path}` 
      : `${currentPath}/${path}` 

  }
  if(cmd.startsWith('ls')) {
    const files = results.filter(line => !line.startsWith('dir'))
    for(const file of files) {
      console.log((currentPath.at(-1) === '/')
        ? `${currentPath}${file}` 
        : `${currentPath}/${file}`)
    }
  }

}

console.log({commands})

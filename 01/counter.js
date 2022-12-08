import f from 'fs/promises'
let c=(await f.readFile('input.txt', 'utf8')).split('\n\n').map(e=>e.split('\n').reduce((a,v)=>+v+a,0)).sort((a,b)=>a<b?1:-1)
console.log({first:c[0],firstThree:c[0]+c[1]+c[2]})



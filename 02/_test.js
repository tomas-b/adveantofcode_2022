import { writeFile, readFile } from 'fs/promises'

const play = (s1, s2) => {
  if( s1 === s2 ) return [3,3]
  if( s1 === 1 ) return (s2 === 2) ? [0,6] : [6,0]
  if( s1 === 2 ) return (s2 === 3) ? [0,6] : [6,0]
  if( s1 === 3 ) return (s2 === 1) ? [0,6] : [6,0]
}

const calculate = game => {

  const chr1 = game.at(0)
  const chr2 = game.at(2)

  const shape1 = {"A":1, "B":2, "C":3}[chr1]
  const shape2 = {"X":1, "Y":2, "Z":3}[chr2]

  const [outcome1, outcome2] = play(shape1, shape2)
  return [shape1 + outcome1, shape2 + outcome2]
}


const content = await readFile('./input', 'utf8')
const [elf, me] = content
  .split('\n')
  .filter(str=>str)
  .map(calculate)
  .reduce(([a1, a2], [c1, c2]) => [a1+c1, a2+c2], [0,0])

console.log({ elf, me })

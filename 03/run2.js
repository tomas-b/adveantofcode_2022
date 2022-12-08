import { readFile } from 'fs/promises'
import _ from 'lodash'

const data = await readFile('./input', 'utf8')

const divide = str => [
  str.slice(0, str.length / 2).split(''),
  str.slice(str.length / 2).split('')
]

const getValue = chr => {
  const code = chr.charCodeAt(0)
  if ( code > 96 && code < 123 ) return code - 96
  if ( code > 64 && code < 91 ) return code - 64 + 26
  return null
}

const chunks = _.chunk(
  data.trim().split('\n').map(str => str.split('')), 3
)

const badges = chunks.flatMap(
    chunk => _.intersection(...chunk)
  ).map(getValue).reduce((acc, i) => acc+i, 0)

console.log({badges})



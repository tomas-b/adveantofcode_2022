import { readFile } from 'fs/promises'
import _ from 'lodash'

const data = await readFile('./input', 'utf8')
const ranges = data.split('\n').filter(str=>str)
  .map(str => [str, str.split(',').map(
    rangestr => {
      const [start, end] = rangestr.split('-')
      return _.range(parseInt(start), parseInt(end)+1)
    }
  )])

const fullyOverlap = ranges.filter(([,[a, b]]) => (_.intersection(a,b).length > 0))

console.dir({fullyOverlap, length: fullyOverlap.length}, {depth:null})

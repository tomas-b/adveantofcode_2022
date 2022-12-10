import { readFile } from 'fs/promises'
import _ from 'lodash'

const file = await readFile('input', 'utf8')

const moves = file.split('\n').filter(line=>line).map(move => {
  const [direction, ...distance] = move
  return [direction, Number(distance.join(''))]
})

const H = {x: 0, y: 0}
const T = {x: 0, y: 0}

let minX = -10
let maxX = 10
let minY = -10
let maxY = 10

let frame = 0

const display = async (H, tail, tHistory) => {

  frame++;
  if(frame % 200 !== 0) return

  await new Promise(resolve => setTimeout(resolve, 150))
  console.clear()

  const grid = []

  const _minX = Math.min(H.x, T.x) - 1
  const _maxX = Math.max(H.x, T.x) + 1
  const _minY = Math.min(H.y, T.y) - 1
  const _maxY = Math.max(H.y, T.y) + 1

  minX = minX < _minX ? minX : _minX
  maxX = maxX > _maxX ? maxX : _maxX
  minY = minY < _minY ? minY : _minY
  maxY = maxY > _maxY ? maxY : _maxY

  for(let y = minY; y <= maxY; y++) {
    const row = []
    for(let x = minX; x <= maxX; x++) {
      if(x === H.x && y === H.y) row.push('H')
      else if(tail.find(point => point.x === x && point.y === y)) {
        const tailIndex = tail.findIndex(point => point.x === x && point.y === y)
        row.push(tailIndex)
      }
      else if(tHistory.some(point => point.x === x && point.y === y)) row.push('x')
      else row.push('.')
    }
    grid.push(row.join(''))
  }
  console.log(grid.join('\n'))
}

const isTouching = (H, T) => {
  // nine points around H
  const around = [
    {x: H.x - 1, y: H.y - 1},
    {x: H.x,     y: H.y - 1},
    {x: H.x + 1, y: H.y - 1},
    {x: H.x - 1, y: H.y},
    {x: H.x,     y: H.y},
    {x: H.x + 1, y: H.y},
    {x: H.x - 1, y: H.y + 1},
    {x: H.x,     y: H.y + 1},
    {x: H.x + 1, y: H.y + 1},
  ]

  return around.some(point => point.x === T.x && point.y === T.y)

}

const twoStepsDirect = (H, T) => {
  if(H.y === T.y) {
    if(H.x === T.x - 2) T.x--
    if(H.x === T.x + 2) T.x++
    return true
  }
  if(H.x === T.x) {
    if(H.y === T.y - 2) T.y--
    if(H.y === T.y + 2) T.y++
    return true
  }
  return false
}

const diagonalMove = (H, T) => {
  // diagonals around T
  const diagonals = [
    {x: T.x - 1, y: T.y - 1},
    {x: T.x + 1, y: T.y - 1},
    {x: T.x - 1, y: T.y + 1},
    {x: T.x + 1, y: T.y + 1},
  ]

  // around H
  const around = [
    {x: H.x - 1, y: H.y - 1},
    {x: H.x,     y: H.y - 1},
    {x: H.x + 1, y: H.y - 1},
    {x: H.x - 1, y: H.y},
    {x: H.x,     y: H.y},
    {x: H.x + 1, y: H.y},
    {x: H.x - 1, y: H.y + 1},
    {x: H.x,     y: H.y + 1},
    {x: H.x + 1, y: H.y + 1},
  ]

  // if T diagonal is around H
  const diagonal = diagonals
    .find(diagonal => around.some(point => point.x === diagonal.x && point.y === diagonal.y))

  if(diagonal) {
    if(diagonal.x === T.x - 1) T.x--
    if(diagonal.x === T.x + 1) T.x++
    if(diagonal.y === T.y - 1) T.y--
    if(diagonal.y === T.y + 1) T.y++
    return true
  }


}

const tHistory = []
// await display(H, T, tHistory)

const tail = Array.from({length: 9}, () => ({x: 0, y: 0})).map((point, i) => ({...point, i}))

for(const [direction, distance] of moves) {
  for(let i = 1; i <= distance; i++) {

    if(direction === 'U') H.y--
    if(direction === 'D') H.y++
    if(direction === 'L') H.x--
    if(direction === 'R') H.x++


    for(const index in tail) {

      let prev, next;

      if(index == 0) {
        prev = H
        next = tail[0]
      } else {
        prev = tail[index - 1]
        next = tail[index]
      }

      if(isTouching(prev, next)) continue
      if(twoStepsDirect(prev, next)) continue
      diagonalMove(prev, next)

    }

    tHistory.push({...tail.at(-1)})
    await display(H, tail, tHistory)
  }

}

const tHistoryStrings = tHistory.map(JSON.stringify)
const unique = [...new Set(tHistoryStrings)]

console.log({uniquePositions: unique.length})

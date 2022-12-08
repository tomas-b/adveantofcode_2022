import { readFile } from 'fs/promises'
import _ from 'lodash'

const file = await readFile('input', 'utf8')
const grid = file.split('\n').filter(line=>line).map(line => line.split(''))

const x_range = _.range(0, grid[0].length)
const y_range = _.range(0, grid.length)

const checkLine = (points, height) => {
  let score = 0
  for(const point of points) {
    score++;
    if(point >= height) break
  }
  return score
}

const checkScoring = (grid, x, y) => {

  const height = parseInt(grid[y][x])
  console.log({height, x, y})

  const top_points = y_range.slice(0, y).map(y => parseInt(grid[y][x])).reverse()
  const bottom_points = y_range.slice(y+1).map(y => parseInt(grid[y][x]))
  const left_points = x_range.slice(0, x).map(x => parseInt(grid[y][x])).reverse()
  const right_points = x_range.slice(x+1).map(x => parseInt(grid[y][x]))


  const _top = checkLine(top_points, height)
  const bottom = checkLine(bottom_points, height)
  const left = checkLine(left_points, height)
  const right = checkLine(right_points, height)

  console.log({top_points, bottom_points, left_points, right_points})
  console.log({_top, bottom, left, right})

  return _top * bottom * left * right

}

let visible = 0

const scorings = {}

for(let y of y_range) {
  for(let x of x_range) {
    scorings[`${x}_${y}`] = checkScoring(grid, x, y)
  }
}

// sort object by values
const sortedScorings = Object.entries(scorings).sort(([,a],[,b]) => b-a)[0]

console.log({ sortedScorings })


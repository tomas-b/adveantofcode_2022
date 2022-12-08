import { readFile } from 'fs/promises'
import _ from 'lodash'

const file = await readFile('demo', 'utf8')
const grid = file.split('\n').filter(line=>line).map(line => line.split(''))

const x_range = _.range(0, grid[0].length)
const y_range = _.range(0, grid.length)

const checkVisibility = (grid, x, y) => {

  const height = parseInt(grid[y][x])

  const top_points = _.range(0, y).map(i => [x, i])
  const bottom_points = _.range(y + 1, grid.length).map(i => [x, i])
  const left_points = _.range(0, x).map(i => [i, y])
  const right_points = _.range(x + 1, grid[0].length).map(i => [i, y])

  console.log({x, y})
  console.log({ top_points, bottom_points, left_points, right_points})

  const top_visibility = top_points.every(([x, y]) => parseInt(grid[y][x]) < height)
  const bottom_visibility = bottom_points.every(([x, y]) => parseInt(grid[y][x]) < height)
  const left_visibility = left_points.every(([x, y]) => parseInt(grid[y][x]) < height)
  const right_visibility = right_points.every(([x, y]) => parseInt(grid[y][x]) < height)

  console.log({top_visibility, bottom_visibility, left_visibility, right_visibility})

  console.log((top_visibility || bottom_visibility || left_visibility || right_visibility) ? '#' : '.')

  return top_visibility || bottom_visibility || left_visibility || right_visibility

}

let visible = 0

for(let y of y_range) {
  for(let x of x_range) {
    if (checkVisibility(grid, x, y)) visible++
  }
}

const gridResult = grid.map((row, y) => row.map((cell, x) => checkVisibility(grid, x, y) ? '#' : '.'))
console.log({ gridResult })
console.log({ visible })

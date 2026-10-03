import './style.css'
import { GridArr_X, GridArr_Y, ArrGrid, start, Goal } from './grid'

const app = document.querySelector<HTMLDivElement>('#app')!

app.innerHTML = `
  <h1>Pathfinding Visualizer</h1>
  <div id="grid"></div>
`

const gridElement = document.querySelector<HTMLDivElement>('#grid')!
gridElement.style.gridTemplateColumns = `repeat(${GridArr_X}, 20px)`

for (let y = 0; y < GridArr_Y; y++) {
  for (let x = 0; x < GridArr_X; x++) {
    const cell = document.createElement('div')
    cell.className = 'cell'
    cell.id = `cell-${x}-${y}`

    if (ArrGrid[x][y]) cell.classList.add('wall')
    if (x === start.PosX && y === start.PosY) cell.classList.add('start')
    if (x === Goal.PosX && y === Goal.PosY) cell.classList.add('goal')

    // when this cell is clicked...
    cell.addEventListener('click', function () {
      // ...do nothing if it's the start or goal
      if (cell.classList.contains('start')) return
      if (cell.classList.contains('goal')) return

      // ...otherwise switch it between wall and empty
      if (ArrGrid[x][y] === true) {
        ArrGrid[x][y] = false
        cell.classList.remove('wall')
      } else {
        ArrGrid[x][y] = true
        cell.classList.add('wall')
      }
    })

    gridElement.appendChild(cell)
  }
}

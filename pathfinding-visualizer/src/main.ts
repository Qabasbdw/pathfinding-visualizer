import './style.css'
import { GridArr_X, GridArr_Y, ArrGrid, start, Goal ,ClearWalls,ClearWeights,ArrWeight} from './grid'
import { BFS } from './algorithms/bfs'
import { DFS } from './algorithms/dfs'
import { Dijkstra } from './algorithms/dijkstra'
import { AStar } from './algorithms/astar'

import { Grid1, Grid2, LoadGrid } from './maze'

import type {Step} from './grid'








const clearButton = document.querySelector<HTMLButtonElement>('#ClearButton')!
const gridElement = document.querySelector<HTMLDivElement>('#grid')!
const algorithmSelect = document.querySelector<HTMLSelectElement>('#algorithm')!
const drawMode = document.querySelector<HTMLSelectElement>('#drawMode')!








gridElement.style.gridTemplateColumns = `repeat(${GridArr_X}, 20px)`
let drawing = false
let AddWalls = true
function ClearWalls_colors():void{
  for (let y = 0; y < GridArr_Y; y++) {
      for (let x = 0; x < GridArr_X; x++) {
        const cell = document.getElementById(`cell-${x}-${y}`)!
        cell.classList.remove('wall')
        
      }}

}


for (let y = 0; y < GridArr_Y; y++) {
  for (let x = 0; x < GridArr_X; x++) {
    const cell = document.createElement('div')
    cell.className = 'cell'
    cell.id = `cell-${x}-${y}`

    if (ArrGrid[x][y]) cell.classList.add('wall')
    if (x === start.PosX && y === start.PosY) cell.classList.add('start')
    if (x === Goal.PosX && y === Goal.PosY) cell.classList.add('goal')
    function paint() {
      if (cell.classList.contains('start')) return
      if (cell.classList.contains('goal')) return

      if (drawMode.value === 'weight') {
        ArrWeight[x][y] = AddWalls ? 5 : 1      
        if (AddWalls) cell.classList.add('weight')
        else cell.classList.remove('weight')
      } else {
        ArrGrid[x][y] = AddWalls
        if (AddWalls) cell.classList.add('wall')
        else cell.classList.remove('wall')
      }
    }

      

    
    cell.addEventListener('mousedown', function () {
      

      
      if (cell.classList.contains('start')) return
      if (cell.classList.contains('goal')) return
      
      
      drawing = true                         
      AddWalls = !ArrGrid[x][y]              

      if (drawMode.value === 'weight') {
        AddWalls = ArrWeight[x][y] === 1
      } else {
        AddWalls = !ArrGrid[x][y]
      }
      paint()
      })
    cell.addEventListener('mouseover', function (){
      if ( drawing == false )return
      
      if (cell.classList.contains('start')) return
      if (cell.classList.contains('goal')) return
      paint()


    })
    gridElement.appendChild(cell)
    // cell.addEventListener ('mousedown',function(){
    //   if (cell.classList.contains('start')) return
    //   if (cell.classList.contains('goal')) return
    //   if (ArrGrid[x][y] === true) {
    //     ArrGrid[x][y] = false
    //     cell.classList.remove('wall')
    //   } else {
    //     ArrGrid[x][y] = true
    //     cell.classList.add('wall')
    //   }
      
      
    // })
    
  }
}
window.addEventListener('mouseup', function () {
  

  drawing = false
})
clearButton.addEventListener('click', function () {
  ClearWalls()          
  ClearWalls_colors()
})
document.querySelector('#ClearWeightsButton')!.addEventListener('click', function () {
  ClearWeights()
  ColorGrid()
})


function ColorGrid(): void {
  for (let y = 0; y < GridArr_Y; y++) {
    for (let x = 0; x < GridArr_X; x++) {
      const cell = document.getElementById(`cell-${x}-${y}`)!
      cell.classList.toggle('wall', ArrGrid[x][y])
      cell.classList.toggle('weight', ArrWeight[x][y] === 5)
    }
  }
}

function ShowGrid(grid: string[]): void {
  reset()
  LoadGrid(grid)
  ColorGrid()
}

document.querySelector('#Grid1Button')!.addEventListener('click', () => ShowGrid(Grid1))
document.querySelector('#Grid2Button')!.addEventListener('click', () => ShowGrid(Grid2))

const runButton = document.querySelector<HTMLButtonElement>('#RunButton')!
let timer: number | null = null   // null = not running

runButton.addEventListener('click', function () {
  if (timer !== null) StopRun()
  else run()
})
document.querySelector('#ResetButton')!.addEventListener('click', function () {
  StopRun()
  reset()
})

function StopRun(): void {
  if (timer !== null) clearInterval(timer)
  timer = null
  runButton.textContent = 'Visualize'
  runButton.classList.remove('running')
}

function drawStep(step: Step) {
  if (step.type === 'visited') {
    const el = document.getElementById(`cell-${step.cell.PosX}-${step.cell.PosY}`)!
    el.classList.add('visited')
  } else {
    for (const c of step.path) {
      document.getElementById(`cell-${c.PosX}-${c.PosY}`)!.classList.add('path')
    }
  }
}
function reset() {
  for (let y = 0; y < GridArr_Y; y++) {
    for (let x = 0; x < GridArr_X; x++) {
      const cell = document.getElementById(`cell-${x}-${y}`)!
      cell.classList.remove('visited')
      cell.classList.remove('path')
    }
  }
}




function run() {
  let gen: Generator<Step>
  reset()
  if (algorithmSelect.value ==='bfs')
    {gen = BFS(start, Goal)}
  else if (algorithmSelect.value ==='dfs')
    {gen = DFS(start, Goal)}
  else if (algorithmSelect.value === 'dijkstra')
    { gen = Dijkstra(start, Goal) }
  else {
    gen = AStar(start, Goal) 
    /////////////
  }
    

  runButton.textContent = 'Stop'
  runButton.classList.add('running')

  timer = setInterval(function () {
    const result = gen.next()
    if (result.done) {
      StopRun()
      return
    }
    drawStep(result.value)
  }, 20)                     
}




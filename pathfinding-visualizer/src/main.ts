import './style.css'
import { GridArr_X, GridArr_Y, ArrGrid, start, Goal ,ClearWalls} from './grid'







const clearButton = document.querySelector<HTMLButtonElement>('#ClearButton')!
const gridElement = document.querySelector<HTMLDivElement>('#grid')!






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
      

    
    cell.addEventListener('mousedown', function () {
      

      
      if (cell.classList.contains('start')) return
      if (cell.classList.contains('goal')) return
      
      
      drawing = true                         
      AddWalls = !ArrGrid[x][y]              

      ArrGrid[x][y] = AddWalls
      if (AddWalls) cell.classList.add('wall')
      else cell.classList.remove('wall')
      })
    cell.addEventListener('mouseover', function (){
      if ( drawing == false )return
      
      if (cell.classList.contains('start')) return
      if (cell.classList.contains('goal')) return
      ArrGrid[x][y] = AddWalls
      if (AddWalls) cell.classList.add('wall')
      else cell.classList.remove('wall')


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




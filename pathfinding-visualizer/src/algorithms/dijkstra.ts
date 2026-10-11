import {GridArr_X, GridArr_Y, ArrGrid, start, Goal ,ClearWalls} from '../grid'
import type {Cell,Step} from '../grid'
import  {Queue} from './bfs'
export function* Dijkstra(start:Cell ,Goal:Cell): Generator<Step>{
    const queue = new Queue<Cell>();/////
    const list:Cell []=[start];

    const visited : boolean [][]=[];
    const cameFrom: (Cell | null)[][] = [];
    const dist :number [][]=[]; 
     for (let x = 0; x < GridArr_X; x++) {
          visited[x] = [];
          cameFrom[x] = [];
          dist[x]=[];
          for (let y = 0; y < GridArr_Y; y++) {
               if (x === start.PosX && y === start.PosY) {dist [x][y]=0;} 
               else{
                   dist[x][y]=999999;
                }
                visited[x][y] = false;
               cameFrom[x][y] = null; 
               }}
        
        while (list.length > 0) {
  
            let best = 0
            for (let i = 1; i < list.length; i++) {
                if (dist[list[i].PosX][list[i].PosY] < dist[list[best].PosX][list[best].PosY]) {
                    best = i
                }
            }
            const Curr = list[best]
            list[best] = list[list.length - 1]
            list.pop()

            
            if (visited[Curr.PosX][Curr.PosY]) continue
            visited[Curr.PosX][Curr.PosY] = true
            yield { type: 'visited', cell: Curr }

            
            if (Curr.PosX === Goal.PosX && Curr.PosY === Goal.PosY) {
                const path: Cell[] = []
                let step: Cell | null = Curr
                while (step !== null) {
                    path.unshift(step)
                    step = cameFrom[step.PosX][step.PosY]
                }
                yield { type: 'path', path: path }
                return
            }

            
            const CurrUp = { PosX: Curr.PosX, PosY: Curr.PosY - 1 }
            const CurrDown = { PosX: Curr.PosX, PosY: Curr.PosY + 1 }
            const CurrRight = { PosX: Curr.PosX + 1, PosY: Curr.PosY }
            const CurrLeft = { PosX: Curr.PosX - 1, PosY: Curr.PosY }
            const newDist = dist[Curr.PosX][Curr.PosY] + 1      // cost of one step = 1

            if (CurrUp.PosY >= 0 &&
                !ArrGrid[CurrUp.PosX][CurrUp.PosY] &&
                newDist < dist[CurrUp.PosX][CurrUp.PosY]) {
                dist[CurrUp.PosX][CurrUp.PosY] = newDist
                cameFrom[CurrUp.PosX][CurrUp.PosY] = Curr
                list.push(CurrUp)
            }
            if (CurrDown.PosY < GridArr_Y &&
                !ArrGrid[CurrDown.PosX][CurrDown.PosY] &&
                newDist < dist[CurrDown.PosX][CurrDown.PosY]) {
                dist[CurrDown.PosX][CurrDown.PosY] = newDist
                cameFrom[CurrDown.PosX][CurrDown.PosY] = Curr
                list.push(CurrDown)
            }
            if (CurrRight.PosX < GridArr_X &&
                !ArrGrid[CurrRight.PosX][CurrRight.PosY] &&
                newDist < dist[CurrRight.PosX][CurrRight.PosY]) {
                dist[CurrRight.PosX][CurrRight.PosY] = newDist
                cameFrom[CurrRight.PosX][CurrRight.PosY] = Curr
                list.push(CurrRight)
            }
            if (CurrLeft.PosX >= 0 &&
                !ArrGrid[CurrLeft.PosX][CurrLeft.PosY] &&
                newDist < dist[CurrLeft.PosX][CurrLeft.PosY]) {
                dist[CurrLeft.PosX][CurrLeft.PosY] = newDist
                cameFrom[CurrLeft.PosX][CurrLeft.PosY] = Curr
                list.push(CurrLeft)
            }
}



}
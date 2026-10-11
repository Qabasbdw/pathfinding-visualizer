import {GridArr_X, GridArr_Y, ArrGrid, start, Goal ,ClearWalls} from '../grid'
import type {Cell,Step} from '../grid'
import  {Queue} from './bfs'
export function* Dijkstra(start:Cell ,Goal:Cell): Generator<Step>{
    const queue = new Queue<Cell>();

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
        while (!queue.isEmpty()){

        }


}
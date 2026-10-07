import {GridArr_X, GridArr_Y, ArrGrid, start, Goal ,ClearWalls} from '../grid'
import type {Cell,Step} from '../grid'
///////
export class Queue<T> {
  private items: T[] = [];
  private head = 0;

  enqueue(item: T): void {
    this.items.push(item);
  }

  dequeue(): T | undefined {
    if (this.isEmpty()) return undefined;
    const item = this.items[this.head];
    this.head++;
    return item;
  }

  isEmpty(): boolean {
    return this.head >= this.items.length;
  }

  get size(): number {
    return this.items.length - this.head;
  }
}
/////////

export function* BFS(start:Cell ,Goal:Cell): Generator<Step>{
     const queue = new Queue<Cell>();
     queue.enqueue(start);
     const visited : boolean [][]=[];
     
     for (let x = 0; x < GridArr_X; x++) {
          visited[x] = []
          for (let y = 0; y < GridArr_Y; y++) {
               if (x === start.PosX && y === start.PosY) visited[x][y] = true ;
               else{
                    visited[x][y] = false;
               }
               }}
     while (!queue.isEmpty()){
          const Curr=queue.dequeue();
          
          if (Curr === undefined) break;
          yield { type: 'visited', cell: Curr }



          if (Curr.PosX === Goal.PosX &&Curr.PosY===Goal.PosY)return;//////////
          
          
          const CurrUp={PosX:Curr.PosX ,PosY:Curr.PosY-1};
          const CurrDown={PosX:Curr.PosX ,PosY:Curr.PosY+1};
          const CurrRight={PosX:Curr.PosX+1,PosY:Curr.PosY};
          const CurrLeft={PosX:Curr.PosX-1 ,PosY:Curr.PosY};

          if (CurrUp.PosY >=0&&
               !ArrGrid[CurrUp.PosX][CurrUp.PosY]&&
               !visited[CurrUp.PosX][CurrUp.PosY]){
               visited[CurrUp.PosX][CurrUp.PosY]=true;
               queue.enqueue({PosX:Curr.PosX ,PosY:Curr.PosY-1});

          }
          if (CurrDown.PosY< GridArr_Y &&
               !ArrGrid[CurrDown.PosX][CurrDown.PosY]&&
               !visited[CurrDown.PosX][CurrDown.PosY]){
               visited[CurrDown.PosX][CurrDown.PosY]=true;
               queue.enqueue({PosX:Curr.PosX ,PosY:Curr.PosY+1});
          }
          if (CurrRight.PosX <GridArr_X&&
               !ArrGrid[CurrRight.PosX][CurrRight.PosY] 
               &&!visited[CurrRight.PosX][CurrRight.PosY]){
               visited[CurrRight.PosX][CurrRight.PosY]=true;
               queue.enqueue({PosX:Curr.PosX+1,PosY:Curr.PosY});
          }
          if (CurrLeft.PosX >=0&&
               !ArrGrid[CurrLeft.PosX][CurrLeft.PosY]&& 
               !visited[CurrLeft.PosX][CurrLeft.PosY]){
               visited[CurrLeft.PosX][CurrLeft.PosY]=true;
               queue.enqueue({PosX:Curr.PosX-1 ,PosY:Curr.PosY});
          }




          //visited[start.PosX][start.PosY];


          
     }


    
     }
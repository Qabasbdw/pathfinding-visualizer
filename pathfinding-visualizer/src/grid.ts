import './style.css'




export const GridArr_X : number = 41;
export const GridArr_Y :number =21;
export let  ArrGrid :boolean [][]=[];
for (let i = 0; i < GridArr_X; i++) {
    ArrGrid[i] = [];                    /////
    for (let j = 0; j < GridArr_Y; j++) {
        ArrGrid[i][j] = false;
    }
}
export function ClearWalls () :void{
    for (let y = 0; y < GridArr_Y; y++) {
      for (let x = 0; x < GridArr_X; x++) {
        ArrGrid[x][y] = false;
      }}


}
export let ArrWeight: number[][] = [];
for (let i = 0; i < GridArr_X; i++) {
    ArrWeight[i] = [];
    for (let j = 0; j < GridArr_Y; j++) {
        ArrWeight[i][j] = 1;
    }
}

export type Cell ={PosX :number , PosY:number};
export const start :Cell ={PosX:10 ,PosY:4};
export const Goal :Cell ={PosX:32,PosY :18};


export type VisitedCell ={
    type :"visited";
    cell:Cell;
    
}
export type PathCell = {
  type: "path";
  path: Cell[];
};

export type Step = PathCell| VisitedCell;



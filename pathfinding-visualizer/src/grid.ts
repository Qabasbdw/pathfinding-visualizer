export const GridArr_X : number = 41;
export const GridArr_Y :number =21;
export let  ArrGrid :boolean [][]=[];
for (let i = 0; i < GridArr_X; i++) {
    ArrGrid[i] = [];                    /////
    for (let j = 0; j < GridArr_Y; j++) {
        ArrGrid[i][j] = false;
    }
}
export type Cell ={PosX :number , PosY:number};
export const start :Cell ={PosX:10 ,PosY:4};
export const Goal :Cell ={PosX:32,PosY :18};


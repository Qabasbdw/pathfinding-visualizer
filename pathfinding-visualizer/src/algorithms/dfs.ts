import {GridArr_X, GridArr_Y, ArrGrid, start, Goal ,ClearWalls} from '../grid'
import type {Cell,Step} from '../grid'

export function* DFS(start: Cell, Goal: Cell): Generator<Step> {
  
  const visited: boolean[][] = [];
  const cameFrom: (Cell | null)[][] = [];
  for (let x = 0; x < GridArr_X; x++) {
    visited[x] = [];
    cameFrom[x] = [];
    for (let y = 0; y < GridArr_Y; y++) {
      visited[x][y] = false;
      cameFrom[x][y] = null;
    }
  }
  let found:boolean = false;

  
  function* visit(Curr: Cell): Generator<Step> {
    visited[Curr.PosX][Curr.PosY] = true;            
    yield { type: 'visited', cell: Curr };

    if (Curr.PosX === Goal.PosX && Curr.PosY === Goal.PosY) {
      found = true;
      return;
    }

    const CurrUp = { PosX: Curr.PosX, PosY: Curr.PosY - 1 };
    const CurrDown = { PosX: Curr.PosX, PosY: Curr.PosY + 1 };
    const CurrRight = { PosX: Curr.PosX + 1, PosY: Curr.PosY };
    const CurrLeft = { PosX: Curr.PosX - 1, PosY: Curr.PosY };

    if (found) return;
    if (CurrUp.PosY >= 0 &&
        !ArrGrid[CurrUp.PosX][CurrUp.PosY] &&
        !visited[CurrUp.PosX][CurrUp.PosY]) {
      cameFrom[CurrUp.PosX][CurrUp.PosY] = Curr;
      yield* visit(CurrUp);
    }

    if (found) return;
    if (CurrRight.PosX < GridArr_X &&
        !ArrGrid[CurrRight.PosX][CurrRight.PosY] &&
        !visited[CurrRight.PosX][CurrRight.PosY]) {
      cameFrom[CurrRight.PosX][CurrRight.PosY] = Curr;
      yield* visit(CurrRight);
    }

    if (found) return;
    if (CurrDown.PosY < GridArr_Y &&
        !ArrGrid[CurrDown.PosX][CurrDown.PosY] &&
        !visited[CurrDown.PosX][CurrDown.PosY]) {
      cameFrom[CurrDown.PosX][CurrDown.PosY] = Curr;
      yield* visit(CurrDown);
    }

    if (found) return;
    if (CurrLeft.PosX >= 0 &&
        !ArrGrid[CurrLeft.PosX][CurrLeft.PosY] &&
        !visited[CurrLeft.PosX][CurrLeft.PosY]) {
      cameFrom[CurrLeft.PosX][CurrLeft.PosY] = Curr;
      yield* visit(CurrLeft);
    }
  }

  yield* visit(start);

  
  if (!visited[Goal.PosX][Goal.PosY]) return;         
  const path: Cell[] = [];
  let step: Cell | null = Goal;
  while (step !== null) {
    path.unshift(step);
    step = cameFrom[step.PosX][step.PosY];
  }
  yield { type: 'path', path: path };
}

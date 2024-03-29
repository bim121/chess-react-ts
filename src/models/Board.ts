import {Cell} from "./Cell";
import {Colors} from "./Colors";
import { Queen } from "./figures/Queen";
import { King } from "./figures/King";
import { Knight } from "./figures/Knight";
import { Pawn } from "./figures/Pawn";
import { Bishop } from "./figures/Bishop";
import { Rock } from "./figures/Rock";
import { runInThisContext } from "vm";
import { Figure, FigureNames } from "./figures/Figure";

export class Board{
    cells: Cell[][] = [];
    lostBlackFigures: Figure[] = [];
    lostWhiteFigures: Figure[] = [];

    public initCells(){
        for(let i = 0; i < 8; i++){
            const row: Cell[] = []
            for(let j = 0; j < 8; j++){
                if((i+j)%2 !== 0){
                    row.push(new Cell(this, j, i, Colors.BLACK, null));
                }else{
                    row.push(new Cell(this, j, i, Colors.WHITE, null));
                }
            }
            this.cells.push(row);
        }
    }

    public getCell(x: number, y:number){
        return this.cells[y][x];
    }

    public getCopyBoard():Board{
        const newBoard = new Board();
        newBoard.cells = this.cells;
        newBoard.lostBlackFigures = this.lostBlackFigures;
        newBoard.lostWhiteFigures = this.lostWhiteFigures;
        return newBoard;
    }

    public highlightCells(selectedCell: Cell | null){
        for(let i = 0; i < this.cells.length; i++){
            const row = this.cells[i];
            for(let j = 0; j < row.length; j++){
                const target = row[j];
                target.available = !!selectedCell?.figure?.canMove(target);
            }
        }
    }

    public whichCellsIsUnderAttack(cellWithKing: Cell){
        let colorAgainst = Colors.BLACK;
        if(cellWithKing?.figure?.color === Colors.BLACK){
         colorAgainst = Colors.WHITE;
        }
        this.restartCellsUnderAttack();
        for(let i = 0; i < this.cells.length; i++){
            const row = this.cells[i];
            for(let j = 0; j < row.length; j++){
                const target = row[j];
                if(target.figure != null && target?.figure?.color === colorAgainst){
                    this.underAttack(target);
                }
            }
        }
    }

    private restartCellsUnderAttack(){
        for(let i = 0; i < this.cells.length; i++){
            const row = this.cells[i];
            for(let j = 0; j < row.length; j++){
                const target = row[j];
                target.underAtack = false;
            }
        }
    }

    private underAttack(CellWithCell: Cell){
        for(let i = 0; i < this.cells.length; i++){
            const row = this.cells[i];
            for(let j = 0; j < row.length; j++){
                const target = row[j];
                if(CellWithCell?.figure?.name === FigureNames.PAWN){
                    this.canBeat(CellWithCell, target);
                }
                else{
                    if(true === !!CellWithCell?.figure?.canMove(target)){
                        target.underAtack = true;
                    }
                }
            }
        }
    }

    private canBeat(CellWithCell:Cell, target: Cell){
        const direction = CellWithCell.figure?.color === Colors.BLACK ? 1 : -1;

        if(target.y === CellWithCell.y + direction
            && (target.x === CellWithCell.x + 1 || target.x === CellWithCell.x - 1)){
                target.underAtack = true;
        }
    }

    private addPawns(){
        for (let i = 0; i < 8; i++){
           new Pawn(Colors.BLACK, this.getCell(i, 1)); 
           new Pawn(Colors.WHITE, this.getCell(i, 6)); 
        }
    }

    private addKnights(){
        new Knight(Colors.BLACK, this.getCell(6, 0)); 
        new Knight(Colors.WHITE, this.getCell(1, 7)); 
        new Knight(Colors.BLACK, this.getCell(1, 0)); 
        new Knight(Colors.WHITE, this.getCell(6, 7)); 
    }

    private addBishops(){
        new Bishop(Colors.WHITE, this.getCell(5, 7)); 
        new Bishop(Colors.BLACK, this.getCell(5, 0)); 
        new Bishop(Colors.WHITE, this.getCell(2, 7)); 
        new Bishop(Colors.BLACK, this.getCell(2, 0)); 
    }

    private addKings(){
        new King(Colors.BLACK, this.getCell(4, 0)); 
        new King(Colors.WHITE, this.getCell(4, 7)); 
    }

    private addQueens(){
        new Queen(Colors.BLACK, this.getCell(3, 0)); 
        new Queen(Colors.WHITE, this.getCell(3, 7)); 
    }

    private addRocks(){
        new Rock(Colors.BLACK, this.getCell(0, 0)); 
        new Rock(Colors.WHITE, this.getCell(0, 7)); 
        new Rock(Colors.BLACK, this.getCell(7, 0)); 
        new Rock(Colors.WHITE, this.getCell(7, 7)); 
    }

    public addFigure(){
        this.addPawns();
        this.addKnights();
        this.addKings();
        this.addQueens();
        this.addRocks();
        this.addBishops();
    }
}
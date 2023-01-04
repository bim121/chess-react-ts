import { Cell } from "../Cell";
import { Colors } from "../Colors";
import {Board} from "../Board"
import {Figure, FigureNames} from "./Figure";
import blackLogo from '../../image/black_king.png';
import whiteLogo from '../../image/white_king.png';

export class King extends Figure {
    constructor(color: Colors, cell: Cell){
        super(color, cell);
        this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
        this.name = FigureNames.KING;
    }

    canMove(target: Cell): boolean {
        if(!super.canMove(target)){
            return false;
        }

        const isVerticalMove = (target.y === this.cell.y + 1 || target.y === this.cell.y - 1) && target.x === this.cell.x;
        const isHorizontalMove = (target.x === this.cell.x + 1 || target.x === this.cell.x - 1) && target.y === this.cell.y;

        const ifLeftDiagonal = (
            (target.x === this.cell.x + 1 && target.y === this.cell.y + 1)
            || (target.x === this.cell.x - 1 && target.y === this.cell.y - 1)
        );

        const isRightDiagonal = (
            (target.x === this.cell.x + 1 && target.y === this.cell.y - 1)
            || (target.x === this.cell.x - 1 && target.y === this.cell.y + 1)
        );

        if((isVerticalMove || isHorizontalMove || ifLeftDiagonal || isRightDiagonal) && !target.underAtack){
            return true;
        }

        return false;
    }
}
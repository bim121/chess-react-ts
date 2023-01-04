import { Cell } from "../Cell";
import { Colors } from "../Colors";
import {Figure, FigureNames} from "./Figure";
import blackLogo from '../../image/black-rook.png';
import whiteLogo from '../../image/white-rook.png';

export class Rock extends Figure {
    constructor(color: Colors, cell: Cell){
        super(color, cell);
        this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
        this.name = FigureNames.ROCK;
    }

    canMove(target: Cell): boolean {
        if(!super.canMove(target)){
            return false;
        }
        if(this.cell.isEmpryHorizontal(target)){
            return true;
        }
        if(this.cell.isEmptyVertical(target)){
            return true;
        }
        return false;
    }
}
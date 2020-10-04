import {Cell} from "./Cell"

export class Grid{
    constructor(canvas, context, cellSize) {
        this.canvas = canvas
        this.context = context
        this.mode = 'block'
        this.cells = []
        this.cellSize = cellSize
        this.mouseDown = false
        this.init()
        this.draw()
    }

    get Cells(){
        return this.cells
    }

    get Mode(){
        return this.mode
    }

    set Mode(mode){
        this.mode = mode
    }

    get startPoint(){
        for (let i = 0; i < this.Height; i++){
            for(let j = 0; j < this.Width; j++){
                if(this.cells[i][j].Mode === 'start') return this.cells[i][j]
            }
        }
        return false
    }

    get finishPoint(){
        for (let i = 0; i < this.Height; i++){
            for(let j = 0; j < this.Width; j++){
                if(this.cells[i][j].Mode === 'finish') return this.cells[i][j]
            }
        }
        return false
    }

    get Height(){
        return Math.floor(this.canvas.height / this.cellSize)
    }

    get Width(){
        return Math.floor(this.canvas.width / this.cellSize)
    }

    init() {
        let ltp = {x: 0, y: 0}
        while (ltp.y < this.canvas.height){
            ltp.x = 0
            let rowCells = []
            while (ltp.x < this.canvas.width){
                rowCells.push(new Cell(ltp, 'white', this.context, this.cellSize))
                ltp.x += this.cellSize
            }
            this.cells.push(rowCells)
            ltp.y += this.cellSize
        }
    }

    handleMouseDown(indexes){
        if(this.cells[indexes.x][indexes.y].Mode === 'unblocked') {
            if(this.Mode === 'start'){
                if(this.startPoint){
                    this.startPoint.unblock()
                    this.cells[indexes.x][indexes.y].block('start')
                }else{
                    this.cells[indexes.x][indexes.y].block('start')
                }
            }

            if(this.Mode === 'finish'){
                if(this.finishPoint){
                    this.finishPoint.unblock()
                    this.cells[indexes.x][indexes.y].block('finish')
                }else{
                    this.cells[indexes.x][indexes.y].block('finish')
                }
            }

            this.cells[indexes.x][indexes.y].block(this.Mode)
            this.mouseDown = true
        }else{
            this.cells[indexes.x][indexes.y].unblock()
        }
    }

    handleMouseUp(){
        this.mouseDown = false
    }

    reset(){
        for (let i = 0; i < this.Height; i++){
            for(let j = 0; j < this.Width; j++){
                this.cells[i][j].unblock()
            }
        }
    }

    draw() {
        let y = 0

        while (y < this.canvas.height){
            this.context.beginPath();
            this.context.moveTo(0, y);
            this.context.lineTo(this.canvas.width, y);
            this.context.stroke();
            y = y + this.cellSize
        }

        let x = 0

        while (x < this.canvas.width){
            this.context.beginPath();
            this.context.moveTo(x, 0);
            this.context.lineTo(x, this.canvas.height);
            this.context.stroke();
            x = x + this.cellSize
        }
    }
}
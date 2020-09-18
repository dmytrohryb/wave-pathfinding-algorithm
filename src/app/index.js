import {Cell} from './Cell'

let canvas = document.getElementById('canvas')
let context = canvas.getContext('2d')
let cells = []

function copy(mainObj) {
    let objCopy = {};
    let key;

    for (key in mainObj) {
        objCopy[key] = mainObj[key];
    }
    return objCopy;
}

class Grid {
    constructor() {

        this.cells = []
        this.mouseDown = false

        this.initCanvas = this.initCanvas.bind(this)
        this.draw = this.draw.bind(this)

        this.initCanvas()
        this.draw()
    }

    initCanvas(){
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight

        let ltp = {x: 0, y: 0}
        let rbp = {x: 20, y: 20}


        while (rbp.y <= canvas.height){
            rbp.x = 20
            ltp.x = 0
            let rowCells = []
            while (rbp.x <= canvas.width){
                rowCells.push(new Cell(copy(ltp), copy(rbp), context))
                rbp.x += 20
                ltp.x += 20
            }
            cells.push(rowCells)
            ltp.y += 20
            rbp.y += 20
        }

        canvas.addEventListener('mousedown', function (e) {

            let x = e.pageX - e.target.offsetLeft, y = e.pageY - e.target.offsetTop;
            this.mouseDown = true
            let X = -1 + Math.ceil(x/20)
            let Y = -1 + Math.ceil(y/20)
            cells[Y][X].onClick()
            console.log('pressed: ' + x + ';' + y)
        });

        canvas.addEventListener('mouseup', function (e) {
            let x = e.pageX - e.target.offsetLeft, y = e.pageY - e.target.offsetTop;
            this.mouseDown = false
            let X = -1 + Math.ceil(x/20)
            let Y = -1 + Math.ceil(y/20)

            console.log('clicked: ' + x + ';' + y)
            //context.fillRect(Math.floor(x/20)*20, Math.floor(y/20)*20, 20, 20)

        });

        canvas.addEventListener('mousemove', function (e) {
            if(this.mouseDown){
                let x = e.pageX - e.target.offsetLeft, y = e.pageY - e.target.offsetTop;

                let X = -1 + Math.ceil(x/20)
                let Y = -1 + Math.ceil(y/20)
                console.log('moved: ' + x + ';' + y)
                cells[Y][X].onClick()
                //context.fillRect(Math.floor(x/20)*20, Math.floor(y/20)*20, 20, 20)
            }
        });
    }

    draw() {
        let y = 0

        while (y < canvas.height){
            context.beginPath();
            context.moveTo(0, y);
            context.lineTo(canvas.width, y);
            context.stroke();
            y = y + 20
        }

        let x = 0

        while (x < canvas.width){
            context.beginPath();
            context.moveTo(x, 0);
            context.lineTo(x, canvas.height);
            context.stroke();
            x = x + 20
        }


        // do your drawing stuff here
    }

}

let grid = new Grid()
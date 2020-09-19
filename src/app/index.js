import {Cell} from './Cell'

let canvas = document.getElementById('canvas')
let context = canvas.getContext('2d')
let cells = []
let searchBtn = document.getElementById('searchBtn')
let startBtn = document.getElementById('startBtn')
let finishBtn = document.getElementById('finishBtn')
let blockBtn = document.getElementById('blockBtn')

const checkPoints = {
    startPointSelected: false,
    finishPointSelected: false
}

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

        this.x = 0
        this.y = 0

        this.mode = ''


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

        let mode = this.mode

        canvas.addEventListener('mousedown', function (e) {

            let x = e.pageX - e.target.offsetLeft, y = e.pageY - e.target.offsetTop;
            this.mouseDown = true
            let X = -1 + Math.ceil(x/20)
            let Y = -1 + Math.ceil(y/20)

            if(checkPoints.startPointSelected && mode === 'start'){
                cells[checkPoints.startPointSelected.y / 20][checkPoints.startPointSelected.x / 20].onClick(mode, checkPoints)
            }

            if(checkPoints.finishPointSelected && mode === 'finish'){
                cells[checkPoints.finishPointSelected.y / 20][checkPoints.finishPointSelected.x / 20].onClick(mode, checkPoints)
            }

            cells[Y][X].onClick(mode, checkPoints)
        });

        canvas.addEventListener('mouseup', function (e) {
            let x = e.pageX - e.target.offsetLeft, y = e.pageY - e.target.offsetTop;
            this.mouseDown = false
            let X = -1 + Math.ceil(x/20)
            let Y = -1 + Math.ceil(y/20)

            //console.log('clicked: ' + x + ';' + y)
        });

        canvas.addEventListener('mousemove', function (e) {
            if(this.mouseDown){
                let x = e.pageX - e.target.offsetLeft, y = e.pageY - e.target.offsetTop
                this.x = x
                this.y = y
                let X = -1 + Math.ceil(x/20)
                let Y = -1 + Math.ceil(y/20)
                //console.log('moved: ' + this.x + ';' + this.y)
                if(!mode){
                    cells[Y][X].onClick(mode, checkPoints)
                }
            }
        });

        searchBtn.addEventListener('mouseup', ()=>{
            console.log(true)
        })

        startBtn.addEventListener('mouseup', ()=>{
            mode = 'start'
        })

        finishBtn.addEventListener('mouseup', ()=>{
            mode = 'finish'
        })

        blockBtn.addEventListener('mouseup', ()=>{
            mode = ''
        })

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

    }
}

let grid = new Grid(document)
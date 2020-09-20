import {Cell} from './Cell'
const minWalk = require('./Algorithm')
let canvas = document.getElementById('canvas')
let context = canvas.getContext('2d')
let cells = []
let searchBtn = document.getElementById('searchBtn')
let startBtn = document.getElementById('startBtn')
let finishBtn = document.getElementById('finishBtn')
let blockBtn = document.getElementById('blockBtn')
let resetBtn = document.getElementById('resetBtn')
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
        this.mouseDown = false

        this.x = 0
        this.y = 0

        this.mode = ''


        this.initCanvas = this.initCanvas.bind(this)
        this.draw = this.draw.bind(this)
        this.convertArray = this.convertArray.bind(this)
        this.calculate = this.calculate.bind(this)

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
                rowCells.push(new Cell(copy(ltp), copy(rbp), context, 'block'))
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
        });

        canvas.addEventListener('mousemove', function (e) {
            if(this.mouseDown){
                let x = e.pageX - e.target.offsetLeft, y = e.pageY - e.target.offsetTop
                this.x = x
                this.y = y
                let X = -1 + Math.ceil(x/20)
                let Y = -1 + Math.ceil(y/20)
                if(mode != 'start' && mode !== 'finish'){
                    cells[Y][X].onClick(mode, checkPoints)
                }
            }
        });

        searchBtn.addEventListener('mouseup', ()=>{
            this.calculate()
        })

        startBtn.addEventListener('mouseup', ()=>{
            mode = 'start'
        })

        finishBtn.addEventListener('mouseup', ()=>{
            mode = 'finish'
        })

        blockBtn.addEventListener('mouseup', ()=>{
            mode = 'block'
        })

        resetBtn.addEventListener('mouseup', ()=>{
            for (let i = 0; i < cells.length; i++){
                for (let j = 0; j < cells[i].length; j++){
                    cells[i][j].reset(checkPoints)
                }
            }
        })

    }

    convertArray(arr){
        let res = []
        for (let i = 0; i < arr.length; i++){
            let temp = []
            for (let j = 0; j < arr[i].length; j++){
                temp.push(arr[i][j].type)

            }
            res.push(temp)
        }
        return res
    }

    calculate(){
        let res = this.convertArray(cells)
        console.log(minWalk.minWalk(res, checkPoints.startPointSelected.y / 20, checkPoints.startPointSelected.x / 20, checkPoints.finishPointSelected.y / 20, checkPoints.finishPointSelected.x / 20, cells))

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

let grid = new Grid()
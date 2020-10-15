import {Grid} from "./Grid"
import {pathFind} from "./Wave"

const canvas = document.getElementById('canvas')
const context = canvas.getContext('2d')

canvas.width = window.innerWidth - 39
canvas.height = window.innerHeight - 60
let cellSize = 20
canvas.addEventListener('mousedown', (e)=>{
    let x = e.pageX - e.target.offsetLeft, y = e.pageY - e.target.offsetTop
    let indexes = {x: Math.floor(y / cellSize), y: Math.floor(x/cellSize)}
    grid.handleMouseDown(indexes)
})

canvas.addEventListener('mouseup', (e)=>{
    grid.handleMouseUp()
})

canvas.addEventListener('mousemove', (e) => {
    if(grid.mouseDown){
        if(grid.Mode === 'block'){
            let x = e.pageX - e.target.offsetLeft, y = e.pageY - e.target.offsetTop
            let indexes = {x: Math.floor(y / cellSize), y: Math.floor(x/cellSize)}
            grid.handleMouseDown(indexes)
        }
    }
})

const searchBtn = document.getElementById('searchBtn')
const startBtn = document.getElementById('startBtn')
const finishBtn = document.getElementById('finishBtn')
const blockBtn = document.getElementById('blockBtn')
const resetBtn = document.getElementById('resetBtn')
const cellsize = document.getElementById('value')
cellsize.innerText = 1

const plusBtn = document.getElementById('plus')
const minusBtn = document.getElementById('minus')

plusBtn.addEventListener('click', () => {
    if(cellsize.innerText == 1){
        cellsize.innerText = 2
        cellSize = 40
    }
    else if(cellsize.innerText == 2){
        cellsize.innerText = 3
        cellSize = 60
    }
    else if(cellsize.innerText == 3){
        cellsize.innerText = 4
        cellSize = 80
    }
    grid.cellSize = cellSize

    grid.init()
    grid.draw()
})

minusBtn.addEventListener('click', () => {
    if(cellsize.innerText == 2){
        cellsize.innerText = 1
        cellSize = 20
    }
    else if(cellsize.innerText == 3){
        cellsize.innerText = 2
        cellSize = 40
    }
    else if(cellsize.innerText == 4){
        cellsize.innerText = 3
        cellSize = 60
    }
    grid.cellSize = cellSize

    grid.init()
    grid.draw()
})

searchBtn.addEventListener('mouseup', ()=>{
    pathFind(grid, grid.Width, grid.Height, Math.floor(grid.startPoint.X), Math.floor(grid.startPoint.Y), Math.floor(grid.finishPoint.X), Math.floor(grid.finishPoint.Y))
})

startBtn.addEventListener('mouseup', ()=>{
    grid.Mode = 'start'
})

finishBtn.addEventListener('mouseup', ()=>{
    grid.Mode = 'finish'
})

blockBtn.addEventListener('mouseup', ()=>{
    grid.Mode = 'block'
})

resetBtn.addEventListener('mouseup', ()=>{
    grid.reset()
})



const grid = new Grid(canvas, context, cellSize)

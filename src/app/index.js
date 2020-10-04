import {Grid} from "./Grid"
import {pathFind} from "./Algorithm"

const canvas = document.getElementById('canvas')
const context = canvas.getContext('2d')

canvas.width = window.innerWidth - 39
canvas.height = window.innerHeight - 60

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

searchBtn.addEventListener('mouseup', ()=>{
    pathFind(grid, grid.Width, grid.Height, Math.floor(grid.startPoint.y / cellSize), Math.floor(grid.startPoint.x / cellSize), Math.floor(grid.finishPoint.y / 20), Math.floor(grid.finishPoint.x / 20))
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

let cellSize = 10

const grid = new Grid(canvas, context, cellSize)
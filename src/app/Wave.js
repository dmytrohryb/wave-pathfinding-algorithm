export function pathFind(grid, width, height, startX, startY, finishX, finishY){

    let cells = grid.Cells
    for (let i = 0; i < cells.length; i++){
        for (let j = 0; j < cells[i].length; j++){
            if(cells[i][j].Mode !== 'block' && cells[i][j].Mode !== 'start'){
                let ok = false
                if(cells[i][j].Mode === 'finish'){
                    ok = true
                }
                cells[i][j].unblock()
                if(ok){
                    cells[i][j].block('finish')
                }
            }
        }
    }

    let count = 1
    let isDone = false
    let res = checkAdjacentCells(adjacentСells(startX, startY, width, height, grid.Cells))

    res.forEach(element => {
        if(element.X === finishX && element.Y === finishY) isDone = true
    })

    markСells(res, count)

    while (!isDone){
        count++
        let temp = []
        for (let i = 0; i < res.length; i++){
            let cells = checkMarks(checkAdjacentCells(adjacentСells(res[i].X, res[i].Y, width, height, grid.Cells)))
            if(cells !== false) {
                cells.forEach(element => {
                    temp.push(element)
                })
                markСells(cells, count)
            }
        }
        res = temp
        if(res.length === 0) isDone = true
        res.forEach(element => {
            if(element.X === finishX && element.Y === finishY) isDone = true
        })
    }

    res = []

    res.push(reverseWavePropagation(finishX, finishY, width, height, grid.Cells))

    for (let i = 0; i < count-1; i++){
        res.push(reverseWavePropagation(res[i].X, res[i].Y, width, height, grid.Cells))
    }

    res.forEach(element => {
        if(count-1 !== 0){
            element.block('path')
            element.fillText((count--)-1)
        }
    })

    for (let i = 0; i < cells.length; i++){
        for (let j = 0; j < cells[i].length; j++){
            if(cells[i][j].Mode !== 'block' && cells[i][j].Mode !== 'finish' && cells[i][j].Mode !== 'start' && cells[i][j].Mode !== 'path'){
                cells[i][j].unblock()
            }
        }
    }

}

function reverseWavePropagation(x, y, w, h, cells){
    let temp = [
        (x-1 < w && x-1 >= 0 && y < h && y >= 0 && (cells[y][x-1].Label - cells[y][x].Label === -1)) ? cells[y][x-1] : false,
        (x < w && x >= 0 && y-1 < h && y-1 >= 0 && (cells[y-1][x].Label - cells[y][x].Label === -1)) ? cells[y-1][x] : false,
        (x+1 < w && x+1 >= 0 && y < h && y >= 0 && (cells[y][x+1].Label - cells[y][x].Label === -1)) ? cells[y][x+1] : false,
        (x < w && x >= 0 && y+1 < h && y+1 >= 0 && (cells[y+1][x].Label - cells[y][x].Label === -1)) ? cells[y+1][x] : false
    ]

    let data = []
    temp.forEach(element => {
        if(element) data.push(element)
    })

    if(data.length > 0){
        return data[0]
    }else{
        temp = [
            (x-1 < w && x-1 >= 0 && y-1 < h && y-1 >= 0 && (cells[y-1][x-1].Label - cells[y][x].Label === -1)) ? cells[y-1][x-1] : false,
            (x+1 < w && x+1 >= 0 && y-1 < h && y-1 >= 0 && (cells[y-1][x+1].Label - cells[y][x].Label === -1)) ? cells[y-1][x+1] : false,
            (x+1 < w && x+1 >= 0 && y+1 < h && y+1 >= 0 && (cells[y+1][x+1].Label - cells[y][x].Label === -1)) ? cells[y+1][x+1] : false,
            (x-1 < w && x-1 >= 0 && y+1 < h && y+1 >= 0 && (cells[y+1][x-1].Label - cells[y][x].Label === -1)) ? cells[y+1][x-1] : false
        ]
        temp.forEach(element => {
            if(element) data.push(element)
        })

        if(data.length > 0){
            return data[0]
        }
    }
}

function adjacentСells(x, y, w, h, cells){ // получение индексов соседних свободных ячеек
    let _cells = [
        (x-1 < w && x-1 >= 0 && y < h && y >= 0) ? cells[y][x-1] : false, // средняя левая ячейка
        (x-1 < w && x-1 >= 0 && y-1 < h && y-1 >= 0) ? cells[y-1][x-1] : false,
        (x < w && x >= 0 && y-1 < h && y-1 >= 0) ? cells[y-1][x] : false,
        (x+1 < w && x+1 >= 0 && y-1 < h && y-1 >= 0) ? cells[y-1][x+1] : false,
        (x+1 < w && x+1 >= 0 && y < h && y >= 0) ? cells[y][x+1] : false,
        (x+1 < w && x+1 >= 0 && y+1 < h && y+1 >= 0) ? cells[y+1][x+1] : false,
        (x < w && x >= 0 && y+1 < h && y+1 >= 0) ? cells[y+1][x] : false,
        (x-1 < w && x-1 >= 0 && y+1 < h && y+1 >= 0) ? cells[y+1][x-1] : false
    ]
    return _cells
}

function checkAdjacentCells(cells){
    let _cells = [
        (cells[0] && (cells[0].Mode === 'unblocked' || cells[0].Mode === 'finish')) ? cells[0] : false,
        (cells[0] && cells[2] && (cells[0].Mode === 'unblocked' || cells[2].Mode === 'unblocked')) ? cells[1] : false,
        (cells[2] && (cells[2].Mode === 'unblocked' || cells[2].Mode === 'finish')) ? cells[2] : false,
        (cells[2] && cells[4] && (cells[2].Mode === 'unblocked' || cells[4].Mode === 'unblocked')) ? cells[3] : false,
        (cells[4] && (cells[4].Mode === 'unblocked' || cells[4].Mode === 'finish')) ? cells[4] : false,
        (cells[4] && cells[6] && (cells[4].Mode === 'unblocked' || cells[6].Mode === 'unblocked')) ? cells[5] : false,
        (cells[6] && (cells[6].Mode === 'unblocked' || cells[6].Mode === 'finish')) ? cells[6] : false,
        (cells[6] && cells[0] && (cells[6].Mode === 'unblocked' || cells[0].Mode === 'unblocked')) ? cells[7] : false
    ]

    let res = []
    for (let i = 0; i < _cells.length; i++){
        if(_cells[i]){
            res.push(_cells[i])
        }
    }

    return (res.length === 0) ? false : res
}

function checkMarks(cells){
    let _cells = []

    if(cells.length !== 0){
        cells.forEach(element => {
            if(!element.Label && (element.Mode === 'unblocked' || element.Mode === 'finish')){
                _cells.push(element)
            }
        })
    }
    return (_cells.length === 0) ? false : _cells
}

function markСells(cells, count){
    cells.forEach(element => {
        element.changeLabel = count
    })
}
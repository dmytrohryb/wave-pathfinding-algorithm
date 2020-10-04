function firstWave(x, y, w, h, arr){ // получение индексов соседних свободных ячеек
    let points = [
        (x-1 < w && x-1 >= 0 && y < h && y >= 0 && arr[x-1][y].Mode === 'unblocked' && !arr[x-1][y].Label) ? {x: x-1, y: y} : false, // средняя левая ячейка
        (x-1 < w && x-1 >= 0 && y-1 < h && y-1 >= 0 && arr[x-1][y-1].Mode === 'unblocked' && !arr[x-1][y-1].Label) ? {x: x-1, y: y-1} : false,
        (x < w && x >= 0 && y-1 < h && y-1 >= 0 && arr[x][y-1].Mode === 'unblocked' && !arr[x][y-1].Label) ? {x: x, y: y-1} : false,
        (x+1 < w && x+1 >= 0 && y-1 < h && y-1 >= 0 && arr[x+1][y-1].Mode === 'unblocked' && !arr[x+1][y-1].Label) ? {x: x+1, y: y-1} : false,
        (x+1 < w && x+1 >= 0 && y < h && y >= 0 && arr[x+1][y].Mode === 'unblocked' && !arr[x+1][y].Label) ? {x: x+1, y: y} : false,
        (x+1 < w && x+1 >= 0 && y+1 < h && y+1 >= 0 && arr[x+1][y+1].Mode === 'unblocked' && !arr[x+1][y+1].Label) ? {x: x+1, y: y+1} : false,
        (x < w && x >= 0 && y+1 < h && y+1 >= 0 && arr[x][y+1].Mode === 'unblocked' && !arr[x][y+1].Label) ? {x: x, y: y+1} : false,
        (x-1 < w && x-1 >= 0 && y+1 < h && y+1 >= 0 && arr[x-1][y+1].Mode === 'unblocked' && !arr[x-1][y+1].Label) ? {x: x-1, y: y+1} : false
    ]
    let temp = [
        points[0],
        (!points[0] && !points[2]) ? false : points[1],
        points[2],
        (!points[2] && !points[4]) ? false : points[3],
        points[4],
        (!points[4] && !points[6]) ? false : points[5],
        points[6],
        (!points[6] && !points[0]) ? false : points[7]
    ]
    let res = []
    for (let i = 0; i < temp.length; i++){
        if(temp[i] !== false){
            res.push(temp[i])
        }
    }
    return (res[0]) ? res : false
}

function nextWave (wave, cells){ // просчет следующей 'волны' на основе текущей
    let _wave = []
    for (let i = 0; i < wave.length; i++){
        if(firstWave(wave[i].x, wave[i].y, cells.length, cells[0].length, cells) !== false){
            _wave.push(firstWave(wave[i].x, wave[i].y, cells.length, cells[0].length, cells))
        }
    }
    return (_wave.length === 0) ? false : _wave
}

export function pathFind(grid, width, height, startX, startY, finishX, finishY){
    let res = firstWave(startX, startY, width, height, grid.Cells)
    for(let i = 0; i < res.length; i++){
        res[i].Label = i + 1
    }
    console.log(res)
    console.log(nextWave(firstWave(startX, startY, width, height, grid.Cells), grid.Cells))
}
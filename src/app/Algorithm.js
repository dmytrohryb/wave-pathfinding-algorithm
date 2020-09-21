function neighboringPoints(x, y, w, h, arr){ // получение индексов соседних свободных точек
    let points = [
        (x < w && x >= 0 && y-1 < h && y-1 >= 0 && arr[x][y-1] !== 'X' && typeof arr[x][y-1] !== typeof 1) ? {x: x, y: y-1} : false, // средняя левая ячейка
        (x-1 < w && x-1 >= 0 && y-1 < h && y-1 >= 0 && arr[x-1][y-1] !== 'X' && typeof arr[x-1][y-1] !== typeof 1) ? {x: x-1, y: y-1} : false,
        (x-1 < w && x-1 >= 0 && y < h && y >= 0 && arr[x-1][y] !== 'X' && typeof arr[x-1][y] !== typeof 1) ? {x: x-1, y: y} : false,
        (x-1 < w && x-1 >= 0 && y+1 < h && y+1 >= 0 && arr[x-1][y+1] !== 'X' && typeof arr[x-1][y+1] !== typeof 1) ? {x: x-1, y: y+1} : false,
        (x < w && x >= 0 && y+1 < h && y+1 >= 0 && arr[x][y+1] !== 'X' && typeof arr[x][y+1] !== typeof 1) ? {x: x, y: y+1} : false,
        (x+1 < w && x+1 >= 0 && y+1 < h && y+1 >= 0 && arr[x+1][y+1] !== 'X' && typeof arr[x+1][y+1] !== typeof 1) ? {x: x+1, y: y+1} : false,
        (x+1 < w && x+1 >= 0 && y < h && y >= 0 && arr[x+1][y] !== 'X' && typeof arr[x+1][y] !== typeof 1) ? {x: x+1, y: y} : false,
        (x+1 < w && x+1 >= 0 && y-1 < h && y-1 >= 0 && arr[x+1][y-1] !== 'X' && typeof arr[x+1][y-1] !== typeof 1) ? {x: x+1, y: y-1} : false
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

function pathPoints(y, x, w, h, arr){ // получение индексов соседних свободных точек
    //console.log(arr)
    //console.log(x, y)
    //console.log(arr[x][y-1])
    if(arr[x][y] - arr[x][y-1] === 1 && x < w && x >= 0 && y-1 < h && y-1 >= 0 && arr[x][y-1]) return {x: x, y: y-1} // средняя левая ячейка
    if(arr[x][y] - arr[x-1][y-1] === 1 && x-1 < w && x-1 >= 0 && y-1 < h && y-1 >= 0 && arr[x-1][y-1]) return {x: x-1, y: y-1}
    if(arr[x][y] - arr[x-1][y] === 1 && x-1 < w && x-1 >= 0 && y < h && y >= 0 && arr[x-1][y]) return {x: x-1, y: y}
    if(arr[x][y] - arr[x-1][y+1] === 1 && x-1 < w && x-1 >= 0 && y+1 < h && y+1 >= 0 && arr[x-1][y+1]) return {x: x-1, y: y+1}
    if(arr[x][y] - arr[x][y+1] === 1 && x < w && x >= 0 && y+1 < h && y+1 >= 0 && arr[x][y+1]) return {x: x, y: y+1}
    if(arr[x][y] - arr[x+1][y+1] === 1 && x+1 < w && x+1 >= 0 && y+1 < h && y+1 >= 0 && arr[x+1][y+1]) return {x: x+1, y: y+1}
    if(arr[x][y] - arr[x+1][y] === 1 && x+1 < w && x+1 >= 0 && y < h && y >= 0 && arr[x+1][y]) return {x: x+1, y: y}
    if(arr[x][y] - arr[x+1][y-1] === 1 && x+1 < w && x+1 >= 0 && y-1 < h && y-1 >= 0 && arr[x+1][y-1]) return {x: x+1, y: y-1}
    return false
}

function prepareArray(arr){ // преобразование строк внутри массива во вложенные массивы символов
    let clone = []

    for (let x = 0; x < arr.length; x++){
        let temp = []
        for (let y = 0; y < arr[x].length; y++){
            temp.push(arr[x][y])
        }
        clone.push(temp)
    }
    return clone
}

function nextWave (wave, R){ // просчет следующей 'волны' на основе текущей
    let _wave = []
    for (let i = 0; i < wave.length; i++){
        if(neighboringPoints(wave[i].x, wave[i].y, R.length, R[0].length, R) !== false){
            _wave.push(neighboringPoints(wave[i].x, wave[i].y, R.length, R[0].length, R))
        }
    }
    return (_wave.length === 0) ? false : _wave
}

function checkValue(arr, value){
    //console.log(arr)
    for(let i = 0; i < arr.length; i++){
        if(deepEqualObj(arr[i], value)){
            return false
        }
    }
    return true
}

function deepEqualObj (obj1, obj2){
    return JSON.stringify(obj1)===JSON.stringify(obj2);
}

function minWalk(gridList, startX, startY, endX, endY, cells) {
    let R = prepareArray(gridList)

    R[startX][startY] = 0
    cells[startX][startY].fillCell(0)
    R[endX][endY] = 'к конечной точке нет ни одного пути'

    let count = 1

    let wave = neighboringPoints(startX, startY, gridList.length, gridList[0].length, R) // распостраняем 'волну'
    let points = []
    for (let i = 0; i < wave.length; i++){ // помечаем точки
        points.push({x: wave[i].x, y: wave[i].y})
        R[wave[i].x][wave[i].y] = count
        cells[wave[i].x][wave[i].y].fillCell(R[wave[i].x][wave[i].y], true)
    }

    let temp = true
    let isDone = false
    while (temp && !isDone){
        count++
        temp = nextWave(wave, R) // распостраняем 'волну'
        wave = []

        let test = false
        for (let i = 0; i < temp.length; i++){
            //console.log(isDone)
            if(!isDone){
                for (let j = 0; j < temp[i].length; j++){
                    if(checkValue(wave, {x: temp[i][j].x, y: temp[i][j].y})){
                        wave.push({x: temp[i][j].x, y: temp[i][j].y})
                    }
                    if(temp[i][j].x === endX && temp[i][j].y === endY){
                        isDone = true
                    }
                }
            }
        }

        isDone = false
        for (let i = 0; i < wave.length; i++){ // помечаем точки
            if(!isDone){
                points.push({x: wave[i].x, y: wave[i].y})
                R[wave[i].x][wave[i].y] = count
                cells[wave[i].x][wave[i].y].fillCell(R[wave[i].x][wave[i].y], true)
            }
            if(R[wave[i].x][wave[i].y] === R[endX][endY]){
                isDone = true

            }
        }
    }

    for (let k = 0; k < points.length; k++){
        cells[points[k].x][points[k].y].fillCell(R[points[k].x][points[k].y], false)
    }

    setTimeout(() => pathFind(startX, startY, endX, endY, R, cells, R[endX][endY]), 2)

    return R[endX][endY]
}

function pathFind(startX, startY, endX, endY, R, cells, count){
    for (let i = 0; i < cells.length; i++){
        for (let j = 0; j < cells[i].length; j++){
            cells[i][j].fillCell(0, false)
        }
    }
    //console.log(startY, startX)
    console.log(endX, endY)
    //console.log(R[startX][startY])
    console.log(R[endX][endY])

    cells[endX][endY].fillCell(0, true)
    let isDone = false
    let curPoint = {x: endY, y: endX}
    let c = count-1
    for(let i = 0; i < count-1; i++){
        let temp = pathPoints(curPoint.x, curPoint.y, R.length, R[0].length, R)
        console.log(temp)
        if(temp){
            cells[temp.x][temp.y].fillCell(c--, true)
            curPoint = {x: temp.y, y: temp.x}
        }
    }
}

module.exports.minWalk = minWalk

/*

for(let i = 0; i < wave.length; i++){
            //console.log(cu2 - R[wave[i].y][wave[i].x])
            if((cu2 - R[wave[i].x][wave[i].y]) === 1 && !isDone){
                curPoint = {x: wave[i].x, y: wave[i].y}
                cu2 = R[wave[i].x][wave[i].y]
                cells[wave[i].x][wave[i].y].fillCell(R[wave[i].x][wave[i].y], true)
                if(R[wave[i].x][wave[i].y] === 1)
                {
                    isDone = true
                    break
                }
            }
        }
const result = minWalk(
    [
        '.X...X...',
        '.X.X.X...',
        '...X.....',
    ],
    2, 0,
    0, 6
)

console.log(result)
*/
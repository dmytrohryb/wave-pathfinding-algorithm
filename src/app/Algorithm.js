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
    let res = []
    for (let i = 0; i < points.length; i++){
        if(points[i] !== false){
            res.push(points[i])
        }
    }
    return (res[0]) ? res : false
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

    for (let i = 0; i < wave.length; i++){ // помечаем точки
        R[wave[i].x][wave[i].y] = count
        cells[wave[i].x][wave[i].y].fillCell(R[wave[i].x][wave[i].y])
    }

    let temp = true

    while (temp){
        count++
        temp = nextWave(wave, R) // распостраняем 'волну'
        wave = []
        let test = false
        for (let i = 0; i < temp.length; i++){
            for (let j = 0; j < temp[i].length; j++){
                if(checkValue(wave, {x: temp[i][j].x, y: temp[i][j].y})){
                    wave.push({x: temp[i][j].x, y: temp[i][j].y})
                }

                if(temp[i][j].x === endX && temp[i][j].y === endY){
                    break;
                }
            }
        }

        for (let i = 0; i < wave.length; i++){ // помечаем точки
            R[wave[i].x][wave[i].y] = count
            cells[wave[i].x][wave[i].y].fillCell(R[wave[i].x][wave[i].y])
        }
    }

    return R[endX][endY]
}

module.exports.minWalk = minWalk

/*
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
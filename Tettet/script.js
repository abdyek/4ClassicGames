
// canvas
canvas = document.getElementById("game-area-canvas")
context = canvas.getContext("2d")

canvas.width = 800
canvas.height = 600

// shapes
class Shape {
    constructor(allPatterns, rowInd, colInd) {
        this.allPatterns = allPatterns  // patterns of 0^o, 90^o, 180^o, 270^o
        this.rowInd = rowInd    // those are for position
        this.colInd = colInd
        this.firstRowInd = rowInd   // to reuse shapes obje
        this.firstColInd = colInd
        this.rotationInd = 0
        this.listOfShape = []
        this.minCellCol
        this.maxCellCol
        this.maxCellRow     // for the underside of moveable area
        this.setLimits()
    }
    /*move(x, y) {
        this.rowInd += y
        this.colInd += x
    }*/
    create() {
        for(var i = 0; i<this.allPatterns[0].length; i++) {
            fillCell(this.rowInd + this.allPatterns[this.rotationInd][i][0], this.colInd + this.allPatterns[this.rotationInd][i][1])
        }
    }
    rotate() {
        this.rotationInd++;
        if(this.rotationInd == this.allPatterns.length) {
            this.rotationInd = 0;
        }
        this.setLimits()
        refresh()
    }
    move(rowStep, colStep) {
        let possible = true
        let r, c    // absolute row and Col in the area
        for(var i = 0; i<this.allPatterns[this.rotationInd].length; i++) {
            r = this.rowInd + this.allPatterns[this.rotationInd][i][0]
            c = this.colInd + this.allPatterns[this.rotationInd][i][1]
            if(stack[r + rowStep][c + colStep])
                possible = false
        }
        if(possible) {
            this.rowInd += rowStep
            this.colInd += colStep
            if(this.colInd < - this.minCellCol)         // control to not exit left border
                this.colInd = - this.minCellCol
            if(this.colInd + this.maxCellCol > 9) {     // control to not exit right border
                this.colInd = 9 - this.maxCellCol
            }
            if(this.rowInd > 9 - this.maxCellRow) {     // control to not exit bottom border
                this.rowInd = 9 - this.maxCellRow
            }
            refresh()
        }
    }
    setLimits() {
        let colMin = this.allPatterns[this.rotationInd][0][1]
        let colMax = colMin
        for(var i = 1; i<this.allPatterns[0].length; i++) {
            if(colMin>this.allPatterns[this.rotationInd][i][1]) {
                colMin = this.allPatterns[this.rotationInd][i][1]
            }
            if(colMax<this.allPatterns[this.rotationInd][i][1]) {
                colMax = this.allPatterns[this.rotationInd][i][1]
            }
        }
        this.minCellCol = colMin
        this.maxCellCol = colMax

        let rowMax = this.allPatterns[this.rotationInd][0][0]
        for(var i = 1; i<this.allPatterns[0].length; i++) {
            if(rowMax<this.allPatterns[this.rotationInd][i][0]) {
                rowMax = this.allPatterns[this.rotationInd][i][0]
            }
        }
        this.maxCellRow = rowMax
        //console.log(col)  test amaçlı
    }
}



class Stick extends Shape {
    constructor(rowInd=-2, colInd=3) {
        let allPatterns = [
            [[2,0], [2,1], [2,2], [2,3], [2,4]],
            [[0,2], [1,2], [2,2], [3,2], [4,2]]
        ]
        super(allPatterns, rowInd, colInd)
    }
}

class LikeZ extends Shape {
    constructor(rowInd=0, colInd=3) {
        let allPatterns = [
            [[0,0], [0,1], [1,1], [1,2]],
            [[0,2], [1,2], [1,1], [2,1]],
            [[2,2], [2,1], [1,1], [1,0]],
            [[2,0], [1,0], [1,1], [0,1]]
        ]
        super(allPatterns, rowInd, colInd)
    }
}

class LikeZReverse extends Shape {
    constructor(rowInd=0, colInd=3) {
        let allPatterns = [
            [[0,1], [0,2], [1,0], [1,1]],
            [[1,2], [2,2], [0,1], [1,1]],
            [[2,1], [2,0], [1,2], [1,1]],
            [[1,0], [0,0], [2,1], [1,1]]
        ]
        super(allPatterns, rowInd, colInd)
    }
}

class LikeT extends Shape {
    constructor(rowInd=-1, colInd=4) {
        let allPatterns = [
            [[1,0], [1,1], [1,2], [2,1]],
            [[0,1], [1,1], [2,1], [1,0]],
            [[1,2], [1,1], [1,0], [0,1]],
            [[2,1], [1,1], [0,1], [1,2]]
        ]
        super(allPatterns, rowInd, colInd)
    }
}

class LikeL extends Shape {
    constructor(rowInd=0, colInd=4) {
        let allPatterns = [
            [[0,0], [1,0], [1,1], [1,2]],  // 0 degree
            [[0,2], [0,1], [1,1], [2,1]],  // 90 degree
            [[2,2], [1,2], [1,1], [1,0]],  // 180 degree
            [[2,0], [2,1], [1,1], [0,1]]   // 270 degree
        ]
        super(allPatterns, rowInd, colInd)
    }
}

class LikeLReverse extends Shape {
    constructor(rowInd=0, colInd=4) {
        let allPatterns = [
            [[0,2], [1,0], [1,1], [1,2]],
            [[2,2], [0,1], [1,1], [2,1]],
            [[2,0], [1,2], [1,1], [1,0]],
            [[0,0], [2,1], [1,1], [0,1]]
        ]
        super(allPatterns, rowInd, colInd)
    }
}

class Square2x2 extends Shape {
    constructor(rowInd=0, colInd=4) {
        let allPatterns = [
            [[0,0], [0,1], [1,0], [1,1]]
        ]
        super(allPatterns, rowInd, colInd)
    }
}

class Square1x1 extends Shape {
    constructor(rowInd=0, colInd=4) {
        let allPatterns = [
            [[0,0]]
        ]
        super(allPatterns, rowInd, colInd)
    }
}

// tools for game play
let gameStart = false

let stick = new Stick()
let likeZ = new LikeZ()
let likeZReverse = new LikeZReverse()
let likeT = new LikeT()
let likeL = new LikeL()
let likeLReverse = new LikeLReverse()
let square2x2 = new Square2x2()
let square1x1 = new Square1x1()

let listOfShape = [stick, likeZ, likeZReverse, likeT, likeL, likeLReverse, square2x2, square1x1]

let stack = [10]
for (var i = 0; i<10; i++) {
    stack[i] = new Array(10)
    for(var j = 0; j<10; j++) {
        stack[i][j] = false   // is filled?
    }
}

function fillStack(rowInd, colInd) {
    stack[rowInd][colInd] = true
    refresh()
}


let currentShape
function getShape() {
    var randomNumber = Math.floor((Math.random() * listOfShape.length+ 0))
    currentShape = listOfShape[randomNumber]
    currentShape.rowInd = currentShape.firstRowInd
    currentShape.colInd = currentShape.firstColInd
    refresh()
}

function refresh() {
    context.clearRect(0,0,canvas.width, canvas.height);

    // drawing game environment
    // border
    drawRectangle(10, 10, 580, 2, "grey")
    drawRectangle(590, 10, 2, 580, "grey")
    drawRectangle(10, 590, 580, 2, "grey")
    drawRectangle(10, 10, 2, 580, "grey")

    //  grid
    for (var i = 1; i < 10; i++) {
        drawRectangle(10, 10 + i*58, 580, 1, "grey")
        drawRectangle(10 + i*58, 10, 1, 580, "grey")
    }

    for (var r = 0; r<10; r++) {
        for (var c = 0; c<10; c++) {
            if(stack[r][c]) {
                fillCell(r,c)
            }
        }
    }

    if(gameStart)
        currentShape.create()
}

// drawing tools
function drawRectangle(x, y, width, height, color) {
    context.beginPath()
    context.moveTo(x, y+(height/2))
    context.lineTo(x+width, y+(height/2))
    context.lineWidth = height
    context.strokeStyle = color
    context.stroke()
}

function fillCell(rowInd, colInd) {
    drawRectangle(11 + colInd*58, 11 + rowInd*58, 58, 58, "#83af9b")
}

//keypress event
document.body.addEventListener('keypress', keypress)
function keypress(e) {
    if(e.key=='w')
        currentShape.rotate()
    if(e.key=='a')
        currentShape.move(0,-1)
    if(e.key=='s')
        currentShape.move(1, 0)
    if(e.key=='d')
        currentShape.move(0, 1)
}


refresh()





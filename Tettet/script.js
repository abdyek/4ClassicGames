
// canvas
canvas = document.getElementById("game-area-canvas")
context = canvas.getContext("2d")

canvas.width = 600
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
    }
    create() {
        for(var i = 0; i<this.allPatterns[0].length; i++) {
            fillCell(this.rowInd + this.allPatterns[this.rotationInd][i][0], this.colInd + this.allPatterns[this.rotationInd][i][1])
        }
    }
    rotate() {
        if(this.rotatable()) {
            this.rotationInd++
            if(this.rotationInd == this.allPatterns.length)
                this.rotationInd = 0
        }
        refresh()
    }
    rotatable() {
        let possible = true
        let nextRotationInd = this.rotationInd + 1
        if(nextRotationInd == this.allPatterns.length)
            nextRotationInd = 0
        for(var i = 0; i <this.allPatterns[nextRotationInd].length;i++) {
            if( stack
                [this.rowInd + this.allPatterns[nextRotationInd][i][0] + 1]
                [this.colInd + this.allPatterns[nextRotationInd][i][1] + 1])
                possible = false
        }

        return possible
    }
    move(rowStep, colStep) {
        let possible = true
        let r, c    // absolute row and Col in the area
        for(var i = 0; i<this.allPatterns[this.rotationInd].length; i++) {
            r = this.rowInd + this.allPatterns[this.rotationInd][i][0]
            c = this.colInd + this.allPatterns[this.rotationInd][i][1]
            if(stack[r + rowStep+1][c + colStep+1]){    // +1 to slide stack matrix
                possible = false
                break
            }
        }
        if(possible) {
            this.rowInd += rowStep
            this.colInd += colStep
            refresh()
            return true   // successful!!  I need It at flow function
        }
    }
    joinStack() {
        for(var i = 0; i < this.allPatterns[this.rotationInd].length; i++) {
            stack
            [this.rowInd + this.allPatterns[this.rotationInd][i][0] + 1]
            [this.colInd + this.allPatterns[this.rotationInd][i][1] + 1] = true
        }
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

let stack = [12]                    // 12 because I reserved 2 x 2 hidden stick for borders
for (var i = 0; i<12; i++) {
    stack[i] = new Array(12)
    for(var j = 0; j<12; j++) {
        stack[i][j] = false   // is filled?
    }
}

// borders must be true
for (var i = 0; i<12; i++) {
    stack[0][i] = stack[11][i] = stack[i][0] = stack[i][11] = true
    // top ,       bottom  ,        left ,          right     bottoms
}

function clearRow(rowInd) {
    for(var i = 1; i<11; i++) {
        stack[rowInd+1][i] = false
    }
    for(var r = rowInd; r > 0; r--) {
        for (var c = 1; c < 11; c++) {
            if(stack[r][c]) {
                stack[r][c] = false
                stack[r+1][c] = true
            }
        }
    }
}

// let notDelete = []
function controlStack() {
    let notDelete = []
    let bonus = 0
    for(var r = 1 ; r<11; r++) {
        for(var c = 1; c<11; c++) {
            if(!stack[r][c]) {
                notDelete.push(r-1)
                break
            }
        }
    }
    for (var i = 0 ; i < 10; i++) {
        if(notDelete.indexOf(i)==-1) {
            clearRow(i)
            bonus++
        }
    }
    score += (bonus) ? Math.pow(bonus, bonus) : 0
    updateScore()
}


let currentShape
function getShape() {
    var randomNumber = Math.floor((Math.random() * listOfShape.length+ 0))
    currentShape = listOfShape[randomNumber]
    currentShape.rowInd = currentShape.firstRowInd
    currentShape.colInd = currentShape.firstColInd
    currentShape.rotationInd = 0    // rotationInd must be 0
    refresh()
}

// score
let score = 0

function updateScore() {
    var sc = document.getElementById("score")
    sc.innerText = score
}

// block flow
setInterval(()=>{
    if(gameStart) {
        if(!currentShape.move(1, 0)) {
            currentShape.joinStack()
            controlStack()
            getShape()
        }
    }
}, 1000)


function refresh() {
    context.clearRect(0,0,canvas.width, canvas.height)

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

    for (var r = 1; r<11; r++) {
        for (var c = 1; c<11; c++) {
            if(stack[r][c]) {
                fillCell(r-1,c-1)
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





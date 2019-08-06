
// canvas
canvas = document.getElementById("canvas")
context = canvas.getContext("2d")

canvas.width = 405
canvas.height = 600

let numberOfUnbrokenBlocks
let numberOfBall
let level = 1
let score
let multipleBlock = 0
let paused = false
let buffer

// ball
class Ball {
    constructor(startX, startY) {
        this.coordinate = {x: startX, y: startY}
        this.route = {x: 0, y: 0}    // distance per frame
        this.angle = 0   // degree
        this.blockIndex = {x1:0, y1:0, x2: 0, y2:0}
                        // x1, y1, x2, y2 are not point, index
        this.speed = 0   // per frame
        this.color = "#c1cf94"
        this.addList()
        this.brokenBlock = new Array()   // this list for will be broken block
        this.readyToGo = true
    }
    addList() {
        ballList.push(this)
    }
    
    removeList() {

    }
    draw() {
        
        // to catch current block index
        this.blockIndex.x1 = parseInt((this.coordinate.x - 13) / 20)
        this.blockIndex.y1 = parseInt((this.coordinate.y - 13) / 11)
        this.blockIndex.x2 = parseInt((this.coordinate.x - 13 + 10) / 20)
        this.blockIndex.y2 = parseInt((this.coordinate.y - 13 + 10) / 11)
        // the diameter of the ball is 10px

        drawCircle(this.coordinate.x, this.coordinate.y, 5, this.color)
        this.coordinate.x += this.route.x
        this.coordinate.y += this.route.y
        if(this.coordinate.x > 385 && this.route.x > 0) {
            this.setAngle(180 - this.angle)
            playSound("click")
        } else if(this.coordinate.x < 10 && this.route.x < 0) {
            this.setAngle(180 - this.angle)
            playSound("click")
        }
        if(this.coordinate.y < 10 && this.route.y < 0) {
            this.setAngle(360 - this.angle)
            playSound("click")
        } else if (this.coordinate.y + 10 > 500 && this.coordinate.y + 10 < 505 && this.coordinate.x + 10 > movableStick.x1 && this.coordinate.x < movableStick.x2) {
            let newDegree = Math.abs((movableStick.x2 - this.coordinate.x + 5) * 150 / movableStick.width)
            if(newDegree > 170) {
                newDegree = 170
            } else if(newDegree < 10) {
                newDegree = 10
            }
            this.setAngle(newDegree)
            score += Math.pow(multipleBlock, 2)
            multipleBlock = 0
            playSound("click")
        } else if (this.coordinate.y > 550) {
            playSound("negative")
            this.reset()
        }


        // horizontal block control
        if(this.route.x > 0) {  // go right
            if(mapGrid[this.blockIndex.x2][this.blockIndex.y1]) {
                this.addBrokenBlock(this.blockIndex.x2, this.blockIndex.y1)
            }
            if(mapGrid[this.blockIndex.x2][this.blockIndex.y2]) {
                this.addBrokenBlock(this.blockIndex.x2, this.blockIndex.y2)
            }
        } else if (this.route.x < 0) {  // go left
            if(mapGrid[this.blockIndex.x1][this.blockIndex.y1]) {
                this.addBrokenBlock(this.blockIndex.x1, this.blockIndex.y1)
            }
            if(mapGrid[this.blockIndex.x1][this.blockIndex.y2]) {
                this.addBrokenBlock(this.blockIndex.x1, this.blockIndex.y2)
            }
        }

        // vertical block control
        if(this.route.y < 0) {  // go up
            if(mapGrid[this.blockIndex.x1][this.blockIndex.y1]) {
                this.addBrokenBlock(this.blockIndex.x1, this.blockIndex.y1)
            }
            if(mapGrid[this.blockIndex.x2][this.blockIndex.y1]) {
                this.addBrokenBlock(this.blockIndex.x2, this.blockIndex.y1)
            }
        } else if (this.route.y > 0) {  // go down
            if(mapGrid[this.blockIndex.x1][this.blockIndex.y2]) {
                this.addBrokenBlock(this.blockIndex.x1, this.blockIndex.y2)
            }
            if(mapGrid[this.blockIndex.x2][this.blockIndex.y2]) {
                this.addBrokenBlock(this.blockIndex.x2, this.blockIndex.y2)
            }
        }
        if(this.brokenBlock.length == 3) {       //     ## ##
            var degree = 135                     //      * ##    --> there are 3 blocks
            if(this.route.y < 0) {  // go up     //                 * is a ball
                // the index of corner block in brokenBlock is 0
                for( var i = 1; i<this.brokenBlock.length; i++) {
                    mapGrid[this.brokenBlock[i].x][this.brokenBlock[i].y].explode()
                }
                if(this.route.x < 0)  {
                    degree = 205
                }
            } else if(this.route.y > 0) {    // go down 
                // the index of corner block in brokenBlock is 1
                mapGrid[this.brokenBlock[0].x][this.brokenBlock[0].y].explode()
                mapGrid[this.brokenBlock[2].x][this.brokenBlock[2].y].explode()
                if(this.route.x > 0) {
                    degree = 205
                }
            }
            this.setAngle(degree * 2 - this.angle)
        } else if(this.brokenBlock.length == 2){      //   *
            
            mapGrid[this.brokenBlock[0].x][this.brokenBlock[0].y].explode()
            mapGrid[this.brokenBlock[1].x][this.brokenBlock[1].y].explode()

            let topBlock = (this.brokenBlock[0].y > this.brokenBlock[1].y) ? 0:1
            let botBlock = (topBlock==0)?1:0

            if(this.blockIndex.y1 == this.brokenBlock[topBlock].y && this.blockIndex.x1 == this.brokenBlock[botBlock].x) {
                this.setAngle(90 - this.angle)
            } else if (this.blockIndex.y1 == this.brokenBlock[topBlock].y && this.blockIndex.x2 == this.brokenBlock[botBlock].x) {
                this.setAngle(270 - this.angle)
            } else if (this.brokenBlock[0].y == this.brokenBlock[1].y) {
                this.setAngle(360 - this.angle)
            } else if (this.brokenBlock[0].x == this.brokenBlock[1].x) {
                this.setAngle(180 - this.angle)
            }
        } else if(this.brokenBlock.length == 1) {
            mapGrid[this.brokenBlock[0].x][this.brokenBlock[0].y].explode()
            if(this.blockIndex.x1 == this.blockIndex.x2 &&         
               this.blockIndex.y1 != this.blockIndex.y2) {
                this.setAngle(360 - this.angle)
            } else if(this.blockIndex.x1 != this.blockIndex.x2 &&
                    this.blockIndex.y1 == this.blockIndex.y2) {
                this.setAngle(180 - this.angle)
            } else if(this.blockIndex.x1 != this.blockIndex.x2 &&
                this.blockIndex.y1 != this.blockIndex.y2) {
                    if((this.blockIndex.x1==this.brokenBlock[0].x && this.blockIndex.y2 == this.brokenBlock[0].y) ||
                        (this.blockIndex.x2==this.brokenBlock[0].x && this.blockIndex.y1 == this.brokenBlock[0].y)) {
                            this.setAngle(270 - this.angle)
                    } else {
                            this.setAngle(90 - this.angle)
                    }
                }
        }
        this.brokenBlock = new Array()
    }

    go(degree, speed) {
        this.setAngle(degree)
        this.setSpeed(speed)
    }

    stop() {
        this.speed = 0
        this.updateRoute()
    }

    setAngle(degree) {
        if(degree==0) {
            degree = 5
        } else if(degree==180) {
            degree = 175
        }
        this.angle = degree
        this.updateRoute()
    }

    setSpeed(speed) {
        this.speed = speed
        this.updateRoute()
    }

    updateRoute() {
        this.route.x = this.speed * getCos(this.angle)
        this.route.y = this.speed * getSin(this.angle)  * -1  // coordinate system in canvas is reverse so I multiply -1
    }
    addBrokenBlock(x, y) {
        var bulundu = false
        for(var i=0;i<this.brokenBlock.length;i++) {
            if(this.brokenBlock[i].x == x && this.brokenBlock[i].y == y) {
            bulundu = true
            break
            }
        }
        if(!bulundu) {
            this.brokenBlock.push({x: x, y: y})
        }
    }
    updatePositionOnMovableStick() {
        this.coordinate.x = movableStick.x1 + (movableStick.width - 10) / 2
        this.coordinate.y = movableStick.y1 - 11
    }

    reset() {
        this.route.x = 0
        this.route.y = 0
        this.updatePositionOnMovableStick()
        this.readyToGo = true
        multipleBlock = 0
        numberOfBall--
        controlForGameOver()
    }

}

class Stick {           // cross stick is not now :(
    constructor(x1, y1, x2, y2, color) {
        this.x1 = x1
        this.y1 = y1
        this.x2 = x2
        this.y2 = y2
        this.color = color
        this.angle = Math.atan2(y2 - y1, x2 - x1) * 180.0 / Math.PI;
        this.assets = []
        this.getAsset()
    }
    draw() {
        drawStick(this.x1, this.y1, this.x2, this.y2, 3, this.color)
    }
    getAsset() {
        stickList.push([this, this.angle])
    }
}

class Block {
    constructor(xInd, yInd, color) {
        this.indexInBlockList = blockList.length
        blockList.push(this)
        this.index = {x:xInd, y:yInd}
        this.color = color
        mapGrid[xInd][yInd] = this
        numberOfUnbrokenBlocks++
    }
    draw() {
        drawRectangle(13 + this.index.x*20, 13 + this.index.y*11, 19, 10, this.color)
    }
    explode() {
        playSound("blockCrush")
        blockList[this.indexInBlockList] = null
        mapGrid[this.index.x][this.index.y] = null
        numberOfUnbrokenBlocks--
        score += 10
        multipleBlock++
        controlForLevelUp()
    }
}

// other functions


function controlForLevelUp() {
    if(!numberOfUnbrokenBlocks) {
        levelUp()
    }
}

function controlForGameOver() {
    if(numberOfBall < 0) {
        drawMain = drawGameOver
        drawBar = drawPlayButton
        playSound("gameOver")
    }
}

function start() {
    if(!paused && mainBall.readyToGo) {
        mainBall.readyToGo = false
        mainBall.go(90, 3)
    }
}

function addToScore(point) {
    score += point
}

function levelUp() {
    playSound("levelUp")
    addToScore(100 * level + Math.pow(multipleBlock,2))
    level++
    numberOfBall++
    mainBall.reset()
    mainBall.speed = 0
    if(levels[level]) {
        loadLevel(level)
    } else {
        drawMain = drawTheEnd
        drawBar = drawPlayButton
    }
}

function play() {
    numberOfUnbrokenBlocks = 0
    numberOfBall = 2
    level = 1
    score = 0
    loadLevel(1)
    drawMain = drawGame
    drawBar = drawBoard
}

function loadLevel(index) {
    clearMapGrid()
    blockList = []
    for (var i = 0 ; i < levels[index].length; i++) {
        new Block(levels[index][i].xInd, levels[index][i].yInd, levels[index][i].color)
    }

}

function clearMapGrid() {
    for (var i = 0 ; i < mapGrid.length; i++) {
        for ( var j=0; j<mapGrid[i].length; j++) {
            mapGrid[i][j] = null
        }
    }
}


// default
let topStick = new Stick(10, 10, 395, 10, "#638379") 
let leftStick = new Stick(10, 10, 10, 550, "#638379") 
let rightStick = new Stick(395, 10, 395, 550, "#638379") 

let movableStick = new Stick((canvas.width - 75) / 2, 500, (canvas.width - 75) / 2 + 75, 500, "#e38c95")
movableStick.width = movableStick.x2 - movableStick.x1

let y
let x
function getCoor(e){
    if(!paused) {
        x=e.clientX
        y=e.clientY
        let newX1 = x - (window.innerWidth - canvas.width + movableStick.width) / 2
        let newX2 = newX1 + movableStick.width
        //if(newX1>10 && newX2 < canvas.width - 10) {
        movableStick.x1 = newX1
        movableStick.x2 = newX2
        //}
        if(newX1<10) {
            movableStick.x1 = 10
            movableStick.x2 = movableStick.width + 10
        } else if(newX2 > canvas.width - 10) {
            movableStick.x1 = canvas.width - 10 - movableStick.width
            movableStick.x2 = canvas.width - 10
        }
        
        if(mainBall.readyToGo) {
            mainBall.updatePositionOnMovableStick()
        }
    }
}

let mainBall = new Ball(movableStick.x1 + (movableStick.width - 10) / 2, movableStick.y1 - 11) 

// draw
let drawMain
let drawBar

// main
function drawGame() {
    for(var i = 0; i<ballList.length; i++) {
        ballList[i].draw()
    }

    for(var i = 0; i<stickList.length; i++) {
        stickList[i][0].draw()
    }

    for(var i = 0; i<blockList.length; i++) {
        if(blockList[i]) {
            blockList[i].draw()
        }
    }
}

function drawWelcome() {
    drawText("Arkark", "#d9effc", "50px Saira Stencil One", 120, 275)
}

function drawGameOver() {
    drawText("Game Over", "#f46f47", "32px Noto Sans", 120, 300)
    drawText("Score " + score, "#ddd", "24px Noto Sans", 125, 350)
}

function drawTheEnd() {
    drawText("The End", "#61cdff", "50px Saira Stencil One", 120, 300)
    drawText("Score " + score, "#ddd", "24px Noto Sans", 125, 350)
}

// bar
function drawBoard() {
    // level
    drawText("Level "+level + " / 8", "#eee", "16px Noto Sans", 260, 580)

    // number of ball
    drawCircle(165, 570, 5, "#c1cf94")
    drawText("x " + numberOfBall, "#eee", "16px Noto Sans", 180, 580)
    
    // score
    drawText("Score " + score, "#eee", "16px Noto Sans", 30, 580)

    // pause
    if(paused) {
        drawPng("img/play.png", 370, 565)
        drawText("Paused", "#e38c95", "50px Noto Sans", 120, 275)
    } else {
        drawPng("img/pause.png", 370, 565)
    }
}

function drawPlayButton() {
    drawText("Play", "#ddd", "25px Noto Sans", 340, 580)
}

function toClick() {
    if(drawBar==drawPlayButton && x > (window.innerWidth - canvas.width)/2 + 340 && y > 558) {
        play()
    } else if(drawMain==drawGame && y < 550) {
        start()
    } else if(drawBar==drawBoard && x > 370 + (window.innerWidth - canvas.width)/2 ) {
        if(!paused) {
            buffer = {
                x: mainBall.route.x,
                y: mainBall.route.y,
                speed: mainBall.speed
            }
            mainBall.stop()
            paused = true
        } else {
            mainBall.route.x = buffer.x
            mainBall.route.y = buffer.y
            mainBall.speed = buffer.speed
            paused = false
        }

    }
}

drawMain = drawWelcome
drawBar = drawPlayButton


                    

// for animate
window.requestAnimationFrame(gameLoop)


// canvas
canvas = document.getElementById("canvas")
context = canvas.getContext("2d")

canvas.width = 400
canvas.height = 600

let numberOfUnbrokenBlocks = 0
let numberOfStick = 3

// ball
class Ball {
    constructor(startX, startY) {
        this.coordinate = {x: startX, y: startY}
        this.route = {x: 0, y: 0}    // distance per frame
        this.angle = 0   // degree
        this.blockIndex = {x1:0, y1:0, x2: 0, y2:0}
                        // x1, y1, x2, y2 are not point, index
        this.speed = 0   // per frame
        this.color = "red"
        this.addList()
        this.brokenBlock = new Array()   // this list for will be broken block
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
        if(this.coordinate.x > 380) {
            this.setAngle(180 - this.angle)
        } else if(this.coordinate.x < 10) {
            this.setAngle(180 - this.angle)
        }
        if(this.coordinate.y < 10) {
            this.setAngle(360 - this.angle)
        } else if (this.coordinate.y > 580) {  // for test
            this.setAngle(360 - this.angle)
        }

        // horizontal block control
        if(this.route.x > 0) {  // go right
            if(mapGrid[this.blockIndex.x2][this.blockIndex.y1]) {
                this.addBrokenBlock(this.blockIndex.x2, this.blockIndex.y1, 180)
            }
            if(mapGrid[this.blockIndex.x2][this.blockIndex.y2]) {
                this.addBrokenBlock(this.blockIndex.x2, this.blockIndex.y2, 180)
            }
        } else if (this.route.x < 0) {  // go left
            if(mapGrid[this.blockIndex.x1][this.blockIndex.y1]) {
                this.addBrokenBlock(this.blockIndex.x1, this.blockIndex.y1, 180)
            }
            if(mapGrid[this.blockIndex.x1][this.blockIndex.y2]) {
                this.addBrokenBlock(this.blockIndex.x1, this.blockIndex.y2, 180)
            }
        }

        // vertical block control
        if(this.route.y < 0) {  // go up
            if(mapGrid[this.blockIndex.x1][this.blockIndex.y1]) {
                this.addBrokenBlock(this.blockIndex.x1, this.blockIndex.y1, 90)
            }
            if(mapGrid[this.blockIndex.x2][this.blockIndex.y1]) {
                this.addBrokenBlock(this.blockIndex.x2, this.blockIndex.y1, 90)
            }
        } else if (this.route.y > 0) {  // go down
            if(mapGrid[this.blockIndex.x1][this.blockIndex.y2]) {
                this.addBrokenBlock(this.blockIndex.x1, this.blockIndex.y2, 90)
            }
            if(mapGrid[this.blockIndex.x2][this.blockIndex.y2]) {
                this.addBrokenBlock(this.blockIndex.x2, this.blockIndex.y2, 90)
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
            //this.stop()   // SONRA SİLİNECEK
            console.log(this.brokenBlock)  // BU DA !
        } else if(this.brokenBlock.length == 2 &&                           // ## ## --> there are 2 blocks , * is a ball
            this.brokenBlock[0].degree == this.brokenBlock[1].degree){      //   *
            mapGrid[this.brokenBlock[0].x][this.brokenBlock[0].y].explode()
            mapGrid[this.brokenBlock[1].x][this.brokenBlock[1].y].explode()
            this.setAngle(this.brokenBlock[0].degree * 2 - this.angle)
        } else if(this.brokenBlock.length == 2) {                           // ##     --> there are 2 blocks but they don't have
                                                                           //  * ##                           same degree
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
                mapGrid[this.brokenBlock[1].x][this.brokenBlock[1].y].explode()
                if(this.route.x > 0) {
                    degree = 205
                }
                this.setAngle(degree * 2 - this.angle)
            }
        } else if(this.brokenBlock.length == 1) {                       // only a block
            mapGrid[this.brokenBlock[0].x][this.brokenBlock[0].y].explode()
            if(this.blockIndex.x1 == this.blockIndex.x2 &&          //          *   // the ball is over the block
               this.blockIndex.y1 != this.blockIndex.y2) {          //         ###
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
            //this.setAngle(this.brokenBlock[0].degree * 2 - this.angle)
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
    addBrokenBlock(x, y, degree) {
        var bulundu = false
        for(var i=0;i<this.brokenBlock.length;i++) {
            if(this.brokenBlock[i].x == x && this.brokenBlock[i].y == y) {
            bulundu = true
            break
            }
        }
        if(!bulundu) {
            this.brokenBlock.push({x: x, y: y, degree: degree})
        }
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
        /*
        // now only horizontal and vertical not cross stick
        if(this.x1 == this.x2) {    // vertical
            for(var i = 0; i< Math.abs(this.y2 - this.y1) ; i++) {
                this.assets.push([this.x1 , this.y1 + i])
            }
        } else if (this.y1 == this.y2) {       // horizontal
            for(var i = 0; i< Math.abs(this.x2 - this.x1) ; i++) {
                this.assets.push([this.x1 + i, this.y1])
            }
        } else {        //  cross but not supported now

        } */
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
        console.log("Boom")
        blockList[this.indexInBlockList] = null
        mapGrid[this.index.x][this.index.y] = null
        numberOfUnbrokenBlocks--
        controlForFinish()
    }
}

// other function

function getSin(degree) { return parseFloat( Math.sin(Math.PI * degree / 180).toFixed(3) ) }
function getCos(degree) { return parseFloat( Math.cos(Math.PI * degree / 180).toFixed(3) ) }

function controlForFinish() {
    if(!numberOfUnbrokenBlocks) {
        console.log("new game!!")
        alert("bölüm geçildi looo")
    }
}

function controlForStick() {
    if(!numberOfStick) {
        console.log("game over")
    }
}


// default
let topStick = new Stick(10, 10, 390, 10, "grey") 
let leftStick = new Stick(10, 10, 10, 590, "grey") 
let rightStick = new Stick(390, 10, 390, 590, "grey") 


let mapPattern = [{xInd:0,yInd: 0, color:"red"},
                    {xInd:1,yInd: 1, color:"purple"},
                    {xInd:2,yInd: 2, color:"yellow"},
                    {xInd:3,yInd: 3, color:"fuchsia"},
                    {xInd:4,yInd: 4, color:"black"},
                    {xInd:4,yInd: 3, color:"white"},
                    {xInd:5,yInd: 5, color:"orange"}]  // for example

// creating of blocks
for (var i = 0 ; i < mapPattern.length; i++) {
    new Block(mapPattern[i].xInd, mapPattern[i].yInd, mapPattern[i].color)
}

// for animate
window.requestAnimationFrame(gameLoop)

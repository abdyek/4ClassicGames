
// canvas
canvas = document.getElementById("canvas")
context = canvas.getContext("2d")

canvas.width = 400
canvas.height = 600

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
            var min = (limitList.right[this.blockIndex.y1] <
                    limitList.right[this.blockIndex.y2]) ? 
                    this.blockIndex.y1 : this.blockIndex.y2
            if(this.coordinate.x + 10 > limitList.right[min] &&
                this.coordinate.x < limitList.right[min]) {
                this.setAngle(180 - this.angle)
            }

            // control
        } else if (this.route.x < 0) {  // go left
            var max = (limitList.left[this.blockIndex.y1] >
                    limitList.left[this.blockIndex.y2]) ? 
                    this.blockIndex.y1 : this.blockIndex.y2
            if(this.coordinate.x < limitList.left[max] &&
                this.coordinate.x + 10 > limitList.left[max]) {
                this.setAngle(180 - this.angle)
            }
        }

        // vertical block control
        if(this.route.y < 0) {  // go up
            var max = (limitList.up[this.blockIndex.x1] >
                    limitList.up[this.blockIndex.x2]) ? 
                    this.blockIndex.x1 : this.blockIndex.x2
            if(this.coordinate.y < limitList.up[max] &&
                this.coordinate.y + 10 > limitList.up[max]) {
                this.setAngle(360 - this.angle)
            }
        } else if (this.route.y > 0) {  // go down
            var min = (limitList.up[this.blockIndex.x1] <
                    limitList.up[this.blockIndex.x2]) ? 
                    this.blockIndex.x1 : this.blockIndex.x2
            if(this.coordinate.y + 10 > limitList.down[min] &&
                this.coordinate.y < limitList.down[min]) {
                this.setAngle(360 - this.angle)
            }
        }
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
        blockList.push(this)
        this.index = {x:xInd, y:yInd}
        this.color = color
    }
    draw() {
        drawRectangle(13 + this.index.x*20, 13 + this.index.y*11, 19, 10, this.color)
    }
}

// other function

function getSin(degree) { return parseFloat( Math.sin(Math.PI * degree / 180).toFixed(3) ) }
function getCos(degree) { return parseFloat( Math.cos(Math.PI * degree / 180).toFixed(3) ) }

// default
let topStick = new Stick(10, 10, 390, 10, "grey") 
let leftStick = new Stick(10, 10, 10, 590, "grey") 
let rightStick = new Stick(390, 10, 390, 590, "grey") 


let mapPattern = [{xInd:0,yInd: 0, color:"red"},
                    {xInd:1,yInd: 1, color:"purple"},
                    {xInd:2,yInd: 2, color:"yellow"},
                    {xInd:3,yInd: 3, color:"fuchsia"},
                    {xInd:4,yInd: 4, color:"black"},
                    {xInd:5,yInd: 5, color:"orange"}]  // for example

// creating of blocks
for (var i = 0 ; i < mapPattern.length; i++) {
    new Block(mapPattern[i].xInd, mapPattern[i].yInd, mapPattern[i].color)
}

// for animate
window.requestAnimationFrame(gameLoop)

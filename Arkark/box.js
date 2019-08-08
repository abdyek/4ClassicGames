
let colorOfBoxes = {
    narrowMovableStick: "#a1636a",
    expandMovableStick: "#e38c95",
    speedUp: "#00ff00",
    speedDown: "#008f00",
    killBall: "#222",
    superBall: "#ffd700"
}


class Box {
    constructor(x,y, func) {
        this.func = func
        this.width = 10
        this.height = 10
        this.x1 = x
        this.y1 = y
        this.x2 = x + this.width
        this.y2 = y + this.height
        this.color = colorOfBoxes[func.name]
        this.speed = 1
        this.indexInBoxList = boxList.length
        boxList[this.indexInBoxList] = this
    }
    draw() {
        drawRectangle(this.x1, this.y1, this.width, this.height, this.color)
        this.fall()
    }
    fall() {
        this.y1 += this.speed
        this.y2 = this.y1 + this.height   // must be updated for vertical control
        if(this.y1 + this.height > 550) {
            this.removeInBoxList()
        } else if(this.y2 > 500 && this.y1 < 503) {  // vertical control (3 is height of movableStick)
            if((this.x2 > movableStick.x1 && this.x2 < movableStick.x2) || (this.x1 > movableStick.x1 && this.x1 < movableStick.x2)) {  // horizontal control
                this.func()
                this.removeInBoxList()
            }
        }
    }
    removeInBoxList() {
        boxList[this.indexInBoxList] = null
    }
}

function clearBoxList() {
    for (var i = 0; i<boxList.length; i++) {
        boxList[i] = null
    }
}

function speedOfBoxes(speed) {
    for (var i = 0; i<boxList.length; i++) {
        if(boxList[i]) {
            boxList[i].speed = speed
        }
    }
}

// all functions
function narrowMovableStick() {
    if(movableStick.width > 25) {
        movableStick.width -= 10   // I didn't control this
    }
}

function expandMovableStick() {
    if(movableStick.width < 115) {
        movableStick.width += 10   // I didn't control this
    }
}

function speedUp() {
    if(mainBall.speed<5) {
        mainBall.speed += 1
        mainBall.updateRoute()  // for update speed
    }
}

function speedDown() {
    if(mainBall.speed>1) {
        mainBall.speed -= 1
        mainBall.updateRoute() // for update speed
    }
}

function killBall() {
    playSound("negative")
    mainBall.reset()
}

function superBall(trueOrFalse=true) {
    for(var i = 0; i<ballList.length; i++) {
        ballList[i].superBall = trueOrFalse
    }
}


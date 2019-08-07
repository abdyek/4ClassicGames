
class Box {
    constructor(x,y,color,speed, text, func) {
        this.width = 20
        this.height = 20
        this.x1 = x
        this.y1 = y
        this.x2 = x + this.width
        this.y2 = y + this.height
        this.color = color
        this.speed = speed
        this.text = text
        this.indexInBoxList = boxList.length
        boxList[this.indexInBoxList] = this
        this.func = func
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

// all functions
function narrowMovableStick() {
    movableStick.width -= 10   // I didn't control this
}

function expandMovableStick() {
    movableStick.width += 10   // I didn't control this
}


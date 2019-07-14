
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
        drawCircle(this.coordinate.x, this.coordinate.y, 5, this.color)
        this.coordinate.x += this.route.x
        this.coordinate.y += this.route.y
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

class Stick {
    constructor(x1, y1, x2, y2) {
        this.angle = Math.atan2(y2 - y1, x2 - x1) * 180.0 / Math.PI;
    }
    draw() {
        drawStick(x1, y1, x2, y2, 3, "purple")
    }
}


// other function

function getSin(degree) { return parseFloat( Math.sin(Math.PI * degree / 180).toFixed(3) ) }
function getCos(degree) { return parseFloat( Math.cos(Math.PI * degree / 180).toFixed(3) ) }


// for animate
window.requestAnimationFrame(gameLoop)


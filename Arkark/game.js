
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

}


// for animate
window.requestAnimationFrame(gameLoop)


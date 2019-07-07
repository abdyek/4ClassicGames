let ballList = []  // ball list in the canvas

function gameLoop() {

    // clear
    context.clearRect(0,0,canvas.width, canvas.height)

    // draw
    drawCircle(10,10, 5, "red")

    for(var i = 0; i<ballList.length; i++) {
        ballList[i].draw()
    }

    window.requestAnimationFrame(gameLoop)
}

window.requestAnimationFrame(gameLoop)

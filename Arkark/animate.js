let ballList = []  // ball list in the canvas

function gameLoop() {

    // clear
    context.clearRect(0,0,canvas.width, canvas.height)

    // draw
    drawStick(40, 40, 60, 100, 3, "purple")    // exam

    drawCircle(10,10, 5, "red")                 // exam


    for(var i = 0; i<ballList.length; i++) {
        ballList[i].draw()
    }

    window.requestAnimationFrame(gameLoop)
}

window.requestAnimationFrame(gameLoop)

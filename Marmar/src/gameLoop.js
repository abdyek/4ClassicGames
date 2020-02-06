function gameLoop() {
    // I don't want to clear all pixel
    // clear
    context.clearRect(0,0, canvas.width, canvas.height)

    // drawing
    characterAnimate()
    keyDetect()
    gravity()
    //getCharGridIndex()
    refreshPointsPosition()
    //hitboxControl()
    hitboxesControl()
    rescueChar()
    goLeft()
    goRight()
    jump()
    draw()

    window.requestAnimationFrame(gameLoop)
}

window.onload = function() {
    window.requestAnimationFrame(gameLoop)
}
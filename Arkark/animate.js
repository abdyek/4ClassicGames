let ballList = []  // ball list in the canvas
let stickList = []
let blockList = [] // block index list

let mapGrid = new Array(20)
for (var i = 0 ; i < mapGrid.length; i++) {
    mapGrid[i] = new Array(30)
}

function gameLoop() {

    // clear
    context.clearRect(0,0,canvas.width, canvas.height)

    drawMain()
    drawBar()

    window.requestAnimationFrame(gameLoop)
}

window.onload = function() {
    window.requestAnimationFrame(gameLoop)
}

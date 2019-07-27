let ballList = []  // ball list in the canvas
let stickList = []
let blockList = [] // block index list

let mapGrid = new Array(20)
for (var i = 0 ; i < mapGrid.length; i++) {
    mapGrid[i] = new Array(30)
    for ( var j=0; j<mapGrid[i].length; j++) {
        mapGrid[i][j] = null
    }
}

function gameLoop() {

    // clear
    context.clearRect(0,0,canvas.width, canvas.height)

    for(var i = 0; i<ballList.length; i++) {
        ballList[i].draw()
    }

    for(var i = 0; i<stickList.length; i++) {
        stickList[i][0].draw()
    }

    for(var i = 0; i<blockList.length; i++) {
        if(blockList[i]) {
            blockList[i].draw()
        }
    }

    drawBoard()

    window.requestAnimationFrame(gameLoop)
}

window.requestAnimationFrame(gameLoop)

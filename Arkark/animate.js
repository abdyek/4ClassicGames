let ballList = []  // ball list in the canvas
let stickList = []
let blockList = [] // block index list
let limitList = {
    right: [],
    left: [],
    up: {"0": 13 + 11*1,
         "1": 13 + 11*2,
         "2": 13 + 11*3,
         "3": 13 + 11*4,
         "4": 13 + 11*5,
         "5": 13 + 11*6,
    },
    down: {
        "0": 13 + 11 * 0,
        "1": 13 + 11 * 1,
        "2": 13 + 11 * 2,
        "3": 13 + 11 * 3,
        "4": 13 + 11 * 4,
        "5": 13 + 11 * 5
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
        blockList[i].draw()
    }

    window.requestAnimationFrame(gameLoop)
}

window.requestAnimationFrame(gameLoop)


let currentGrid = new Array(14)
for (var i = 0; i < currentGrid.length; i++) {
    currentGrid[i] = new Array(27)
}

currentGrid = [[{x: 14, y: 3}, {x: 15, y:3}, {x:16, y:3}],
               [{x: 7, y: 0}, {x: 8, y:0}, {x:8, y:0}]]

function draw() {
    // draw environment
    for(var i = 0; i<currentGrid[0].length;i++) {
        for (var j = 0; j<currentGrid.length; j++) {
            drawCell(i, j, currentGrid[j][i].x, currentGrid[j][i].y)
        }
    }
    //drawCell(0,0, 8, 1)
    //context.drawImage(img,16*7, 16*0, 16, 16, 70, 500, 48, 48)
}




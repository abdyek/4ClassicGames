
let indY
let indX

// to create color popup
let popup = document.createElement("div")
popup.setAttribute("id", "colorPopup")
popup.setAttribute("onclick", "selectColor()")
//popup.setAttribute("onmousemove", "mouseMove(event)")
document.body.appendChild(popup)


for(var i=0; i<colors.length; i++) {
    var colorWrapper = document.createElement("div")
    colorWrapper.setAttribute("class", "colorWrapper")
    colorWrapper.style.backgroundColor = colors[i]
    document.getElementById("colorPopup").appendChild(colorWrapper)
}

popup.style.visibility = "hidden"

// get 

function startLevelGenerator() {
    drawMain = drawGrid
    drawBar = ()=> {}
    toClick = addBlock
}

function drawGrid() {
    // blocks
    for(var x = 0; x<19; x++) {
        for(var y = 0; y<29; y++) {
            if(mapGrid[x][y]) {     // mapGrid keeps colors for level generator
                drawRectangle(13 + x*20, 13 + y*11, 19, 10, mapGrid[x][y])
            }
        }
    }
    // horizontal
    for(var y = 0 ; y < 30; y++) {
        drawStick(12, 12 + y * 11, 393, 12 + y * 11, 1, "#aaa")
    }
    // vertical
    for(var x = 0; x<20; x++) {
        drawStick(12 + x * 20, 12, 12 + x * 20, 330, 1, "#aaa")
    }
}

function addBlock() {
    if(popup.style.visibility == "hidden") {
        popup.style.left = x + "px"
        popup.style.top = y + "px"
        indX = parseInt((x - ((window.innerWidth - canvas.width) / 2) - 13) / 20)
        indY = parseInt((y - 23) / 11)
        if(mapGrid[indX][indY]) {
            mapGrid[indX][indY] = null
        } else {
            popup.style.visibility = "visible"
        }
    } else if(popup.style.visibility == "visible") {
        popup.style.visibility = "hidden"
    }
}

function selectColor() {
    // select a color
    let distance = {x: 0 , y: 0}
    let selectedIndex = {x: 0, y:0}
    let indexOfColor;
    distance.x = (x - parseInt(popup.style.left) - 4)
    distance.y = (y - parseInt(popup.style.top) - 4)
    selectedIndex.x = parseInt(distance.x / 20)
    selectedIndex.y = parseInt(distance.y / 20)
    indexOfSelectedColor = selectedIndex.y * 5 + selectedIndex.x

    console.log("index of selected color-> " + indexOfSelectedColor + "\n X : " + indX + "\n Y : " + indY)

    mapGrid[indX][indY] = colors[indexOfSelectedColor]

    popup.style.visibility = "hidden"
}

function generate() {
    let output = ''
    output+= "levelNum: ["
    for(var x = 0; x<19; x++) {
        for(var y = 0; y<29; y++) {
            if(mapGrid[x][y]) {     // mapGrid keeps colors for level generator
                output+= "{xInd: "+ x + ", yInd: " + y + ", color: '" + mapGrid[x][y] + "'},"
            }
        }
    }
    output += "],"
    console.log(output)
}
let x
let y

// let browserZoomLevel = Math.round(window.devicePixelRatio * 100)
// I may use this to design for all zoom level

let selectedIndex = 0
let optionsWrapper = document.createElement("div")

let verticalCellNum = document.getElementById("verticalCellNum")
let horizontalCellNum = document.getElementById("horizontalCellNum") 
let hitboxSwitch = document.getElementById("hitboxSwitch")

let firstHorizontalCellNum
let lastHorizontalCellNum

let transparent = false
let mapsJsContent = "maps = {\n\t1: {\n\tlevel:1,\n\t\tgrid : {"

let toCopy = document.getElementById("toCopy")
let mapsText = new Array() // I will save text of all map to save it

let grid = new Array(25)
for (var i = 0; i<25; i++) {
    grid[i] = new Array(14)
}

hitboxSwitch.children[0].checked = false

addImagePicker()
addCellsNumber()

updateHorizontalCellNum()

function draw() {
    // horizontal
    for (var i = 1; i < 14; i++) {
        drawStick(0, 0+i*48, canvas.width, 0+i*48, 3, "#acacac")
    }
    // vertical
    for (var i = 1; i< 25; i++) {
        drawStick(0+i*48, 0, 0+i*48, canvas.height, 3, "#acacac")
    }
    for (var i = firstHorizontalCellNum; i<=lastHorizontalCellNum; i++) {
        for (var j = 0; j<14; j++) {
            if(grid[i][j]) {
                // drawing image
                drawCell(i-firstHorizontalCellNum, j, grid[i][j].imgX, grid[i][j].imgY)
                // drawing hitboxes
                if(transparent && grid[i][j].hitbox) {
                    drawRectangle(48*i-firstHorizontalCellNum*48, 48*j, 48, 48, "green");
                }
            }
        }
    }
    // opacity for show hitbox
    if(transparent) {
        context.globalAlpha = 0.5 
    } else {
        context.globalAlpha = 1
    }
}

function hitboxSwitcher() {
    if(hitboxSwitch.children[0].checked) {
        transparent = true
    } else {
        transparent = false
    }
}

function getCoor(e) {
    x = e.clientX
    y = e.clientY
}

function fill() {
    let colIndex = parseInt((x - (window.innerWidth - 1200)) / 48) + parseInt(horizontalCellNum.children[0].innerText) // 48 is height/width of the cell
    let rowIndex = parseInt(y / 48)
    let imgX = selectedIndex % 17
    let imgY = parseInt(selectedIndex / 17)
    if(grid[colIndex][rowIndex] && grid[colIndex][rowIndex].imgX == imgX && grid[colIndex][rowIndex].imgY == imgY) {
        // to delete
        grid[colIndex][rowIndex] = undefined
    } else {
        grid[colIndex][rowIndex] = {imgX: imgX, imgY: imgY, hitbox: hasItHitbox(imgX, imgY)}
    }

    console.log(colIndex + ", "+ rowIndex)
}

function addImagePicker() {

    optionsWrapper.setAttribute("id", "optionsWrapper")
    
    for (var i = 0; i<136; i++) {
        optionsWrapper.appendChild(addOption(i))
    }

    let imagePicker = document.getElementById("imagePicker")
    imagePicker.appendChild(optionsWrapper)
    document.body.appendChild(imagePicker)
}

function addOption(index) {
    let option = document.createElement("div")
    option.setAttribute("class", "option")
    option.setAttribute("onclick", "selectImage(" +index+ ")")
    return option
}

function selectImage(index) {
    console.log("selected image " + index)
    optionsWrapper.children[selectedIndex].setAttribute("id", "")
    optionsWrapper.children[index].setAttribute("id", "selected")
    selectedIndex = index
}

function addCellsNumber() {
    // vertical
    for (var i = 0; i<14; i++) {
        let number = document.createElement("div")
        number.setAttribute("class", "cellNumber cn-vertical")
        number.innerText = i
        verticalCellNum.appendChild(number)
    }
    // horizontal
    for ( var i = 0; i<25; i++) {
        let number = document.createElement("div")
        number.setAttribute("class", "cellNumber cn-horizontal")
        number.innerText = i
        horizontalCellNum.appendChild(number)
    }
}

function previousColumn() {
    if(horizontalCellNum.children[0].innerText != "0") {
        canvas.width -= 48;
        for (var i = 0; i<25; i++) {
            horizontalCellNum.children[i].innerText = parseInt(horizontalCellNum.children[i].innerText) - 1
        }
    }
    updateHorizontalCellNum()
}

function nextColumn() {
    canvas.width += 48;
    for (var i = 0; i<25; i++) {
        horizontalCellNum.children[i].innerText = parseInt(horizontalCellNum.children[i].innerText) + 1
    }
    updateHorizontalCellNum()
    if(lastHorizontalCellNum>=grid.length) {
    // I need to new column
        grid[lastHorizontalCellNum] = new Array(14)
    }
}

function updateHorizontalCellNum() {
    firstHorizontalCellNum = parseInt(horizontalCellNum.children[0].innerText)
    lastHorizontalCellNum = firstHorizontalCellNum + 24
}

function hasItHitbox(imgX, imgY) {
    if(7 <= imgX && imgX <= 13 && 0 <= imgY && imgY <= 3) {
        // imgX:11 , imgY:3 is exceptional so this doesn't have hitbox
        if(imgX == 11 && imgY == 3) {
            return false
        } else {
            return true
        }
    }
    return false
}

function loadMap(levelNum) {
    if(maps[levelNum]) {
        for (var i = 0; i<20; i++) {  // şimdilik 30 dedim sonra onu map'ten çekcem
            for(var j = 0; j<14; j++) {
                if(maps[levelNum].grid[i] && maps[levelNum].grid[i][j]) {
                    grid[i][j] = maps[levelNum].grid[i][j]
                }
            }
        }
    } else {
        return undefined
    }
}

function saveMaps() {   
    let written = false     //  example -> 3 : {
    for (var i = 0; i<20; i++) {  // şimdilik 30 dedim sonra onu map'ten çekcem
        if(grid[i]) {
            for(var j = 0; j<14; j++) {
                if(grid[i] && grid[i][j]) {
                    if(!written) {
                        mapsJsContent += "\n\t\t\t" + i + ": {"
                        written = true
                    }
                    //grid[i][j] = maps[levelNum].grid[i][j]
                    mapsJsContent += "\n\t\t\t\t" + j + ": {imgX:" + grid[i][j].imgX + ", imgY:" + grid[i][j].imgY + ", hitbox:" + grid[i][j].hitbox + "},"
                }
            }
            if(written) {
                mapsJsContent += "\n\t\t\t},"
            }
            written = false
        }
    }
    mapsJsContent += "\n\t\t}\n\t}\n}"
    toCopy.value = mapsJsContent
    copyText()
}

function copyText() {
    toCopy.select()
    document.execCommand("copy")
}

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
let mapsJsContent = ""
let savedGrid = false
let mapSelectOption = document.getElementById("mapSelectOption")
let nextMapButton = document.getElementById("nextMapButton")

let toCopy = document.getElementById("toCopy")
let mapsBuffer = new Array() // I will save text of all map
let saveMapsButton = document.getElementById("saveMapsButton")
let lastOpenedMap

let grid = new Array(25)
for (var i = 0; i<25; i++) {
    grid[i] = new Array(14)
}

hitboxSwitch.children[1].checked = false

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
    if(hitboxSwitch.children[1].checked) {
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
    if(savedGrid) {
        saveMapsButton.innerText = "Copy to clipboard"
        savedGrid = false
    }
    //console.log(colIndex + ", " + rowIndex)
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

function previousMap() {
    if(mapSelectOption.selectedIndex!=0)  {
        mapSelectOption.selectedIndex--
        saveMap(lastOpenedMap)
        loadMap(mapSelectOption.selectedOptions[0].innerText)
        selectMap()
    }
}

function nextMap() {
    if(mapSelectOption.selectedIndex + 1 != mapSelectOption.children.length) {
        mapSelectOption.selectedIndex++
        saveMap(lastOpenedMap)
        loadMap(mapSelectOption.selectedOptions[0].innerText)
        loadMap(mapSelectOption.selectedOptions[0].innerText)
        selectMap()
    } else {
        newMap()
    }
    selectMap()
    //checkNextMapIcon()
}

function newMap() {
    let newOption = document.createElement("option")
    mapNum = newOption.innerHTML = mapSelectOption.length + 1
    mapSelectOption.appendChild(newOption)
    mapSelectOption.selectedIndex = mapSelectOption.length - 1
    maps[mapNum] = new Object()
    maps[mapNum]["grid"] = new Object()
    saveMap(lastOpenedMap)
    loadMap(mapNum)
}

function selectMap() {
    // to select map
    saveMap(lastOpenedMap)
    loadMap(mapSelectOption.selectedOptions[0].innerText)
    checkNextMapIcon()
}

function checkNextMapIcon() {
    if(mapSelectOption.selectedIndex+1 == mapSelectOption.length) {
        nextMapButton.innerHTML = "+"
    } else {
        nextMapButton.innerHTML = ">"
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
    lastOpenedMap = levelNum
    clearGrid()
    let keysArr = Object.keys(maps[levelNum].grid)
    let last = keysArr[keysArr.length-1]
    expandGrid(last)
    for (var i = 0; i <= last; i++) {
        for (var j = 0; j < 14; j++) {
            if (maps[levelNum].grid[i] && maps[levelNum].grid[i][j]) {
                grid[i][j] = maps[levelNum].grid[i][j]
            }
        }
    }
    return undefined
}

function saveMaps() {
    mapsJsContent = "maps = {\n\t1: {\n\t\tlevel:1,\n\t\tgrid : {"
    let written = false     //  example -> 3 : {
    for (var i = 0; i < grid.length; i++) {
        if (grid[i]) {
            for (var j = 0; j < 14; j++) {
                if (grid[i] && grid[i][j]) {
                    if (!written) {
                        mapsJsContent += "\n\t\t\t" + i + ": {"
                        written = true
                    }
                    //grid[i][j] = maps[levelNum].grid[i][j]
                    mapsJsContent += "\n\t\t\t\t" + j + ": {imgX:" + grid[i][j].imgX + ", imgY:" + grid[i][j].imgY + ", hitbox:" + grid[i][j].hitbox + "},"
                }
            }
            if (written) {
                mapsJsContent += "\n\t\t\t},"
            }
            written = false
        }
    }
    mapsJsContent += "\n\t\t},\n\t}\n}"
    toCopy.value = mapsJsContent
    copyText()
    savedGrid = true
    mapsJsContent = ""
}

function saveMap(mapNum) {
    for (var i = 0; i <= grid.length; i++) {
        for (var j = 0; j < 14; j++) {
            if (grid[i] && grid[i][j]) {
                if(!maps[mapNum].grid[i]) {
                    maps[mapNum].grid[i] = new Array(14)
                }
                maps[mapNum].grid[i][j] = grid[i][j]
            }
        }
    }
}

function copyText() {
    toCopy.select()
    document.execCommand("copy")
    saveMapsButton.innerText = "Copied"
}

function expandGrid(maxColumn) {
    if(maxColumn>grid.length) {
        for (var i=grid.length;i<=maxColumn; i++) {
            grid[i] = new Array(14)
        }
    }
}

function clearGrid() {
    for (var i = 0; i<grid.length; i++) {
        for(var j = 0; j<14; j++) {
            grid[i][j] = undefined
        }
    }    
}


// to load map 1
if(maps[1]) {
    loadMap(1)
    mapSelectOption.selectedIndex = 0
}
// selectImage
selectImage(0)
// check icon
checkNextMapIcon()
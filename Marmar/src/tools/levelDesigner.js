let x
let y

// let browserZoomLevel = Math.round(window.devicePixelRatio * 100)
// I may use this to design for all zoom level

let selectedIndex = 0
let optionsWrapper = document.createElement("div")

let verticalCellNum = document.getElementById("verticalCellNum")
let horizontalCellNum = document.getElementById("horizontalCellNum")

addImagePicker()
addCellsNumber()

function draw() {
    // horizontal
    for (var i = 1; i < 14; i++) {
        drawStick(0, 0+i*48, canvas.width, 0+i*48, 3, "#acacac")
    }
    // vertical
    for (var i = 1; i< 25; i++) {
        drawStick(0+i*48, 0, 0+i*48, canvas.height, 3, "#acacac")
    }
}

function getCoor(e) {
    x = e.clientX
    y = e.clientY
}

function fill() {
    let colIndex = parseInt((x - (window.innerWidth - 1200)) / 48) + parseInt(horizontalCellNum.children[0].innerText) // 48 is height/width of the cell
    let rowIndex = parseInt(y / 48)
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
}

function nextColumn() {
    canvas.width += 48;
    for (var i = 0; i<25; i++) {
        horizontalCellNum.children[i].innerText = parseInt(horizontalCellNum.children[i].innerText) + 1
    }
}

let x
let y

// let browserZoomLevel = Math.round(window.devicePixelRatio * 100)
// I may use this to design for all zoom level

let selectedIndex = 0
let optionsWrapper = document.createElement("div")

function startLevelDesign() {
    document.body.setAttribute("onmousemove", "getCoor(event)")
    canvas.setAttribute("onclick", "fill()")
    canvas.setAttribute("style", "float:right;")

    // 
    addImagePicker()

    //onmousemove="getCoor(event)"
    draw = function() {
        // horizontal
        for (var i = 1; i < 14; i++) {
            drawStick(0, 0+i*48, canvas.width, 0+i*48, 3, "#acacac")
        }
        // vertical
        for (var i = 1; i< 25; i++) {
            drawStick(0+i*48, 0, 0+i*48, canvas.height, 3, "#acacac")
        }
    }
}

function getCoor(e) {
    x = e.clientX
    y = e.clientY
}

function fill() {
    let colIndex = parseInt((x - (window.innerWidth - canvas.width)) / 48)  // 48 is height/width of the cell
    let rowIndex = parseInt(y / 48)
    console.log(colIndex + ", "+ rowIndex)
    //console.log(x + ", "+ y)
}

function addImagePicker() {
    let picker = document.createElement("div")
    picker.setAttribute("id", "imagePicker")

    // sheet in drawing.js
    sheet.setAttribute("width", "816")
    picker.appendChild(sheet)

    optionsWrapper.setAttribute("id", "optionsWrapper")
    
    for (var i = 0; i<136; i++) {
        optionsWrapper.appendChild(addOption(i))
    }

    picker.appendChild(optionsWrapper)
    document.body.appendChild(picker)
}

function addOption(index) {
    let option = document.createElement("div")
    option.setAttribute("class", "option")
    option.setAttribute("onclick", "selectImage(" +index+ ")")
    return option
}

function selectImage(index) {
    console.log("seçilen image " + index)
    optionsWrapper.children[selectedIndex].setAttribute("id", "")
    optionsWrapper.children[index].setAttribute("id", "selected")
    selectedIndex = index
}

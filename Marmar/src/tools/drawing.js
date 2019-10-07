function drawCell(x, y, imgX, imgY) {
    context.drawImage(sheet, 16*imgX, 16*imgY, 16, 16, 48*x, 48*y, 48, 48)
}

function drawStick (x1, y1, x2, y2, width, color) {
    context.beginPath()
    context.moveTo(x1, y1)
    context.lineTo(x2, y2)
    context.lineWidth = width
    context.strokeStyle = color
    context.stroke();
}

var drawRectangle = function (x, y, width, height, color) {
    context.beginPath();
    context.moveTo(x, y+(height/2));
    context.lineTo(x+width, y+(height/2));
    context.lineWidth = height;
    context.strokeStyle = color;
    context.stroke();
}

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

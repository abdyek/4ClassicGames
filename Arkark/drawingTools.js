var drawCircle = function (x,y, radius, color) {
    context.beginPath()
    context.arc(x+radius,y+radius,radius, 0, 2 * Math.PI, false)
    context.fillStyle = color
    context.fill()
}

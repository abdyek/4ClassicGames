let charactersImg = new Image()
charactersImg.src = "assets/images/characters.png"


let currentFrame = 0
let counter = 0

function characterAnimate() {
    if(char.walkAnimate) {
        frameFrequency(40, 10)  // now only walk, I will change it
    }
    /*
    if(char.fall) {
        char.coor.y += 5
    }
    */
    context.drawImage(charactersImg, 0+32*(currentFrame+0), 0+32*char.type, 32, 32, char.coor.x,char.coor.y, 96, 96)
}


function frameFrequency(last, mod) {
    counter++
    if(counter==last) {
        currentFrame = 0
        counter = 0
    } else if(counter%mod==0) {
        currentFrame++
    }
}

function getCharGridIndex() {
    char.gridIndex.left.x = parseInt((char.coor.x + char.hitbox.start.x) / 48)
    char.gridIndex.right.x = parseInt((char.coor.x + 96 - char.hitbox.finish.x) / 48)
    char.gridIndex.top.y = parseInt((char.coor.y + char.hitbox.start.y)/ 48)
    char.gridIndex.bottom.y = parseInt((char.coor.y + 96 - char.hitbox.finish.y) / 48)
}


function refreshPointsPosition() {
    char.points.topLeft.x = char.coor.x + char.hitbox.start.x
    char.points.topLeft.y = char.coor.y + char.hitbox.start.y
    char.points.topRight.x = char.coor.x + 96 - char.hitbox.finish.x
    char.points.topRight.y = char.coor.y + char.hitbox.start.y
    char.points.bottomLeft.x = char.coor.x + char.hitbox.start.x
    char.points.bottomLeft.y = char.coor.y + 96 - char.hitbox.finish.y
    char.points.bottomRight.x = char.coor.x + 96 - char.hitbox.finish.x
    char.points.bottomRight.y = char.coor.y + 96 - char.hitbox.finish.y
    /*
    char.points.leftMiddle.x = char.coor.x + char.hitbox.start.x
    char.points.leftMiddle.y = char.coor.y + char.hitbox.start.y + 48
    char.points.rightMiddle.x = char.coor.x + 96 - char.hitbox.finish.x
    char.points.rightMiddle.y = char.coor.y + 48 - char.hitbox.finish.y
    maybe I need these
    */
    // hepsi 96 olmayacak bunu sonradan düzelticem
}

// multi keyboard  -> https://stackoverflow.com/questions/5203407/how-to-detect-if-multiple-keys-are-pressed-at-once-using-javascript
var keyList = {}; // You could also use an array
onkeydown = onkeyup = function(e){
    keyList[e.keyCode] = e.type == 'keydown';
}


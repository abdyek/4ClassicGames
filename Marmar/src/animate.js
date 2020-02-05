let charactersImg = new Image()
charactersImg.src = "assets/images/characters.png"

let hitboxes = new Array(672);
for(var i=0;i<hitboxes.length; i++) {
    hitboxes[i] = new Array(1200);
}

let currentFrame = 0
let counter = 0
let char = {
    coor: {
        x: 3,
        y: 3
    },
    hitbox: {
        start: {
            x: 28,
            y: 36,
        },
        finish: {
            x: 28,
            y:0
        }
    },
    gridIndex: {    // to control of hitboxes
        left:{
            x:0
        },
        right: {
            x:0
        },
        top: {
            y:0
        },
        bottom: {
            y:0
        }
    },
    points: {
        topLeft:{
            x:0,
            y:0
        },
        topRight: {
            x:0,
            y:0
        },
        bottomLeft: {
            x:0,
            y:0
        },
        bottomRight: {
            x:0,
            y:0
        },
    },
    type:1,  // 0, 1, 2
    walkAnimate: false,
    floor: false,
    wall: {
        left: false,
        right: false
    },
    permission: { 
        clickedLeftButton: false,
        clickedRightButton: false,
        goingLeft: false,
        goingRight: false,
    }
    

}

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

function keyDetect() {
    if(keyList[65]) {
        if(!char.clickedLeftButton) {
            // sola git
            char.clickedLeftButton = true
            char.goingLeft = true
        }
    } else {
        char.clickedLeftButton = false
        char.goingLeft = false
    }
    if(keyList[68]) {
        if(!char.clickedRightButton) {
            // sağa git
            char.clickedRightButton = true
            char.goingRight = true
        }
    } else {
        char.clickedRightButton = false
        char.goingRight = false
    }
    // walk animate control
    if((keyList[65] || keyList[68])) {
        char.walkAnimate = true
    } else {
        char.walkAnimate = false
    }
    if(keyList[87]) {
        console.log("jump!")
    }
    if(keyList[74]) {
        char.type = 0
    }
    if(keyList[75]) {
        char.type = 1
    }
    if(keyList[76]) {
        char.type = 2
    }
}

function gravity() {
    if(!char.floor) {
        char.coor.y += 4
    } else {
        //char.coor.y -= 5
    }
}

function goLeft() {
    if(char.goingLeft && char.wall.left == false) {
        // doğru çalışıyor sadece yere inince çakılma oluyor onu düzeltmem gerekiyor
        if((grid[char.gridIndex.left.x] && grid[char.gridIndex.left.x][char.gridIndex.top.y] && grid[char.gridIndex.left.x][char.gridIndex.top.y].hitbox) || (grid[char.gridIndex.left.x] && grid[char.gridIndex.left.x][char.gridIndex.bottom.y] && grid[char.gridIndex.left.x][char.gridIndex.bottom.y].hitbox)) {
            char.goingLeft = false
        } else {
            char.coor.x -= 4
        }
    }
}

function goRight() {
    if(char.goingRight && char.wall.right == false) {
        char.coor.x += 4
    }
}

function prepareHitboxes() {
    let block = {
        x:0,
        y:0
    }
    for(var y=0; y<672; y++) {
        for(var x=0; x<1200; x++) {
            block.x = parseInt(x/48)
            block.y = parseInt(y/48)
            if(maps[1]['grid'][block.x] != undefined && maps[1]['grid'][block.x][block.y] != undefined) {
                if(maps[1]['grid'][block.x][block.y]['hitbox']) {
                    hitboxes[y][x] = true
                } else {
                    hitboxes[y][x] = false
                }
            } else {
                hitboxes[y][x] = false
            }
        }
    }
}

function hitboxControl() {
    // floor control
    /*
    if((grid[char.gridIndex.left.x] && grid[char.gridIndex.left.x][char.gridIndex.bottom.y] && grid[char.gridIndex.left.x][char.gridIndex.bottom.y].hitbox) ||
    (grid[char.gridIndex.right.x] && grid[char.gridIndex.right.x][char.gridIndex.bottom.y] && grid[char.gridIndex.right.x][char.gridIndex.bottom.y].hitbox)) {
        if(char.coor.y + 96 - char.hitbox.finish.y > (char.gridIndex.bottom.y + 1) * 48 - 5) {
            char.floor = true
        }
    } else {
        char.floor = false
    }
    */
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
    // hepsi 96 olmayacak bunu sonradan düzelticem
}

// multi keyboard  -> https://stackoverflow.com/questions/5203407/how-to-detect-if-multiple-keys-are-pressed-at-once-using-javascript
var keyList = {}; // You could also use an array
onkeydown = onkeyup = function(e){
    keyList[e.keyCode] = e.type == 'keydown';
}


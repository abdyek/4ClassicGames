let charactersImg = new Image()
charactersImg.src = "assets/images/characters.png"

let currentFrame = 0
let counter = 0
let char = {
    coor: {
        x: 0,
        y: 0
    },
    hitbox: {
        start: {
            x: 30,
            y: 36,
        },
        finish: {
            x: 30,
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
    type:1,  // 0, 1, 2
    walkAnimate: false,
    floor: false,
    

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
        char.coor.x -= 4
    }
    if(keyList[68]) {
        char.coor.x += 4
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
        char.coor.y += 5
    }
}

function hitboxControl() {
    // floor control
    if((grid[char.gridIndex.left.x] && grid[char.gridIndex.left.x][char.gridIndex.bottom.y] && grid[char.gridIndex.left.x][char.gridIndex.bottom.y].hitbox) ||
    (grid[char.gridIndex.right.x] && grid[char.gridIndex.right.x][char.gridIndex.bottom.y] && grid[char.gridIndex.right.x][char.gridIndex.bottom.y].hitbox)) {
        char.floor = true
    } else {
        char.floor = false
    }
}

function getCharGridIndex() {
    char.gridIndex.left.x = parseInt((char.coor.x + char.hitbox.start.x) / 48)
    char.gridIndex.right.x = parseInt((char.coor.x + 96 - char.hitbox.finish.x) / 48)
    char.gridIndex.top.y = parseInt((char.coor.y + char.hitbox.start.y)/ 48)
    char.gridIndex.bottom.y = parseInt((char.coor.y + 96 - char.hitbox.finish.y) / 48)
}


// multi keyboard  -> https://stackoverflow.com/questions/5203407/how-to-detect-if-multiple-keys-are-pressed-at-once-using-javascript
var keyList = {}; // You could also use an array
onkeydown = onkeyup = function(e){
    keyList[e.keyCode] = e.type == 'keydown';
}


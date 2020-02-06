let char = {
    coor: {
        x: 0,
        y: 0
    },
    hitbox: {
        start: {
            x: 32,
            y: 36,
        },
        finish: {
            x: 32,
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
        /*
        leftMiddle: {
            x:0,
            y:0
        },
        rightMiddle: {
            x:0,
            y:0
        }
        */
    },
    type:1,  // 0, 1, 2
    walkAnimate: false,
    floor: false,
    speed: 4,
    wall: {
        left: false,
        right: false
    },
    jump:false,
    permission: { 
        clickedLeftButton: false,
        clickedRightButton: false,
        goingLeft: true,
        goingRight: false,
        clickableJump: true
    }

}

function goLeft() {
    if(char.permission.goingLeft && char.wall.left == false) {
        char.coor.x -= char.speed
    }
}

function goRight() {
    if(char.permission.goingRight && char.wall.right == false) {
        char.coor.x += char.speed
    }
}

function jump() {
    if(char.jump) {
        char.coor.y -= 12
    }
}
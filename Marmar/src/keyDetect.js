function keyDetect() {
    if(keyList[65]) {
        if(!char.permission.clickedLeftButton) {
            // sola git
            char.permission.clickedLeftButton = true
            char.permission.goingLeft = true
        }
    } else {
        char.permission.clickedLeftButton = false
        char.permission.goingLeft = false
    }
    if(keyList[68]) {
        if(!char.permission.clickedRightButton) {
            // sağa git
            char.permission.clickedRightButton = true
            char.permission.goingRight = true
        }
    } else {
        char.permission.clickedRightButton = false
        char.permission.goingRight = false
    }
    // walk animate control
    if((keyList[65] || keyList[68])) {
        char.walkAnimate = true
    } else {
        char.walkAnimate = false
    }
    if(keyList[87]) {
        if(char.permission.clickableJump) {
            char.jump = true
            char.speed = 6
            char.permission.clickableJump = false
            setTimeout(() => {
                char.speed = 4
                char.jump = false
            }, 350);
        }
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
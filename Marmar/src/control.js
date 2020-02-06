let hitboxes = new Array(672);
for(var i=0;i<hitboxes.length; i++) {
    hitboxes[i] = new Array(1200);
}
prepareHitboxes()

function hitboxesControl() {
    // floor
    if (hitboxes[char.points.bottomRight.y+1][char.points.bottomRight.x] || hitboxes[char.points.bottomLeft.y+1][char.points.bottomLeft.x]) {
        char.floor = true
    } else {
        char.floor = false
    }
    // wall control
    // right
    if (hitboxes[char.points.bottomRight.y][char.points.bottomRight.x+1] ||
        hitboxes[char.points.topRight.y][char.points.topRight.x+1]) {
        char.wall.right = true
    } else {
        char.wall.right = false
    }
    // left
    if (hitboxes[char.points.bottomLeft.y][char.points.bottomLeft.x-5] ||
        hitboxes[char.points.topLeft.y][char.points.topLeft.x-5]) {
        char.wall.left = true
    } else {
        char.wall.left = false
    }
    // top
    if (hitboxes[char.points.topRight.y-1][char.points.topRight.x] || hitboxes[char.points.topLeft.y-1][char.points.topLeft.x]) {
        char.jump = false
    }

}

function rescueChar() { // rescue char to go under
    
    if(hitboxes[char.points.bottomRight.y][char.points.bottomRight.x] && hitboxes[char.points.bottomLeft.y][char.points.bottomLeft.x]) {
        char.coor.y--
    } else if(hitboxes[char.points.bottomRight.y][char.points.bottomRight.x] && hitboxes[char.points.bottomLeft.y][char.points.bottomLeft.x]==false) {
        char.coor.x--
    } else if(hitboxes[char.points.bottomRight.y][char.points.bottomRight.x]==false && hitboxes[char.points.bottomLeft.y][char.points.bottomLeft.x]) {
        char.coor.x++
    }
    if (hitboxes[char.points.topRight.y][char.points.topRight.x] || hitboxes[char.points.topLeft.y][char.points.topLeft.x]) {
        char.jump = false
    } if(hitboxes[char.points.topRight.y][char.points.topRight.x] && hitboxes[char.points.topLeft.y][char.points.topLeft.x]==false) {
        char.coor.x--
    } else if(hitboxes[char.points.topRight.y][char.points.topRight.x]==false && hitboxes[char.points.topLeft.y][char.points.topLeft.x]) {
        char.coor.x++
    }

}

function gravity() {
    if(!char.floor) {
        char.coor.y += 6
        char.permission.clickableJump = false
    } else {
        char.permission.clickableJump = true
        //char.coor.y -= 5
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
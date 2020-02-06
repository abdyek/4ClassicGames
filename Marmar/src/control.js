prepareHitboxes()
function hitboxesControl() {
    // floor
    if (hitboxes[char.points.bottomRight.y+1][char.points.bottomRight.x] || hitboxes[char.points.bottomLeft.y+1][char.points.bottomLeft.x]) {
        char.floor = true
        /* bu kısmı rescueChar fonksiyonunda kullanıcam
        if(hitboxes[char.points.bottomRight.y][char.points.bottomRight.x] || hitboxes[char.points.bottomLeft.y][char.points.bottomLeft.x]) {
            char.coor.y--
        }
        */
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
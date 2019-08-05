let sounds = {
    "gameOver": "sound/gameOver.wav",       // https://freesound.org/people/myfox14/sounds/382310/
    "click" : "sound/click.mp3",            // https://freesound.org/people/cahen/sounds/191176/
    "blockCrush" : "sound/blockCrush.wav",   // https://freesound.org/people/InspectorJ/sounds/420877/
    "levelUp": "sound/levelUp.wav",          // https://freesound.org/people/qubodup/sounds/442943/
    "negative" : "sound/negative.wav",       // https://freesound.org/people/themusicalnomad/sounds/253886/

}


function playSound(name) {
    new Audio(sounds[name]).play()
}
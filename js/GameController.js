var totalScore = 0;
var enemies = [];
var difficulty = 1;
var totalTime = 0;
var gameOver = false;
var spawnCooldown = 0;
var lastSpawn = 0;

var updatePower = function() {
    if(mouseIsDown) {
        powerText = document.getElementById('power');
        var value = parseInt(powerText.innerHTML);
        currentTime = performance.now();
        var power = Math.ceil((currentTime - mouseDownTime) / 10);
        if(power <= 100) {
            powerText.innerHTML = power;
        }
    }
}

var spiderControllerUpdate = function() {
    var spawnrate = (totalTime / 360);
    difficulty = 1 + (totalTime / 360);
    const spawnCooldown = 10;
    const spawnpoints = [
        {x: 800, y: 0, z: 0},
        {x: -800, y: 0, z: 0},
        {x: 0, y: 0, z: 800},
        {x: 0, y: 0, z: -800}];

    lastSpawn += clock.getDelta()*100;
    if(lastSpawn > spawnCooldown) {
        var r = getRandomRange(0, 4);

        addSpider(
            spawnpoints[r].x,
            spawnpoints[r].y,
            spawnpoints[r].z);
        console.log(`spider spawned at ${spawnpoints[r].x}, ${spawnpoints[r].z}`);
        lastSpawn = 0;
    }
}

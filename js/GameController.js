var totalScore = 0;
var enemies = [];
var difficulty = 1;
var totalTime = 0;
var gameOver = false;
var spawnCooldown = 0;
var lastSpawn = 0;
var delta = 0;
const surviveTime = 10;

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
    var spawnrate = (totalTime / surviveTime);
    difficulty = 1 + (totalTime / surviveTime);
    const spawnCooldown = 10;
    const spawnpoints = [
        {x: 800, y: 0, z: 0},
        {x: -800, y: 0, z: 0},
        {x: 0, y: 0, z: 800},
        {x: 0, y: 0, z: -800}];

    lastSpawn += delta;
    if(lastSpawn > spawnCooldown / difficulty) {
        var r = getRandomRange(0, 4);

        addSpider(
            spawnpoints[r].x,
            spawnpoints[r].y,
            spawnpoints[r].z);
        console.log(`spider spawned at ${spawnpoints[r].x}, ${spawnpoints[r].z}`);
        console.log(spawnCooldown / difficulty);
        lastSpawn = 0;
    }
}

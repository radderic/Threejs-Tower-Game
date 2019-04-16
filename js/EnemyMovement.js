var spiders = []

var moveSpiders = function(delta) {
    spiders.forEach(spider => {
        spider.model.translateZ(-delta * 30 * spider.difficulty);
        spider.collBox.translateZ(delta * 30 * spider.difficulty);

        spiderCollisionCheck(spider);
    });
}

var spiderCollisionCheck = function(spider) {
    if(spider.model.position.z > -160 &&
        spider.model.position.z < 96 &&
        spider.model.position.x > -104 &&
        spider.model.position.x < 120) {
        gameOver = true;
        //display game over
        var go = document.getElementById('gameover');
        go.style.display = "block";
    }

}


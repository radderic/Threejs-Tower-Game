var arrows = []

var moveArrows = function(delta) {
    arrows.forEach(arrow => {
        arrow.model.translateZ(arrow.power*-300*delta);

        let removeDist = 1200;

        if(arrow.model.position.x > removeDist ||
            arrow.model.position.x < -removeDist ||
            arrow.model.position.y > removeDist ||
            arrow.model.position.y < -removeDist ||
            arrow.model.position.z > removeDist ||
            arrow.model.position.z < -removeDist) {
            scene.remove(arrow.model);
            let arrowIndex = arrows.indexOf(arrow);
            arrows.splice(arrowIndex, 1);
        }

        arrow.raycaster.ray.origin.copy(arrow.model.position);

        spiders.forEach( spider => {
            var inter = arrow.raycaster.intersectObject(spider.collBox);
            if(inter.length > 0) {
                let arrowIndex = arrows.indexOf(arrow);
                arrows.splice(arrowIndex, 1);
                scene.remove(arrow.model);
                spider.health -= arrow.power * 50;
                console.log(spider.health);
                if(spider.health <= 0) {
                    let spiderIndex = spiders.indexOf(spider);
                    spiders.splice(spiderIndex, 1);
                    scene.remove(spider.model);
                    scene.remove(spider.collBox);
                    score = document.getElementById('score');
                    totalScore += 100 * arrow.power;
                    score.innerHTML = Math.floor(totalScore);
                }
            }
        });
    });
}


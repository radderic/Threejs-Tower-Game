var arrows = []
var inter = []

var moveArrows = function(delta) {
    arrows.forEach(arrow => {
        arrow.model.translateZ(-300*delta);

        let removeDist = 1500;

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
        inter = arrow.raycaster.intersectObject(spider.collBox);
            if(inter.length > 0) {
                let arrowIndex = arrows.indexOf(arrow);
                arrows.splice(arrowIndex, 1);
                scene.remove(arrow.model);
                let spiderIndex = spiders.indexOf(spider);
                spiders.splice(spiderIndex, 1);
                scene.remove(spider.model);
                scene.remove(spider.collBox);
            }
        });
    });
}


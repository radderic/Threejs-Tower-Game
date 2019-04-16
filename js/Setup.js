//var camera, scene, renderer, controls;
var clock = new THREE.Clock();
var suppressMsg = new THREE.Vector3();
var floor;

var setup = function() {
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1000 );

    scene = new THREE.Scene();
    controls = new THREE.PointerLockControls( camera );
    //player starting position
    controls.getObject().position.y = 140;

    var blocker = document.getElementById( 'blocker' );
    var instructions = document.getElementById( 'instructions' );

    instructions.addEventListener( 'click', function () {

        controls.lock();

    }, false );

    controls.addEventListener( 'lock', function () {

        instructions.style.display = 'none';
        blocker.style.display = 'none';
        clock.start();

    } );

    controls.addEventListener( 'unlock', function () {

        blocker.style.display = 'block';
        instructions.style.display = '';
        clock.stop();

    } );

    scene.add( controls.getObject() );
}

var createEnv = function() {
    scene.background = new THREE.Color( 0x111111 );
    scene.fog = new THREE.Fog( 0x111111, 0, 600 );

    var light = new THREE.AmbientLight( 0xffffff, 2.0 );
    scene.add( light );

    var floorGeo = new THREE.PlaneBufferGeometry( 2000, 2000, 100, 100 );
    floorGeo.rotateX( - Math.PI / 2 );
    var floorMaterial = new THREE.MeshStandardMaterial( { color: 0x006600 } );
    floor = new THREE.Mesh( floorGeo, floorMaterial );
    scene.add( floor );

    var fort = model_fort.clone();
    fort.translateY(-50);
    fort.translateX(-140);
    fort.translateZ(-170);
    scene.add(fort);

    addTreeCluster(400, 0, 400);
    addTreeCluster(-400, 0, -400);
    addTreeCluster(400, 0, -400);
    addTreeCluster(-400, 0, 400);

    addMoon(200, 400, -800);
}

var addTree = function(x, y, z) {
    var tree = model_tree.clone();
    tree.position.set(x, y, z);
    scene.add(tree);
}

var addSpider = function(x, y, z) {
    var boxGeo = new THREE.CubeGeometry(50, 50, 80);
    var boxMat = new THREE.MeshStandardMaterial({color:0xff0000});
    var collisionBox = new THREE.Mesh(boxGeo, boxMat);

    collisionBox.material.visible = false;
    //offset to make the box fit better
    collisionBox.position.set(x, y+40, z);
    collisionBox.lookAt(0,20,0);
    scene.add(collisionBox);

    var spider = model_spider.clone();
    spider.position.set(x, y+20, z);
    spider.lookAt(0, 20, 0);
    spider.rotateY(Math.PI);

    scene.add(spider);
    var mixer = new THREE.AnimationMixer(spider);
    mixers.push(mixer);
    clips.forEach(clip => {
        action = mixer.clipAction(clip);
        action.play();
    });
    var s = { model: spider, collBox: collisionBox, health: 100, difficulty: difficulty };
    spiders.push(s);
}

var addTreeCluster = function(x, y, z) {
    addTree(x, y, z);
    addTree(x+100, y, z+100);
    addTree(x+100, y, z-100);
    addTree(x-100, y, z-100);
    addTree(x-100, y, z+100);
}

var addMoon = function(x, y, z) {
    var moonGeo = new THREE.SphereGeometry( 50, 20, 20 );
    var moonMat = new THREE.MeshBasicMaterial({color: 0xffffbb, fog: false});
    var moon = new THREE.Mesh( moonGeo, moonMat );
    moon.position.set(x, y, z);
    scene.add(moon);
}


function getRandomRange(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

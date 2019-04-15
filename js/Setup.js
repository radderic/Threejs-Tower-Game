//var camera, scene, renderer, controls;
var clock = new THREE.Clock();
var suppressMsg = new THREE.Vector3();

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

    var light = new THREE.AmbientLight( 0xffffff, 2.7 );
    scene.add( light );

    var floorGeo = new THREE.PlaneBufferGeometry( 2000, 2000, 100, 100 );
    floorGeo.rotateX( - Math.PI / 2 );
    var floorMaterial = new THREE.MeshStandardMaterial( { color: 0x006600 } );
    var floor = new THREE.Mesh( floorGeo, floorMaterial );
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

    addSpider(0, 0, 400);
    addSpider(0, 0, -400);
    addSpider(400, 0, 0);
    addSpider(-400, 0, 0);
}

var addTree = function(x, y, z) {
    var tree = model_tree.clone();
    tree.position.set(x, y, z);
    scene.add(tree);
}

var addSpider = function(x, y, z) {
    var boxGeo = new THREE.CubeGeometry(40, 50, 80);
    var boxMat = new THREE.MeshStandardMaterial({color:0xff0000});
    var collisionBox = new THREE.Mesh(boxGeo, boxMat);
    //collisionBox.material.visible = false;
    //offset to make the box fit better
    collisionBox.position.set(x, y+20, z+40);
    scene.add(collisionBox);

    var spider = model_spider.clone();
    spider.position.set(x, y, z);
    //spider.lookAt(0,0,0);
    scene.add(spider);
    var mixer = new THREE.AnimationMixer(spider);
    mixers.push(mixer);
    clips.forEach(clip => {
        action = mixer.clipAction(clip);
        action.play();
    });
    var s = { model: spider, collBox: collisionBox };
    spiders.push(s);
}

var addTreeCluster = function(x, y, z) {
    addTree(x, y, z);
    addTree(x+100, y, z+100);
    addTree(x+100, y, z-100);
    addTree(x-100, y, z-100);
    addTree(x-100, y, z+100);

}


var model_arrow, model_spider, model_fort, model_monkey, model_tree;
var clips;

var loadModels = function () {
    var loader = new THREE.GLTFLoader();

    loader.load(
        'gltf/spider.glb',
        function(gltf) {
            model_spider = gltf.scene;
            scene.add(model_spider);

            clips = gltf.animations;

            let quaternion = new THREE.Quaternion();
            quaternion.setFromAxisAngle( new THREE.Vector3( 0, 1, 0 ), 2*Math.PI );
            model_spider.quaternion.copy(quaternion);
            model_spider.lookAt(0,0,0);

            model_spider.scale.set(5,5,5);

            var mixer = new THREE.AnimationMixer(model_spider);
            mixers.push(mixer);
            clips.forEach(clip => {
                action = mixer.clipAction(clip);
                action.play();
            });

        },
        function(xhr) {
            console.log('spider: ' + ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
        },
        function(error) {
            console.log('error failed to load spider');
        }
    );

//    loader.load(
//        'gltf/monkey.glb',
//        function(gltf) {
//            model_monkey = gltf.scene;
//            model_monkey.scale.set(10,10,10);
//        },
//        function(xhr) {
//            console.log('monkey: ' + ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
//        },
//        function(error) {
//            console.log('error failed to load monkey');
//        }
//    );

    loader.load(
        'gltf/fort.glb',
        function(gltf) {
            model_fort = gltf.scene;
            model_fort.scale.set(8,8,8);
        },
        function(xhr) {
            console.log('fort: ' + ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
        },
        function(error) {
            console.log('error failed to load fort');
        }
    );

    loader.load(
        'gltf/arrow.glb',
        function(gltf) {
            model_arrow = gltf.scene;
            model_arrow.scale.set(3,3,3);
        },
        function(xhr) {
            console.log( 'arrow: ' + ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
        },
        function(error) {
            console.log('errrrror');
        }
    );

    loader.load(
        'gltf/tree.glb',
        function(gltf) {
            model_tree = gltf.scene;
            model_tree.scale.set(20,20,20);
        },
        function(xhr) {
            console.log( "tree: " + ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
        },
        function(error) {
            console.log('error failed to load tree');
        }
    );
}

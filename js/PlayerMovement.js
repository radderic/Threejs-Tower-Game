var velocity = new THREE.Vector3();
var direction = new THREE.Vector3();
var moveForward = false;
var moveBackward = false;
var moveLeft = false;
var moveRight = false;
var canJump = false;

var raycaster = new THREE.Raycaster( new THREE.Vector3(), new THREE.Vector3( 0, - 1, 0 ), 0, 10 );

var movePlayer = function() {
    raycaster.ray.origin.copy( controls.getObject().position );
    raycaster.ray.origin.y -= 10;

    velocity.x -= velocity.x * 5.0 * delta;
    velocity.z -= velocity.z * 5.0 * delta;
    velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass
    direction.z = Number( moveForward ) - Number( moveBackward );
    direction.x = Number( moveLeft ) - Number( moveRight );
    direction.normalize(); // this ensures consistent movements in all directions

    if ( moveForward || moveBackward ) velocity.z -= direction.z * 400.0 * delta;
    if ( moveLeft || moveRight ) velocity.x -= direction.x * 400.0 * delta;

    controls.getObject().translateX( velocity.x * delta );
    controls.getObject().translateY( velocity.y * delta );
    controls.getObject().translateZ( velocity.z * delta );

    if ( controls.getObject().position.y < 140 ) {
        velocity.y = 0;
        controls.getObject().position.y = 140;
        canJump = true;

    }

    //outer wall collision
    if ( controls.getObject().position.z < -160 ) {
        controls.getObject().position.z = -160;

    }
    if ( controls.getObject().position.z > 96 ) {
        controls.getObject().position.z = 96;

    }
    if ( controls.getObject().position.x < -104 ) {
        controls.getObject().position.x = -104;

    }
    if ( controls.getObject().position.x > 120 ) {
        controls.getObject().position.x = 120;

    }


}


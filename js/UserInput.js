
var onKeyDown = function ( event ) {

    switch ( event.keyCode ) {

        case 38: // up
        case 87: // w
            moveForward = true;
            break;

        case 37: // left
        case 65: // a
            moveLeft = true;
            break;

        case 40: // down
        case 83: // s
            moveBackward = true;
            break;

        case 39: // right
        case 68: // d
            moveRight = true;
            break;

        case 32: // space
            if ( canJump === true ) velocity.y += 350;
            canJump = false;
            break;

    }

};

var onKeyUp = function ( event ) {

    switch ( event.keyCode ) {

        case 38: // up
        case 87: // w
            moveForward = false;
            break;

        case 37: // left
        case 65: // a
            moveLeft = false;
            break;

        case 40: // down
        case 83: // s
            moveBackward = false;
            break;

        case 39: // right
        case 68: // d
            moveRight = false;
            break;

    }

};
var onMouseDown = function ( event ) {
    var r = new THREE.Raycaster();
    var m = model_arrow.clone();
    var arrow = {model: m, raycaster: r};

    m.position.copy(camera.getWorldPosition(suppressMsg));
    m.quaternion.copy(camera.getWorldQuaternion());

    arrow.raycaster.set(arrow.model.position, camera.getWorldDirection(suppressMsg));
    arrow.raycaster.far = 10;

    scene.add(arrow.model);
    arrows.push(arrow);
};

document.addEventListener( 'keydown', onKeyDown, false );
document.addEventListener( 'keyup', onKeyUp, false );
document.addEventListener( 'mousedown', onMouseDown, false );



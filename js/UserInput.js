var mouseDownTime = 0;
var mouseUpTime = 0;
var discardFirstArrow = false;
var currentTime = 0;
var mouseIsDown = false;
var startTime = 0;

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
    mouseDownTime = performance.now();
    mouseIsDown = true;

};

var onMouseUp= function ( event ) {
    mouseUpTime = performance.now();
    power = (mouseUpTime - mouseDownTime) / 500;
    if(power > 2) {
        power = 2;
    }
    if(power < 0.2) {
        power = 0.3;
    }

    var r = new THREE.Raycaster();
    var m = model_arrow.clone();
    var arrow = {model: m, raycaster: r, power: power};

    m.position.copy(camera.getWorldPosition(suppressMsg));
    m.quaternion.copy(camera.getWorldQuaternion());

    arrow.raycaster.set(arrow.model.position, camera.getWorldDirection(suppressMsg));
    arrow.raycaster.far = 10;

    scene.add(arrow.model);
    arrows.push(arrow);
    currentTime = 0;
    mouseDownTime = 0;
    mouseIsDown = false;
};

document.addEventListener( 'keydown', onKeyDown, false );
document.addEventListener( 'keyup', onKeyUp, false );
document.addEventListener( 'mousedown', onMouseDown, false );
document.addEventListener( 'mouseup', onMouseUp, false );



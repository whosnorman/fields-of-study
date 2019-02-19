function Canvas(width, height, id){

      // custom global variables
    var cube;
    var raycaster, mouse = {
        x: 0,
        y: 0
      },
      INTERSECTED;

    var scene = new THREE.Scene();
  	var camera = new THREE.PerspectiveCamera(75, width/height, 1, 10000);
    camera.position.z = 1000;
    camera.position.y = 300;
    camera.position.x = -500;

    this.camera = camera;
    this.cameraX = -600;
    this.cameraY = 600;
    this.cameraZ = 600;


  	var renderer = new THREE.WebGLRenderer({ alpha: true });
  	renderer.setSize(width, height);
  	document.getElementById(id).appendChild(renderer.domElement);

    let boxSize = 100;
    var geometry = new THREE.BoxGeometry(boxSize, boxSize, boxSize, 1, 1, 1);
    // var geometry = new THREE.OctahedronGeometry(boxSize, 1);

  	var material = new THREE.MeshBasicMaterial({color: 0xffffff});
  	var cube = new THREE.Mesh(geometry, material);
    cube.position.y = 75;

    this.cubeX = 0;
    this.cubeY = 75;
    this.cubeZ = 0;


    // upper and lower limit = (width / 2) - (objectWidth / 2)

    var geo = new THREE.EdgesGeometry( cube.geometry );
    var mat = new THREE.LineBasicMaterial( { color: 0x000000, linewidth: 10} );
    var wireframe = new THREE.LineSegments( geo, mat );
    wireframe.renderOrder = 1; // make sure wireframes are rendered 2nd
    cube.add( wireframe );
    cube.name = 'concept-01';

  	scene.add(cube);

    let that = this;
  	function render() {
  		requestAnimationFrame(render);

      camera.position.x = that.cameraX;
      camera.position.y = that.cameraY;
      camera.position.z = that.cameraZ;
      camera.lookAt(0, 0, 0);

      cube.position.x = that.cubeX;
      cube.position.y = that.cubeY;
      cube.position.z = that.cubeZ;

  		renderer.render(scene, camera);
      update();
  	};


    // create a grid
    var gridSize = 700;
    var gridDivisions = 15;

    var gridHelper = new THREE.GridHelper( gridSize, gridDivisions, 0xff0000, 0xff0000);
    gridHelper.position.y = -100;
		gridHelper.position.x = 0;
    // gridHelper.geometry.rotateX( Math.PI / 10 );
    gridHelper.name = 'field';
    scene.add( gridHelper );

    this.cubeFieldLimit = (gridSize / 2) - (boxSize / 2);

    this.saveCubeState = function(){
      console.log(this.cubeX, this.cubeY, this.cubeZ);
    }

    // for mouse intersections 
    raycaster = new THREE.Raycaster;

    // when the mouse moves, call the given function
    document.addEventListener('mousemove', onDocumentMouseMove, false);
    document.addEventListener('mousedown', onDocumentMouseDown, false);
    document.addEventListener('mouseup', onDocumentMouseUp, false);

    window.addEventListener('resize', onWindowResize, false);
    let fieldEl = $('#field-01');

    render();
    onWindowResize();





    function onWindowResize(){
      // camera.aspect = window.innerWidth / window.innerHeight;
      camera.aspect = fieldEl.width() / fieldEl.height();
      camera.updateProjectionMatrix();

      renderer.setSize( fieldEl.width(), fieldEl.height() );
    }

    function onDocumentMouseMove(event) {
      // the following line would stop any other event handler from firing
      // (such as the mouse's TrackballControls)
      // event.preventDefault();

      // update the mouse variable
      mouse.x = (event.clientX / fieldEl.width()) * 2 - 1;
      mouse.y = -(event.clientY / fieldEl.height()) * 2 + 1;
    }

    function onDocumentMouseDown(event) {
      if(INTERSECTED) {
        INTERSECTED.scale.set(0.85, 0.85, 0.85);
      }
    }

    function onDocumentMouseUp(event) {
      if(INTERSECTED) {
        INTERSECTED.scale.set(1, 1, 1);
      }
    }

    function update() {
      // find intersections

      // create a Ray with origin at the mouse position
      //   and direction into the scene (camera direction)
      // var vector = new THREE.Vector3(mouse.x, mouse.y, 1);
      // vector.unproject(camera);
      // var ray = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());

      raycaster.setFromCamera(mouse, camera);

      // create an array containing all objects in the scene with which the ray intersects
      var intersects = raycaster.intersectObjects(scene.children);

      // INTERSECTED = the object in the scene currently closest to the camera
      //		and intersected by the Ray projected from the mouse position

      // if there is one (or more) intersections
      if (intersects.length > 0) {
        // if the closest object intersected is not the currently stored intersection object
        if (intersects[0].object != INTERSECTED && intersects[0].object.name != 'field') {
          // restore previous intersection object (if it exists) to its original color
          if (INTERSECTED)
            INTERSECTED.material.color.setHex(INTERSECTED.currentHex);
          // store reference to closest object as current intersection object
          INTERSECTED = intersects[0].object;
          console.log(intersects[0].object.name);
          // store color of closest object (for later restoration)
          INTERSECTED.currentHex = INTERSECTED.material.color.getHex();
          // set a new color for closest object
          INTERSECTED.material.color.setHex(0x0000ff);
          $('#field-01').addClass('object--is-hovered');
        }
      } else // there are no intersections
      {
        // restore previous intersection object (if it exists) to its original color
        if (INTERSECTED)
          INTERSECTED.material.color.setHex(INTERSECTED.currentHex);
        // remove previous intersection object reference
        //     by setting current intersection object to "nothing"
        INTERSECTED = null;

        $('#field-01').removeClass('object--is-hovered');
      }
    }
}

$(function(){
  let canvas = new Canvas(500, 500, 'field-01');

  // create dat GUI
  const gui = new dat.GUI();

  gui.add(canvas, 'cameraX', -2000, 2000);
  gui.add(canvas, 'cameraY', -2000, 2000);
  gui.add(canvas, 'cameraZ', -2000, 2000);

  gui.add(canvas, 'cubeX', -canvas.cubeFieldLimit, canvas.cubeFieldLimit);
  gui.add(canvas, 'cubeY', 0, 200);
  gui.add(canvas, 'cubeZ', -canvas.cubeFieldLimit, canvas.cubeFieldLimit);


  $('#save-cube-state').click(function(e){
    canvas.saveCubeState();
  });
});

import * as THREE from "https://unpkg.com/three@0.127.0/build/three.module.js";
import { OrbitControls } from "https://unpkg.com/three@0.127.0/examples/jsm/controls/OrbitControls.js";

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const textureLoader = new THREE.TextureLoader();
const starTexture = textureLoader.load("./image/stars.jpg");
const sunTexture = textureLoader.load("./image/sun.jpg");
const mercuryTexture = textureLoader.load("./image/mercury.jpg");
const venusTexture = textureLoader.load("./image/venus.jpg");
const earthTexture = textureLoader.load("./image/earth.jpg");
const marsTexture = textureLoader.load("./image/mars.jpg");
const jupiterTexture = textureLoader.load("./image/jupiter.jpg");
const saturnTexture = textureLoader.load("./image/saturn.jpg");
const uranusTexture = textureLoader.load("./image/uranus.jpg");
const neptuneTexture = textureLoader.load("./image/neptune.jpg");
const plutoTexture = textureLoader.load("./image/pluto.jpg");
const saturnRingTexture = textureLoader.load("./image/saturn_ring.png");
const uranusRingTexture = textureLoader.load("./image/uranus_ring.png");

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(-50, 90, 150);

const orbit = new OrbitControls(camera, renderer.domElement);

const starGeo = new THREE.SphereGeometry(500, 64, 64);
const starMat = new THREE.MeshBasicMaterial({
  map: starTexture,
  side: THREE.BackSide,
});
const starMesh = new THREE.Mesh(starGeo, starMat);
scene.add(starMesh);

const sungeo = new THREE.SphereGeometry(15, 50, 50);
const sunMaterial = new THREE.MeshBasicMaterial({
  map: sunTexture,
});
const sun = new THREE.Mesh(sungeo, sunMaterial);
scene.add(sun);

const sunLight = new THREE.PointLight(0xffffff, 4, 300);
scene.add(sunLight);

const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const path_of_planets = [];
function createLineLoopWithMesh(radius, color, width) {
  const material = new THREE.LineBasicMaterial({
    color: color,
    linewidth: width,
  });
  const geometry = new THREE.BufferGeometry();
  const lineLoopPoints = [];

  const numSegments = 100;
  for (let i = 0; i <= numSegments; i++) {
    const angle = (i / numSegments) * Math.PI * 2;
    const x = radius * Math.cos(angle);
    const z = radius * Math.sin(angle);
    lineLoopPoints.push(x, 0, z);
  }

  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(lineLoopPoints, 3)
  );
  const lineLoop = new THREE.LineLoop(geometry, material);
  scene.add(lineLoop);
  path_of_planets.push(lineLoop);
}

const genratePlanet = (size, planetTexture, x, ring, planetName) => {
  const planetGeometry = new THREE.SphereGeometry(size, 50, 50);
  const planetMaterial = new THREE.MeshStandardMaterial({
    map: planetTexture,
  });
  const planet = new THREE.Mesh(planetGeometry, planetMaterial);
  planet.userData.planetName = planetName;
  const planetObj = new THREE.Object3D();
  planet.position.set(x, 0, 0);
  if (ring) {
    const ringGeo = new THREE.RingGeometry(
      ring.innerRadius,
      ring.outerRadius,
      32
    );
    const ringMat = new THREE.MeshBasicMaterial({
      map: ring.ringmat,
      side: THREE.DoubleSide,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    planetObj.add(ringMesh);
    ringMesh.position.set(x, 0, 0);
    ringMesh.rotation.x = -0.5 * Math.PI;
  }
  scene.add(planetObj);

  planetObj.add(planet);
  createLineLoopWithMesh(x, 0xffffff, 3);
  return {
    planetObj: planetObj,
    planet: planet,
  };
};

const planets = [
  {
    ...genratePlanet(3.2, mercuryTexture, 28, null, "Mercury"),
    rotaing_speed_around_sun: 0.004,
    self_rotation_speed: 0.004,
  },
  {
    ...genratePlanet(5.8, venusTexture, 44, null, "Venus"),
    rotaing_speed_around_sun: 0.015,
    self_rotation_speed: 0.002,
  },
  {
    ...genratePlanet(6, earthTexture, 62, null, "Earth"),
    rotaing_speed_around_sun: 0.001,
    self_rotation_speed: 0.02,
  },
  {
    ...genratePlanet(4, marsTexture, 78, null, "Mars"),
    rotaing_speed_around_sun: 0.008,
    self_rotation_speed: 0.018,
  },
  {
    ...genratePlanet(12, jupiterTexture, 100, null, "Jupiter"),
    rotaing_speed_around_sun: 0.002,
    self_rotation_speed: 0.04,
  },
  {
    ...genratePlanet(10, saturnTexture, 138, {
      innerRadius: 10,
      outerRadius: 20,
      ringmat: saturnRingTexture,
    }, "Saturn"),
    rotaing_speed_around_sun: 0.0009,
    self_rotation_speed: 0.038,
  },
  {
    ...genratePlanet(7, uranusTexture, 176, {
      innerRadius: 7,
      outerRadius: 12,
      ringmat: uranusRingTexture,
    }, "Uranus"),
    rotaing_speed_around_sun: 0.0004,
    self_rotation_speed: 0.03,
  },
  {
    ...genratePlanet(7, neptuneTexture, 200, null, "Neptune"),
    rotaing_speed_around_sun: 0.0001,
    self_rotation_speed: 0.032,
  },
  {
    ...genratePlanet(2.8, plutoTexture, 216, null, "Pluto"),
    rotaing_speed_around_sun: 0.0007,
    self_rotation_speed: 0.008,
  },
];



var GUI = dat.gui.GUI;
const gui = new GUI();
const options = {
  "Real view": true,
  "Show path": true,
  speed: 1,
};
gui.add(options, "Real view").onChange((e) => {
  ambientLight.intensity = e ? 0 : 0.5;
});
gui.add(options, "Show path").onChange((e) => {
  path_of_planets.forEach((dpath) => {
    dpath.visible = e;
  });
});
const maxSpeed = new URL(window.location.href).searchParams.get("ms") * 1
gui.add(options, "speed", 0, maxSpeed ? maxSpeed : 20);


function animate(time) {
  sun.rotateY(options.speed * 0.004);
  planets.forEach(({ planetObj, planet, rotaing_speed_around_sun, self_rotation_speed }) => {
    planetObj.rotateY(options.speed * rotaing_speed_around_sun);
    planet.rotateY(options.speed * self_rotation_speed);
  });
  renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

console.log(planets);

function showPlanetInfo(planetName) {
  console.log(planetName);
  let diameter = "";
  let day = "";
  let trajectory = "";
  let texture = null;

  const planet = planets.find(p => p.planet.userData.planetName === planetName);
  if (planetName == "Mercury") {
    planetName = "Sao Thủy";
    diameter = "4,878 km";
    day = "58,6 ngày Trái Đất";
    trajectory = "88 ngày Trái Đất";
    texture = mercuryTexture;
  } else if (planetName == "Venus") {
    planetName = "Sao Kim";
    diameter = "12,104 km";
    day = "241 ngày Trái Đất";
    trajectory = "225 ngày Trái Đất";
    texture = venusTexture;
  } else if (planetName == "Earth") {
    planetName = "Trái Đất";
    diameter = "12,760 km";
    day = "23 giờ 56 phút";
    trajectory = "365,24 ngày";
    texture = earthTexture;
  } else if (planetName == "Mars") {
    planetName = "Sao Hỏa";
    diameter = "6,787 km";
    day = "24 giờ 37 phút";
    trajectory = "687 ngày Trái Đất";
    texture = marsTexture;
  } else if (planetName == "Jupiter") {
    planetName = "Sao Mộc";
    diameter = "139,822 km";
    day = "9,8 giờ";
    trajectory = "11,9 năm Trái Đất";
    texture = jupiterTexture;
  } else if (planetName == "Saturn") {
    planetName = "Sao Thổ";
    diameter = "120,500 km";
    day = "10,5 giờ";
    trajectory = "29,5 năm Trái Đất";
    texture = saturnTexture;
  } else if (planetName == "Uranus") {
    planetName = "Sao Thiên Vương";
    diameter = "51,120 km";
    day = "18 giờ";
    trajectory = "84 năm Trái Đất";
    texture = uranusTexture;
  } else if (planetName == "Neptune") {
    planetName = "Sao Hải Vương";
    diameter = "49,530 km";
    day = "19 giờ";
    trajectory = "165 năm Trái Đất";
    texture = neptuneTexture;
  } else {
    planetName = "Sao Diêm Vương";
    diameter = "2,301 km";
    day = "6,4 giờ";
    trajectory = "248 năm Trái Đất";
    texture = plutoTexture;
  }

  const closeModal = document.getElementsByClassName("close")[0];
  closeModal.onclick = function () {
    modal.style.display = "none";
  };

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };

  const modal = document.getElementById('myModal');
  const planetInfo = document.getElementById('text-info');
  const textureInfo = document.getElementById('texture-info');
  textureInfo.innerHTML = '';

  if (planet) {
    planetInfo.innerHTML = `Hành tinh: ${planetName}<br/>Đường kính: ${diameter}<br/>Ngày: ${day}<br/>Quỹ đạo: ${trajectory}`;
    const modalRenderer = new THREE.WebGLRenderer();
    modalRenderer.setSize(400, 400);
    textureInfo.appendChild(modalRenderer.domElement);
    const modalScene = new THREE.Scene();

    const modalCamera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    modalCamera.position.z = 30;

    const modalOrbit = new OrbitControls(modalCamera, modalRenderer.domElement);

    const planetGeometry = new THREE.SphereGeometry(15, 50, 50);
    const planetMaterial = new THREE.MeshStandardMaterial({ map: texture });
    const modalPlanet = new THREE.Mesh(planetGeometry, planetMaterial);
    modalScene.add(modalPlanet);

    const modalLight = new THREE.PointLight(0xffffff, 1, 100);
    modalLight.position.set(50, 50, 50);
    modalScene.add(modalLight);

    const modalAmbientLight = new THREE.AmbientLight(0xffffff, 0.5);
    modalScene.add(modalAmbientLight);

    function modalAnimate() {
      modalPlanet.rotateY(0.01);
      modalRenderer.render(modalScene, modalCamera);
      requestAnimationFrame(modalAnimate);
    }
    modalAnimate();

    modal.style.display = 'block';
  }
}



renderer.domElement.addEventListener('click', (event) => {

  const mouse = {
    x: (event.clientX / window.innerWidth) * 2 - 1,
    y: -(event.clientY / window.innerHeight) * 2 + 1,
  };

  const raycaster = new THREE.Raycaster();
  raycaster.setFromCamera(mouse, camera);

  const intersects = raycaster.intersectObjects(scene.children, true);


  if (intersects.length > 0) {
    const clickedObject = intersects[0].object;
    if (clickedObject.userData.planetName) {
      const planetName = clickedObject.userData.planetName;
      console.log(`Clicked on ${planetName}`);
      showPlanetInfo(planetName);
    }
  }
});

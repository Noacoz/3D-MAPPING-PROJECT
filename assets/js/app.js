window.onerror = (message, source, line, col, error) => {
  const box = document.getElementById('errorBox');
  box.textContent = `Runtime error: ${message} at ${source}:${line}:${col}`;
  box.classList.remove('hidden');
  console.error(message, source, line, col, error);
  return false;
};

const mapLocations = {
  locations: [
    { name: "Vice City Downtown", lat: 25.774, lng: -80.190, category: "city", description: "The main neon-lined urban core inspired by Miami.", realWorld: "Downtown Miami", source: "trailer" },
    { name: "Vice Beach", lat: 25.790, lng: -80.130, category: "recreational", description: "Wide white sands and ocean drive, ideal for jet skis and daytime chaos.", realWorld: "South Beach", source: "trailer" },
    { name: "Port Gellhorn", lat: 28.000, lng: -82.500, category: "transport", description: "Major cargo hub on the northern panhandle, a leaked port location.", realWorld: "Tampa Bay Port", source: "leak" },
    { name: "Port Gellhorn Shipyard", lat: 27.990, lng: -82.520, category: "industrial", description: "Large dockyard with container cranes and warehouse complexes.", realWorld: "Port Manatee", source: "leak" },
    { name: "Ambrosia", lat: 25.680, lng: -80.280, category: "town", description: "A seaside residential town with a resort-town feeling.", realWorld: "Coral Gables", source: "community" },
    { name: "Hamlet", lat: 26.100, lng: -81.000, category: "town", description: "A quiet inland community on the approach to the Everglades.", realWorld: "Naples", source: "leak" },
    { name: "Lake Leonida", lat: 27.500, lng: -81.200, category: "water", description: "A central inland lake that divides the map like a freshwater heart.", realWorld: "Lake Okeechobee", source: "trailer" },
    { name: "Grassrivers (Everglades)", lat: 25.850, lng: -81.050, category: "natural", description: "Swamp wilderness region with marsh trails and community speculation.", realWorld: "Everglades", source: "community" },
    { name: "Leonida Keys", lat: 24.550, lng: -81.800, category: "natural", description: "A southern chain of low islands and luxury resort keys.", realWorld: "Florida Keys", source: "trailer" },
    { name: "Mt. Kalaga National Park", lat: 28.500, lng: -81.450, category: "natural", description: "Dense forests and elevation changes in the northern interior.", realWorld: "Panhandle State Park", source: "community" },
    { name: "Red Hill Forest", lat: 28.800, lng: -81.600, category: "natural", description: "A remote red-leafed forest preserve with hiking trails.", realWorld: "Apalachicola National Forest", source: "community" },
    { name: "Vice City International Airport", lat: 25.790, lng: -80.290, category: "transport", description: "The primary air gateway for the Vice City metro area.", realWorld: "Miami International Airport", source: "trailer" },
    { name: "K.O. (Kelly’s Overlook)", lat: 25.750, lng: -80.180, category: "landmark", description: "A high-rise rooftop viewpoint with iconic sunset panoramas.", realWorld: "Miami Lookout", source: "trailer" },
    { name: "Malibu Club", lat: 25.780, lng: -80.125, category: "landmark", description: "Luxury nightlife club on the waterfront near downtown.", realWorld: "Miami Beach Club", source: "trailer" },
    { name: "Ocean View Hotel", lat: 25.779, lng: -80.134, category: "landmark", description: "A glossy oceanfront hotel that anchors seaside story beats.", realWorld: "W South Beach", source: "trailer" },
    { name: "Washington Beach", lat: 25.783, lng: -80.120, category: "recreational", description: "A bustling stretch of boardwalk, umbrellas and water sports.", realWorld: "Washington Avenue Beach", source: "trailer" },
    { name: "Vice Point", lat: 25.797, lng: -80.140, category: "landmark", description: "A compact hip district with yacht clubs and high-end stores.", realWorld: "Miami Beach", source: "trailer" },
    { name: "Little Haiti", lat: 25.810, lng: -80.190, category: "town", description: "A gritty neighborhood with markets, murals, and local culture.", realWorld: "Little Haiti", source: "trailer" },
    { name: "Escobar International", lat: 25.795, lng: -80.300, category: "transport", description: "A newer airport terminal rumored from leaks and airport radar.", realWorld: "Fort Lauderdale-Hollywood Airport", source: "leak" },
    { name: "Vice Port", lat: 25.762, lng: -80.185, category: "transport", description: "A busy shipping harbor in the southern basin of Vice City.", realWorld: "Port of Miami", source: "leak" },
    { name: "Washington Mall", lat: 25.775, lng: -80.195, category: "landmark", description: "A large retail anchor with interior scenes and pursuit routes.", realWorld: "Bayside Marketplace", source: "community" },
    { name: "Stadium", lat: 25.778, lng: -80.210, category: "landmark", description: "A modern stadium complex visible from the city skyline.", realWorld: "Hard Rock Stadium", source: "trailer" },
    { name: "Hyman Memorial Stadium", lat: 25.776, lng: -80.215, category: "landmark", description: "An alternate stadium name from community analysis.", realWorld: "Miami Dolphins Stadium", source: "community" },
    { name: "Starfish Island", lat: 25.770, lng: -80.150, category: "landmark", description: "A star-shaped private island with luxury mansions.", realWorld: "Star Island", source: "trailer" },
    { name: "Prawn Island", lat: 25.800, lng: -80.110, category: "landmark", description: "A smaller reclaimed island close to Vice Beach.", realWorld: "Pine Tree Drive Estate", source: "leak" },
    { name: "Leaf Links Golf Course", lat: 25.805, lng: -80.100, category: "recreational", description: "A premium seaside golf course and leisure district.", realWorld: "Miami Beach Golf Club", source: "community" },
    { name: "Fort Baxter Air Base", lat: 27.900, lng: -82.600, category: "transport", description: "A military airfield in the panhandle region.", realWorld: "Tyndall AFB", source: "leak" },
    { name: "Southernmost Point", lat: 24.546, lng: -81.797, category: "landmark", description: "The furthest southern tip in the Leonida archipelago.", realWorld: "Southernmost Point, Key West", source: "community" },
    { name: "Cape Coral", lat: 26.630, lng: -81.980, category: "town", description: "A gulf coast town with canals and suburban sprawl.", realWorld: "Cape Coral", source: "community" },
    { name: "Estero Bay", lat: 26.430, lng: -81.850, category: "water", description: "A shallow bay area with mangroves and boating traffic.", realWorld: "Estero Bay", source: "community" },
    { name: "Bayou La Batre", lat: 30.400, lng: -88.250, category: "town", description: "A reference point from the leak that may be outside Leonida.", realWorld: "Bayou La Batre, AL", source: "community" },
    { name: "Port St. Lucie analog", lat: 27.270, lng: -80.350, category: "town", description: "A coastal city analog from community speculation.", realWorld: "Port St. Lucie", source: "leak" },
    { name: "West Coast Beach", lat: 26.500, lng: -81.950, category: "recreational", description: "A west-facing Gulf beach with dramatic sunset vistas.", realWorld: "Ft. Myers Beach", source: "community" },
    { name: "Panhandle Town", lat: 29.700, lng: -85.300, category: "town", description: "A small northern town in the panhandle region.", realWorld: "Panhandle Coastal Town", source: "community" },
    { name: "Swamp Cabin", lat: 25.900, lng: -81.200, category: "landmark", description: "A hidden cabin deep in the Everglades wilderness.", realWorld: "Swamp Camp", source: "community" },
    { name: "Oil Refinery", lat: 27.800, lng: -82.550, category: "industrial", description: "A large refinery complex near the northern coast.", realWorld: "Tampa Bay Refinery", source: "community" },
    { name: "Power Plant", lat: 27.750, lng: -82.600, category: "industrial", description: "A power generation facility with cooling towers.", realWorld: "Crystal River Plant", source: "community" },
    { name: "Space Center", lat: 28.500, lng: -80.700, category: "landmark", description: "A reference to Cape Canaveral-style launch facilities.", realWorld: "Cape Canaveral", source: "leak" },
    { name: "Waning Sands", lat: 25.720, lng: -80.250, category: "landmark", description: "A sun-scorched stretch of dunes by the bay.", realWorld: "Sandy Key", source: "leak" },
    { name: "Vice City Beach Race Track", lat: 25.780, lng: -80.110, category: "recreational", description: "A coastal motorsport track and media spectacle.", realWorld: "Miami Beach Race Circuit", source: "community" },
    { name: "Ocean Beach", lat: 25.790, lng: -80.100, category: "recreational", description: "The long public beach district with surf and boardwalks.", realWorld: "Miami Beach", source: "trailer" },
    { name: "Epsilon Center", lat: 25.785, lng: -80.200, category: "landmark", description: "A cult-themed headquarters with ritual ambiance.", realWorld: "Elysian Fields", source: "community" },
    { name: "Los Santos inspired import?", lat: 25.768, lng: -80.195, category: "landmark", description: "A playful nod to GTA V’s Los Santos appearing inside Leonida.", realWorld: "Los Santos", source: "community" },
    { name: "Sewer Tunnels entrance", lat: 25.760, lng: -80.190, category: "landmark", description: "An underground access point leading to hidden sewer chases.", realWorld: "Miami Sewer Tunnels", source: "community" },
    { name: "Subway System point", lat: 25.774, lng: -80.188, category: "transport", description: "A transit node likely connected to an underground subway system.", realWorld: "Miami MetroRail", source: "leak" },
    { name: "Marina", lat: 25.772, lng: -80.140, category: "transport", description: "A yacht marina for arriving boats and water taxis.", realWorld: "Miami Marina", source: "trailer" },
    { name: "Yacht Club", lat: 25.771, lng: -80.141, category: "recreational", description: "An upscale private yacht club on the bay.", realWorld: "Miami Yacht Club", source: "trailer" },
    { name: "Dirt Bike Trails", lat: 25.880, lng: -81.180, category: "recreational", description: "Off-road trails for motos and stunt runs in the wetlands.", realWorld: "Dirt Track Trails", source: "community" },
    { name: "Off-road Arena", lat: 27.600, lng: -81.500, category: "recreational", description: "A competitive off-road arena in the hinterlands.", realWorld: "Motocross Arena", source: "community" },
    { name: "Carnival Pier", lat: 25.785, lng: -80.120, category: "recreational", description: "A bright amusement pier with carnival rides and lights.", realWorld: "Santa Monica Pier", source: "trailer" },
    { name: "Coral Gables analog", lat: 25.749, lng: -80.260, category: "town", description: "A luxurious suburban district with Mediterranean architecture.", realWorld: "Coral Gables", source: "community" },
    { name: "Coconut Grove analog", lat: 25.730, lng: -80.240, category: "town", description: "A leafy bohemian neighborhood near the bay.", realWorld: "Coconut Grove", source: "community" },
    { name: "Villa Mansion", lat: 25.770, lng: -80.160, category: "landmark", description: "A sprawling mansion with a private waterfront estate.", realWorld: "Billionaire Estate", source: "trailer" }
  ]
};

const categoryDefinitions = [
  { id: "city", label: "Cities" },
  { id: "town", label: "Towns" },
  { id: "landmark", label: "Landmarks" },
  { id: "natural", label: "Natural" },
  { id: "industrial", label: "Industrial" },
  { id: "recreational", label: "Recreational" },
  { id: "transport", label: "Transport" },
  { id: "water", label: "Water" }
];

const colorMap = {
  city: "#ffcb4f",
  town: "#6fd6ff",
  landmark: "#7cc4ff",
  natural: "#6ad28a",
  industrial: "#f47c70",
  recreational: "#b47cff",
  transport: "#ff8b5a",
  water: "#5fb7ff",
  comparison: "#ff9cc4"
};

const allCategories = categoryDefinitions.map(c => c.id);
let activeCategories = new Set(allCategories);
let activeSources = { trailer: true, leak: true, community: true };
let showComparison = false;
let hoveredLocation = null;
let currentVisibleLocations = [];
let lastZoomCategory = null;

const globeContainer = document.getElementById('globeContainer');
const searchInput = document.getElementById('searchInput');
const searchSuggestions = document.getElementById('searchSuggestions');
const popup = document.getElementById('popup');
const loadingOverlay = document.getElementById('loadingOverlay');
const miniMap = document.getElementById('miniMap');
const miniCtx = miniMap.getContext('2d');
const toggleTrailer = document.getElementById('toggleTrailer');
const toggleLeak = document.getElementById('toggleLeak');
const toggleCommunity = document.getElementById('toggleCommunity');
const toggleComparison = document.getElementById('toggleComparison');

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(42, window.innerWidth / window.innerHeight, 0.1, 5000);
camera.position.set(0, 220, 700);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setPixelRatio(window.devicePixelRatio || 1);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.setClearColor(0x05060f, 1);
globeContainer.appendChild(renderer.domElement);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.42);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.76);
directionalLight.position.set(320, 240, 180);
scene.add(directionalLight);
const fillLight = new THREE.DirectionalLight(0x80b4ff, 0.25);
fillLight.position.set(-120, 80, -220);
scene.add(fillLight);

const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.08;
controls.minDistance = 300;
controls.maxDistance = 2000;
controls.autoRotate = true;
controls.autoRotateSpeed = 0.5;
controls.enableZoom = true;
controls.minPolarAngle = 0.22;
controls.maxPolarAngle = Math.PI - 0.7;
controls.target.set(0, 0, 0);

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
const globe = new ThreeGlobe();
globe.aspect = window.innerWidth / window.innerHeight;

const comparisonMarker = {
  name: "Los Santos",
  lat: 33.800,
  lng: -118.300,
  category: "comparison",
  description: "A meta reference marker for GTA V’s Los Santos on the Leonida globe.",
  realWorld: "Los Angeles",
  source: "community"
};

function makeCanvasTexture(width, height, drawCallback) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  drawCallback(ctx, width, height);
  return canvas.toDataURL();
}

function createMapShape(ctx) {
  const w = ctx.canvas.width;
  const h = ctx.canvas.height;
  ctx.save();
  ctx.translate(0, 0);
  ctx.scale(1, 1);
  ctx.beginPath();
  ctx.moveTo(w * 0.14, h * 0.35);
  ctx.bezierCurveTo(w * 0.08, h * 0.28, w * 0.06, h * 0.15, w * 0.18, h * 0.12);
  ctx.bezierCurveTo(w * 0.36, h * 0.08, w * 0.52, h * 0.16, w * 0.62, h * 0.14);
  ctx.bezierCurveTo(w * 0.70, h * 0.12, w * 0.78, h * 0.06, w * 0.90, h * 0.12);
  ctx.lineTo(w * 0.86, h * 0.28);
  ctx.bezierCurveTo(w * 0.80, h * 0.32, w * 0.76, h * 0.40, w * 0.72, h * 0.45);
  ctx.bezierCurveTo(w * 0.68, h * 0.52, w * 0.64, h * 0.60, w * 0.58, h * 0.64);
  ctx.bezierCurveTo(w * 0.51, h * 0.70, w * 0.44, h * 0.72, w * 0.35, h * 0.72);
  ctx.bezierCurveTo(w * 0.32, h * 0.78, w * 0.28, h * 0.86, w * 0.24, h * 0.92);
  ctx.bezierCurveTo(w * 0.18, h * 0.96, w * 0.12, h * 0.96, w * 0.08, h * 0.88);
  ctx.lineTo(w * 0.06, h * 0.76);
  ctx.bezierCurveTo(w * 0.04, h * 0.64, w * 0.06, h * 0.54, w * 0.12, h * 0.48);
  ctx.bezierCurveTo(w * 0.16, h * 0.42, w * 0.20, h * 0.38, w * 0.24, h * 0.36);
  ctx.closePath();
  ctx.restore();
}

function drawMap(ctx, isHeight) {
  const w = ctx.canvas.width;
  const h = ctx.canvas.height;
  ctx.clearRect(0, 0, w, h);
  const water = ctx.createLinearGradient(0, 0, 0, h);
  water.addColorStop(0, isHeight ? "#101020" : "#0f3f8c");
  water.addColorStop(1, isHeight ? "#080810" : "#115fb6");
  ctx.fillStyle = water;
  ctx.fillRect(0, 0, w, h);

  createMapShape(ctx);
  if (isHeight) {
    ctx.fillStyle = "#f8f8f8";
    ctx.fill();
    return;
  }

  const land = ctx.createLinearGradient(0, h * 0.2, 0, h * 0.8);
  land.addColorStop(0, "#5c9938");
  land.addColorStop(0.5, "#8fb24b");
  land.addColorStop(1, "#bda56b");
  ctx.fillStyle = land;
  ctx.fill();

  ctx.lineWidth = 4;
  ctx.strokeStyle = "#3a6b32";
  ctx.stroke();

  ctx.save();
  ctx.fillStyle = "#0f74c1";
  ctx.beginPath();
  ctx.ellipse(w * 0.58, h * 0.44, w * 0.08, h * 0.05, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  ctx.save();
  ctx.strokeStyle = "rgba(255,255,255,0.22)";
  ctx.lineWidth = 2;
  const water1 = new Path2D();
  water1.moveTo(w * 0.60, h * 0.16);
  water1.bezierCurveTo(w * 0.66, h * 0.10, w * 0.76, h * 0.14, w * 0.84, h * 0.18);
  water1.lineTo(w * 0.82, h * 0.28);
  water1.bezierCurveTo(w * 0.74, h * 0.24, w * 0.68, h * 0.20, w * 0.60, h * 0.22);
  ctx.stroke(water1);
  ctx.restore();

  const beach = ctx.createLinearGradient(0, h * 0.05, 0, h * 0.22);
  beach.addColorStop(0, "#f7c878");
  beach.addColorStop(1, "#e2b86f");
  ctx.fillStyle = beach;
  ctx.beginPath();
  ctx.moveTo(w * 0.72, h * 0.14);
  ctx.quadraticCurveTo(w * 0.77, h * 0.15, w * 0.85, h * 0.18);
  ctx.lineTo(w * 0.84, h * 0.21);
  ctx.quadraticCurveTo(w * 0.76, h * 0.19, w * 0.72, h * 0.16);
  ctx.fill();

  const roadStyle = () => {
    ctx.strokeStyle = "rgba(255,255,255,0.33)";
    ctx.lineWidth = 1.8;
    ctx.lineCap = "round";
  };
  roadStyle();
  ctx.beginPath();
  ctx.moveTo(w * 0.23, h * 0.40);
  ctx.bezierCurveTo(w * 0.30, h * 0.33, w * 0.42, h * 0.27, w * 0.50, h * 0.24);
  ctx.lineTo(w * 0.64, h * 0.22);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(w * 0.30, h * 0.55);
  ctx.bezierCurveTo(w * 0.40, h * 0.52, w * 0.52, h * 0.50, w * 0.60, h * 0.47);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(w * 0.70, h * 0.35);
  ctx.lineTo(w * 0.74, h * 0.50);
  ctx.stroke();

  for (let i = 0; i < 40; i++) {
    const x = w * (0.18 + Math.random() * 0.72);
    const y = h * (0.12 + Math.random() * 0.76);
    if (Math.random() > 0.84) {
      ctx.fillStyle = "rgba(255,255,255,0.16)";
      ctx.beginPath();
      ctx.arc(x, y, 2.3 + Math.random() * 2.5, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

function createGlobeTexture() {
  return makeCanvasTexture(2048, 1024, (ctx) => drawMap(ctx, false));
}

function createBumpTexture() {
  return makeCanvasTexture(2048, 1024, (ctx) => drawMap(ctx, true));
}

function createAtmosphere() {
  const shape = new THREE.SphereGeometry(102.6, 64, 64);
  const texture = document.createElement('canvas');
  texture.width = 512;
  texture.height = 512;
  const ctx = texture.getContext('2d');
  const gradient = ctx.createRadialGradient(256, 256, 50, 256, 256, 256);
  gradient.addColorStop(0, "rgba(175,225,255,0.35)");
  gradient.addColorStop(0.6, "rgba(130,200,255,0.12)");
  gradient.addColorStop(1, "rgba(42,94,160,0.0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 512, 512);
  const map = new THREE.CanvasTexture(texture);
  const material = new THREE.MeshBasicMaterial({
    map,
    color: 0x89d7ff,
    transparent: true,
    opacity: 0.4,
    blending: THREE.AdditiveBlending,
    side: THREE.BackSide,
    depthWrite: false
  });
  return new THREE.Mesh(shape, material);
}

function createStarfield() {
  const stars = new THREE.BufferGeometry();
  const positions = new Float32Array(2000 * 3);
  for (let i = 0; i < 2000; i++) {
    const r = 1400 + Math.random() * 220;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);
  }
  stars.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  return new THREE.Points(stars, new THREE.PointsMaterial({
    color: 0xffffff,
    size: 2.1,
    sizeAttenuation: true,
    transparent: true,
    opacity: 0.85
  }));
}

function sphericalToCartesian(lat, lng, radius = 100) {
  const phi = (90 - lat) * Math.PI / 180;
  const theta = (lng + 180) * Math.PI / 180;
  return new THREE.Vector3(
    radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

function buildCategoryButtons() {
  const container = document.getElementById('categoryButtons');
  const allBtn = document.createElement('button');
  allBtn.className = 'category-button active';
  allBtn.textContent = 'All';
  allBtn.dataset.category = 'all';
  allBtn.addEventListener('click', () => {
    activeCategories = new Set(allCategories);
    updateCategoryButtons();
    updateGlobeData(true);
  });
  container.appendChild(allBtn);

  categoryDefinitions.forEach(cat => {
    const button = document.createElement('button');
    button.className = 'category-button active';
    button.textContent = cat.label;
    button.dataset.category = cat.id;
    button.addEventListener('click', () => {
      if (activeCategories.has(cat.id)) activeCategories.delete(cat.id);
      else activeCategories.add(cat.id);
      document.querySelector('[data-category="all"]').classList.toggle('active', activeCategories.size === allCategories.length);
      button.classList.toggle('active', activeCategories.has(cat.id));
      updateGlobeData(true);
    });
    container.appendChild(button);
  });
}

function updateCategoryButtons() {
  document.querySelectorAll('.category-button').forEach(btn => {
    if (btn.dataset.category === 'all') {
      btn.classList.toggle('active', activeCategories.size === allCategories.length);
      return;
    }
    btn.classList.toggle('active', activeCategories.has(btn.dataset.category));
  });
}

function shouldIncludeLocation(loc) {
  if (!activeSources[loc.source]) return false;
  if (!activeCategories.has(loc.category)) return false;
  return true;
}

function getZoomFilter(distance) {
  if (distance > 1000) return loc => ["city", "transport"].includes(loc.category);
  if (distance > 700) return loc => ["city", "transport", "landmark"].includes(loc.category);
  return () => true;
}

function getFilteredLocations(distance) {
  const zoomFilter = getZoomFilter(distance);
  const filtered = mapLocations.locations.filter(loc => shouldIncludeLocation(loc) && zoomFilter(loc));
  if (showComparison) filtered.push(comparisonMarker);
  return filtered;
}

function updateGlobeData(force = false) {
  const distance = camera.position.length();
  const zoomMode = distance > 1000 ? 0 : distance > 700 ? 1 : 2;
  if (!force && zoomMode === lastZoomCategory && currentVisibleLocations.length > 0) {
    return;
  }
  lastZoomCategory = zoomMode;
  currentVisibleLocations = getFilteredLocations(distance);
  const hover = hoveredLocation;
  const scale = THREE.MathUtils.clamp(1.6 - (distance - 300) / 900, 0.55, 1.4);
  globe.pointsData(currentVisibleLocations)
    .pointLat(d => d.lat)
    .pointLng(d => d.lng)
    .pointColor(d => hover === d ? "#fff4b0" : colorMap[d.category] || "#9bbcff")
    .pointAltitude(d => 0.01 + 0.008 * (1 - THREE.MathUtils.clamp((distance - 300) / 1200, 0, 1)))
    .pointRadius(d => hover === d ? Math.min(1.4 * scale, 1.6) : 0.72 * scale)
    .pointsMerge(true)
    .pointLabel(d => d.name);
}

function clamp(value, min, max) { return Math.min(Math.max(value, min), max); }

function updatePopupPosition() {
  if (!popup || popup.classList.contains('hidden') || !popup.dataset.lat) return;
  const lat = parseFloat(popup.dataset.lat);
  const lng = parseFloat(popup.dataset.lng);
  const pos = sphericalToCartesian(lat, lng, 100.8);
  const vector = pos.project(camera);
  const x = (vector.x * 0.5 + 0.5) * window.innerWidth;
  const y = ( - vector.y * 0.5 + 0.5) * window.innerHeight;
  popup.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px)`;
}

function openPopup(location) {
  hoveredLocation = location;
  updateGlobeData(true);
  popup.dataset.lat = location.lat;
  popup.dataset.lng = location.lng;
  popup.classList.remove('hidden');
  popup.innerHTML = `
    <button class="close-btn" aria-label="Close popup">&times;</button>
    <h2>${location.name}</h2>
    <div class="badge">${location.category}</div>
    <p>${location.description}</p>
    <p><strong>Real-world analog:</strong> ${location.realWorld}</p>
    <div class="popup-row">
      <button id="zoomButton">Zoom to</button>
    </div>`;
  popup.querySelector('.close-btn').addEventListener('click', closePopup);
  popup.querySelector('#zoomButton').addEventListener('click', () => {
    flyToLocation(location.lat, location.lng, 420);
  });
  updatePopupPosition();
}

function closePopup() {
  hoveredLocation = null;
  updateGlobeData(true);
  popup.classList.add('hidden');
}

function flyToLocation(lat, lng, distance = 420) {
  controls.autoRotate = false;
  const targetPos = sphericalToCartesian(lat, lng, 100);
  const destination = sphericalToCartesian(lat, lng, distance);
  const from = {
    x: camera.position.x,
    y: camera.position.y,
    z: camera.position.z,
    tx: controls.target.x,
    ty: controls.target.y,
    tz: controls.target.z
  };
  const to = { x: destination.x, y: destination.y, z: destination.z, tx: targetPos.x, ty: targetPos.y, tz: targetPos.z };
  new TWEEN.Tween(from)
    .to(to, 1600)
    .easing(TWEEN.Easing.Cubic.InOut)
    .onUpdate(() => {
      camera.position.set(from.x, from.y, from.z);
      controls.target.set(from.tx, from.ty, from.tz);
      controls.update();
    })
    .start();
}

function updateSuggestions() {
  const query = searchInput.value.trim().toLowerCase();
  if (!query) { searchSuggestions.style.display = 'none'; return; }
  const matches = mapLocations.locations
    .filter(loc => loc.name.toLowerCase().includes(query) && shouldIncludeLocation(loc))
    .slice(0, 8);
  searchSuggestions.innerHTML = '';
  if (!matches.length) { searchSuggestions.style.display = 'none'; return; }
  matches.forEach(loc => {
    const button = document.createElement('button');
    button.textContent = loc.name;
    button.addEventListener('click', () => {
      searchInput.value = loc.name;
      searchSuggestions.style.display = 'none';
      flyToLocation(loc.lat, loc.lng, 420);
      openPopup(loc);
    });
    searchSuggestions.appendChild(button);
  });
  searchSuggestions.style.display = 'block';
}

function chooseSearchResult() {
  const query = searchInput.value.trim().toLowerCase();
  if (!query) return;
  const match = mapLocations.locations.find(loc => loc.name.toLowerCase() === query);
  if (match) {
    flyToLocation(match.lat, match.lng, 420);
    openPopup(match);
    searchSuggestions.style.display = 'none';
    return;
  }
  const fuzzy = mapLocations.locations.find(loc => loc.name.toLowerCase().includes(query));
  if (fuzzy) {
    flyToLocation(fuzzy.lat, fuzzy.lng, 420);
    openPopup(fuzzy);
    searchSuggestions.style.display = 'none';
  }
}

function updateMiniMap() {
  miniCtx.clearRect(0, 0, miniMap.width, miniMap.height);
  const img = new Image();
  img.src = createGlobeTexture();
  img.onload = () => {
    miniCtx.drawImage(img, 0, 0, miniMap.width, miniMap.height);
    const target = controls.target.clone().normalize();
    const lat = 90 - (Math.acos(target.y) * 180 / Math.PI);
    const lon = Math.atan2(target.z, target.x) * 180 / Math.PI - 180;
    const x = miniMap.width * ((lon + 180) / 360);
    const y = miniMap.height * ((90 - lat) / 180);
    miniCtx.beginPath();
    miniCtx.arc(x, y, 5, 0, Math.PI * 2);
    miniCtx.fillStyle = "rgba(255,98,126,0.95)";
    miniCtx.strokeStyle = "#fff";
    miniCtx.lineWidth = 2;
    miniCtx.fill();
    miniCtx.stroke();
  };
}

function debounce(fn, wait) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), wait);
  };
}

function pointerToMouse(event) {
  const rect = renderer.domElement.getBoundingClientRect();
  mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
}

function handlePointerMove(event) {
  if (event.target.closest('#controlPanel') || event.target.closest('#popup')) return;
  pointerToMouse(event);
  if (!globe.pointsMesh) return;
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObject(globe.pointsMesh, true);
  if (intersects.length) {
    const idx = intersects[0].index;
    const loc = currentVisibleLocations[idx];
    if (loc && loc !== hoveredLocation) {
      hoveredLocation = loc;
      updateGlobeData(true);
      renderer.domElement.style.cursor = "pointer";
    }
  } else if (hoveredLocation) {
    hoveredLocation = null;
    updateGlobeData(true);
    renderer.domElement.style.cursor = "auto";
  }
}

function handlePointerDown(event) {
  if (event.target.closest('#controlPanel') || event.target.closest('#popup')) return;
  pointerToMouse(event);
  if (!globe.pointsMesh) return;
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObject(globe.pointsMesh, true);
  if (intersects.length) {
    const idx = intersects[0].index;
    const loc = currentVisibleLocations[idx];
    if (loc) {
      openPopup(loc);
    }
  } else {
    closePopup();
  }
}

function initGlobe() {
  globeContainer.appendChild(renderer.domElement);
  scene.add(globe);
  scene.add(createAtmosphere());
  scene.add(createStarfield());

  globe.globeImageUrl(createGlobeTexture())
    .globeBumpImageUrl(createBumpTexture())
    .globeMaterial(new THREE.MeshPhongMaterial({
      specular: 0x999999,
      shininess: 10,
      emissive: 0x0a0d12,
      emissiveIntensity: 0.25,
      color: 0xffffff
    }))
    .atmosphereColor("rgba(135,206,255,0.16)")
    .atmosphereAltitude(0.04);

  buildCategoryButtons();
  updateGlobeData(true);
  updateMiniMap();
  loadingOverlay.classList.add('hidden');

  toggleTrailer.addEventListener('change', () => { activeSources.trailer = toggleTrailer.checked; updateGlobeData(true); });
  toggleLeak.addEventListener('change', () => { activeSources.leak = toggleLeak.checked; updateGlobeData(true); });
  toggleCommunity.addEventListener('change', () => { activeSources.community = toggleCommunity.checked; updateGlobeData(true); });
  toggleComparison.addEventListener('change', () => { showComparison = toggleComparison.checked; updateGlobeData(true); });

  searchInput.addEventListener('input', debounce(() => { updateSuggestions(); }, 120));
  searchInput.addEventListener('keydown', (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      chooseSearchResult();
    }
  });

  document.addEventListener('click', (event) => {
    if (!event.target.closest('#searchGroup')) searchSuggestions.style.display = 'none';
  });

  renderer.domElement.addEventListener('pointermove', handlePointerMove);
  renderer.domElement.addEventListener('pointerdown', handlePointerDown);
  window.addEventListener('resize', onWindowResize);
  animate();
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);
  const elapsed = performance.now() * 0.00012;
  directionalLight.position.set(320 * Math.cos(elapsed), 200, 320 * Math.sin(elapsed));
  ambientLight.intensity = 0.35 + Math.sin(elapsed * 0.8) * 0.05;
  controls.update();
  TWEEN.update();
  updatePopupPosition();
  updateMiniMap();
  updateGlobeData();
  renderer.render(scene, camera);
}

initGlobe();


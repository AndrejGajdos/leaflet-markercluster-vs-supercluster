const map = L.map("map", {
  center: [39.6444, -104.98793],
  zoom: 12,
  preferCanvas: true,
});

new L.tileLayer("https://{s}.tile.osm.org/{z}/{x}/{y}.png", {
  attribution: `&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors`,
  detectRetina: true,
}).addTo(map);

const markerIcon = L.icon({
  iconSize: [25, 41],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
  iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png`,
  shadowUrl: "https://unpkg.com/leaflet@1.5.1/dist/images/marker-shadow.png",
});

let mcg = null;

const generateMarkers = (count) => {
  const southWest = new L.latLng(39.60463011823322, -105.0667190551758);
  const northEast = new L.latLng(39.68393975392733, -104.90947723388673);
  const bounds = new L.latLngBounds(southWest, northEast);

  const minLat = bounds.getSouthWest().lat,
    rangeLng = bounds.getNorthEast().lat - minLat,
    minLng = bounds.getSouthWest().lng,
    rangeLat = bounds.getNorthEast().lng - minLng;

  const result = Array.from({ length: count }, (v, k) => {
    return {
      id: k,
      pos: new L.latLng(
        minLat + Math.random() * rangeLng,
        minLng + Math.random() * rangeLat
      ),
    };
  });
  return result;
};

const markersData = generateMarkers(500000);

console.log(`markers created at ${new Date().toUTCString()}`);

const clusterComponents = markersData.map((asset) => {
  lng = asset.pos.lng;
  lat = asset.pos.lat;
  return {
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [lng, lat],
    },
    properties: {},
  };
});

const markers = L.geoJson(null, {
  pointToLayer: createClusterIcon,
}).addTo(map);

function createClusterIcon(feature, latlng) {
  if (!feature.properties.cluster) return L.marker(latlng);

  const count = feature.properties.point_count;
  const size = count < 100 ? "small" : count < 1000 ? "medium" : "large";
  const icon = L.divIcon({
    html: `<div><span>${feature.properties.point_count_abbreviated}</span></div>`,
    className: `marker-cluster marker-cluster-${size}`,
    iconSize: L.point(40, 40),
  });

  return L.marker(latlng, { icon });
}

index = new Supercluster({
  radius: 60,
  extent: 256,
  maxZoom: 17,
}).load(clusterComponents);

const bounds = map.getBounds();
const bbox = [
  bounds.getWest(),
  bounds.getSouth(),
  bounds.getEast(),
  bounds.getNorth(),
];
const zoom = map.getZoom();

const clusters = index.getClusters(bbox, zoom);

markers.clearLayers();
markers.addData(clusters);

console.log(`cluster created at ${new Date().toUTCString()}`);

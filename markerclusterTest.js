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

let mcg = L.markerClusterGroup();

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

const markers = generateMarkers(500000);

console.log(`markers created at ${new Date().toUTCString()}`);

const clusterComponents = markers.map((asset) => {
  return L.marker(asset.pos, {
    icon: markerIcon,
  });
});

mcg.addLayers(clusterComponents);
map.addLayer(mcg);

console.log(`cluster created at ${new Date().toUTCString()}`);

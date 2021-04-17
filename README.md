# leaflet-markercluster-vs-supercluster

Performance comparison of Leaflet markercluster and supercluster.

If you want to run tests locally for:

- leaflet markercluster - open `markerCluster.html`, edit `const markersData = generateMarkers(500000);` in `markerclusterTest.js` to change number of markers

- Supercluster - open `superCluster.html`, edit `const markersData = generateMarkers(500000);` in `superclusterTest.js` to change number of markers

Leaflet markercluster initial loading is too slow with 100k markers.

In my case leaflet markercluster loading takes:

- 500k - 6 mins
- 400k - 3 mins
- 300k - 2 mins 11 sec
- 250k - 1 min 24 sec
- 200k - 52 sec
- 150k - 30 sec

Supercluster loading 500k markers takes 1-2 sec.

// Map
var map;

// Create object to define tile provider settings and transformations.
var projectedTiles = {
    "EPSG:3571 Bering Sea": L.PolarMap.layer3571,
    "EPSG:3572 Alaska": L.PolarMap.layer3572,
    "EPSG:3573 Canada": L.PolarMap.layer3573,
    "EPSG:3574 Atlantic": L.PolarMap.layer3574,
    "EPSG:3575 Europe": L.PolarMap.layer3575,
    "EPSG:3576 Russia": L.PolarMap.layer3576
};

// Set up next/prev linked list
$.each(projectedTiles, function (layerName, layer) {
    var keys = Object.keys(projectedTiles);
    var index = keys.indexOf(layerName);
    var prev = (index === 0) ? keys.length - 1 : index - 1;
    var next = (index === keys.length - 1) ? 0 : index + 1;

    layer.prev = projectedTiles[keys[prev]];
    layer.next = projectedTiles[keys[next]];
});

// Initialization
$(document).ready(function () {
    Autosize.enable();

    // Load PolarMap
    map = L.PolarMap.map('map', {
        baseLayer: projectedTiles["EPSG:3571 Bering Sea"],
        center: [90, 0],
        zoom: 2
    });

    // Add Layer Control
    var layersControl = L.control.layers(projectedTiles, null);
    layersControl.addTo(map);

    // Add shapefiles
    var boundsLimit = L.latLngBounds([45, -180], [90, 180]);

    // Yedoma Domain Map
    var Domain = L.shapefile("assets/Yedoma_Domain/IRYP_v2_yedoma_domain", {
    });

    layersControl.addOverlay(Domain, "Yedoma Domain");

    // Yedoma Confidence Map
    var Confidence = L.shapefile("assets/Yedoma_Confidence/IRYP_v2_yedoma_confidence_downsample", {
        onEachFeature: function (feature, layer) {
            layer.on('click', function () {
                if (layer.feature && layer.feature.properties) {
                    var properties = layer.feature.properties;
                    var confidence = properties.confidence;
                    var popupContent = "<h4>Confidence/Sicherheit: " + confidence + "</h4>";
                    layer.bindPopup(popupContent).openPopup();
                }
            });
            if (layer.feature.properties.confidence == 'confirmed') {
                layer.setStyle({ fillColor: 'green', color: "green" });
            } else if (layer.feature.properties.confidence == 'likely') {
                layer.setStyle({ fillColor: 'yellow', color: "yellow" });
            } else if (layer.feature.properties.confidence == 'uncertain') {
                layer.setStyle({ fillColor: 'orange', color: "orange" });
            }
        }
    });

    layersControl.addOverlay(Confidence, "Yedoma Confidence Classification");

    // Permafrost Extent Map
    var Permafrost = L.shapefile("assets/Permafrost_Extent/permaice", {
        fillColor: 'grey', color: "grey"
    });

    layersControl.addOverlay(Permafrost, "Overall Permafrost Area");


    // Rotation controls
    var getBaseLayer = function () {
        var foundLayer = null;
        $.each(projectedTiles, function (layerName, layer) {
            if (map.hasLayer(layer)) {
                foundLayer = layer;
            }
        });
        return foundLayer;
    };

    var rotationControls = L.PolarMap.Control.rotation({
        onRotateCW: function () {
            map.loadTileProjection(getBaseLayer().next);
        },

        onRotateCCW: function () {
            map.loadTileProjection(getBaseLayer().prev);
        }
    });
    rotationControls.addTo(map);

    // Set location hash
    var hash = L.PolarMap.Util.hash(map, {
        getBaseLayer: function () {
            return getBaseLayer().options.name;
        },

        setBaseLayer: function (name) {
            $.each(projectedTiles, function (layerName, layer) {
                if (layer.options.name === name) {
                    map.loadTileProjection(layer);
                }
            });
        }
    });

    // Icon for Pleistocenepark Marker
    var pp_icon = L.icon({
        iconUrl: 'icons/bison.png',
        iconAnchor: [16, 37],
        popupAnchor: [0, -37],
    });

    // Marker Pleistocenepark
    L.marker([68.516, 161.435], { icon: pp_icon }).addTo(map).bindPopup(`<h4>Pleistocene Park</h4>`).openPopup();

    // Set View to Marker Position
    map.setView([68.516, 161.435], 5);

    // Create a legend
    var legend = L.control({ position: 'bottomright' });
    legend.onAdd = function (map) {
        var div = L.DomUtil.create('div', 'legend');
        div.innerHTML =
            '<h4>Legend - Yedoma Confidence</h4>' +
            '<div class="legend-item">' +
            '<div class="legend-box legend-box--blue"></div>' +
            '<p>Yedoma Domain</p>' +
            '</div>' +
            '<div class="legend-item">' +
            '<div class="legend-box legend-box--green"></div>' +
            '<p>Confirmed</p>' +
            '</div>' +
            '<div class="legend-item">' +
            '<div class="legend-box legend-box--yellow"></div>' +
            '<p>Likely</p>' +
            '</div>' +
            '<div class="legend-item">' +
            '<div class="legend-box legend-box--orange"></div>' +
            '<p>Uncertain</p>' +
            '</div>';
        return div;
    };

    legend.addTo(map);
});
function uploadFeatures(feature) {
    $.ajax({
        type: 'POST',
        url: '/annotations',
        data: JSON.stringify(feature),
        contentType: "application/json",
        dataType: "json",
        success: function(data) {
            geoJSON.features.push(changeCoordinatesForPoint(data));
            geoJSON.features.push(changeCoordinatesForLine(data));
            console.log("Data added!");
            populateAnnotationsList(geoJSON.features);
        }
    });
}

function updateFeatures(feature) {
    var __feature = getFeatureForId(feature.id);
    feature.properties = __feature.peoperties;
    $.ajax({
        type: 'PUT',
        url: '/annotations/' + __feature._id,
        data: JSON.stringify(feature),
        contentType: "application/json",
        dataType: "json",
        success: function(data) {
            var index = featureIds.indexOf(feature.id);
            geoJSON.features[index] = changeCoordinatesForPoint(data);
            geoJSON.features[index] = changeCoordinatesForLine(data);
            console.log("Data updated!", data);
            populateAnnotationsList(geoJSON.features);
        }
    });
}

function deleteFeatures(feature) {
    $.ajax({
        type: 'DELETE',
        url: '/annotations/' + getIdForFeature(feature),
        contentType: "application/json",
        dataType: "json",
        success: function(data) {
            console.log("Data deleted!", data);
            var index = featureIds.indexOf(feature.id);
            if (index !== -1) {
                featureIds.splice(index, 1);
                geoJSON.features.splice(index, 1);
                populateAnnotationsList(geoJSON.features);
            }
        }
    });
}

function changeCoordinatesForLines(){
  for (var i = 0; i < geoJSON.features.length; i++) {
      if (geoJSON.features[i].geometry.type === 'LineString') {
          var lineFeatures=geoJSON.features[i];
          var lineCordinatesArray=lineFeatures.geometry.coordinates;
          for (var j=0; j<lineFeatures.geometry.coordinates.length; j++){
              lineFeatures.geometry.coordinates[j] = [lineCordinatesArray[j][0][0], lineCordinatesArray[j][1][0]];
            }
        }
    }
}

function changeCoordinatesForLine(feature) {
    if (feature.geometry.type === 'LineString') {
      var coordinatesArray=feature.geometry.coordinates;
        for (var i=0; i<feature.geometry.coordinates.length; i++){
          feature.geometry.coordinates[i] = [coordinatesArray[i][0][0], coordinatesArray[i][1][0]];
        }
          return feature;
        }
    else {
        return feature;
    }

}


function getIdForFeature(feature) {
    var index = featureIds.indexOf(feature.id);
    if (index >= 0) {
        return geoJSON.features[index]._id;
    } else {
        return undefined;
    }
}

function getFeatureForId(id) {
    var index = featureIds.indexOf(id);
    return geoJSON.features[index];
}

function changeCoordinatesForPoints() {
    for (var i = 0; i < geoJSON.features.length; i++) {
        if (geoJSON.features[i].geometry.type === 'Point') {
            var coordinatesArray = geoJSON.features[i].geometry.coordinates;
            geoJSON.features[i].geometry.coordinates = [coordinatesArray[0][0][0], coordinatesArray[1][0][0]];
        }
    }
}

function getLocalIdForFeatureId(id) {
    for (var i = 0; i < geoJSON.features.length; i++) {
        if (geoJSON.features[i]._id === id) {
            return featureIds[i];
        }
    }
}

function getFeatureForFeatureId(id) {
    for (var i = 0; i < geoJSON.features.length; i++) {
        if (geoJSON.features[i]._id === id) {
            return geoJSON.features[i];
        }
    }
}

function changeCoordinatesForPoint(feature) {
    if (feature.geometry.type === 'Point') {
        var coordinatesArray = feature.geometry.coordinates;
        feature.geometry.coordinates = [coordinatesArray[0][0][0], coordinatesArray[1][0][0]];
        return feature;
    } else {
        return feature;
    }
}

function getPopupCoordinatesForPolygon(geometry) {
    if (geometry.type === 'Point') {
        return geometry.coordinates;
    } else if (geometry.type === 'LineString') {
        return geometry.coordinates[0];
    } else {
        return geometry.coordinates[0][0];
    }
}

function getAreaForFeature(feature) {
    console.log(turf);
    var area = turf.area(feature);
    return rounded_area = Math.round(area * 100) / 100;
}

function getLengthForFeature(feature) {
    var length = turf.lineDistance(feature, 'kilometers');
    return round_length = Math.round(length * 100) / 100;
}

function showPopup(location, title, description) {
    var text = '<strong>' + title + '</strong><p>' + description + '</p>';
    new mapboxgl.Popup({ offset: 25 })
        .setLngLat(location)
        .setHTML(text)
        .addTo(map);
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

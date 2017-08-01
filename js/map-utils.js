function uploadFeatures(feature) {
    $.ajax({
        type: 'POST',
        url: '/annotations',
        data: JSON.stringify(feature),
        contentType: "application/json",
        dataType: "json",
        success: function(data) {
            geoJSON.features.push(changeCoordinatesForPoint(data));
            console.log("Data added!");
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
            console.log("Data updated!", data);
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
        }
    });
}

function getIdForFeature(feature) {
    var index = featureIds.indexOf(feature.id);
    if(index >= 0) {
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
    for(var i = 0; i < geoJSON.features.length; i++) {
        if(geoJSON.features[i].geometry.type === 'Point') {
            var coordinatesArray = geoJSON.features[i].geometry.coordinates;
            geoJSON.features[i].geometry.coordinates = [coordinatesArray[0][0][0], coordinatesArray[1][0][0]];
        }
    }
}

function changeCoordinatesForPoint(feature) {
    if(feature.geometry.type === 'Point') {
        var coordinatesArray = feature.geometry.coordinates;
        feature.geometry.coordinates = [coordinatesArray[0][0][0], coordinatesArray[1][0][0]];
        return feature;
    } else {
        return feature;
    }
}

function getPopupCoordinatesForPolygon(geometry) {
    if(geometry.type === 'Point') {
        return geometry.coordinates;
    } else {
        return geometry.coordinates[0][0];
    }
}

function getAreaForFeature(feature) {
    console.log(turf);
    var area = turf.area(feature);
    return rounded_area = Math.round(area*100)/100;
}
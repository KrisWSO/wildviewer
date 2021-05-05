// initializing the map

var map = L.map('mapid').setView([44.36192230989849, -75.13109922316076], 15);

L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
}).addTo(map);


// drawing property boundary

var latlngs = [
    [44.363894859460295, -75.140497479927],
    [44.36751376048332, -75.13265990590243],
    [44.368643917654296, -75.13362551224154],
    [44.36954396732997, -75.13143396451187],
    [44.368346153814684, -75.13063402592371],
    [44.369625174151224, -75.128106409339],
    [44.36872850939005, -75.12730173738643],
    [44.36888754150004, -75.12706033580066],
    [44.368657452350284, -75.12683786767259],
    [44.36834277013795, -75.12722127019117],
    [44.36781152856921, -75.12762833953616],
    [44.36766602845082, -75.12746740514565],
    [44.36746638816531, -75.12760467271403],
    [44.367506993024286, -75.12791234140178],
    [44.36736149214943, -75.1280401422413],
    [44.366840393005276, -75.1279975419626],
    [44.36610610910199, -75.12754787234205],
    [44.36528721939578, -75.12741060477423],
    [44.363940425490355, -75.12775614037733],
    [44.35979676719813, -75.12713835888069],
    [44.35586716350095, -75.13597000389275],
    [44.363894859460295, -75.140497479927]
];

var polyline = L.polyline(latlngs, {color: '#008080'}).addTo(map);

map.fitBounds(polyline.getBounds());

// adding circle markers

var locations = [{
    "type": "Feature",
    "properties": {
        "locationID": "1",
        "name": "Back Bay Dam",
    },
    "geometry": {
        "type": "Point",
        "coordinates": [-75.13519678086112, 44.359852852866034]
    }
}, {
    "type": "Feature",
    "properties": {
        "locationID": "2",
        "name": "Mink Falls Dam",
    },
    "geometry": {
        "type": "Point",
        "coordinates": [-75.131191143284, 44.35934570496737]
    } 
}];

var basicCircleStyle = {
    radius: 6,
    fillColor: "#0090c9",
    color: "#0090c9",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
};


var clickedCircleStyle = {
	radius: 7,
    fillColor: "#e55934",
    color: "#e55934",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
};

var allCircles = L.featureGroup() // initialize a variable to store all the circles after they are added to the map. Allows access to group to reset stytle.

L.geoJSON(locations, {
    pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, basicCircleStyle).on("click", circleClick);
    },
    onEachFeature: function (feature, layer) {
        layer.bindPopup('<p>'+feature.properties.name+'</p>')
    }
}).addTo(map).addTo(allCircles)

var selectedLocationID
var selectedLocationName
function circleClick(e) {
	window.selectedLocationID = e.target.feature.properties.locationID;
	window.selectedLocationName = e.target.feature.properties.name;
	allCircles.setStyle(basicCircleStyle);
	e.target.setStyle(clickedCircleStyle);
	console.log(selectedLocationID);
	buildGallery()
}

// if map is clicked, clear location selection.
map.on('click', clearSelection)

function clearSelection() {
	window.selectedLocationID = null;
	window.selectedLocationID = null;
	allCircles.setStyle(basicCircleStyle);
	console.log(selectedLocationID);
	buildGallery()
}


// Build Gallery HTML
var imageList = [
  {
    "location": "Back Bay Dam",
    "image": "IMG_0017.JPG",
    "species": "Fisher",
    "timestamp": "4/3/2021 6:10"
  },
  {
    "location": "Back Bay Dam",
    "image": "IMG_0018.JPG",
    "species": "Fisher",
    "timestamp": "4/3/2021 6:10"
  },
  {
    "location": "Back Bay Dam",
    "image": "IMG_0019.JPG",
    "species": "Fisher",
    "timestamp": "4/3/2021 7:01"
  },
  {
    "location": "Back Bay Dam",
    "image": "IMG_0020.JPG",
    "species": "Fisher",
    "timestamp": "4/3/2021 8:33"
  },
  {
    "location": "Back Bay Dam",
    "image": "IMG_0023.JPG",
    "species": "Fisher",
    "timestamp": "4/5/2021 12:46"
  },
  {
    "location": "Back Bay Dam",
    "image": "IMG_0024.JPG",
    "species": "Fisher",
    "timestamp": "4/5/2021 12:58"
  },
  {
    "location": "Back Bay Dam",
    "image": "IMG_0139.JPG",
    "species": "Otter",
    "timestamp": "4/7/2021 13:32"
  },
  {
    "location": "Back Bay Dam",
    "image": "IMG_0140.JPG",
    "species": "Otter",
    "timestamp": "4/7/2021 13:32"
  },
  {
    "location": "Back Bay Dam",
    "image": "IMG_0142.JPG",
    "species": "Otter",
    "timestamp": "4/7/2021 13:36"
  },
  {
    "location": "Back Bay Dam",
    "image": "IMG_0208.JPG",
    "species": "Porcupine",
    "timestamp": "4/7/2021 18:45"
  },
  {
    "location": "Back Bay Dam",
    "image": "IMG_0209.JPG",
    "species": "Porcupine",
    "timestamp": "4/7/2021 18:45"
  },
  {
    "location": "Back Bay Dam",
    "image": "IMG_0210.JPG",
    "species": "Porcupine",
    "timestamp": "4/7/2021 18:45"
  },
  {
    "location": "Back Bay Dam",
    "image": "IMG_0211.JPG",
    "species": "Racoon",
    "timestamp": "4/8/2021 1:15"
  },
  {
    "location": "Back Bay Dam",
    "image": "IMG_0212.JPG",
    "species": "Otter",
    "timestamp": "4/8/2021 5:42"
  },
  {
    "location": "Back Bay Dam",
    "image": "IMG_0213.JPG",
    "species": "Otter",
    "timestamp": "4/8/2021 5:42"
  },
  {
    "location": "Back Bay Dam",
    "image": "IMG_0214.JPG",
    "species": "Deer",
    "timestamp": "4/8/2021 7:24"
  },
  {
    "location": "Back Bay Dam",
    "image": "IMG_0215.JPG",
    "species": "Deer",
    "timestamp": "4/8/2021 7:25"
  },
  {
    "location": "Back Bay Dam",
    "image": "IMG_0216.JPG",
    "species": "Deer",
    "timestamp": "4/8/2021 7:25"
  },
  {
    "location": "Back Bay Dam",
    "image": "IMG_0470.JPG",
    "species": "Snapping Turtle",
    "timestamp": "4/8/2021 13:11"
  },
  {
    "location": "Back Bay Dam",
    "image": "IMG_0471.JPG",
    "species": "Snapping Turtle",
    "timestamp": "4/8/2021 13:11"
  },
  {
    "location": "Back Bay Dam",
    "image": "IMG_0527.JPG",
    "species": "Turtle",
    "timestamp": "4/8/2021 13:34"
  },
  {
    "location": "Back Bay Dam",
    "image": "IMG_0528.JPG",
    "species": "Turtle",
    "timestamp": "4/8/2021 13:34"
  },
  {
    "location": "Back Bay Dam",
    "image": "IMG_0529.JPG",
    "species": "Turtle",
    "timestamp": "4/8/2021 13:34"
  },
  {
    "location": "Back Bay Dam",
    "image": "IMG_0530.JPG",
    "species": "Turtle",
    "timestamp": "4/8/2021 13:35"
  },
  {
    "location": "Back Bay Dam",
    "image": "IMG_0546.JPG",
    "species": "Turtle",
    "timestamp": "4/8/2021 13:44"
  },
  {
    "location": "Back Bay Dam",
    "image": "IMG_0547.JPG",
    "species": "Turtle",
    "timestamp": "4/8/2021 13:44"
  },
  {
    "location": "Back Bay Dam",
    "image": "IMG_0548.JPG",
    "species": "Turtle",
    "timestamp": "4/8/2021 13:44"
  },
  {
    "location": "Back Bay Dam",
    "image": "IMG_0549.JPG",
    "species": "Turtle",
    "timestamp": "4/8/2021 13:44"
  },
  {
    "location": "Back Bay Dam",
    "image": "IMG_0550.JPG",
    "species": "Turtle",
    "timestamp": "4/8/2021 13:44"
  },
  {
    "location": "Back Bay Dam",
    "image": "IMG_0551.JPG",
    "species": "Turtle",
    "timestamp": "4/8/2021 13:45"
  },
  {
    "location": "Back Bay Dam",
    "image": "IMG_0552.JPG",
    "species": "Turtle",
    "timestamp": "4/8/2021 13:45"
  },
  {
    "location": "Back Bay Dam",
    "image": "IMG_0553.JPG",
    "species": "Turtle",
    "timestamp": "4/8/2021 13:45"
  },
  {
    "location": "Back Bay Dam",
    "image": "IMG_0654.JPG",
    "species": "Snapping Turtle",
    "timestamp": "4/8/2021 15:44"
  },
  {
    "location": "Back Bay Dam",
    "image": "IMG_0655.JPG",
    "species": "Snapping Turtle",
    "timestamp": "4/8/2021 15:45"
  },
  {
    "location": "Back Bay Dam",
    "image": "IMG_0668.JPG",
    "species": "Porcupine",
    "timestamp": "4/8/2021 23:13"
  },
  {
    "location": "Back Bay Dam",
    "image": "IMG_0669.JPG",
    "species": "Porcupine",
    "timestamp": "4/8/2021 23:13"
  },
  {
    "location": "Back Bay Dam",
    "image": "IMG_0670.JPG",
    "species": "Porcupine",
    "timestamp": "4/9/2021 2:14"
  },
  {
    "location": "Back Bay Dam",
    "image": "IMG_0671.JPG",
    "species": "Porcupine",
    "timestamp": "4/9/2021 2:53"
  },
  {
    "location": "Back Bay Dam",
    "image": "IMG_0672.JPG",
    "species": "Porcupine",
    "timestamp": "4/9/2021 2:54"
  },
  {
    "location": "Back Bay Dam",
    "image": "IMG_0673.JPG",
    "species": "Porcupine",
    "timestamp": "4/9/2021 2:58"
  },
  {
    "location": "Back Bay Dam",
    "image": "IMG_0674.JPG",
    "species": "Porcupine",
    "timestamp": "4/9/2021 2:58"
  },
  {
    "location": "Back Bay Dam",
    "image": "IMG_0675.JPG",
    "species": "Porcupine",
    "timestamp": "4/9/2021 3:13"
  },
  {
    "location": "Back Bay Dam",
    "image": "IMG_0676.JPG",
    "species": "Porcupine",
    "timestamp": "4/9/2021 3:13"
  },
  {
    "location": "Back Bay Dam",
    "image": "IMG_0677.JPG",
    "species": "Porcupine",
    "timestamp": "4/9/2021 3:14"
  },
  {
    "location": "Back Bay Dam",
    "image": "IMG_0679.JPG",
    "species": "Racoon",
    "timestamp": "4/9/2021 4:40"
  },
  {
    "location": "Back Bay Dam",
    "image": "IMG_0680.JPG",
    "species": "Racoon",
    "timestamp": "4/9/2021 4:40"
  },
  {
    "location": "Back Bay Dam",
    "image": "IMG_0681.JPG",
    "species": "Otter",
    "timestamp": "4/9/2021 6:27"
  },
  {
    "location": "Back Bay Dam",
    "image": "IMG_0739.JPG",
    "species": "Otter",
    "timestamp": "4/9/2021 13:31"
  },
  {
    "location": "Back Bay Dam",
    "image": "IMG_0754.JPG",
    "species": "Racoon",
    "timestamp": "4/9/2021 20:51"
  },
  {
    "location": "Back Bay Dam",
    "image": "IMG_0755.JPG",
    "species": "Racoon",
    "timestamp": "4/9/2021 20:51"
  },
  {
    "location": "Back Bay Dam",
    "image": "IMG_0756.JPG",
    "species": "Racoon",
    "timestamp": "4/9/2021 21:43"
  },
  {
    "location": "Back Bay Dam",
    "image": "IMG_0757.JPG",
    "species": "Racoon",
    "timestamp": "4/9/2021 21:43"
  },
  {
    "location": "Back Bay Dam",
    "image": "IMG_0758.JPG",
    "species": "Racoon",
    "timestamp": "4/9/2021 21:43"
  },
  {
    "location": "Mink Falls Dam",
    "image": "IMG_0010.JPG",
    "species": "Racoon",
    "timestamp": "4/3/2021 1:08"
  },
  {
    "location": "Mink Falls Dam",
    "image": "IMG_0035.JPG",
    "species": "Racoon",
    "timestamp": "4/8/2021 21:21"
  },
  {
    "location": "Mink Falls Dam",
    "image": "IMG_0045.JPG",
    "species": "Deer",
    "timestamp": "4/11/2021 19:03"
  },
  {
    "location": "Mink Falls Dam",
    "image": "IMG_0057.JPG",
    "species": "Racoon",
    "timestamp": "4/15/2021 21:43"
  },
  {
    "location": "Mink Falls Dam",
    "image": "IMG_0070.JPG",
    "species": "Coyote",
    "timestamp": "4/20/2021 12:11"
  },
  {
    "location": "Mink Falls Dam",
    "image": "IMG_0105.JPG",
    "species": "Racoon",
    "timestamp": "4/22/2021 20:42"
  },
  {
    "location": "Mink Falls Dam",
    "image": "IMG_0106.JPG",
    "species": "Racoon",
    "timestamp": "4/23/2021 02:39"
  },
  {
    "location": "Mink Falls Dam",
    "image": "IMG_0107.JPG",
    "species": "Deer",
    "timestamp": "4/25/2021 01:02"
  },
  {
    "location": "Mink Falls Dam",
    "image": "IMG_0113.JPG",
    "species": "Racoon",
    "timestamp": "4/26/2021 21:16"
  },
  {
    "location": "Mink Falls Dam",
    "image": "IMG_0115.JPG",
    "species": "Racoon",
    "timestamp": "4/27/2021 21:19"
  },
  {
    "location": "Mink Falls Dam",
    "image": "IMG_0117.JPG",
    "species": "Racoon",
    "timestamp": "4/28/2021 04:47"
  },
  {
    "location": "Mink Falls Dam",
    "image": "IMG_0118.JPG",
    "species": "Racoon",
    "timestamp": "4/28/2021 20:46"
  },
  {
    "location": "Mink Falls Dam",
    "image": "IMG_0125.JPG",
    "species": "Racoon",
    "timestamp": "5/1/2021 21:02"
  },
  {
    "location": "Mink Falls Dam",
    "image": "IMG_0126.JPG",
    "species": "Racoon",
    "timestamp": "5/1/2021 23:55"
  },
  {
    "location": "Mink Falls Dam",
    "image": "IMG_0128.JPG",
    "species": "Racoon",
    "timestamp": "5/2/2021 02:54"
  },
  {
    "location": "Mink Falls Dam",
    "image": "IMG_0129.JPG",
    "species": "Racoon",
    "timestamp": "5/2/2021 03:54"
  },
  {
    "location": "Mink Falls Dam",
    "image": "IMG_0131.JPG",
    "species": "Racoon",
    "timestamp": "5/2/2021 20:42"
  },
  {
    "location": "Mink Falls Dam",
    "image": "IMG_0132.JPG",
    "species": "Racoon",
    "timestamp": "5/2/2021 20:43"
  },
  {
    "location": "Mink Falls Dam",
    "image": "IMG_0133.JPG",
    "species": "Racoon",
    "timestamp": "5/2/2021 23:47"
  },
  {
    "location": "Mink Falls Dam",
    "image": "IMG_0134.JPG",
    "species": "Racoon",
    "timestamp": "5/3/2021 03:03"
  },
  {
    "location": "Mink Falls Dam",
    "image": "IMG_0136.JPG",
    "species": "Racoon",
    "timestamp": "5/3/2021 20:45"
  },
  {
    "location": "Mink Falls Dam",
    "image": "IMG_0137.JPG",
    "species": "Racoon",
    "timestamp": "5/4/2021 03:28"
  },
  {
    "location": "Back Bay Dam",
    "image": "IMG_0930.JPG",
    "species": "Otter",
    "timestamp": "5/1/2021 13:49"
  },
  {
    "location": "Back Bay Dam",
    "image": "IMG_0940.JPG",
    "species": "Deer",
    "timestamp": "5/2/2021 18:59"
  },
  {
    "location": "Back Bay Dam",
    "image": "IMG_0941.JPG",
    "species": "Deer",
    "timestamp": "5/2/2021 19:01"
  },
  {
    "location": "Back Bay Dam",
    "image": "IMG_0942.JPG",
    "species": "Turkey",
    "timestamp": "5/3/2021 11:26"
  },
  {
    "location": "Back Bay Dam",
    "image": "IMG_0943.JPG",
    "species": "Deer",
    "timestamp": "5/4/2021 14:44"
  },
  {
    "location": "Back Bay Dam",
    "image": "IMG_0944.JPG",
    "species": "Deer",
    "timestamp": "5/4/2021 14:46"
  },
  {
    "location": "Back Bay Dam",
    "image": "IMG_0945.JPG",
    "species": "Deer",
    "timestamp": "5/4/2021 14:46"
  }
]


// Build Gallery
document.onload = buildGallery();

function buildGallery() {
	if (selectedLocationID == null) {
		document.getElementById('gallery').innerHTML = "Select a location on the map to view images.";
		document.getElementById('galleryTitle').innerHTML = "Photos from Selected Location"
	} else {

		document.getElementById('gallery').innerHTML = '';

		selectedImages = imageList.filter(function(item){ // filters json image data to select just images to display
			return item.location == selectedLocationName
		});

		$.each(selectedImages, function() {
			var imgPath = "images\\wildlife\\"+this.location+'\\'+this.image
			$("#gallery").append('<a href =\"'+imgPath+'\" data-lightbox="gallery"><img width = 250px src =\"'+imgPath+'\"></a>');
		})

		document.getElementById('galleryTitle').innerHTML = "Photos from " + selectedLocationName

	}
}


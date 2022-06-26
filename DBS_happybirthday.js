	mapboxgl.accessToken = 'pk.eyJ1IjoiZ3JvdW5kY2xvdGhsZWUiLCJhIjoiY2t5djBndGwyMXN0ajJ2bnVoY3c2c281byJ9.CLTXfi2GgI5dXQFfCufljA';
    const geojson = {
        'type': 'FeatureCollection',
        'features': [
            {
                'type': 'Feature',
                'properties': {
                    'divid': 'hongkong',
                    'icon': 'https://i.imgur.com/SS85Ath.png'
                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': [120.251828728287,23.0291046270866]
                }
            },
            {
                'type': 'Feature',
                'properties': {
                    'divid': 'noo',
                    'icon': 'https://i.imgur.com/JlYxLu8.png'
                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': [120.198153008081,22.9894598905378]
                }
            },
            {
                'type': 'Feature',
                'properties': {
                    'divid': 'hamb',
                    'icon':'https://i.imgur.com/8Oa0BkF.png'
                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': [120.20595110243076,22.99561100185745]
                }
            },
            {
                'type': 'Feature',
                'properties': {
                    'divid': 'momshrip',
                    'icon':'https://i.imgur.com/rffmcDl.png'
                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': [120.226967883054,23.0185852431367]
                }
            }
        ]
    };



// collect all the divs
var divs = document.querySelectorAll(".imgpop");
// get window width and height
var winWidth = window.innerWidth*0.8;
var winHeight = window.innerHeight*0.8;



// function that returns a random number between a min and max
function getRandomNumber(min, max) {
    
  return Math.random() * (max - min) + min;
    
}



	
	//pop animation
function popup(divid) {
	
  var imgpop = document.querySelectorAll(".imgpop");
  var winWidth = window.innerWidth*0.8;
  var winHeight = window.innerHeight*0.8;

  for (var i = 0; i < imgpop.length; i++) {
	var thisDiv = imgpop[i];
    var thisid = imgpop[i].id;

	
	
	
	//var now_opa = window.getComputedStyle(imgpop[i]).getPropertyValue("opacity");

    if (thisid == divid) {
			
	randomTop = getRandomNumber(100, winHeight);
    randomLeft = getRandomNumber(100, winWidth);
	
	thisDiv.style.top = randomTop +"px";
    thisDiv.style.left = randomLeft +"px";
		
      imgpop[i].classList.add("active");
    } 
		
	else {
	
      imgpop[i].classList.remove("active");
    }
  }
}
	
	
	
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/groundclothlee/cl3tzaq75000114rpqv3j7ufd',
        center: [120.22027300315239,23.01255212285196],
        zoom: 12,
		boxZoom:true
    });

    // Add markers to the map.
    for (const marker of geojson.features) {
        // Create a DOM element for each marker.
        const el = document.createElement('div');
		const icon = marker.properties.icon;
		
        el.className = 'marker';
		el.style.width ='20%';
		el.style.height = '50%';
        el.style.background = `url(${icon})no-repeat center`;
        el.style.backgroundSize = '100%';

        

		//event 
		//el.addEventListener('click', () => {
        //    window.alert(marker.properties.message);
        //});
		el.addEventListener('click', () => {
            popup(marker.properties.divid);

        });
		

		
		
        new mapboxgl.Marker(el)
            .setLngLat(marker.geometry.coordinates)
            .addTo(map);
    }






//removeall const

//Get the button:
mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
//window.onscroll = function() {scrollFunction()};

function removeall() {
  var imgpop = document.querySelectorAll(".imgpop");

  for (var i = 0; i < imgpop.length; i++) {
      imgpop[i].classList.remove("active");
	  
    }
  }

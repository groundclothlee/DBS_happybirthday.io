mapboxgl.accessToken = 'pk.eyJ1IjoiZ3JvdW5kY2xvdGhsZWUiLCJhIjoiY2t5djBndGwyMXN0ajJ2bnVoY3c2c281byJ9.CLTXfi2GgI5dXQFfCufljA';




// collect all the divs
var divs = document.querySelectorAll(".imgpop");
// get window width and height
var winWidth = window.innerWidth;
var winHeight = window.innerHeight;

var mousePosition;
var offset = [0,0];
var isDown = false;


// function that returns a random number between a min and max
function getRandomNumber(min, max) {    
  return Math.random() * (max - min) + min;    
}


//move
function filter(e) {
  let target = e.target;

  if (!target.classList.contains("stiker_in")) {
    return;
  }

  target.moving = true;

  //NOTICE THIS  Check if Mouse events exist on users' device
  if (e.clientX) {
    target.oldX = e.clientX; // If they exist then use Mouse input
    target.oldY = e.clientY;
  } else {
    target.oldX = e.touches[0].clientX; // Otherwise use touch input
    target.oldY = e.touches[0].clientY;
  }

  target.oldLeft = window.getComputedStyle(target).getPropertyValue('left').split('px')[0] * 1;
  target.oldTop = window.getComputedStyle(target).getPropertyValue('top').split('px')[0] * 1;

  document.onmousemove = dr;
  document.ontouchmove = dr;


  function dr(event) {
    event.preventDefault();

    if (!target.moving) {
      return;
    }

    if (event.clientX) {
      target.distX = event.clientX - target.oldX;
      target.distY = event.clientY - target.oldY;
    } else {
      target.distX = event.touches[0].clientX - target.oldX;
      target.distY = event.touches[0].clientY - target.oldY;
    }


    target.style.left = target.oldLeft + target.distX + "px";
    target.style.top = target.oldTop + target.distY + "px";
  }

  function endDrag() {
    target.moving = false;
  }
  target.onmouseup = endDrag;

  target.ontouchend = endDrag;

}



document.onmousedown = filter;

document.ontouchstart = filter;





	
	//pop animation
function popup(divid) {
	
	
  var imgpop = document.querySelectorAll(".imgpop");
  var winWidth = window.innerWidth;
  var winHeight = window.innerHeight;  
  

  for (var i = 0; i < imgpop.length; i++) {
	var thisDiv = imgpop[i];
    var thisid = imgpop[i].id;
	var opa = window.getComputedStyle(thisDiv).getPropertyValue("opacity");
	var theimg = imgpop[i].children[0];
	


    if (thisid == divid & opa == 0) {
		
		//random position		
		randomTop = getRandomNumber(winHeight*0.05, winHeight*0.95);
		randomLeft = getRandomNumber(winWidth*0.05, winWidth*0.95);
		deg = getRandomNumber(-45,45)
		
		thisDiv.style.top = randomTop +"px";
		thisDiv.style.left = randomLeft +"px";
		
		theimg.style.transform = 'rotate('+deg+'deg)'; 
		
		//anumation
		thisDiv.classList.remove("leave");
		thisDiv.classList.add("active");	//
		
		thisDiv.addEventListener('click', () => {
            mousemove(thisDiv);

        });
		
		
    } 
	
	//sth like click again
	else if (opa == 1) {
		thisDiv.classList.add("leave");	
		thisDiv.classList.remove("active");
	    } 
	
	
	
	else {
		thisDiv.classList.remove("leave");
		thisDiv.classList.remove("active");
    }
  }
}
	
// Add stikers to the map.
    for (const stiker of stikers.features) {
		
        // Create a DOM element for each marker.
        const el_sti = document.createElement('div');
		const icon_sti = stiker.properties.icon

		el_sti.id = stiker.properties.divid
        el_sti.className = stiker.properties.cla;
		el_sti.style.width ='20%';
		el_sti.style.height = '20%';
        el_sti.style.background = `url(${icon_sti})no-repeat center`;
		//el_sti.style.backgroundColor = 'red';
        el_sti.style.backgroundSize = 'contain';	

		//el_sti.innerHTML = "<img src='${icon_sti}'>";		
		el_sti.innerHTML = "<p>  </p>";	
		
		document.body.appendChild(el_sti);	

    }


	
	
//map	
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
		el.style.height = '20%';
        el.style.background = `url(${icon})no-repeat center`;
        el.style.backgroundSize = 'contain';
		        

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


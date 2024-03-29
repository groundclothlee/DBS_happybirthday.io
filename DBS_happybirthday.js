//20220820
//DeeYeeLee to RonnieYeh
//Happy Birthday!

mapboxgl.accessToken = 'pk.eyJ1IjoiZ3JvdW5kY2xvdGhsZWUiLCJhIjoiY2t5djBndGwyMXN0ajJ2bnVoY3c2c281byJ9.CLTXfi2GgI5dXQFfCufljA';


//loading animation

 window.onload = function(){
     setTimeout(function(){
         var loader = document.getElementsByClassName("loader-wrapper")[0];
         loader.style.display = "none";
     },800)
 }



// get window width and height
var winWidth = window.innerWidth;
var winHeight = window.innerHeight;



// function that returns a random number between a min and max
function getRandomNumber(min, max) {    
  return Math.random() * (max - min) + min;    
}


//document.addEventListener('touchmove', this._preventDefault, { passive: false });

//move
function filter(e) {

  let target = e.target;
	
  //filter id
  if (!target.classList.contains("stiker_in")) {
    return;
  }

  target.moving = true;
  

 
  if (e.clientX) {
    target.oldX = e.clientX; 
    target.oldY = e.clientY;
  } else {
    target.oldX = e.touches[0].clientX; 
    target.oldY = e.touches[0].clientY;
  }

  target.oldLeft = window.getComputedStyle(target).getPropertyValue('left').split('px')[0] * 1;
  target.oldTop = window.getComputedStyle(target).getPropertyValue('top').split('px')[0] * 1;

  document.onmousemove = dr;
  document.ontouchmove = dr;
  
  //drag
	
  function dr(event) {	  
  
	//event.preventDefault();
	//event.stopPropagation();
	
	//filter id
    if (!target.moving) {
      return;
    }
	
	window.addEventListener('touchmove', ev => {
	  if (target.moving) {
		ev.preventDefault();
		ev.stopImmediatePropagation();
	  };
	}, { passive: false });
	
	

//	if(e.touches.length > 1){
        //multi-touch
        //prevent the behavior
//       e.preventDefault()
	//}
	
  
	

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
	
	
	//end drog
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
  

  for (var i = 0; i < imgpop.length; i++) {
	var thisDiv = imgpop[i];
    var thisid = imgpop[i].id;
	var opa = window.getComputedStyle(thisDiv).getPropertyValue("opacity");
	var winWidth = window.innerWidth;
	var winHeight = window.innerHeight;
	var DEdiv = document.getElementById("DE");
	


    if (thisid == divid & opa == 0) {
		
		//random position		
		randomTop = getRandomNumber(winHeight*0.05, winHeight*0.8);
		randomLeft = getRandomNumber(winWidth*0.05, winWidth*0.8);
		deg = getRandomNumber(-45,45)
		
		thisDiv.style.top = randomTop +"px";
		thisDiv.style.left = randomLeft +"px";		
		thisDiv.style.transform = 'rotate('+deg+' deg)'; 
		//thisDiv.style.transform = 'rotate(90deg)';
		// --change:rotate(0);

		
		//animation
		thisDiv.classList.remove("activee");
		thisDiv.classList.remove("leave");
		thisDiv.classList.add("active");	//
		
    } 
	
	//sth like click again
	else if (opa == 1) {
		thisDiv.classList.add("leave");	
		thisDiv.classList.remove("active");
	    } 	
	
	else {
		thisDiv.classList.remove("leave");
		//thisDiv.classList.remove("active");
    }
  }
}
	
	
//open DE copyright
function openDE() {
	var DEdiv =  document.getElementById("DE");
	
	DEdiv.addEventListener('click', () => {
    openDE();

    });

	
	var DE_opa = window.getComputedStyle(DEdiv).getPropertyValue("opacity");
	
	if (DE_opa==0){
		DEdiv.classList.remove("scale-up-tl")
		DEdiv.classList.remove("scale-down-tl")	
		DEdiv.classList.add("scale-up-tl")
	}

	else {
		DEdiv.classList.add("scale-down-tl")
		//DEdiv.classList.remove("scale-up-tl")	
		
	}
	
}





//map	
//https://docs.mapbox.com/mapbox-gl-js/api/map/
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/groundclothlee/cl3tzaq75000114rpqv3j7ufd',
        center: [120.21617556768315,23.000327371358434],
        zoom: 13.8,
		doubleClickZoom:false,
		boxZoom:true,	
		
    });






var stickerdiv = document.getElementById("sticker");
	
// Add stikers to the map.
    for (const stiker of stikers.features) {
		
        // Create a DOM element for each marker.
		
        const el_sti = document.createElement('div');
		const icon_sti = stiker.properties.icon

		el_sti.id = stiker.properties.divid;
        el_sti.className = stiker.properties.cla;
		
		//el_sti.style.width ='20%';
		//el_sti.style.height = '20%';
		
		el_sti.style.width =stiker.properties.w;
		el_sti.style.height = stiker.properties.h;

		
        el_sti.style.background = `url(${icon_sti})no-repeat center`;
		//el_sti.style.backgroundColor = 'red';
		
        el_sti.style.backgroundSize = 'contain';	
        el_sti.style.display = 'inline-block';
		
		//el_sti.style.transform = 'rotate(90deg)';

		//el_sti.innerHTML = "<img src='${icon_sti}'>";		
		el_sti.innerHTML = "<p></p>";	
		
		stickerdiv.appendChild(el_sti);	

    }





// Add markers to the map.
    for (const marker of geojson.features) {
        // Create a DOM element for each marker.
        const el = document.createElement('div');
		const icon = marker.properties.icon;
		
        el.className = 'marker';
		el.style.width =( winWidth*0.05 )+'px';
		el.style.height = ( winWidth*0.05 )+'px';

		el.style.minWidth ='80px';
		el.style.minHeight ='80px';
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






//remove all stickers

//Get the button:
mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
//window.onscroll = function() {scrollFunction()};

function removeall() {
  var imgpop = document.querySelectorAll(".imgpop");
  var DEdiv =  document.getElementById("DE");
  
  DEdiv.classList.remove("scale-up-tl")

  for (var i = 0; i < imgpop.length; i++) {
      imgpop[i].classList.remove("active");
	  
	  
    }
  }


	mapboxgl.accessToken = 'pk.eyJ1IjoiZ3JvdW5kY2xvdGhsZWUiLCJhIjoiY2t5djBndGwyMXN0ajJ2bnVoY3c2c281byJ9.CLTXfi2GgI5dXQFfCufljA';
    const geojson = {
        'type': 'FeatureCollection',
        'features': [
            {
                'type': 'Feature',
                'properties': {
                    'message': '超級無敵蝦蝦燒賣',
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
                    'message': '紅茶好喝誠實鍋燒',
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
                    'message': '穿短褲去',
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
                    'message': '好好吃蝦蝦',
                    'icon':'https://i.imgur.com/rffmcDl.png'
                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': [120.226967883054,23.0185852431367]
                }
            }
        ]
    };

    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/groundclothlee/cl3tzaq75000114rpqv3j7ufd',
        center: [120.20595110243076,22.99561100185745],
        zoom: 13,
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

        el.addEventListener('click', () => {
            window.alert(marker.properties.message);
        });

        // Add markers to the map.
        new mapboxgl.Marker(el)
            .setLngLat(marker.geometry.coordinates)
            .addTo(map);
    }
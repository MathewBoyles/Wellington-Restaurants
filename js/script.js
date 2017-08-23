var fb_token;
var popup_id;
var map, marker, infobox;
var markers = [];
var markerLocations = [{
    'place': 'Lorettas',
    'fb_id': '407702692702904',
    'lat': -41.2943592,
    'lng': 174.7753067
  },
  {
    'place': 'Five Boroughs',
    'fb_id': 'fiveboroughsnz',
    'lat': -41.294281,
    'lng': 174.784976
  },
  {
    'place': 'Sweet mothers',
    'fb_id': '196714513687573',
    'lat': -41.2942663,
    'lng': 174.7832352
  },
  {
    'place': 'Dragons',
    'fb_id': 'WellingtonDragons',
    'lat': -41.2930319,
    'lng': 174.7815826
  },
  {
    'place': 'Ortega',
    'fb_id': '171328776240092',
    'lat': -41.2943537,
    'lng': 174.7848696
  },
  {
    'place': 'Nandos',
    'fb_id': 'Nandos',
    'lat': -41.2926429,
    'lng': 174.7794958
  },
  {
    'place': 'Big Thumb',
    'fb_id': 'BigThumbChineseRestaurant',
    'lat': -41.2929024,
    'lng': 174.7826877
  },
  {
    'place': 'Crab Shack',
    'fb_id': 'CrabShackWGN',
    'lat': -41.2846651,
    'lng': 174.7791097
  },
  {
    'place': 'Dynasty',
    'fb_id': '',
    'lat': -41.134147,
    'lng': 174.83931
  },
  {
    'place': 'Burger King',
    'fb_id': 'BurgerKingNZ',
    'lat': -41.291003,
    'lng': 174.776764
  },
  {
    'place': 'Mekong Cafe',
    'fb_id': 'MekongcafeNZ',
    'lat': -41.294934,
    'lng': 174.775795
  },
  {
    'place': 'The Oaks',
    'fb_id': '151124838097',
    'lat': -41.2916393,
    'lng': 174.7767167
  },
  {
    'place': 'Viva Mexico',
    'fb_id': '185318438283867',
    'lat': -41.3128611,
    'lng': 174.7797865
  },
  {
    'place': 'Olive Cafe',
    'fb_id': '410321435844094',
    'lat': -41.2943711,
    'lng': 174.7749263
  },
  {
    'place': 'Abrakebabra',
    'fb_id': 'kebabcentral.co.nz',
    'lat': -41.2909774,
    'lng': 174.7764203
  },
  {
    'place': 'Little India',
    'fb_id': 'littleindiaonline',
    'lat': -41.292631,
    'lng': 174.77614
  },
  {
    'place': 'Customs Brew Bar',
    'fb_id': 'coffeesupremenz',
    'lat': -41.29358,
    'lng': 174.77621
  },
  {
    'place': 'Six Barrel Cafe',
    'fb_id': 'sixbarrelsodaco',
    'lat': -41.2921256,
    'lng': 174.7774789
  },
  {
    'place': 'Husk',
    'fb_id': 'huskbar',
    'lat': -41.293014,
    'lng': 174.775106
  },
  {
    'place': 'Puro Chile',
    'fb_id': 'purochilewellington',
    'lat': -41.2867563,
    'lng': 174.775872
  },
  {
    'place': 'Cicio Cacio',
    'fb_id': 'osteriaciciocacio',
    'lat': -41.313102,
    'lng': 174.779933
  },
  {
    'place': 'Enigma',
    'fb_id': 'EnigmaCafeNZ',
    'lat': -41.2924698,
    'lng': 174.7793674
  },
  {
    'place': 'Joe\'s Garage',
    'fb_id': 'JoesGarageSumner',
    'lat': -41.2924802,
    'lng': 174.7818218
  },
  {
    'place': 'Prefab',
    'fb_id': 'PrefabEatery',
    'lat': -41.2955892,
    'lng': 174.7784688
  },
  {
    'place': 'Lone Star',
    'fb_id': 'LoneStarWaitakere',
    'lat': -41.294375,
    'lng': 174.780545
  },
  {
    'place': 'Monsoon Poon',
    'fb_id': 'monsoonpoon',
    'lat': -41.2930769,
    'lng': 174.7831731
  },
  {
    'place': 'Beach Babylon',
    'fb_id': 'beachbabylon',
    'lat': -41.291438,
    'lng': 174.7941375
  },
  {
    'place': 'Kilim',
    'fb_id': 'KilimCafePetone',
    'lat': -41.2239984,
    'lng': 174.8745722
  },
  {
    'place': 'Buddha Stix',
    'fb_id': '297547646942699',
    'lat': -41.2272323,
    'lng': 174.8841316
  },
  {
    'place': 'Aroy',
    'fb_id': 'TakaAroyDee',
    'lat': -41.2923466,
    'lng': 174.7762906
  },
  {
    'place': 'Forage',
    'fb_id': '',
    'lat': -41.2936859,
    'lng': 174.7696188
  },
  {
    'place': 'Subway',
    'fb_id': 'subway',
    'lat': -41.2842567,
    'lng': 174.7749646
  },
  {
    'place': 'Indian Taj',
    'fb_id': '414831955313156',
    'lat': -41.2904399,
    'lng': 174.7741311
  },
  {
    'place': 'Grill Meats Beer',
    'fb_id': 'grillmeatsbeer.co.nz',
    'lat': -41.295561,
    'lng': 174.774516
  },
  {
    'place': 'Portlander',
    'fb_id': 'PortlanderBarAndGrill',
    'lat': -41.281023,
    'lng': 174.778522
  },
  {
    'place': 'El Matador',
    'fb_id': 'ElMatadorWellington',
    'lat': -41.294958,
    'lng': 174.7746409
  },
  {
    'place': 'Ekim Burger',
    'fb_id': '201864206519644',
    'lat': -41.2961785,
    'lng': 174.7742578
  },
  {
    'place': 'Counter Culture',
    'fb_id': 'countercultureboardgamecafe',
    'lat': -41.2944616,
    'lng': 174.7729038
  }
];

window.fbAsyncInit = function() {
  FB.init({
    appId: '122652615051267',
    autoLogAppEvents: true,
    xfbml: true,
    version: 'v2.10'
  });
  FB.AppEvents.logPageView();
};

(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {
    return;
  }
  js = d.createElement(s);
  js.id = id;
  js.src = '//connect.facebook.net/en_US/sdk.js';
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function showPopup(fb_id, fb_or) {
  popup_id = fb_id;
  if (!fb_token) {
    FB.login(
      function(response) {
        if (response.status == 'connected') {
          fb_token = response.authResponse.accessToken;
          showPopup(popup_id);
        } else {
          alert('Facebook denied.');
        }
      }
    );
    return;
  }

  FB.api(
    '/' + popup_id,
    'GET', {
      'fields': 'about,picture,name,overall_star_rating,cover,checkins,description,phone,hours'
    },
    function(response) {
      console.log(response);
    }
  );
}

function init() {
  var mapOptions = {
    center: {
      lat: -41.2950049,
      lng: 174.7814311
    },
    zoom: 14,
    disableDefaultUI: false,
    scrollwheel: true,
    draggable: true,
    draggableCursor: 'pointer',
    draggingCursor: 'crosshair',
    fullscreenControl: true,
    backgroundColor: 'grey',
    ketboardShortcuts: false,
    mapTypeControlOptions: {
      position: google.maps.ControlPosition.TOP_CENTER
    },
    styles: [{
        elementType: 'geometry',
        stylers: [{
          color: '#ebe3cd'
        }]
      },
      {
        elementType: 'labels.text.fill',
        stylers: [{
          color: '#72A98F'
        }]
      },
      {
        elementType: 'labels.text.stroke',
        stylers: [{
          color: '#f5f1e6'
        }]
      },
      {
        stylers: [{
            hue: '#556b2f'
          },
          {
            saturation: -20
          }
        ]
      },
      {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [{
            hue: '#556b2f'
          },
          {
            lightness: 0
          },
          {
            visibility: 'simplified'
          }
        ]
      },
      {
        featureType: 'transit',
        elementType: 'labels',
        stylers: [{
            hue: '#ff0066'
          },
          {
            saturation: +80
          }
        ]
      },
      {
        featureType: 'water',
        stylers: [{
            hue: '#3D5A6C'
          },
          {
            lightness: 0
          }
        ]
      },
      {
        featureType: 'landscape.natural',
        elementType: 'geometry',
        stylers: [{
          color: '#dfd2ae'
        }]
      },
      {
        featureType: 'administrative',
        elementType: 'geometry.stroke',
        stylers: [{
          color: '#c9b2a6'
        }]
      },
      {
        featureType: 'administrative.land_parcel',
        elementType: 'geometry.stroke',
        stylers: [{
          color: '#dcd2be'
        }]
      },
      {
        featureType: 'poi',
        elementType: 'geometry',
        stylers: [{
          color: '#dfd2ae'
        }]
      },
      {
        featureType: 'poi',
        elementType: 'labels.text.fill',
        stylers: [{
          color: '#93817c'
        }]
      },
      {
        featureType: 'poi.park',
        elementType: 'geometry.fill',
        stylers: [{
          color: '#a5b076'
        }]
      },
      {
        featureType: 'poi.park',
        elementType: 'labels.text.fill',
        stylers: [{
          color: '#447530'
        }]
      },
      {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [{
          color: '#f5f1e6'
        }]
      },
      {
        featureType: 'road.arterial',
        elementType: 'geometry',
        stylers: [{
          color: '#fdfcf8'
        }]
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [{
          color: '#f8c967'
        }]
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [{
          color: '#e9bc62'
        }]
      },
      {
        featureType: 'road.highway.controlled_access',
        elementType: 'geometry',
        stylers: [{
          color: '#e98d58'
        }]
      },
      {
        featureType: 'road.highway.controlled_access',
        elementType: 'geometry.stroke',
        stylers: [{
          color: '#db8555'
        }]
      },
      {
        featureType: 'road.local',
        elementType: 'labels.text.fill',
        stylers: [{
          color: '#806b63'
        }]
      },
      {
        featureType: 'transit.line',
        elementType: 'geometry',
        stylers: [{
          color: '#dfd2ae'
        }]
      },
      {
        featureType: 'transit.line',
        elementType: 'labels.text.fill',
        stylers: [{
          color: '#8f7d77'
        }]
      },
      {
        featureType: 'transit.line',
        elementType: 'labels.text.stroke',
        stylers: [{
          color: '#ebe3cd'
        }]
      },
      {
        featureType: 'transit.station',
        elementType: 'geometry',
        stylers: [{
          color: '#dfd2ae'
        }]
      }
    ]
  }

  map = new google.maps.Map(document.getElementById('map'), mapOptions)
  addAllMarkers();
};

google.maps.event.addDomListener(window, 'load', init);

function addAllMarkers() {
  for (var i = 0; i < markerLocations.length; i++) {
    marker = new google.maps.Marker({
      position: {
        lat: markerLocations[i].lat,
        lng: markerLocations[i].lng
      },
      map: map,
      animation: google.maps.Animation.DROP,
      icon: 'img/icon.png',
      fb_id: markerLocations[i].fb_id,
      i: i
    });
    markers.push(marker);

    google.maps.event.addListener(marker, "click", function() {
      showPopup(this.fb_id);
    });
  };
}

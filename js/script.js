var fb_token;
var popup_id;
var map, marker, infobox;
var markers = [];

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
  $.ajax({
    url: '/js/locations.json',
    dataType: 'json',
    success: function(markerLocations) {
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
  });
}

function showPopup(fb_id, fb_or) {
  popup_id = fb_id;

  $('#loading').fadeIn('fast');

  if (!fb_token) {
    FB.login(
      function(response) {
        if (response.status == 'connected') {
          fb_token = response.authResponse.accessToken;
          showPopup(popup_id);
        } else {
          alert('Facebook denied.');
          $('#loading').fadeOut('fast');
        }
      }
    );
    return;
  }

  if ($('#sidebar').is(':visible')) {
    $('#sidebar').animate({
      'right': '-1000px'
    }, 500, getData);
  } else getData();

  function getData() {
    FB.api(
      '/' + popup_id,
      'GET', {
        'fields': 'about,picture,name,overall_star_rating,cover,description,phone,hours,contact_address,username,category,website,link,rating_count'
      },
      function(response) {
        console.log(response);

        $('#sidebar').css({
          'right': '-1000px'
        }).show().animate({
          'right': '0'
        }, 500, function(){
          $('#loading').fadeOut('fast');
        });

        if (response.cover) {
          $('#sidebarCover img').show().css({
            'transform': 'translate(' + (0 - response.cover.offset_x) + 'px, ' + (0 - response.cover.offset_y) + 'px)'
          }).attr('src', response.cover.source);
        } else $('#sidebarCover img').hide();

        $('#profilePicture img').attr('src', response.picture.data.url);
        $('#profileName').html(response.name);
        $('#userName').html(response.username ? ('@' + response.username) : '&nbsp;');
        $('#locationClass').html(response.category);

        if (response.phone) $('#locationPhone').show().find('span').html(response.phone);
        else $('#locationPhone').hide();
        if (response.website) $('#locationWebsite').show().find('a').attr('href', response.website);
        else $('#locationWebsite').hide();

        $('#locationAbout span').text(response.about);
        $('#facebookLink a').attr('href', response.link);

        if (response.overall_star_rating) {
          $('#facebookRating p').text(response.overall_star_rating + ' / 5 (' + response.rating_count + ' reviews)');
          $('#facebookRating i').show().removeClass('fa-star').removeClass('fa-star-half-o').addClass('fa-star-o');
          $('#facebookRating i').each(function(i) {
            if (i + 1 <= response.overall_star_rating) $(this).removeClass('fa-star-o').addClass('fa-star');
            else if (i + 1 <= Math.round(response.overall_star_rating)) $(this).removeClass('fa-star-o').addClass('fa-star-half-o');
          });
        } else {
          $('#facebookRating p').text('No rating available');
          $('#facebookRating i').hide();
        }

      }
    );
  }
}

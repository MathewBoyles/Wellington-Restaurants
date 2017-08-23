var fb_token;
var popup_id;

window.fbAsyncInit = function() {
  FB.init({
    appId            : '122652615051267',
    autoLogAppEvents : true,
    xfbml            : true,
    version          : 'v2.10'
  });
  FB.AppEvents.logPageView();
};

(function(d, s, id){
   var js, fjs = d.getElementsByTagName(s)[0];
   if (d.getElementById(id)) {return;}
   js = d.createElement(s); js.id = id;
   js.src = '//connect.facebook.net/en_US/sdk.js';
   fjs.parentNode.insertBefore(js, fjs);
 }(document, 'script', 'facebook-jssdk'));

function showPopup(fb_id, fb_or) {
  popup_id = fb_id;
  if(!fb_token) {
    FB.login(
      function(response) {
        if(response.status == 'connected') {
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
    'GET',
    {'fields':'about,picture,name,overall_star_rating,cover,checkins,description,phone,hours'},
    function(response) {
      console.log(response);
    }
  );
}

var map, marker, infobox;
var markers = [];
var markerLocations = [

{'Place':'Lorettas','FBID':'407702692702904','Lat':-41.2943592,'Lng':174.7753067},
{'Place':'Five Boroughs','FBID':'fiveboroughsnz','Lat':-41.294281,'Lng':174.784976},
{'Place':'Sweet mothers','FBID':'196714513687573','Lat':-41.2942663,'Lng':174.7832352},
{'Place':'Dragons','FBID':'WellingtonDragons','Lat':-41.2930319,'Lng':174.7815826},
{'Place':'Ortega','FBID':'171328776240092','Lat':-41.2943537,'Lng':174.7848696},
{'Place':'Nandos','FBID':'Nandos','Lat':-41.2926429,'Lng':174.7794958},
{'Place':'Big Thumb','FBID':'BigThumbChineseRestaurant','Lat':-41.2929024,'Lng':174.7826877},
{'Place':'Crab Shack','FBID':'CrabShackWGN','Lat':-41.2846651,'Lng':174.7791097},
{'Place':'Dynasty','FBID':'','Lat':-41.134147,'Lng':174.83931},
{'Place':'Burger King','FBID':'BurgerKingNZ','Lat':-41.291003,'Lng':174.776764},
{'Place':'Mekong Cafe','FBID':'MekongcafeNZ','Lat':-41.294934,'Lng':174.775795},
{'Place':'The Oaks','FBID':'151124838097','Lat':-41.2916393,'Lng':174.7767167},
{'Place':'Viva Mexico','FBID':'185318438283867','Lat':-41.3128611,'Lng':174.7797865},
{'Place':'Olive Cafe','FBID':'410321435844094','Lat':-41.2943711,'Lng':174.7749263},
{'Place':'Abrakebabra','FBID':'kebabcentral.co.nz','Lat':-41.2909774,'Lng':174.7764203},
{'Place':'Little India','FBID':'littleindiaonline','Lat':-41.292631,'Lng':174.77614},
{'Place':'Customs Brew Bar','FBID':'coffeesupremenz','Lat':-41.29358,'Lng':174.77621},
{'Place':'Six Barrel Cafe','FBID':'sixbarrelsodaco','Lat':-41.2921256,'Lng':174.7774789},
{'Place':'Husk','FBID':'huskbar','Lat':-41.293014,'Lng':174.775106},
{'Place':'Puro Chile','FBID':'purochilewellington','Lat':-41.2867563,'Lng':174.775872},
{'Place':'Cicio Cacio','FBID':'osteriaciciocacio','Lat':-41.313102,'Lng':174.779933},
{'Place':'Enigma','FBID':'EnigmaCafeNZ','Lat':-41.2924698,'Lng':174.7793674},
{'Place':'Joe\'s Garage','FBID':'JoesGarageSumner','Lat':-41.2924802,'Lng':174.7818218},
{'Place':'Prefab','FBID':'PrefabEatery','Lat':-41.2955892,'Lng':174.7784688},
{'Place':'Lone Star','FBID':'LoneStarWaitakere','Lat':-41.294375,'Lng':174.780545},
{'Place':'Monsoon Poon','FBID':'monsoonpoon','Lat':-41.2930769,'Lng':174.7831731},
{'Place':'Beach Babylon','FBID':'beachbabylon','Lat':-41.291438,'Lng':174.7941375},
{'Place':'Kilim','FBID':'KilimCafePetone','Lat':-41.2239984,'Lng':174.8745722},
{'Place':'Buddha Stix','FBID':'297547646942699','Lat':-41.2272323,'Lng':174.8841316},
{'Place':'Aroy','FBID':'TakaAroyDee','Lat':-41.2923466,'Lng':174.7762906},
{'Place':'Forage','FBID':'','Lat':-41.2936859,'Lng':174.7696188},
{'Place':'Subway','FBID':'subway','Lat':-41.2842567,'Lng':174.7749646},
{'Place':'Indian Taj','FBID':'414831955313156','Lat':-41.2904399,'Lng':174.7741311},
{'Place':'Grill Meats Beer','FBID':'grillmeatsbeer.co.nz','Lat':-41.295561,'Lng':174.774516},
{'Place':'Portlander','FBID':'PortlanderBarAndGrill','Lat':-41.281023,'Lng':174.778522},
{'Place':'El Matador','FBID':'ElMatadorWellington','Lat':-41.294958,'Lng':174.7746409},
{'Place':'Ekim Burger','FBID':'201864206519644','Lat':-41.2961785,'Lng':174.7742578},
{'Place':'Counter Culture','FBID':'countercultureboardgamecafe','Lat':-41.2944616,'Lng':174.7729038}

];

function init(){

		var mapOptions = {
				//set where the map starts
				center : {
						lat: -41.2950049,
						lng: 174.7814311
				},
				zoom: 14, 
				disableDefaultUI: false, //turn off user interface
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
				styles: [
								{elementType: 'geometry', stylers: [{color: '#ebe3cd'}]},
								{elementType: 'labels.text.fill', stylers: [{color: '#72A98F'}]},
								{elementType: 'labels.text.stroke', stylers: [{color: '#f5f1e6'}]},
						{
								stylers:[
								{ hue: '#556b2f' },
								{ saturation: -20 }
								]
						}, 
						{
								featureType: 'road',
								elementType: 'geometry',
								stylers: [
										{  hue: '#556b2f' },
										{ lightness: 0 },
										{ visibility: 'simplified' }
								]

						},
						{
								featureType: 'transit',
								elementType: 'labels',
								stylers: [
										{hue: '#ff0066'},
										{saturation: +80}
								]
						},
						{
								featureType: 'water',
								stylers: [
										{  hue: '#3D5A6C' },
										{ lightness: 0 }
								]
										
						},
						 {
								featureType: 'landscape.natural',
								elementType: 'geometry',
								stylers: [{color: '#dfd2ae'}]
							},
							{
								featureType: 'administrative',
								elementType: 'geometry.stroke',
								stylers: [{color: '#c9b2a6'}]
							},
							{
								featureType: 'administrative.land_parcel',
								elementType: 'geometry.stroke',
								stylers: [{color: '#dcd2be'}]
							},
							{
								featureType: 'poi',
								elementType: 'geometry',
								stylers: [{color: '#dfd2ae'}]
							},
							{
								featureType: 'poi',
								elementType: 'labels.text.fill',
								stylers: [{color: '#93817c'}]
							},
							{
								featureType: 'poi.park',
								elementType: 'geometry.fill',
								stylers: [{color: '#a5b076'}]
							},
							{
								featureType: 'poi.park',
								elementType: 'labels.text.fill',
								stylers: [{color: '#447530'}]
							},
							{
								featureType: 'road',
								elementType: 'geometry',
								stylers: [{color: '#f5f1e6'}]
							},
							{
								featureType: 'road.arterial',
								elementType: 'geometry',
								stylers: [{color: '#fdfcf8'}]
							},
							{
								featureType: 'road.highway',
								elementType: 'geometry',
								stylers: [{color: '#f8c967'}]
							},
							{
								featureType: 'road.highway',
								elementType: 'geometry.stroke',
								stylers: [{color: '#e9bc62'}]
							},
							{
								featureType: 'road.highway.controlled_access',
								elementType: 'geometry',
								stylers: [{color: '#e98d58'}]
							},
							{
								featureType: 'road.highway.controlled_access',
								elementType: 'geometry.stroke',
								stylers: [{color: '#db8555'}]
							},
							{
								featureType: 'road.local',
								elementType: 'labels.text.fill',
								stylers: [{color: '#806b63'}]
							},
							{
								featureType: 'transit.line',
								elementType: 'geometry',
								stylers: [{color: '#dfd2ae'}]
							},
							{
								featureType: 'transit.line',
								elementType: 'labels.text.fill',
								stylers: [{color: '#8f7d77'}]
							},
							{
								featureType: 'transit.line',
								elementType: 'labels.text.stroke',
								stylers: [{color: '#ebe3cd'}]
							},
							{
								featureType: 'transit.station',
								elementType: 'geometry',
								stylers: [{color: '#dfd2ae'}]
							}
				]
		}

	map = new google.maps.Map(document.getElementById('map'), mapOptions)
	addAllMarkers();

	};


google.maps.event.addDomListener(window, 'load', init);

function addAllMarkers(){
	for (var i = 0; i < markerLocations.length; i++) {
		marker = new google.maps.Marker({
			position: {
				lat: markerLocations[i].Lat,
				lng: markerLocations[i].Lng
			},
			map: map,
			animation: google.maps.Animation.DROP,
			icon: 'img/icon.png',
			fb_id: markerLocations[i].FBID,
			i: i
		});
		markers.push(marker);

		google.maps.event.addListener(marker, "click", function(){
			console.log(this.fb_id);
		});
	};
}

// showPopup(fb_id)
var map, marker, infobox;
var markers = [];
var markerLocations = [

{"Place":"Lorettas","FB ID":"4.07703E+14","Lat":-41.2943592,"Lng":174.7753067},
{"Place":"Five Boroughs","FB ID":"fiveboroughsnz","Lat":-41.294281,"Lng":174.784976},
{"Place":"Sweet mothers","FB ID":"1.96715E+14","Lat":-41.2942663,"Lng":174.7832352},
{"Place":"Dragons","FB ID":"WellingtonDragons","Lat":-41.2930319,"Lng":174.7815826},
{"Place":"Ortega","FB ID":"1.71329E+14","Lat":-41.2943537,"Lng":174.7848696},
{"Place":"Nandos","FB ID":"Nandos","Lat":-41.2926429,"Lng":174.7794958},
{"Place":"Big Thumb","FB ID":"BigThumbChineseRestaurant","Lat":-41.2929024,"Lng":174.7826877},
{"Place":"Crab Shack","FB ID":"CrabShackWGN","Lat":-41.2846651,"Lng":174.7791097},
{"Place":"Valentines","FB ID":"CLOSED","Lat":-41.2242074,"Lng":174.8743884},
{"Place":"Dynasty","FB ID":"","Lat":-41.134147,"Lng":174.83931},
{"Place":"Burger King","FB ID":"BurgerKingNZ","Lat":-41.291003,"Lng":174.776764},
{"Place":"Mekong Cafe","FB ID":"MekongcafeNZ","Lat":-41.294934,"Lng":174.775795},
{"Place":"The Oaks","FB ID":"1.51125E+11","Lat":-41.2916393,"Lng":174.7767167},
{"Place":"Viva Mexico","FB ID":"1.85318E+14","Lat":-41.3128611,"Lng":174.7797865},
{"Place":"Olive Cafe","FB ID":"4.10321E+14","Lat":-41.2943711,"Lng":174.7749263},
{"Place":"Abrakebabra","FB ID":"kebabcentral.co.nz","Lat":-41.2909774,"Lng":174.7764203},
{"Place":"Little India","FB ID":"littleindiaonline","Lat":-41.292631,"Lng":174.77614},
{"Place":"Customs Brew Bar","FB ID":"coffeesupremenz","Lat":-41.29358,"Lng":174.77621},
{"Place":"Six Barrel Cafe","FB ID":"sixbarrelsodaco","Lat":-41.2921256,"Lng":174.7774789},
{"Place":"Husk","FB ID":"huskbar","Lat":-41.293014,"Lng":174.775106},
{"Place":"Puro Chile","FB ID":"purochilewellington","Lat":-41.2867563,"Lng":174.775872},
{"Place":"Cicio Cacio","FB ID":"osteriaciciocacio","Lat":-41.313102,"Lng":174.779933},
{"Place":"Enigma","FB ID":"EnigmaCafeNZ","Lat":-41.2924698,"Lng":174.7793674},
{"Place":"Joe's Garage","FB ID":"JoesGarageSumner","Lat":-41.2924802,"Lng":174.7818218},
{"Place":"Prefab","FB ID":"PrefabEatery","Lat":-41.2955892,"Lng":174.7784688},
{"Place":"Lone Star","FB ID":"LoneStarWaitakere","Lat":-41.294375,"Lng":174.780545},
{"Place":"Monsoon Poon","FB ID":"monsoonpoon","Lat":-41.2930769,"Lng":174.7831731},
{"Place":"Beach Babylon","FB ID":"beachbabylon","Lat":-41.291438,"Lng":174.7941375},
{"Place":"Kilim","FB ID":"KilimCafePetone","Lat":-41.2239984,"Lng":174.8745722},
{"Place":"Buddha Stix","FB ID":"2.97548E+14","Lat":-41.2272323,"Lng":174.8841316},
{"Place":"Aroy","FB ID":"TakaAroyDee","Lat":-41.2923466,"Lng":174.7762906},
{"Place":"Forage","FB ID":"","Lat":-41.2936859,"Lng":174.7696188},
{"Place":"Subway","FB ID":"subway","Lat":-41.2842567,"Lng":174.7749646},
{"Place":"Indian Taj","FB ID":"4.14832E+14","Lat":-41.2904399,"Lng":174.7741311},
{"Place":"Grill Meats Beer","FB ID":"grillmeatsbeer.co.nz","Lat":-41.295561,"Lng":174.774516},
{"Place":"Portlander","FB ID":"PortlanderBarAndGrill","Lat":-41.281023,"Lng":174.778522},
{"Place":"El Matador","FB ID":"ElMatadorWellington","Lat":-41.294958,"Lng":174.7746409},
{"Place":"Ekim Burger","FB ID":"2.01864E+14","Lat":-41.2961785,"Lng":174.7742578},
{"Place":"Counter Culture","FB ID":"countercultureboardgamecafe","Lat":-41.2944616,"Lng":174.7729038}

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
				draggableCursor: "pointer",
				draggingCursor: "crosshair",
				fullscreenControl: true,
				backgroundColor: "grey",
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
								{ hue: "#556b2f" },
								{ saturation: -20 }
								]
						}, 
						{
								featureType: "road",
								elementType: "geometry",
								stylers: [
										{  hue: "#556b2f" },
										{ lightness: 0 },
										{ visibility: "simplified" }
								]

						},
						{
								featureType: "transit",
								elementType: "labels",
								stylers: [
										{hue: "#ff0066"},
										{saturation: +80}
								]
						},
						{
								featureType: "water",
								stylers: [
										{  hue: "#3D5A6C" },
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

	map = new google.maps.Map(document.getElementById("map"), mapOptions)
	addAllMarkers();

	};


google.maps.event.addDomListener(window, 'load', init);

function addAllMarkers(){
	for (var i = 0; i < markerLocations.length; i++) {
		marker = new google.maps.Marker({
			position:{
				lat: markerLocations[i].Lat,
				lng: markerLocations[i].Lng
			},
			map: map,
			animation: google.maps.Animation.DROP
			// icon: "image/icon.png",

		})
		markers.push(marker);

	};
}

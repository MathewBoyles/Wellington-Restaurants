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

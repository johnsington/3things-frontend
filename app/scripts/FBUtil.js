import $ from 'jquery';
import ApiUtil from './apiUtil';
import cookie from 'cookies-js';

let api = ApiUtil();


//initializes Facebook SDK
window.fbAsyncInit = function() {
  FB.init({
    appId      : '734693083348034',
    xfbml      : true,
    version    : 'v2.8'
  });
  FB.AppEvents.logPageView();

  var event = new CustomEvent('fbload');

  document.dispatchEvent(event);
};

(function(d, s, id){
   var js, fjs = d.getElementsByTagName(s)[0];
   if (d.getElementById(id)) {return;}
   js = d.createElement(s); js.id = id;
   js.src = '//connect.facebook.net/en_US/sdk.js';
   fjs.parentNode.insertBefore(js, fjs);
 }(document, 'script', 'facebook-jssdk'));


export default function() {
  //once FB SDK is initialized, bind login to UI
  $(document).on('fbload', function (){
    function foo() {
      FB.getLoginStatus(function(res){
        if (res.status == 'connected'){
          FB.api('/me', {fields: 'name,email'}, function(response) {
            console.log(response);
          });
        }
        else if (res.status == 'not_authorized') {
          console.log('not authorized');
        } else {
          console.log(res); 
        }
      });
    }
      
    this.login = function() {
      FB.login(function(res){
        if (res.status == 'connected') {
          FB.api('/me', {fields: 'name,email'}, function(response) {
            response['fb_token'] = res.authResponse.accessToken;
            response['user_id'] = response.id;
            api.login(response, function() {
              window.location.assign(api.getClientUrl());
            });
          });
        }
        else {
          console.log('An error occurred in GET /me');
        }
      }, {scope: 'email'})
    };

    $('.login').click(this.login);

  });
}
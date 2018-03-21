// Please make sure this is run over HTTP and not HTTPS

$(document).ready(function(){
  
  $.getJSON("https://freegeoip.net/json/", function(ipGeo){
    var city = ipGeo.city
    //var country = ipGeo.country_name
    var api="https://api.openweathermap.org/data/2.5/weather?";
    var lat = "lat=" + ipGeo.latitude;
    var long = "&lon=" + ipGeo.longitude;
    var appid = "&APPID=894f152b37bf9b22da6f4ccbbf502844"
    var units = "&units=metric"

    var url = api + lat + long + appid + units   
    
    $.getJSON(url, function(data){
      if(data){
        var humidity = data.main.humidity;
        var windSpeed = data.wind.speed;
        var clouds = data.clouds.all;
        var celsius = data.main.temp;
        var fahrenheit = Math.round((celsius*1.8+32)*10)/10;
      }
      
      $("#city").html(city);
      $("#temp").html(fahrenheit +" "+" ℉"+ "|"+" °C");
//	"<img src= './images/weather.png'>"	
      $("#humidity").html("Humidity: "+humidity+"%");
      $("#windSpeed").html("Wind Speed: "+windSpeed+"m/s");
      $("#clouds").html("Clouds: " + clouds+"%");
     
        
      
        
      var tempChange = true;
      $("#temp").click(function(){
        if(tempChange === true){
          $("#temp").html(fahrenheit+"℉");
          tempChange = false;   
        } else{
          $("#temp").html(celsius+"°C")
          tempChange = true;
        }
      });
      
        
       var weather_img = [
        {title: "<li><img class='weather__today__image' src='images/sunny.png' alt='icon of a partially cloudy day'></li>"},
        {title: "<li><img class='weather__today__image' src='images/weather.png' alt='icon of a partially cloudy day'></li>"},
        {title: "<li><img class='weather__today__image' src='images/cloudy.png' alt='icon of a cloudy day'></li>"}, 
        {title: "<li><img class='weather__today__image' src='images/rain.png' alt='icon of a cloudy day'></li>"}
         
        ];
        
      if(celsius > 20 && clouds > 50){
        $("#weather__image").html(weather_img[0].title);  
      } else if (clouds > 50 && humidity > 70) {
         $("#weather__image").html(weather_img[3].title); 
      } else if (celsius > 20 && clouds < 50){
         $("#weather__image").html(weather_img[1].title);   
      } else if (celsius < 20 && clouds > 50){
        $("#weather__image").html(weather_img[2].title); 
      }else {
         $("#weather__image").html(weather_img[1].title); 
      }
        
        
       var currentTime = new Date();
       hour = currentTime.getHours();
       console.log("current Time is " + hour);
        
      var getImageSrc = '';
      if (hour < 7 || hour > 18){
          getImageSrc = 'https://78.media.tumblr.com/265482623fa3dc9c9138f9d0ad546fb9/tumblr_ovuttlPUr11v3aao4o1_500.gif';
      }else{
         getImageSrc = 'images/hero-bg.jpg';  
      }    
       $('.weather').css('background-image', 'url(' + getImageSrc + ')');
      $('.weather').css('background-size', 'cover');  
      $('.weather').css('repeat', 'no-repeat');    
    });
  });
    
   
   
    
function getQuote() {
    var cb = Math.round(new Date().getTime() / 1000);
    $.getJSON("https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&callback=" + cb, function(a) {
        console.log(a);
        var currentQuote = a[0].content;
        var quoteAuthor = a[0].title;
        console.log(currentQuote, quoteAuthor);
        $('.quote').html(currentQuote);
        $('.quote-author').html("-" + quoteAuthor);
    });
}
getQuote();	
	
	
});
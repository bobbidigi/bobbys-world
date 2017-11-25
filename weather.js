// Please make sure this is run over HTTP and not HTTPS

$(document).ready(function(){
  
  $.getJSON("http://freegeoip.net/json/", function(ipGeo){
    var city = ipGeo.city
    //var country = ipGeo.country_name
    var api="http://api.openweathermap.org/data/2.5/weather?";
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
      $("#temp").html(celsius+"°C");
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
      
/*      if(celsius > 20 && clouds > 50){
        $("body").css("background-image", "url(http://retouchthesky.com/wp-content/uploads/2014/08/IMG_4952.jpg)")   
      } else if (celsius > 20 && clouds < 50){
        $("body").css("background-image", "url(https://balancebox.files.wordpress.com/2012/04/dsc_0494-edit.jpg)")   
      } else if (celsius < 20 && clouds > 50){
        $("body").css("background-image", "url(https://asianspring.files.wordpress.com/2013/05/img_2402.jpg)")   
      } else {
        $("body").css("background-image", "url(http://way-up-north.com/wp-content/uploads/2016/04/ice-edge-and-blue-sky.jpg)")  
      } */
      
      
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
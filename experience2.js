//Local storage 
window.onload = function(e){
  document.getElementById('locationName').value = localStorage.getItem('userInput');
}
const valid = true;

//Created javascript event listener to detect form submission when 'Find KWHEST' button has been clicked
document.getElementById('submitDestination').addEventListener('click', function (){
  document.getElementById('experienceContent').innerHTML='';
  //console.log('submitted')
  const location = document.getElementById('locationName').value;
  //console.log(location)
  if (location.length <=50 && /^([a-zA-Z]\-*\s*[a-zA-Z]+)+[,]\s*[a-zA-Z]{2,}$/.test(location)) {
    localStorage.setItem('userInput', location);
    // console.log('input is valid' + /^([a-zA-Z]\-*\s*[a-zA-Z]+)+[,]\s*[a-zA-Z]{2,}$/.test(location))
    document.getElementById('text-danger').innerText = '';
    document.getElementById('experienceBox').classList.remove('invisible');

    grabExperiences(location);
      //JS animate and scroll top
    const elmnt = document.getElementById('portfolio')
    elmnt.scrollIntoView();
  } else {
    document.getElementById('text-danger').innerText = 'Your input was invalid';
    // console.log('input is not valid' + location)
    valid = false;
  }
});

// grabs information from 'Yelp'
function grabExperiences(location){
    // link to yelp api
    const yelpURL = 'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?location='+location+'&categories=active,arts&radius=16094&rating=3.5&price=2,3&limit=5';
    

    $.ajax({
      url:yelpURL,
      method:'GET',
      beforeSend: function (xhr) {
        xhr.setRequestHeader ('Authorization', 'Bearer ' + 'W_SgCu6EU7XV8PZuKPE-7-1hIQEsbo-xkeLImSvhBGrfR7Pyii4gPTP2jYI24hGLwC3pOr1sxPZ4yAjXbOu8zoH_Swhuq0TbRSVnFo4qbdsX3Cz8EvIMDW4Bx6B2XnYx');
    },


    }).then(function(response) { 
        const container = document.createElement('div');
        
        response.businesses.forEach(function(val){ 
          const link = document.createElement('a');
          link.setAttribute('target', '_blank');
          link.setAttribute('href', val.url);

          const h3 = document.createElement('h3');
          const h3Text = document.createTextNode(val.name);
          h3.appendChild(h3Text);
          link.appendChild(h3);
          container.appendChild(link);

          const address = document.createElement('h4');
          const addressText = document.createTextNode('Address:' + " " + val.location.address1);
          address.appendChild(addressText);
          container.appendChild(address);

          const price = document.createElement('h4');
          const priceText = document.createTextNode('Price:' + " " + val.price);
          price.appendChild(priceText);
          container.appendChild(price);

          const rating = document.createElement('h4');
          const ratingText = document.createTextNode('Rating:' + " " + val.rating);
          rating.appendChild(ratingText);
          container.appendChild(rating);

            if (val.image_url){
              const image = document.createElement('img');
              image.setAttribute('src', val.image_url);
              image.setAttribute('class', 'exp-img');
              container.appendChild(image);
            }

        })
        document.getElementById('experienceContent').appendChild(container);
        
      });
    };

  let color = 255;
  let countDownInterval = setInterval(function() {
    if (color > 0) {
      if (color == 125) {
        document.querySelector('#trip-overview').style.color='#fff';
        document.querySelector('#expSubHead').classList.remove('text-muted');
        document.querySelector('#expSubHead').style.color='#fff';
      }
        document.querySelector('#particles-js').style.backgroundColor=`rgb(${color}, ${color}, ${color})`
        color--;
        } else {
            clearInterval(countDownInterval);
    }
}, 500);

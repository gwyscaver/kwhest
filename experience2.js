//Created javascript event listener to detect form submission when "Let's Explor" button has been clicked
document.getElementById("submitDestination").addEventListener("click", function (){
  
  document.getElementById("experienceContent").innerHTML="";
    //console.log("submitted")
    const location = document.getElementById("locationName").value;
    //console.log(location)
    grabExperiences(location)
    //JS animate and scroll top
    const elmnt = document.getElementById("portfolio");
    elmnt.scrollIntoView();

});

// grabs information from "Yelp"
function grabExperiences(location){
    // link to yelp api
    const yelpURL = 'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?location='+location+'&categories=active,arts&radius=16094&rating=3.5&price=2,3&limit=5';
    
    // const headers = new Headers()
    // headers.append("Authorization", "Bearer " + "5g5JBhiRRQYPP_XdUOB0yplJ7sMeepIg7suBSMb8ZgpEAmwGuGAO3--CzOc-3w0Zx35sw19opkOG02GSGDexwEMf0h5USlpO1ivs3niI9aL4A-UfrOzFg0BET6N6XXYx")
    // const request = new Request(yelpURL,{
    //   method:"GET", headers:headers
    // })

    fetch(yelpURL, {
      method:'GET',
      headers:{
        'X-Requested-With': 'XMLHttpRequest',
        'Origin':'https://cors-anywhere.herokuapp.com',
        'Authorization':'Bearer ' + '5g5JBhiRRQYPP_XdUOB0yplJ7sMeepIg7suBSMb8ZgpEAmwGuGAO3--CzOc-3w0Zx35sw19opkOG02GSGDexwEMf0h5USlpO1ivs3niI9aL4A-UfrOzFg0BET6N6XXYx'
      },
      'crossDomain': true, 
    }).then(function(response) { 
        const container = document.createElement("div");
        
        response.businesses.forEach(function(val){ 
          const link = document.createElement('a');
          link.setAttribute('target', '_blank');
          link.setAttribute('href', + val.url);

          const h3 = document.createElement('h3');
          const h3Text = document.createTextNode(val.name);
          h3.appendChild(h3Text);
          link.appendChild(h3);
          container.appendChild(link);

          const address = document.createElement('h4');
          const addressText = document.createTextNode('address:' + val.location.address1);
          address.appendChild(addressText);
          container.appendChild(address);

          const price = document.createElement('h4');
          const priceText = document.createTextNode('price:' + val.price);
          price.appendChild(priceText);
          container.appendChild(price);

          const rating = document.createElement('h4');
          const ratingText = document.createTextNode('rating:' + val.rating);
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
        document.getElementById('portfolioModal5').appendChild(container);
        
        
      });
    };

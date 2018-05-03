(function() {

const API_KEY = "U5rQPUaVIkcyszlF6HT43gOJKsl9C2Riq0hFHAGt9nWm6eVQiZdIn39X1Un0wu-5QuTpG43jdXTPT2kEh0lyFQdv4Nkdv3uZJP-kurKrCo7z1xXNlpMaLAgYTGPiWnYx"

const termEl = document.getElementById('term');
const locationEl = document.getElementById('location');
const searchBtn = document.getElementById('search');
const resultsEl = document.getElementById('results');

searchBtn.addEventListener('click',function(e) {
    e.preventDefault();
    const queryTerm = termEl.value
    const location = locationEl.value
    searchYelp(location,queryTerm)

})

function writeCheckedIds() {
  var ids = getCheckedIds();
  var output = document.getElementById('ids');
  output.value = ids.join(', ');
}
function getCheckedIds() {
  var checkedCbs = document.querySelectorAll('#priceTree input[type="checkbox"]:checked');
var ids = [];
for (var i = 0; i < checkedCbs.length; i++) ids.push(checkedCbs[i].id);
  return ids;
}


function searchYelp(location, queryTerm){
  axios.get('https://circuslabs.net/proxies/yelp-fusion-proxy/', {
      params: {
        '_ep': '/businesses/search',
        'term': queryTerm,
        'location': location,
      },
      headers: {
        'Authorization': 'Bearer ' + API_KEY
      }
    }).then(function (response) {
        console.log('response:', response.data, response)
        generateSuccessHTMLOutput(response);
      });    
}

function checkbox(){
  var checkboxes = document.getElementsByName('price');
  var checkboxesChecked = [];
  for (var i=0; i<checkboxes.length; i++) {
     if (checkboxes[i].checked) {
        checkboxesChecked.push(checkboxes[i].value);
     }
  }
  console.log(checkboxes)
}

checkbox()

function generateSuccessHTMLOutput(response) {
  response.data.businesses.forEach(business => {
      let $li = document.createElement("li")
      let $h2 = document.createElement("h2")
      let $pAddress = document.createElement("p")
      let $pCity = document.createElement("p")
      const $imgEl = document.createElement('img');
      
      $h2.innerHTML = '<a href="' + business.url + '">' + business.name + '</a>' + " - " + business.price + " - " + business.rating
      $imgEl.src = business.image_url;
      $imgEl.style.width = '300px';
      $imgEl.style.height = '200px';
      $pAddress.innerHTML = business.location.address1
      $pCity.innerHTML = business.location.city + " " + business.location.zip_code
      $pCity.style.marginBottom = "5px";

      $li.appendChild($h2);
      $li.appendChild($imgEl);
      $li.appendChild($pAddress);
      $li.appendChild($pCity);


      resultsEl.appendChild($li)
  })
}



}());
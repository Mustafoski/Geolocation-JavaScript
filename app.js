const SEARCH_VIEW  = document.getElementById('search_view');
const RESULTS_VIEW = document.getElementById('results_view');

const userSearchedWord = document.getElementById('search_input');

const API_BASE = 'https://maps.googleapis.com/maps/api/geocode/json?';
const API_KEY =  'key=AIzaSyBQz-dulnebn0pqnUxRai6D4L6I5smV-h8&'

function pageLoaded(){
      // page started hide results_view and gallery_view
    RESULTS_VIEW.style.visibility = 'hidden';
   
   
}


function geoCode(){
    
    var url = API_BASE +  API_KEY + 'address=' + userSearchedWord.value;
	fetch(url)
		.then((response) => {
			console.log(response);
			if(response.status !== 200){
				console.error("Invalid API");
			}

			response.json().then((data) => {
				console.log(data);
                 
                // Formating Address
                var formattedAddress = data.results[0].formatted_address;
                var formattedAddressOutput = `
                <ul class= "list-group">
                    <li class="list-group-item">${formattedAddress}</li>
                `;
               
                //Address Component
                
                var addressComponenents = data.results[0].address_components;
                var addressComponenentsOutput = '<ul class="list-group">';
                
                for(var i = 0; i <addressComponenents.length;i++){
                    addressComponenentsOutput+= `
                        <li class="list-group-item"><strong>${addressComponenents[i].types[0]}</strong> : ${addressComponenents[i].long_name}</li>
                    `;
                }
                    addressComponenentsOutput += '</ul>';
                
                
                // Geometry
                
                var lat = data.results[0].geometry.location.lat;
                var lng = data.results[0].geometry.location.lng;
                
                var geometryOutput = `
                    <ul class= "list-group">
                    <li class="list-group-item"><strong>Latitude</strong>:
                    ${lat}</li>
                    <li class="list-group-item"><strong>Lognitude</strong>:
                    ${lng}</li>
                    </ul>
                `;
                
                // Types
                var types = data.results[0].types;
                var typesOutput = '<ul class="list-group">';
                
                for(var i = 0; i <types.length;i++){
                    typesOutput+= `
                        <li class="list-group-item"><strong>${types[i]}</strong></li>
                    `;
                }
                    typesOutput += '</ul>';
                

                RESULTS_VIEW.style.visibility = 'visible';

                document.getElementById('formatted-address').innerHTML = formattedAddressOutput;
                document.getElementById('address-components').innerHTML = addressComponenentsOutput;
                document.getElementById('geometry').innerHTML = geometryOutput;
                document.getElementById('types').innerHTML = typesOutput;
               
					

                   	
				});
                
			
    }).catch((err) => {
        console.error('Invalid data', err);
    
    
    });
    
}

function loadAPIs(){
    geoCode();
    
}
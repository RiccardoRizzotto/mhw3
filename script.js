function changeToX(event){
   const container=event.currentTarget;
   container.classList.remove('inattivo');
   container.classList.add('attivo');
   const image=container.querySelector('img.checkbox');
   image.src='images/checked.png'; 
   changeToNull(container);
   AssegnaRisposta(container);
   if(Finisci()){
        for(const box of boxes){
            box.removeEventListener('click',changeToX);
        }
        if(answers["two"]===answers["three"]){
            Risultato(answers["two"]);
        }
        else{
            Risultato(answers["one"]);
        }
    }
}

function changeToNull(container){
    for(const box of boxes){
        if((box!==container)&&(box.dataset.questionId===container.dataset.questionId)){
            box.classList.remove('attivo');
            box.classList.add('inattivo');
            const image=box.querySelector('img.checkbox');
            image.src='images/unchecked.png';  
        }
    }
}

function AssegnaRisposta(answer){
    const ris1=answer.dataset.questionId;
    answers[ris1]=answer.dataset.choiceId;
    console.log(answers);
}

function Finisci(){
    return ((answers["one"]!==undefined)   
            &&(answers["two"]!==undefined)
            &&(answers["three"]!==undefined));
}

function Risultato(answer){
    result=document.querySelector('#risultato');
    const ricaricabottone=document.querySelector('#ricarica');
    const titolo=result.querySelector("h1");
    titolo.textContent=RESULTS_MAP[answer].title;
    const contents=result.querySelector("p");
    contents.textContent=RESULTS_MAP[answer].contents;
    result.classList.remove('hide');
    ricaricabottone.addEventListener('click',Resetta);   
}

function Resetta(event){
    answers={};
    console.log(answers);
    const boxes=document.querySelectorAll(".choice-grid div");
    for(let box of boxes){
        box.classList.remove("attivo","inattivo");
        let checkbox=box.querySelector(".checkbox");
        checkbox.src="images/unchecked.png";
        box.addEventListener('click', changeToX);     
    }
    result.classList.add('hide');/**/
    window.scrollTo(0,0);
}

let answers={}; //Mappo la singola domanda alla risposta

const boxes=document.querySelectorAll('.choice-grid div');
for(const box of boxes){
    box.addEventListener('click',changeToX);
}



// API -----------------------------------------------------------------------

const humidity = document.querySelector('.humidity');
const temp = document.querySelector('.temp');
const desc = document.querySelector('.desc');
const wind = document.querySelector('.wind');
const prec = document.querySelector('.prec');
const comp = document.querySelector('.comp');
const comp2 = document.querySelector('.comp');
const comp3 = document.querySelector('.comp');
const comp4 = document.querySelector('.comp');
const comp5 = document.querySelector('.comp');

//Keys and endpoints
const key_weather = '7722b8b48b1e4923824170135231804';			
const weather_api_endpoint = 'http://api.weatherapi.com/v1/current.json' 

function search(event)
{
  event.preventDefault();

  const content = document.querySelector('#content').value;

  const text = encodeURIComponent(content);

        weather_request = weather_api_endpoint + '?key=' + key_weather + '&q=' + text;
        fetch(weather_request).then(onResponse).then(onJson_weather);
  }

 
function onJson_weather(responseJSON)
{
   console.log(responseJSON);
   const library = document.querySelector('#album-view');
   library.innerHTML = ''

   const umidità = document.createElement('p');
   humidity.textContent = "Humidity: " + responseJSON.current.humidity;
   library.appendChild(humidity); 

   const temperatura = document.createElement('p');
   temp.textContent = "Temperature(#°): " + responseJSON.current.temp_c;
   library.appendChild(temp);

   const descrizione = document.createElement('p');
   desc.textContent = "Condition: " + responseJSON.current.condition.text;
   library.appendChild(desc);

   const vento = document.createElement('p');
   wind.textContent = "Wind(km/h): " + responseJSON.current.wind_kph;
   library.appendChild(wind);

   const prec = document.createElement('p');
   prec.textContent = "Rainfall(mm): " + responseJSON.current.precip_mm;
   library.appendChild(prec);
    
} 


function onResponse(response)
{
  return response.json();
}

//API CityBikes senza key
function onJson(responseJSON) 
{
   console.log(responseJSON);
   const library = document.querySelector('#album-view');
   library.innerHTML = ''

   const results = responseJSON.networks;
   
        const dove = document.createElement('p');
        dove.textContent = "Dove ti trovi? ";
        library.appendChild(dove); 


        const comp = document.createElement('p');
        comp.textContent = "-> In Italia la compagnia è: " + responseJSON.networks[9].company
        library.appendChild(comp);
        
        const comp2 = document.createElement('p');
        comp2.textContent = "-> In Francia-Belgio-Olanda la compagnia è: " + responseJSON.networks[199].company
        library.appendChild(comp2);

        const comp5 = document.createElement('p');
        comp5.textContent = "-> In Spagna la compagnia è: " + responseJSON.networks[40].company
        library.appendChild(comp5);

        const comp3 = document.createElement('p');
        comp3.textContent = "-> Negli Stati Uniti e Canada le compagnie sono: " + responseJSON.networks[94].company
        library.appendChild(comp3);

        const comp4 = document.createElement('p');
        comp4.textContent = "-> In Germania-Austria-Regno Unito-Svizzera-Croazia-Polonia è: " + responseJSON.networks[370].company
        library.appendChild(comp4);
}

  fetch('http://api.citybik.es/v2/networks?fields=company,id,name,href,location')
  .then(onResponse, onError)
  .then(onJson);

  function onError(error) {
	console.log('Error: ' + error);
  }

function onResponse(response) {
  return response.json();
}

//Aggiungo event listener al form1 per la RICERCA
const form = document.querySelector('#search_content');
form.addEventListener('submit',search);
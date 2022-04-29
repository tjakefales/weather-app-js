
const temp = document.querySelector(`.current .temp`);
const hilow = document.querySelector('.hi-low');
const toggle = document.querySelector('.switch input');
const searchbox = document.querySelector('.search-box');
const toggleSlider = document.querySelector('.slider.round');


const api = {
    key: "13f444d8ffb3b5fada3f2bcd810c409b",
    baseurl: "https://api.openweathermap.org/data/2.5/"
}


toggle.addEventListener('click', convertTemps)

searchbox.addEventListener('keypress', setQuery);

function setQuery(evt) {
    if (evt.keyCode == 13) {
        getResults(searchbox.value);
    }

}

async function getResults(query) {
    const weather = await fetch(`${api.baseurl}weather?q=${query}&units=metric&APPID=${api.key}`);
    return weather.json().then(displayResults);
    
}

function displayResults (weather) {
    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);

    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`

    let weather_el = document.querySelector('.current .weather');
    weather_el.innerText = weather.weather[0].main;

    hilow.innerText = `${Math.round(weather.main.temp_min)}°C / ${Math.round(weather.main.temp_max)}°C`
}

function dateBuilder (d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
}


function convertTemps() {
    let tempNum = temp.innerText.match(/(\d+)/g)[0];
    let hilowNum = hilow.innerText.match(/\d+/g);

    if (toggle.checked){
        tempNum = Math.round(tempNum * 1.8 + 32);
        temp.innerText = `${tempNum}°F`

        let newHiLow = hilowNum.map( (i) => i * 1.8 + 32);
        hilow.innerText = `${Math.round(newHiLow[0])}°F / ${Math.round(newHiLow[1])}°F`

        toggleSlider.classList.add("fahrenheit")
    }
    else{
        tempNum = Math.round((tempNum - 32) / 1.8);
        temp.innerText = `${tempNum}°C`

        let newHiLow = hilowNum.map( (i) => (i - 32) / 1.8);
        hilow.innerText = `${Math.round(newHiLow[0])}°C / ${Math.round(newHiLow[1])}°C`

        toggleSlider.classList.remove("fahrenheit");
    }
    

}
// task 1 --------------------

function getWeather() {
    let location = document.querySelector('#location').value;
    let url = 'https://api.openweathermap.org/data/2.5/weather?q=' + location + '&units=metric&APPID=59e7c0c9a88558a8a5b57ba14b01a5ed&';
    let weather = {};
    fetch(url)
        .then(function (resp) {
            return resp.json();
        })
        .then(function (data) {
            weather.name = data.name;
            weather.temp = data.main.temp.toFixed(0);
            weather.description = data.weather[0].main;
            weather.icon = data.weather[data.weather.length - 1].id;
            weather.windDirection = data.wind.deg;
            weather.windSpeed = data.wind.speed + 'm/s';
            weather.pressure = data.main.pressure;
            weather.humidity = data.main.humidity + '%';
            console.log(weather);
            render(weather);
        })
        .catch(function () {
            //error
        });
}
function getForecast() {
    let location = document.querySelector('#location').value;
    let url = 'https://api.openweathermap.org/data/2.5/forecast?q=' + location + '&units=metric&APPID=aa9996e5ab8f98c899989aa3109cddd5';
    let foreCast = [];
    fetch(url)
        .then(function (resp) {
            return resp.json();
        })
        .then(function (data) {
            //foreCast.splice(0, foreCast.length);
            for (let i = 0; i < data.list.length; i += 8) {// выбираем только одно значение для дня
                let dayOfForecast = fullDate(data.list[i].dt);
                foreCast.push({
                    month: dayOfForecast.month,
                    date: dayOfForecast.date,
                    day: dayOfForecast.day,
                    temp: data.list[i].main.temp,
                    icon: data.list[i].weather[0].id
                });
            }
            render(foreCast);
        })
        .catch(function () {
            //error
        });
}
function getDayOfWeek(arg) {
    var z = arg.getDay();
    switch (z) {
        case (0):
            return "Sunday";
        case (1):
            return "Monday";
        case (2):
            return "Tuesday";
        case (3):
            return "Wednesday";
        case (4):
            return "Thursday";
        case (5):
            return "Friday";
        case (6):
            return "Saturday";
    }
    return z;
}

function getDate(arg) {
    var date = arg.getDate();
    return date;
}

function getTime(arg) {
    var hours = arg.getHours();
    var minutes = arg.getMinutes();
    var time;
    if (minutes <= 9) {
        time = hours + ":0" + minutes;
    }
    else
        time = hours + ":" + minutes;
    return time;
}

function getMonthName(arg) {
    var y = arg.getMonth();
    switch (y) {
        case (0):
            return "January";
        case (1):
            return "February";
        case (2):
            return "March";
        case (3):
            return "April";
        case (4):
            return "May";
        case (5):
            return "June";
        case (6):
            return "July";
        case (7):
            return "August";
        case (8):
            return "September";
        case (9):
            return "October";
        case (10):
            return "November";
        case (11):
            return "December";
    }
    return y;
}

function fullDate(arg) {
    let dt = new Date(arg * 1000);
    return {
        month: getMonthName(dt),
        day: getDayOfWeek(dt),
        date: getDate(dt),
        hours: getTime(dt)
    };
}
function convertPressure(pressure) {
    normPressure = pressure * 0.750;
    return normPressure;
}
function setIcon(x) { //id icons
    let imgFace = document.createElement("img");
    switch (true) {
        case x > 200 && x < 300: //Thunderstorm
            imgFace.src = 'img/thunderstorm.svg';
            break;
        case x >= 300 && x < 400: //Drizzle
            imgFace.src = 'img/drizzly.svg';
            break;
        case x >= 500 && x < 600: //Rain
            imgFace.src = 'img/rain.svg';
            break;
        case x >= 600 && x < 700: //Snow
            imgFace.src = 'img/snow.svg';
            break;
        case x >= 700 && x < 800: //Mist
            imgFace.src = 'img/mist.svg';
            break;
        case x === 800: //Clear
            imgFace.src = 'img/sun.svg';
            break;
        case x === 801: //Value
            imgFace.src = 'img/cloud.svg';
            break;
        case x >= 802: //Clouds
            imgFace.src = 'img/cloud.svg';
            break;
    }
    return imgFace;
}
function windDirection(degrees) {
    let el = document.querySelectorAll('#windDirection');
    switch (true) {
        case (degrees > 22 && degrees <= 67):
            //NE
            el[0].innerHTML = 'NE';
            break;
        case (degrees > 67 && degrees <= 112):
            //E
            el[0].innerHTML = 'E';
            break;
        case (degrees > 112 && degrees <= 157):
            //SE
            el[0].innerHTML = 'SE';
            break;
        case (degrees > 157 && degrees <= 202):
            //S
            el[0].innerHTML = 'S';
            break;
        case (degrees > 202 && degrees <= 247):
            //SW
            el[0].innerHTML = 'SW';
            break;
        case (degrees > 247 && degrees <= 292):
            //W
            el[0].innerHTML = 'W';
            break;
        case (degrees > 292 && degrees <= 337):
            //NW
            el[0].innerHTML = 'NW';
            break;
        case (degrees > 337 && degrees <= 360):
            //N
            el[0].innerHTML = 'N';
            break;
        case (degrees >= 0 && degrees <= 22):
            //N
            el[0].innerHTML = 'N';
            break;
            return degrees;
    }
}
function render(x) {

    if (Array.isArray(x) === false) {
        let location = document.querySelector('#city');
        location.innerHTML = x.name;
        let temp = document.querySelector('#temperature');
        temp.innerHTML = x.temp + '&deg';
        let descript = document.querySelector('#weatherDescription');
        descript.innerHTML = x.description;
        let windSpeed = document.querySelector('#windSpeed');
        windSpeed.innerHTML = x.windSpeed;
        windDirection(x.windDirection);
        let pressure = document.querySelector('#pressure');
        pressure.innerHTML = (convertPressure(x.pressure).toFixed(0) + 'mm');
        let humidity = document.querySelector('#humidity');
        humidity.innerHTML = (x.humidity);
        let icon = document.querySelector('#weatherIcon');
        icon.replaceWith(setIcon(x.icon));
    }
    if (Array.isArray(x) === true) {
        let forecastContainer = document.querySelector('#forecastBlock');
        if (forecastContainer.childElementCount != 0) {
            while (forecastContainer.firstChild) {
                forecastContainer.removeChild(forecastContainer.firstChild);
            }
        }
        for (let i = 0; i < x.length; i++) {
            let day = x[i].day;
            let temp = x[i].temp;
            let icon = x[i].icon;

            let forecastDay = document.createElement('div');
            forecastDay.className = 'forecastDay';

            let dayEl = document.createElement('div');
            dayEl.className = 'dayOfWeek';
            dayEl.innerHTML = day;

            let iconEl = document.createElement('div');
            iconEl.className = 'iconWrap';
            iconEl.append(setIcon(icon));

            let tempEl = document.createElement('div');
            tempEl.className = 'temp';
            tempEl.innerHTML = temp.toFixed(0) + '&deg';

            forecastDay.append(dayEl, iconEl, tempEl);

            forecastContainer.append(forecastDay);
        }
    }
}
function weatherForecast() {
    getLocation();
    getWeather();
    getForecast();
}
weatherForecast();
function getLocation() {
    let el = document.querySelector('.location');
    el.addEventListener('keydown', function (event) {
        if (event.code === 'Enter') {
            el.value = "";
            el.blur();
            weatherForecast();
        }
    });
    el.addEventListener('click', function (event) {
        if (event.target.className === 'searchGo') {
            console.log(event)
            weatherForecast();
        }
    });
}

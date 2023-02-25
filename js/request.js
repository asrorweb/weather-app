// // api => https://api.openweathermap.org/data/2.5/weather?q=fergana&units=metric&appid=acc20655f3156178f616a671200cc35a

let search = document.querySelector("#search_input"),
    submitbtn = document.querySelector(".search-btn"),
    form = document.querySelector("form"),
    country = document.querySelector("#title"),
    weather_status = document.querySelector(".weather_status"),
    weather_icon = document.querySelector(".weather_icon"),
    temperature_weater = document.querySelector(".temperature"),
    video = document.querySelector("video");

weather_icon.style.display = "none";

const weather_s = {
    cloudly: "cloudly",
    rain: "rain",
    snow: "snow",
    sun: "sun",
    wind: "wind",
    hotsun: "hotsun",
    fog: "fog",
};

form.addEventListener("submit", (e) => {
    e.preventDefault();

    API = `https://api.openweathermap.org/data/2.5/weather?q=${search.value}&units=metric&appid=acc20655f3156178f616a671200cc35a`;

    const weatherInfo = async (API) => {
        const request = await fetch(API);
        // if error is returned api
        if (request.status != 200) {
            let error = "error";
            throw new Error(error);
        }
        const data = await request.json();

        return data;
    };

    weatherInfo(API)
        .then((data) => {
            updateWeather(data);
            console.log(data);
        })
        .catch((error) => {
            console.log(error);
        });
});

function updateWeather(data) {
    weather_icon.style.display = "inline-block";

    const { name, weather, main } = data;
    console.log("staust", weather[0].description);
    console.log(main.temp);
    weather_status.textContent = weather[0].description;
    country.textContent = name;
    temperature_weater.innerHTML = `${main.temp} <sup>o</sup>`;

    if (weather[0].description.includes("clouds")) {
        weather_icon.setAttribute("src", `img/${weather_s.cloudly}.png`);
        video.setAttribute("src", `video/${weather_s.cloudly}.mp4`);
    } else if (weather[0].description.includes("sky")) {
        weather_icon.setAttribute("src", `img/${weather_s.sun}.png`);
        video.setAttribute("src", `video/${weather_s.sun}.mp4`);
    } else if (weather[0].description.includes("rain")) {
        weather_icon.setAttribute("src", `img/${weather_s.rain}.png`);
        video.setAttribute("src", `video/${weather_s.rain}.mp4`);
        console.log("rain");
    } else if (weather[0].description.includes("wind")) {
        weather_icon.setAttribute("src", `img/${weather_s.wind}.png`);
        video.setAttribute("src", `video/${weather_s.wind}.mp4`);
    } else if (weather[0].description.includes("snow")) {
        weather_icon.setAttribute("src", `img/${weather_s.snow}.png`);
        video.setAttribute("src", `video/${weather_s.snow}.mp4`);
    } else if (weather[0].description.includes("fog")) {
        weather_icon.setAttribute("src", `img/${weather_s.fog}.png`);
        video.setAttribute("src", `video/${weather_s.snow}.mp4`);
    }

    search.value = "";
}

// const weather = {
//     cloudly: "cloudly",
//     rain: "rain",
//     snow: "snow",
//     sun: "sun",
//     wind: "wind",
//     hotsun: "hotsun",
// };

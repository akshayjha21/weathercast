document.addEventListener("DOMContentLoaded", () => {
    const cityinput = document.getElementById("city-input");
    const getweatherbtn = document.getElementById("get-weather-btn");
    const weatherinfo = document.getElementById("weather-info");
    const citynamedisplay = document.getElementById("city-name");
    const temperaturedisplay = document.getElementById("temperature");
    const descriptiondisplay = document.getElementById("description");
    const errormessage = document.getElementById("error-message");
    const api_key = "58efc6e182f94015a9b4427a719723b6";

    getweatherbtn.addEventListener("click", async () => {
        const city = cityinput.value.trim();
        if (!city) return; //since the empty string value is said to be false

        //THERE MUST ALWAYS  BE TWO THINGS WHEN DEALING WITH APIS:
        //they will always throw an error
        //they are always in another continent so they may take time

        // by this what it means is that we have to use try and catch
        //and for asyn and await function should also be used since the data will take some time to fetch(asynchronous process)
        try {
            const weatherData = await fetchweatherdata(city); //since it is an asynchronous process
            displayweatherdata(weatherData);
        } catch (error) {
            showerror();
        }
    });
    // right now  lets just day we don't know how fetching works so we are creating two functions:
    //fetchweatherdata
    //displayweatherdata

    async function fetchweatherdata(city) {
        //getting the data

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;
        const response = await fetch(url); //i will await till a data is fulfilled
        console.log(typeof response);
        console.log("RESPONSE", response);

        //throwing an error for the data

        if (!response.ok) {
            throw new Error("Data is not found");
        }
        const data = await response.json();
        return data;
    }

    function displayweatherdata(data) {
        //since the parameter is the placeholder you can extract any data
        console.log(data);
        const { name, weather, main } = data;
        citynamedisplay.textContent = name;
        let tempinC = Math.round(main.temp - 273.15);
        temperaturedisplay.textContent = `Temperature : ${tempinC}°C`;
        descriptiondisplay.textContent = `weather : ${weather[0].description}`;
        //UNLOCK THE DISPLAY
        weatherinfo.classList.remove("hidden"); // Hide the weather info
        errormessage.classList.add("hidden");
    }
    // Show the error message
    function showerror() {
        weatherinfo.classList.add("hidden"); // Hide weather info
        errormessage.classList.remove("hidden"); // Show error message
    }
});

// document.addEventListener('DOMContentLoaded',()=>{

//     const cityinput=document.getElementById("city-input");
//     const getweatherbtn=document.getElementById("get-weather-btn");
//     const weatherinfo=document.getElementById("weather-info");
//     const citynamedisplay=document.getElementById("city-name");
//     const temperaturedisplay=document.getElementById("temperature");
//     const descriptiondisplay=document.getElementById("description");
//     const errormessage = document.getElementById("error-message");
//     const api_key = "58efc6e182f94015a9b4427a719723b6";

//     getweatherbtn.addEventListener('click',async ()=>{
//         const city=cityinput.value.trim();
//         if(cityinput=="")return;
//         try {
//             const weatherdata=await fetchweatherdata(city);
//             displayweatherdata(weatherdata)
            
//         } catch (error) {
//             showerror();
            
//         }

//     })

//     async function fetchweatherdata(city)
//     {
//         const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;
//         const fetchdata=await fetch(url);
//         console.log('response',fetchdata);
//         if(!fetchdata.ok){
//             throw new Error("data not found"); 
//         }
//         const data=await fetchdata.json();
//         return data;
//     }
//     function displayweatherdata(data) {
//         console.log(data);
//         citynamedisplay.textContent=data.name;
//         temperaturedisplay.textContent= ` Temperature: ${Math.round(data.main.temp-273.15)}°C`
//         descriptiondisplay.textContent=`Description: ${data.weather[0].description} `
//         weatherinfo.classList.remove("hidden")
//         errormessage.classList.add("hidden")

//     }

//     function showerror(){
//         weatherinfo.classList.add("hidden")
//         errormessage.classList.remove("hidden")
//     }
// })
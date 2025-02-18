/* ========== PASSO 1: CONFIGURAÇÃO E TESTE DAS APIs ========== */

// ========== 1 Configurações das APIs ========== //
const API_KEY = "f696d5e1896b6856670019f88e110de7";
const API_WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather";
const UNITS = "metric";
const LANG = "pt_br";

const TIMEZONE_API_KEY = "9P4UENF4NPYQ";
const TIMEZONE_API_URL = "http://api.timezonedb.com/v2.1/get-time-zone";
const UNSPLASH_API_KEY = "hXmoVtDlSizxU6wpZCoGcu0ckz7VIG9uG938A5f3hOY";
const UNSPLASH_API_URL = "https://api.unsplash.com/search/photos";

const COUNTRY_API_URL = "https://restcountries.com/v3.1/alpha/";

// ========== 2 Seletores DOM ==========
const cityInput = document.querySelector("#city_name");
const searchForm = document.querySelector("#search");


// ========== 3 Funções de Busca ==========
async function fetchWeatherData(cityName) {
  const url = `${API_WEATHER_URL}?q=${cityName}&appid=${API_KEY}&units=${UNITS}&lang=${LANG}`;
  const response = await fetch(url);
  return await response.json();
}

async function fetchTimezoneData(lat, lon) {
  const url = `${TIMEZONE_API_URL}?key=${TIMEZONE_API_KEY}&format=json&by=position&lat=${lat}&lng=${lon}`;

  const response = await fetch(url);
  return await response.json();
}

async function fetchCountryData(countryCode){
const url = `${COUNTRY_API_URL}${countryCode}`;
const response = await fetch(url);
const data = await response.json();

return{
  name: data[0].name.common,
  flag: data[0].name.svg
};
}

async function fetchCityImage(cityName){
  const url = `${UNSPLASH_API_URL}?query=${encodeURI(cityName)}&client_id=${UNSPLASH_API_KEY}`;
  const response = await fetch(url);
  const data  = await response.json();
  return data.results.length > 0 ? data.results[0].urls.full : null;
}

// ========== 4 Evento de Busca ==========
searchForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const cityName = cityInput.value.trim();

  if (cityName) {
    try {

      //Busca os dados do clima
      const weatherData = await fetchWeatherData(cityName);
      console.log("Dados do clima:", weatherData);

      //Busca os dados do fuso horário
      const timezoneData = await fetchTimezoneData(
        weatherData.coord.lat,
        weatherData.coord.lon
      );
      console.log("Dados do Fuso Horário:", timezoneData);

      //Busca os dados do pais usando o codigo retorno pela api do clima
      const countryData = await fetchCountryData (weatherData.sys.country);
      console.log("Dados do país:", countryData);

      //Busca a imagem da cidade
      const cityImageUrl = await fetchCityImage(cityName);
      console.log("Imagem da cidade:", cityImageUrl);
      
    } catch (error) {
      console.error("Erro ao buscar os dados:", error);
      alert(
        "Erro ao buscar os dados. Verifique o nome da cidade e tente novamente."
      );
    }
  } else{
    alert("Por favor, insira o nome de uma cidade.")
  }
});

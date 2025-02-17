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

// ========== 2 Funções de Teste ========== //
async function testWeatherAPI() {
  const city = "São Paulo";
  const url = `${API_WEATHER_URL}?q=${city}&appid=${API_KEY}&units=${UNITS}&lang=${LANG}`;

  try {
    const response = await fetch(url);

    //Verifica se a resposta da API foi bem-sucedida
    if (response.ok) {
      const data = await response.json();
      console.log("Dados recebidos da API de clima:", data);
    } else {
      console.error(
        "Erro na API do clima:",
        response.status,
        response.statusText
      );
    }
  } catch (error) {
    console.error("Erro na API do clima:", error);
  }
}

async function testTimezoneAPI() {
  const lat = -23.5505;
  const lon = -46.6333;
  const url = `${TIMEZONE_API_URL}?key=${TIMEZONE_API_KEY}&format=json&by=position&lat=${lat}&lng=${lon}`;

  try {
    const response = await fetch(url);

    // Verifica se a requisição foi bem-sucedida
    if (response.ok) {
      const data = await response.json();
      console.log("Dados recebidos da API do Fuso Horário:", data);
    } else {
      console.error(
        "Erro na API do Fuso Horário:",
        response.status,
        response.statusText
      );
    }
  } catch (error) {
    console.error("Erro na API do Fuso Horário:", error);
  }
}

async function testUnsplashAPI() {
  const cidade = "São Paulo";

  const url = `${UNSPLASH_API_URL}?query=${encodeURI(
    cidade
  )}&client_id=${UNSPLASH_API_KEY};`;

  try {
    const response = await fetch(url);

    //Verifica se a requisição foi bem sucedida
    if (response.ok) {
      const data = await response.json();
      console.log("Dados recedos da API do Unsplash:", data);
    } else {
      console.error(
        "Error na API do Unsplash:",
        response.status,
        response.statusText
      );
    }
  } catch (error) {
    console.error("Erro na API do Unsplash:", error);
  }
}

async function testCountryAPI() {
  const countryCode = "BR";
  const url = `${COUNTRY_API_URL}${countryCode}`;

  try {
    const response = await fetch(url);

    //Verifica se a requisição foi bem sucedida
    if (response.ok) {
      const data = await response.json();

      //bandeira e nome
      const countryInfo = {
        name: data[0].name.common,
        flag: data[0].flags.svg,
      };
      console.log("Dados recebidos da API de Países:", countryInfo);
    } else {
      console.error(
        "Dados recebidos da API de Países:",
        response.status,
        response.statusText
      );
    }
  } catch (error) {
    console.error("Erro na API de Países:", error);
  }
}

// ========== 3 Testar API ========== //
testWeatherAPI();
testTimezoneAPI();
testUnsplashAPI();
testCountryAPI();

// Добавляем разметку DOM
function addElements(el) {
  const divMain = document.createElement("div");
  divMain.className = "card";

  //
  const divSearch = document.createElement("div");
  divSearch.className = "search";

  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = "enter city name";
  input.spellcheck = "false";

  const button = document.createElement("button");
  button.innerHTML = "search";
  //
  const divWeather = document.createElement("div");
  divWeather.className = "weather";

  const img = document.createElement("img");
  // img.src = "./images/map.png";
  img.className = "city-map";

  const h1 = document.createElement("h1");
  h1.className = "temp";

  const h2 = document.createElement("h2");
  // h2.innerText = "Ufa";
  h2.className = "city";
  //
  const divList = document.createElement("div");
  divList.id = "list";
  //

  divSearch.appendChild(input);
  divSearch.appendChild(button);

  divWeather.appendChild(img);
  divWeather.appendChild(h1);
  divWeather.appendChild(h2);

  divMain.appendChild(divSearch);
  divMain.appendChild(divWeather);
  divMain.appendChild(divList);

  el.appendChild(divMain);
}

addElements(document.querySelector("body"));

// Добавляем стиль разметки
function addCSS(el) {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "style.css";

  el.appendChild(link);
}

addCSS(document.getElementsByTagName("head")[0]);

const apiKey = "6c747baf75682efc7b620568f3236f69";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");

const yanApiKey = "8dd53d90-bf9b-4ee4-ac9d-86c1dabd0561";
const cityMap = document.querySelector(".city-map");

const geoApiKey = "d91fc6ae1d7e4f689781a5d3401fc83f";
let lat = null;
let lon = null;
let cityName;

const listEl = document.querySelector("#list");

// Определяем координаты и город пользователя
async function defaultCityName() {
  try {
    const defaultCityData = await fetch(
      "https://api.geoapify.com/v1/ipinfo?&apiKey=d91fc6ae1d7e4f689781a5d3401fc83f",
    );
    const dataDef = await defaultCityData.json();
    cityName = dataDef.city.name;
    lat = dataDef.location.latitude;
    lon = dataDef.location.longitude;
  } catch (err) {
    return null;
  }
}

// При открытии страницы пользователь видит погоду (город, температуру и иконку) в своей местности
async function defaultWeather() {
  await defaultCityName();
  try {
    const url =
      `https://api.openweathermap.org/data/2.5/weather?units=metric&q=` +
      `${cityName}&appid=6c747baf75682efc7b620568f3236f69`;
    const responseDef = await fetch(url);
    const dataDef = await responseDef.json(); // читаем ответ в формате JSON
    document.querySelector(".temp").innerHTML = `${Math.round(
      dataDef.main.temp,
      0,
    )}°C`;
    // Выводим карту для дефолтного города
    cityMap.src =
      `https://static-maps.yandex.ru/v1?spn=0.316457,0.00619&l=map&size=200,200&ll=` +
      `${lon},${lat}&apikey=${yanApiKey}`;
    // Выводим город пользователя
    document.querySelector(".city").innerHTML = cityName;
  } catch (err) {
    return null;
  }
}

defaultWeather();

// localStorage.clear();

// Пользователь может ввести имя города в поле ввода и увидеть погоду в выбранном городе
async function drawWeather(city, myCallback) {
  try {
    const response = await fetch(`${apiUrl + city}&appid=${apiKey}`);
    const data = await response.json();

    // Выводим выбранный город
    document.querySelector(".city").innerHTML = data.name;
    // Выводим температуру города
    document.querySelector(".temp").innerHTML = `${Math.round(
      data.main.temp,
    )}°C`;
    // Выводим карту для выбранного города
    cityMap.src =
      `https://static-maps.yandex.ru/v1?spn=0.316457,0.00619&l=map&size=200,200&ll=` +
      `${data.coord.lon},${data.coord.lat}&apikey=${yanApiKey}`;

    myCallback(city);
  } catch (err) {
    return null;
  }
}

// Введенные города сохраняются у пользователя в браузере, так что он видит последние 10 городов
async function writeList(city) {
  // Должна возвращать список пользователя
  // Если пользователь ничего не вводил - пустой список
  async function readList() {
    try {
      const list = JSON.parse(localStorage.getItem("item"));
      if (list === null) {
        return [];
      }
      return list;
    } catch (err) {
      return null;
    }
  }
  // Сохраняем список
  function saveList(items) {
    localStorage.setItem("item", JSON.stringify(items));
  }
  function drawList(el, items) {
    el.innerHTML = `<ol>${items.map((el) => `<li>${el}</li>`).join("")}</ol>`;
  }

  // Читаем список при старте
  const items = await readList();
  const uniqItems = [];
  const uniqItemsLowCase = [];
  // Возвращаем только список уникальных городов
  items.forEach((element) => {
    if (!uniqItems.includes(element)) {
      uniqItems.push(element);
    }
  });
  // Имена городов не должны зависеть от регистра
  uniqItems.forEach((element) => {
    uniqItemsLowCase.push(element.toLowerCase());
  });

  if (city) {
    if (uniqItems.length >= 10) {
      // пользователь должен видеть последние 10 городов
      if (uniqItemsLowCase.indexOf(city.toLowerCase()) === -1) {
        uniqItems.push(city); // push города в массив, если это не дубликат
        uniqItems.splice(0, uniqItems.length - 10);
      }
      saveList(uniqItems); // сохраняем список
      try {
        drawList(listEl, uniqItems);
      } catch {
        return null;
      } // и отрисовываем список
    } else {
      if (uniqItemsLowCase.indexOf(city.toLowerCase()) === -1)
        uniqItems.push(city); // push города в массив, если это не дубликат
      saveList(uniqItems); // сохраняем список
      try {
        drawList(listEl, uniqItems);
      } catch {
        return null;
      } // и отрисовываем список
    }
  } else {
    try {
      drawList(listEl, uniqItems);
    } catch {
      return null;
    } // отрисовываем список
  }
}

// Рисуем список истории поиска
writeList();

// Выполняем поиск и отрисовку списка по клику
window.onload = function () {
  searchBtn.addEventListener("click", () => {
    drawWeather(searchBox.value, writeList);
    // writeList(searchBox.value);
  });
};

// При клике по строчке города в списке пользователь видит погоду в выбранном городе
if (listEl) {
  listEl.onclick = function cl(event) {
    const { target } = event; // где был клик?
    drawWeather(target.innerHTML); // выполняем функцию по городу, по которому сделан клик
  };
}

export {
  addCSS,
  addElements,
  defaultCityName,
  defaultWeather,
  drawWeather,
  writeList,
};

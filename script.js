/**
 * Функция должна отображать в элементе следующие данные
 * - имя города
 * - текущую температуру (main.temp)
 * - карту
 * **/
//import fetch from 'node-fetch';

const apiKey = "6c747baf75682efc7b620568f3236f69";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");

const yanApiKey = "8dd53d90-bf9b-4ee4-ac9d-86c1dabd0561";

const cityMap = document.querySelector(".city-map");

const listEl = document.querySelector("#list");

// При открытии страницы пользователь видит погоду (город, температуру и иконку) в своей местности
async function defaultWeather() {
  //try {
  const url =
    "https://api.openweathermap.org/data/2.5/weather?units=metric&q=Ufa&appid=6c747baf75682efc7b620568f3236f69";
  const responseDef = await fetch(url);
  const dataDef = await responseDef.json(); // читаем ответ в формате JSON
  if (dataDef) {
    document.querySelector(".temp").innerHTML = `${Math.round(
      dataDef.main.temp,0
    )}°C`;
  }
  return dataDef.main.temp;
  //} catch (err) {
  //  console.log(err);
  //}
}

defaultWeather();

// localStorage.clear();

// Пользователь может ввести имя города в поле ввода и увидеть погоду в выбранном городе
async function drawWeather(city) {
  const response = await fetch(`${apiUrl + city}&appid=${apiKey}`);
  const data = await response.json();

  // Выводим выбранный город
  document.querySelector(".city").innerHTML = data.name;
  // Выводим температуру города
  document.querySelector(".temp").innerHTML = `${Math.round(data.main.temp)}°C`;
  // Выводим карту для выбранного города
  cityMap.src =
    `https://static-maps.yandex.ru/v1?spn=0.316457,0.00619&l=map&size=200,200&ll=` +
    `${data.coord.lon},${data.coord.lat}&apikey=${yanApiKey}`;
}

// Введенные города сохраняются у пользователя в браузере, так что он видит последние 10 городов
async function writeList(city) {
  // Должна возвращать список пользователя
  // Если пользователь ничего не вводил - пустой список
  async function readList() {
    const list = JSON.parse(localStorage.getItem("item"));
    if (list === null) {
      return [];
    }
    return list;
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

  // console.log(items);

  if (city) {
    if (items.length >= 10) {
      // пользователь должен видеть последние 10 городов
      items.splice(0, items.length - 9);
      items.push(city); // push города в массив
      saveList(items); // сохраняем список
      drawList(listEl, items); // и отрисовываем список
    } else {
      items.push(city); // push города в массив
      saveList(items); // сохраняем список
      drawList(listEl, items); // и отрисовываем список
    }
  } else {
    drawList(listEl, items); // отрисовываем список
  }
}

// Рисуем список истории поиска
writeList();

window.onload=function(){
  // Выполняем поиск и отрисовку списка по клику
  searchBtn.addEventListener("click", () => {
    drawWeather(searchBox.value);
    writeList(searchBox.value);
  });
}


// При клике по строчке города в списке пользователь видит погоду в выбранном городе
if (listEl) {
  listEl.onclick = function cl(event) {
    const { target } = event; // где был клик?
    drawWeather(target.innerHTML); // выполняем функцию по городу, по которому сделан клик
  };
};


//exports.defaultWeather = defaultWeather;
//module.exports = drawWeather;
//module.exports = writeList;

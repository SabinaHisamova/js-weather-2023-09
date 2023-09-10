
  /**
   * Функция должна отображать в элементе следующие данные
   * - имя города
   * - текущую температуру (main.temp)
   * - карту
   */

  const apiKey = "6c747baf75682efc7b620568f3236f69";
  const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

  const searchBox = document.querySelector(".search input");
  const searchBtn = document.querySelector(".search button");

  const yanApiKey = "8dd53d90-bf9b-4ee4-ac9d-86c1dabd0561";
  const mapImg = "https://static-maps.yandex.ru/v1?spn=0.316457,0.00619&l=map";

  const cityMap = document.querySelector(".city-map");

  const listEl = document.querySelector("#list");

  // При открытии страницы пользователь видит погоду (город, температуру и иконку) в своей местности
  async function defaultWeather() {
    let url = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=Ufa&appid=6c747baf75682efc7b620568f3236f69';
    let responseDef = await fetch(url);
    
    let dataDef = await responseDef.json(); // читаем ответ в формате JSON
    
    document.querySelector(".temp").innerHTML = Math.round(dataDef.main.temp) + `°C`;
  };

  defaultWeather();
  //localStorage.clear();

  // Пользователь может ввести имя города в поле ввода и увидеть погоду в выбранном городе
  async function drawWeather(city) {
    //localStorage.clear();
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    let data = await response.json();

    // Выводим выбранный город
    document.querySelector(".city").innerHTML = data.name ;
    // Выводим температуру города
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + `°C`;
    // Выводим карту для выбранного города
    cityMap.src = `https://static-maps.yandex.ru/v1?spn=0.316457,0.00619&l=map&size=200,200&ll=` + `${data.coord.lon},${data.coord.lat}&apikey=${yanApiKey}`;
  }


  // Введенные города сохраняются у пользователя в браузере, так что он видит последние 10 городов
  async function writeList(city) {
     // Должна возвращать список пользователя
    // Если пользователь ничего не вводил - пустой список
    async function readList() {
      const list = JSON.parse(localStorage.getItem("item"));
      if (list === null) {
        return [];
      } else {
        return list;
      }
    };
    // Сохраняем список
    function saveList(items) {
      localStorage.setItem("item", JSON.stringify(items));
    };
    function drawList(el, items) {
      el.innerHTML = `<ol>${items.map((el) => `<li>${el}</li>`).join("")}</ol>`;
    };
    
    // Читаем список при старте
    const items = await readList();
    // добавляем элемент в список


    if(city) {
      items.push(city);
      // сохраняем список
      saveList(items);
      // и отрисовываем список
      drawList(listEl, items);
    } else {
      // отрисовываем список
      drawList(listEl, items);
    }


    //let firstListItem = document.querySelectorAll('#list')[0];
    //listEl.removeChild(firstListItem);
      //if(document.querySelectorAll("#list").length >= 10) {
      //  listEl.removeChild(listEl.firstElementChild);
      //}


  }

  //console.log(listEl.children.length);

  writeList();

  searchBtn.addEventListener("click",() => {
    drawWeather(searchBox.value);
    writeList(searchBox.value)
  });





// работает:
//https://static-maps.yandex.ru/v1?ll=56.0375,54.775&spn=0.116457,0.00619&l=map&apikey=8dd53d90-bf9b-4ee4-ac9d-86c1dabd0561

//https://static-maps.yandex.ru/v1?spn=0.316457,0.00619&l=map&ll=56.0375,54.775&apikey=8dd53d90-bf9b-4ee4-ac9d-86c1dabd0561&size=200,200


  
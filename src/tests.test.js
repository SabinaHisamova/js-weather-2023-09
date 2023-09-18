import { defaultWeather, writeList, drawWeather, addElements } from "./script";

require("jest-fetch-mock").enableMocks();
// beforeEach(() => {
//    fetch.resetMocks();
// });

describe("Tests for the Weather App", () => {
  // beforeEach(() => {
  //  fetch.resetMocks()
  // })

  it("fetchData returns the correct data for defaultWeather function", async () => {
    const mockFetch = {
      main: { temp: 21, feels_like: 20.82 },
      timezone: 18000,
      id: 479561,
      name: "Ufa",
      cod: 200,
    };

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockFetch),
      }),
    );

    let errRaised = null;

    try {
      const data = await defaultWeather();
      const temp = document.querySelector(".temp");
      expect(temp.innerHTML).toBe("21°C");
      errRaised = 0;
    } catch (err) {
      errRaised = 1;
    }
    expect(errRaised).toBe(0);

    fetch.mockRestore();
  });

  it("handles exception with null for defaultWeather function", async () => {
    fetch.mockImplementationOnce(() => Promise.reject("API failure"));
    const data = await defaultWeather();

    expect(data).toEqual(null);
    expect(fetch).toHaveBeenCalledWith(
      "https://api.openweathermap.org/data/2.5/weather?units=metric&q=Ufa&appid=6c747baf75682efc7b620568f3236f69",
    );
  });

  it("city and temp from fetch are correct for drawWeather function", async () => {
    const mockFetch = {
      main: { temp: 14, feels_like: 20.82 },
      timezone: 18000,
      id: 479561,
      name: "Moscow",
      cod: 200,
    };
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockFetch),
      }),
    );

    let errRaised = null;

    try {
      const data = await drawWeather();
      const temp = document.querySelector(".temp");
      const city = document.querySelector(".city");
      expect(temp.innerHTML).toBe("14°C");
      expect(city.innerHTML).toBe("Moscow");
      errRaised = 0;
    } catch {
      errRaised = 1;
    }
    expect(errRaised).toBe(0);
    fetch.mockRestore();
  });

  it("Inputed city is the last element in list for writeList function", async () => {
    let errRaised = null;

    try {
      const data = await writeList("Moscow");
      const allSelects = document.getElementsByTagName("li");
      const lastSelect = allSelects[allSelects.length - 1];
      expect(lastSelect.innerHTML).toBe("Moscow");
      errRaised = 0;
    } catch (err) {
      errRaised = 1;
    }

    expect(errRaised).toBe(0);
  });

  it("Checking DOM", async () => {
    addElements(document.querySelector("body"));

    const divMain = document.querySelector(".card");
    const divSearch = document.querySelector(".search");
    const input = document.querySelector("input");
    const button = document.querySelector("button");
    const divWeather = document.querySelector(".weather");

    expect(divMain).not.toEqual(null);
    expect(divSearch).not.toEqual(null);
    expect(input).not.toEqual(null);
    expect(button).not.toEqual(null);
    expect(divWeather).not.toEqual(null);
  });

  it("Click the button => add a new list el with the text from input", () => {
    const button = document.querySelector(".search button");
    const textInput = document.querySelector(".search input");

    textInput.value = "Moscow";

    // Simulate input and click events
    const inputEvent = new Event("input");
    textInput.dispatchEvent(inputEvent);
    const clickEvent = new Event("click");
    button.dispatchEvent(clickEvent);

    const listElmt = document.getElementsByTagName("li");
    const lastSelect = listElmt[listElmt.length - 1];

    expect(lastSelect.innerHTML).toBe("Moscow");
  });

  it("More than 10 el in li, the first one should be removed", async () => {
    const array = [
      "Moscow",
      "Ufa",
      "Kazan",
      "Minsk",
      "Seoul",
      "Busan",
      "Paris",
      "Jeju",
      "Ufa",
      "Berlin",
      "London",
    ];

    // Add 11 cities
    for (let i = 0; i < array.length; i++) {
      await writeList(array[i]);
    }
    const listElmt = document.getElementsByTagName("li");
    expect(listElmt.length).toBe(10);
    expect(listElmt[listElmt.length - 1].innerHTML).toBe("London");
    expect(listElmt[0].innerHTML).toBe("Ufa");
  });
});

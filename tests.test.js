import { defaultWeather } from "./script";
//import { drawWeather } from "./script";
//import { writeList } from "./script";

describe("Tests for the Weather App", () => {

    test('fetchData returns the correct data', async () => {
        const mockFetch = {"main":{"temp":21.28,"feels_like":20.82},"timezone":18000,"id":479561,"name":"Ufa","cod":200};
        global.fetch = jest.fn(() =>
          Promise.resolve({
            json: () => Promise.resolve(mockFetch),
          })
        );
        const data = await defaultWeather();
        expect(data).toEqual(21.28);
      });


//    it("Click the button => add a new list el with the text from input", () => {
//        const button = document.querySelector(".search button");
//        const textInput = document.querySelector(".search input");
//        const listElmt = document.getElementById("#list");
//    
//        // Set a value in the input field
//        textInput.value = "Moscow";
//    
//        // Simulate input and click events
//        const inputEvent = new Event("input");
//        textInput.dispatchEvent(inputEvent);
//        const clickEvent = new Event("click");
//        button.dispatchEvent(clickEvent);
//    
//        // Check the added paragraph
//        expect(listElmt.children.length).toBe(1);
//        expect(listElmt.firstElementChild.textContent).toBe(
//          "Moscow",
//        );
//      });


})

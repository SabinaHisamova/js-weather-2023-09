(()=>{"use strict";!function(e){const t=document.createElement("div");t.className="card";const n=document.createElement("div");n.className="search";const c=document.createElement("input");c.type="text",c.placeholder="enter city name",c.spellcheck="false";const a=document.createElement("button");a.innerHTML="search";const l=document.createElement("div");l.className="weather";const r=document.createElement("img");r.className="city-map";const o=document.createElement("h1");o.className="temp";const i=document.createElement("h2");i.innerText="Ufa",i.className="city";const s=document.createElement("div");s.id="list",n.appendChild(c),n.appendChild(a),l.appendChild(r),l.appendChild(o),l.appendChild(i),t.appendChild(n),t.appendChild(l),t.appendChild(s),e.appendChild(t)}(document.querySelector("body")),function(e){const t=document.createElement("link");t.rel="stylesheet",t.href="style.css",e.appendChild(t)}(document.getElementsByTagName("head")[0]);const e=document.querySelector(".search input"),t=document.querySelector(".search button"),n="8dd53d90-bf9b-4ee4-ac9d-86c1dabd0561",c=document.querySelector(".city-map"),a=document.querySelector("#list");async function l(e){try{const t=await fetch("https://api.openweathermap.org/data/2.5/weather?units=metric&q="+e+"&appid=6c747baf75682efc7b620568f3236f69"),a=await t.json();document.querySelector(".city").innerHTML=a.name,document.querySelector(".temp").innerHTML=`${Math.round(a.main.temp)}°C`,c.src=`https://static-maps.yandex.ru/v1?spn=0.316457,0.00619&l=map&size=200,200&ll=${a.coord.lon},${a.coord.lat}&apikey=${n}`}catch(e){return null}}async function r(e){function t(e){localStorage.setItem("item",JSON.stringify(e))}function n(e,t){e.innerHTML=`<ol>${t.map((e=>`<li>${e}</li>`)).join("")}</ol>`}const c=await async function(){try{const e=JSON.parse(localStorage.getItem("item"));return null===e?[]:e}catch(e){return null}}();if(e)if(c.length>=10){c.splice(0,c.length-9),c.push(e),t(c);try{n(a,c)}catch{return null}}else{c.push(e),t(c);try{n(a,c)}catch{return null}}else try{n(a,c)}catch{return null}}!async function(){try{const e="https://api.openweathermap.org/data/2.5/weather?units=metric&q=Ufa&appid=6c747baf75682efc7b620568f3236f69",t=await fetch(e),a=await t.json();document.querySelector(".temp").innerHTML=`${Math.round(a.main.temp,0)}°C`,c.src=`https://static-maps.yandex.ru/v1?spn=0.316457,0.00619&l=map&size=200,200&ll=56.0375,54.775&apikey=${n}`}catch(e){return null}}(),r(),window.onload=function(){t.addEventListener("click",(()=>{l(e.value),r(e.value)}))},a&&(a.onclick=function(e){const{target:t}=e;l(t.innerHTML)})})();
"use strict";
window.onload = function () {
  let planetVol = () => Math.floor(Math.random() * 100 + 10);
  let planetPos = () => Math.floor(Math.random() * 50);
  let randomColor = () => {
    let letters = "0123456789ABCDEF";
    let color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  let planetName = document.querySelector("#planet-name"),
    planetRot = document.querySelector("#rot"),
    planetOrb = document.querySelector("#orb"),
    planetDia = document.querySelector("#di"),
    planetCli = document.querySelector("#cli"),
    planetGra = document.querySelector("#gra"),
    planetSur = document.querySelector("#sur"),
    planetPop = document.querySelector("#pop");

  class Planet {
    constructor(id) {
      this.id = id;
    }
    create() {
      let clicked = false;
      let div = document.createElement("div");
      div.classList.add("planet");
      div.setAttribute("id", this.id);
      let dim = planetVol();
      div.style.width = dim + "px";
      div.style.height = dim + "px";
      div.style.top = planetPos() + "px";
      div.style.left = planetPos() + "px";
      div.style.backgroundColor = randomColor();
      div.addEventListener("click", function () {
        if (clicked == false) {
          clicked = true;
          let nr = ++this.id;
          fetch("https://swapi.dev/api/planets/" + nr).then((response) =>
            response.json().then((data) => {
              planetName.innerHTML = data["name"];
              planetRot.innerHTML = data["rotation_period"];
              planetOrb.innerHTML = data["orbital_period"];
              planetDia.innerHTML = data["diameter"];
              planetCli.innerHTML = data["climate"];
              planetGra.innerHTML = data["gravity"];
              planetSur.innerHTML = data["surface_water"];
              planetPop.innerHTML = data["population"];
            })
          );
        }
      });
      return div;
    }
  }
  let universe = document.querySelector(".planets");
  fetch("https://swapi.dev/api/planets/")
    .then((response) => response.json())
    .then((data) => {
      let count = Number(data["count"]);
      for (let i = 0; i < count; i++) {
        let p = new Planet(i);
        universe.appendChild(p.create());
      }
    });

  //let p1 = new Planet();
  // universe.appendChild(p1.create());
};

const resourceButton = document.getElementById("requestResourceButton");
resourceButton.addEventListener("click", requestInfo);

function requestInfo() {
  const inputText = document.getElementById("resourceId").value;
  const resourceType = document.getElementById("resourceType").value;
  const contentDiv = document.getElementById("contentContainer");
  contentDiv.innerHTML = "";

  if (resourceType === "people") {
    const personReq = new XMLHttpRequest();
    personReq.addEventListener("load", loadPerson);
    personReq.open("GET", "https://swapi.co/api/people/" + inputText);
    personReq.send();
  }
  function loadPerson() {
    if (this.status !== 200) {
      let errorDiv = document.createElement("h2");
      errorDiv.innerHTML = "Error " + this.status + " found.";
      contentDiv.appendChild(errorDiv);
      if (this.status === 404) {
        let infoError = document.createElement("h3");
        infoError.innerHTML =
          "No Information found for 'Person " + inputText + "'";
        errorDiv.appendChild(infoError);
      }
    }
    const thisPersonObj = JSON.parse(this.responseText);
    let name = document.createElement("h2");
    name.innerHTML = "Name: " + thisPersonObj.name;
    let gender = document.createElement("p");
    gender.innerHTML = "Gender: " + thisPersonObj.gender;
    contentDiv.appendChild(name);
    contentDiv.appendChild(gender);

    const thisPersonHomeworld = new XMLHttpRequest();
    thisPersonHomeworld.addEventListener("load", getSpecies);
    thisPersonHomeworld.open("GET", thisPersonObj.species);
    thisPersonHomeworld.send();
    function getSpecies() {
      const thisSpeciesObj = JSON.parse(this.responseText);
      let species = document.createElement("p");
      species.innerHTML = "Species: " + thisSpeciesObj.name;
      contentDiv.appendChild(species);
    }
  }
  if (resourceType === "planets") {
    const planetReq = new XMLHttpRequest();
    planetReq.addEventListener("load", loadPlanet);
    planetReq.open("GET", "https://swapi.co/api/planets/" + inputText);
    planetReq.send();
  }
  function loadPlanet() {
    if (this.status !== 200) {
      let errorDiv = document.createElement("h2");
      errorDiv.innerHTML = "Error " + this.status + " found.";
      contentDiv.appendChild(errorDiv);
      if (this.status === 404) {
        let infoError = document.createElement("h3");
        infoError.innerHTML =
          "No Information found for 'Planet " + inputText + "'";
        errorDiv.appendChild(infoError);
      }
    }
    const thisPlanetObj = JSON.parse(this.responseText);
    let name = document.createElement("h2");
    name.innerHTML = "Planet: " + thisPlanetObj.name;
    let terrain = document.createElement("p");
    terrain.innerHTML = "Terrain: " + thisPlanetObj.terrain;
    let population = document.createElement("p");
    population.innerHTML = "Population: " + thisPlanetObj.population;
    contentDiv.appendChild(name);
    contentDiv.appendChild(terrain);
    contentDiv.appendChild(population);
    let newList = document.createElement("ul");
    contentDiv.appendChild(newList);
    if (thisPlanetObj.films.length === 0) {
      let film = document.createElement("li");
      film.innerHTML = "Films not available.";
      contentDiv.appendChild(film);
    } else {
      for (let i = 0; i < thisPlanetObj.films.length; i++) {
        let thisPlanetFilms = new XMLHttpRequest();
        thisPlanetFilms.addEventListener("load", getFilms);
        thisPlanetFilms.open("GET", thisPlanetObj.films[i]);
        thisPlanetFilms.send();
        function getFilms() {
          let thisFilm = JSON.parse(this.responseText);
          let film = document.createElement("li");
          film.innerHTML = "Appeared in: " + thisFilm.title;
          contentDiv.appendChild(film);
        }
      }
    }
  }
  if (resourceType === "starships") {
    const shipReq = new XMLHttpRequest();
    shipReq.addEventListener("load", loadShip);
    shipReq.open("GET", "https://swapi.co/api/starships/" + inputText);
    shipReq.send();
  }
  function loadShip() {
    if (this.status !== 200) {
      let errorDiv = document.createElement("h2");
      errorDiv.innerHTML = "Error " + this.status + " found.";
      contentDiv.appendChild(errorDiv);
      if (this.status === 404) {
        let infoError = document.createElement("h3");
        infoError.innerHTML =
          "No Information found for 'Starship " + inputText + "'";
        errorDiv.appendChild(infoError);
      }
    }
    let thisShip = JSON.parse(this.responseText);
    console.log(thisShip);
    let name = document.createElement("h2");
    name.innerHTML = "Ship name: " + thisShip.name;
    let manufacturer = document.createElement("p");
    manufacturer.innerHTML = "Manufacturer: " + thisShip.manufacturer;
    let shipClass = document.createElement("p");
    shipClass.innerHTML = "Starship Class: " + thisShip.starship_class;
    contentDiv.appendChild(name);
    contentDiv.appendChild(manufacturer);
    contentDiv.appendChild(shipClass);
    let newList = document.createElement("ul");
    contentDiv.appendChild(newList);
    if (thisShip.films.length === 0) {
      newList.innerHTML = "Film not available.";
    } else {
      for (let i = 0; i < thisShip.films.length; i++) {
        let thisShipFilm = new XMLHttpRequest();
        thisShipFilm.addEventListener("load", getFilms);
        thisShipFilm.open("GET", thisShip.films[i]);
        thisShipFilm.send();
        function getFilms() {
          let thisFilm = JSON.parse(this.responseText);
          let film = document.createElement("li");
          film.innerHTML = "Appeared in: " + thisFilm.title;
          contentDiv.appendChild(film);
        }
      }
    }
  }
}

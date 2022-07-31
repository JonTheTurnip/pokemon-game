// New (more efficient) Code from Part 2:

// we now know that we we can get an image by id by doing...
// https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png

// to get the names of all Pokemons
// https://pokeapi.co/api/v2/pokemon?limit=150

const pokedex = document.getElementById("pokedex");
const cachedPokemon = {};

// this is much more efficient than teh previous approach because we don't have
// to make n api calls to pull back everything for each pokemon.
// instead we can one call to get just the pokemon names and for each we can then make
// a call to get only what we need, in this case the Sprite
const fetchPokemon = async () => {
  const url = `https://pokeapi.co/api/v2/pokemon?limit=10`;
  const res = await fetch(url);
  const data = await res.json();
  const pokemon = data.results.map((data, index) => ({
    name: data.name,
    id: index + 1,
    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
      index + 1
    }.png`,
  }));

  displayPokemon(pokemon);
};

const displayPokemon = (pokemon) => {
  const pokemonHTMLString = pokemon
    .map(
      (pokeman) =>
        `
  <li class="card" onclick="selectPokemon(${pokeman.id})">
      <img class="card-image" src="${pokeman.image}"/>
      <h2 class="card-title">${pokeman.id}. ${pokeman.name}</h2>
      </a>
  </li>
      `
    )
    .join("");
  pokedex.innerHTML = pokemonHTMLString;
};

const selectPokemon = async (id) => {
  if (!cachedPokemon[id]) {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const res = await fetch(url);
    const pokeman = await res.json();
    cachedPokemon[id] = pokeman;
    displayPokemanPopup(pokeman);
  } else {
    displayPokemanPopup(cachedPokemon[id]);
  }
};

const displayPokemanPopup = (pokeman) => {
  console.log(pokeman);
  const type = pokeman.types.map((type) => type.type.name).join(", ");
  const htmlString = `
      <div class="popup">
          <button id="closeBtn" onclick="closePopup()">Close</button>
          <div class="card">
              <img class="card-image" src="${pokeman.sprites["front_default"]}"/>
              <h2 class="card-title">${pokeman.name}</h2>
              <p><small>Type: ${type} | Height:</small> ${pokeman.height} | Weight: ${pokeman.weight}</p>
          </div>
      </div>
  `;
  pokedex.innerHTML = htmlString + pokedex.innerHTML;
};

const closePopup = () => {
  const popup = document.querySelector(".popup");
  popup.parentElement.removeChild(popup);
};

fetchPokemon();

// Original code from Part 1:

// const pokedex = document.getElementById("pokedex");

// const fetchPokemon = () => {
//   const promises = [];
//   for (let i = 1; i <= 10; i++) {
//     const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
//     promises.push(fetch(url).then((res) => res.json()));
//   }

//   Promise.all(promises).then((results) => {
//     const pokemon = results.map((result) => ({
//       name: result.name,
//       image: result.sprites["front_default"],
//       type: result.types.map((type) => type.type.name).join(", "),
//       id: result.id,
//     }));
//     displayPokemon(pokemon);
//   });
// };

// const displayPokemon = (pokemon) => {
//   console.log(pokemon);
//   const pokemonHTMLString = pokemon
//     .map(
//       (pokemon) =>
//         `<li class="card">
//     <img class="card-image" src="${pokemon.image}"/>
//     <h2 class="card-title">${pokemon.id}. ${pokemon.name}</h2>
//     <p class="card-subtitle">Type: ${pokemon.type}</p>
//   </li>`
//     )
//     .join("");
//   pokedex.innerHTML = pokemonHTMLString;
// };

// fetchPokemon();

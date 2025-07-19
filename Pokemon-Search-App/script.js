// HTML Variables
// Form Variables
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");
const form = document.getElementById("search");

// Info Variables
const creatureName = document.getElementById("creature-name");
const creatureId = document.getElementById("creature-id");
const weight = document.getElementById("weight");
const height = document.getElementById("height");
const creatureImg = document.getElementById("creature-img");
const types = document.getElementById("types");

// Table Variables
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const specialAttack = document.getElementById("special-attack");
const specialDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");

// Search Function - Performs the Search for the inputted Pokémon
const search = async () => {
  try {
    const nameOrId = searchInput.value.toLowerCase();
    searchInput.value = "";
    const res = await fetch(
      `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${nameOrId}`
    );
    const data = await res.json();

    // Info Data
    creatureName.textContent = `${data.name.toUpperCase()}`;
    creatureId.textContent = `#${data.id}`;
    weight.textContent = `Weight: ${data.weight}`;
    height.textContent = `Height: ${data.height}`;
    creatureImg.innerHTML = `<img id="sprite" src="${data.sprites.front_default}" alt="${data.name} front default sprite"/>`;
    types.innerHTML = data.types
      .map(
        (obj) => `<span class="type ${obj.type.name}">${obj.type.name}</span>`
      )
      .join(", ")
      .toUpperCase();

    // Table Data
    hp.textContent = data.stats[0].base_stat;
    attack.textContent = data.stats[1].base_stat;
    defense.textContent = data.stats[2].base_stat;
    specialAttack.textContent = data.stats[3].base_stat;
    specialDefense.textContent = data.stats[4].base_stat;
    speed.textContent = data.stats[5].base_stat;
  } catch (err) {
    alert("Pokémon not found");
    console.log(`Pokémon not found: ${err}`);
  }
};

// EventListener to submit the input and call the search function
form.addEventListener("submit", (e) => {
  e.preventDefault();
  search();
});

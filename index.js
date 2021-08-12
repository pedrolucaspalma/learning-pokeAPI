// Função auxiliar
function createTypes(types, ul){
    types.forEach(function(type){
        let typeLi = document.createElement('li');
        typeLi.innerText = type['type']['name'];
        ul.append(typeLi);
    })
}

//Obtem os objetos com os valores dos pokemons da api
function fetchKantoPokemon(){
    fetch('https://pokeapi.co/api/v2/pokemon?limit=151') // v2/pokemon/ditto retornaria apenas o objeto ditto, que tem abilidade, forma, altura, peso...
        .then(response => response.json())
        .then(function(allpokemon){
            allpokemon.results.forEach(function(pokemon){
                fetchPokemonData(pokemon);
                // console.log(pokemon);
            })
        })
}

function fetchPokemonData(pokemon){
    let url = pokemon.url;

    fetch(url)
        .then(response => response.json())
        .then(function(pokeData){
            renderPokemon(pokeData)
    })
}

//Manipulação de DOM
function renderPokemon(pokeData){
    //armazenar o nome da div que possuirá os pokemons
    let allPokemonContainer = document.getElementById('poke-container');

    //criar uma div para cada pokemon
    let pokeContainer = document.createElement("div");
    pokeContainer.className = "pokemon"
    
    //nome do pokemon
    let pokeName = document.createElement('h4');
    pokeName.innerText = pokeData.name;

    //numero do pokemon
    let pokeNumber = document.createElement('p');
    pokeNumber.innerText = `#${pokeData.id}`;

    // //peso do pokemon
    let pokeWeight = document.createElement('p');
    pokeWeight.innerText = `Weight: ${pokeData.weight}`;

    //tipo(s) do pokemon
    let pokeTypes = document.createElement('ul');
    createTypes(pokeData.types, pokeTypes);
    pokeContainer.append(pokeName, pokeNumber, pokeTypes, pokeWeight);

    allPokemonContainer.appendChild(pokeContainer);
}

fetchKantoPokemon();
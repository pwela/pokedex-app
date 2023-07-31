// Creating IIFE
let pokemonRepository = (function() {
    let pokemonList = [
      {
        name: 'Bulbasaur',
        height: .7,
        types: ['grass', 'poison']
      },
      {
        name: 'Pikachu',
        height: .4,
        types: ['electric']
      },
      {
        name: 'Butterfree',
        height: 1.1,
        types: ['bug', 'flying']
      }
    ];
  
//function getAll the pokemons 
    function getAll() {
      return pokemonList;
    }

// function add
    function add(pokemon) {
// the second part of the consition in not norking : && Object.keys(pokemon).toString === [name,height,types].toString()
      if (typeof pokemon == "object" ) {
        pokemonList.push(pokemon);

      }
     else window.alert("Incorrect data type");
    }
  
  
    function addListItem (pokemon){
      let pokemons = document.querySelector('.pokemon-list');
      let pokemonItem = document.createElement('li');
// Creating a pokemon button
      let pokemonButton = document.createElement('button');
//  and adding and event listener for a clic which calls the function showDetails
//pokemonButton.addEventListener('click', showDetails, pokemon);
      pokemonButton.innerText = pokemon.name;
      pokemonButton.classList.add('pokemonButton_style');
      pokemonItem.appendChild(pokemonButton);
      pokemons.appendChild(pokemonItem);
      pokemonButtonClick (pokemon, pokemonButton);

      }

   // Show pokemon details
    function showDetails(pokemon) {
    console.log(pokemon.name);
    }
   
  // This function adds a 'click' eventListener to pokemonButton and calls the methos to show pokemon details
    function pokemonButtonClick (pokemon, pokemonButton) {
      pokemonButton.addEventListener('click', function () {
        showDetails(pokemon);
      });
    }

      return {
        add: add,
        getAll: getAll,
        addListItem: addListItem
    
      };

  })();
 
//Adding a pokemon
pokemonRepository.add({name: 'Nidoking', height: 1.4, types: ['ground','poison']})

//display all the pokemons
pokemonRepository.getAll().forEach ( function (pokemon){
  pokemonRepository.addListItem(pokemon);

});


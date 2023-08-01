// Creating IIFE
let pokemonRepository = (function() {
    let pokemonList = [];
    let apiUrl ="https://pokeapi.co/api/v2/pokemon/?limit=150";
    let loadingMessage = document.querySelector('.loading-message');
   
 // Hide loading message
 function hideLoadingMessage() {
  loadingMessage.classList.add('displayMessage');
 }   

  // Show loading message
  function showLoadingMessage() {
    loadingMessage.classList.remove('displayMessage');
   }   

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
      loadDetails(pokemon).then(function () {
        console.log(pokemon);
      });
    }
   
  // This function adds a 'click' eventListener to pokemonButton and calls the methos to show pokemon details
    function pokemonButtonClick (pokemon, pokemonButton) {
      pokemonButton.addEventListener('click', function () {
        showDetails(pokemon);
      });
    }

    function loadList() {
      showLoadingMessage();
      return fetch(apiUrl).then(function (response) {
        hideLoadingMessage();
        return response.json();
      }).then(function (json) {
        hideLoadingMessage();
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url
          };
          add(pokemon);
        });
      }).catch(function (e) {
        console.error(e);
      })
    }

    function loadDetails(item) {
      showLoadingMessage();
      let url = item.detailsUrl;
      return fetch(url).then(function (response) {
        hideLoadingMessage();
        return response.json();
      }).then(function (details) {
        hideLoadingMessage();
        // Now we add the details to the item
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
      }).catch(function (e) {
        console.error(e);
      });
    }
      return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails : loadDetails
    
      };

  })();
 
pokemonRepository.loadList().then(function(){
// add and display all the pokemons
pokemonRepository.getAll().forEach ( function (pokemon){
pokemonRepository.addListItem(pokemon);
});
});


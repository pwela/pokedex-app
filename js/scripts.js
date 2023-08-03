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

   // Show modal with pokemon detail

    function showDetails(pokemon) {
      loadDetails(pokemon).then(function () {
      showModal(pokemon);
      
      });
    }
      // Modal display
     //I have 5 properties here: name, detailsurl,image, height, types.
   // I should create a modal with name, image, height and types and maybe a link to url via api  
function showModal(pokemon) {

    // modal container
    let modalContainer = document.querySelector('#modal-container');
    modalContainer.innerHTML='';
    // modal
    let modal = document.createElement('div');
    modal.classList.add('modal');

    // modal elements
    let closeButtonElement = document.createElement('button');
    closeButtonElement.innerText='Close';
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.addEventListener('click', hideModal);

    let pokemonName = document.createElement('h1');
    pokemonName.innerText = 'Name: ' + pokemon.name;
    
    let pokemonHeight = document.createElement('p');
    pokemonHeight.innerText= 'Height: ' + pokemon.height;

    let pokemonImage = document.createElement('img');
    pokemonImage.src=pokemon.imageUrl;
    pokemonImage.classList.add('pokemon-image');

    let pokemonTypesList = document.createElement('ul');
    pokemonTypesList.innerText=('Types:');
    pokemonTypesList.classList.add('list-types');

    // This function retrieves each type in the list
    pokemon.types.forEach(function (typeItem) {
      let pokemonTypeItem= document.createElement('li');
      pokemonTypeItem.classList.add('list-types-items');
      pokemonTypeItem.innerHTML= typeItem.type.name;
      pokemonTypesList.appendChild(pokemonTypeItem);
    });

    modal.appendChild(closeButtonElement);
    modal.appendChild(pokemonName);
    modal.appendChild(pokemonImage);
    modal.appendChild(pokemonHeight);
    modal.appendChild(pokemonTypesList);
    modalContainer.appendChild(modal);
    modalContainer.classList.add('is-visible');

    modalContainer.addEventListener('click', (e) => {
      // Since this is also triggered when clicking INSIDE the modal
      // We only want to close if the user clicks directly on the overlay
      let target = e.target;
      if (target === modalContainer) {
        hideModal();
      }
    });
    
}

 function hideModal() {
  let modalContainer = document.querySelector('#modal-container');
  modalContainer.classList.remove('is-visible');
 }

 // Close with keyboard
window.addEventListener('keydown', (e) => {
  let modalContainer = document.querySelector('#modal-container');
  if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
    hideModal();  
  }
});

  // This function adds a 'click' eventListener to pokemonButton and calls the method to show pokemon details
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
          add(pokemon); // this is the add function delacred above
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


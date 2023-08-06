// Creating IIFE
let pokemonRepository = (function() {
  let pokemonList = [];
  let apiUrl ="https://pokeapi.co/api/v2/pokemon/?limit=150";
  let loadingMessage = document.querySelector('.loading-message');
 
// Hide loading message
function hideLoadingMessage() {
}   

// Show loading message
function showLoadingMessage() {
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
// selecting list ul in html with bootstrap utility class list-group
    let pokemons = $('.list-group');

// // selecting list li in document bootstrap utility class list-group-item

    let pokemonItem = $('<li class="list-group-item"></li>');

// Creating a pokemon button with bootstrap utility classes btn btn-primary btn-block
    let pokemonButton = $('<button button type="button" class="btn btn-primary btn-block" data-toggle="modal" data-target="#exampleModal">'+ pokemon.name +'</button>');

// appending pokemonButton to list item li
    pokemonItem.append(pokemonButton);
//    pokemonItem.append(demoModal);
//appending list item to list ul
    pokemons.append(pokemonItem);

//  and adding and event listener for a clic which calls the function showDetails
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

  let targetSelector=$('#exampleModal');
  
  let modalTitle=$('.modal-title');

  let modalBody=$('.modal-body');

  modalTitle.empty();
  modalBody.empty();

  // Affecting pokemon details to modalBody
  pokemonName= $('<h5>'+pokemon.name+'</h5>');
  let pokemonHeight = document.createElement('p');
  pokemonHeight.innerText= 'Height: ' + pokemon.height;



  let pokemonImage = document.createElement('img');
  pokemonImage.src=pokemon.imageUrl;
  pokemonImage.classList.add('pokemon-image');

  let pokemonImageBack = document.createElement('img');
  pokemonImageBack.src=pokemon.imageBackUrl;
  pokemonImageBack.classList.add('pokemon-image');

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

  modalTitle.append(pokemonName);
  modalBody.append(pokemonImage);
  modalBody.append(pokemonImageBack);
  modalBody.append(pokemonHeight);
  modalBody.append(pokemonTypesList);

  targetSelector.modal('show');
  
}

// This function adds a 'click' eventListener to pokemonButton and calls the method to show pokemon details
  function pokemonButtonClick (pokemon, pokemonButton) {
    pokemonButton.on('click', function () {
      showDetails(pokemon);
    });
  }

  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
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
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      // Now we add the details to the item
      item.imageUrl = details.sprites.front_default;
      item.imageBackUrl= details.sprites.back_default;
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


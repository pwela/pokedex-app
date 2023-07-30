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
  
    //function getAll 
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
  
    return {
      add: add,
      getAll: getAll,
  
    };
  
  })();
  
  // function to display pokemon

  function displayPokemon (pokemon){
    document.write("Pokemon name: " + pokemon.name + ", height:" + pokemon.height + "m. ");
        
          // check pokemon height
          if (pokemon.height > 1) {
            document.write("Wow that's big!" + "<br>");
          }
          else {
            document.write("<br>");
          }
      
    }
  
  // filter all pokemons with height < 1
 function filterPokemon (pokemon){
  if (pokemon.height <1) {
  return pokemon;
  }
}

function addingParagraph (string) {
  document.write("<p>" + string + "<p>");  
}

// display pokemon name and height
  pokemonRepository.getAll().forEach(displayPokemon);

// Adding a paragraph
 addingParagraph("Pokemons less than 1m");

 // filtering and diplaying
 let filteredPokemonRepository = pokemonRepository.getAll().filter(filterPokemon);
 filteredPokemonRepository.forEach( displayPokemon);

 addingParagraph("Adding a pokemon");
pokemonRepository.add({name: 'Blastoise', height: 1.6, types: ['water']} );

addingParagraph("display all pokemons");

pokemonRepository.getAll().forEach(displayPokemon);

addingParagraph("Pokemons less than 1m");
 // filtering and diplaying
filteredPokemonRepository = pokemonRepository.getAll().filter(filterPokemon);
filteredPokemonRepository.forEach( displayPokemon);
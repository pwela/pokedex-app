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
      pokemonList.push(pokemon);
    }
  
    return {
      add: add,
      getAll: getAll,
  
    };
  
  })();
  
  // display pokemon name and height
  
  pokemonRepository.getAll().forEach( function (pokemon){
  document.write("Pokemon name: " + pokemon.name + ", height:" + pokemon.height + "m. ");
      
        // check pokemon height
        if (pokemon.height === 1.1) {
          document.write("Wow that's big!" + "<br>");
        }
        else {
          document.write("<br>");
        }
    
  });

// Part 1
// pokemonList.forEach(function (pokemon) {
//     document.write("Pokemon name: " + pokemon.name + ", height:" + pokemon.height + "m. ");
    
//       // check pokemon height
//       if (pokemon.height === 1.1) {
//         document.write("Wow that's big!" + "<br>");
//       }
//       else {
//         document.write("<br>");
//       }
    
//     });
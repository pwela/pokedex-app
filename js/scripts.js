// Exercise 1.2
// creating an empty array list of pokemoon and initializing with 3 pokemons

let pokemonList=[
    {
        name:'Bulbasaur',
        height:.7,
        types:['grass', 'poison']
    },
    {
        name:'Pikachu',
        height:.4,
        types:['electric']},
    {
        name:'Butterfree',
        height:1.1, 
        types:['bug', 'flying']
    }
];

// Exercise 1.3
// display pokemon name and height
for(i=0; i<pokemonList.length; i++) {
    document.write(i+1 + ". Pokemon name: " + pokemonList[i].name + ", height:" + pokemonList[i].height + "m. ");
   
    // check pokemon height
    if(pokemonList[i].height===1.1) {
        document.write("Wow that's big!" + "<br>");
    }
    else {
        document.write("<br>");
    }
}
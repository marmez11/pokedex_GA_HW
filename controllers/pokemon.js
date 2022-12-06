const express = require("express")
const pokemon_data = require("../model/pokemon.js")

// create Router contructor to construct routes to local host server
const router = express.Router();

// specified routes to the local host server

// (Index) route for pokedex for display
router.get("/", (request, response) => {
    // response.send({pokemon: pokemon_data_2})
    response.render("pokemon_index.ejs", {pokemon: pokemon_data})
})

// NEW route: (New) route for adding new pokemon to pokedex
router.get('/new', (request, response)=>{
  response.render("new.ejs")
})

// (Show) Route for showing pokemon information
router.get("/:id", (request, response)=> {
    response.render("pokemon_show.ejs", {pokemon: pokemon_data[request.params.id], parameter_val: request.params.id})
})

// Destroy ROUTE - (DELETE) - DELETES ONE POKEMON

router.delete("/:id", (request, response) => {
    pokemon_data.splice(request.params.id, 1); //remove the item from the array
    response.redirect("/pokemon"); //redirect back to index route
  });

  // (edit) Route for showing pokemon information
  router.get("/:id/edit", (request, response)=> {
    //response.send(drinks[request.params.id])
    response.render("edit.ejs", {pokemon: pokemon_data[request.params.id], parameter_val: request.params.id})
})

// (UPDATE) ROUTE - PUT - updates a pokemon information

/*
{...pokemon_data[request.params.id],...request.body} . --> makes a copy of the pokemon_data or all of the particular pokemon data by id and then copys that data into the new object {...pokemon_data...request.body} and places the values of request.body into that object
*/

router.put("/:id", (request, response) => {
    //:id is the index of our pokemons array that we want to change
    pokemon_data[request.params.id] = {...pokemon_data[request.params.id],...request.body}; //in our pokemons array, find the index that is specified in the url (:id).  Set that element to the value of req.body (the input data)
    response.redirect("/pokemon"); //redirect to the index page
  });

// create route - (POST) - CREATES A POKEMON

router.post("/", (request, response) => {
    pokemon_data.push(request.body);
    response.redirect("/pokemon");
  });

//export the routes
module.exports = router;
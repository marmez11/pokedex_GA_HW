const express = require("express")
const pokemon_data = require("/Users/Mzmz12/Documents/Unit_9_MaxB/Day 1/pokemon_pokedex/model/pokemon")

// create Router contructor to construct routes to local host server
const router = express.Router();

// specified routes to the local host server

// (Index) route for pokedex for display
router.get("/", (request, response) => {
    // response.send({pokemon: pokemon_data_2})
    response.render("pokemon_index.ejs", {pokemon: pokemon_data})
})

// (Show) Route for showing pokemon information
router.get("/:id", (request, response)=> {
    response.render("pokemon_show.ejs", {pokemon: pokemon_data[request.params.id], parameter_val: request.params.id})
})

// NEW route: (New) route for adding new pokemon to pokedex
router.get('/new', (request, response)=>{
    response.render("new.ejs")
})

// Destroy ROUTE - (DELETE) - DELETES ONE POKEMON

router.delete("/:id", (request, response) => {
    pokemon_data.splice(req.params.id, 1); //remove the item from the array
    res.redirect("/pokemon"); //redirect back to index route
  });

  // (edit) Route for showing pokemon information
  router.get("/:id/edit", (request, response)=> {
    //response.send(drinks[request.params.id])
    response.render("edit.ejs", {pokemon: pokemon_data[request.params.id], parameter_val: request.params.id})
})

// (UPDATE) ROUTE - PUT - updates a pokemon information

router.put("/:id", (request, response) => {
    //:id is the index of our pokemons array that we want to change
    pokemon_data[request.params.id] = req.body; //in our pokemons array, find the index that is specified in the url (:id).  Set that element to the value of req.body (the input data)
    response.redirect("/pokemon"); //redirect to the index page
  });

// create route - (POST) - CREATES A POKEMON

router.post("/", (request, response) => {
    pokemon_data.push(request.body);
    response.redirect("/pokemon");
  });

//export the routes
module.exports = router;
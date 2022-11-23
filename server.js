const { response } = require("express");
const express = require("express")
const pokemon_app = express()
const pokemon_data = require("./model/pokemon.js")
const { isObject } = require("util");
const method_Override = require('method-override');
const { request } = require("http");
const morgan = require("morgan");
const route_CTRLS = require("./controllers/pokemon");
const port = 3004;


pokemon_app.use(morgan("dev"));
pokemon_app.use("/static", express.static("public"))
pokemon_app.use(express.urlencoded({ extended: true }))
pokemon_app.use((method_Override("_method")))


// opening route
pokemon_app.get("/", (request, response) => {
    response.send("Hello World")
})

// (Index) route for pokedex
pokemon_app.get("/pokemon_data", (request, response) => {
    response.send(pokemon_data)
})

// (Index) route for pokedex for display
pokemon_app.use("/pokemon", route_CTRLS)


pokemon_app.listen(port, (request, response)=>{
    console.log(`listening to port ${port}`)
    })

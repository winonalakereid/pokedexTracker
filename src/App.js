//import logo from './logo.svg';
import './App.css';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useEffect, useState } from 'react';
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);


function App() {
  const [pokemon, setPokemon] = useState([])
  const [pokemonList, setPokemonList] = useState([])
  useEffect(() => {
    getPokemon()
      .then(response => {
        let tempPokemon = JSON.parse(response.body)["Items"];
        tempPokemon.sort((a,b) => a.pokemon_number - b.pokemon_number);
        setPokemon(tempPokemon);
      })
  }, []);
  useEffect(() =>{
    let tempPokemonList = pokemon.map(pokemon => pokemon.pokemon_name);
    setPokemonList(tempPokemonList);
  }, [pokemon]);
  
  return (
    <div>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={pokemonList}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Pokemon" />}
      />
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.primary" gutterBottom>
            Bulbasaur
          </Typography>
          <img src="https://img.pokemondb.net/sprites/home/normal/bulbasaur.png" alt="Bulbasaur" />
        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    </div>
  );
}

async function getPokemon() {
  const response = await fetch("https://v9yo8n4ic6.execute-api.us-east-1.amazonaws.com/pokemon")
  return await response.json();
}

export default App;


/*
  <img src="https://img.pokemondb.net/sprites/home/normal/bulbasaur.png" alt="Bulbasaur" />
  <img src="https://img.pokemondb.net/sprites/home/shiny/bulbasaur.png" alt="Bulbasaur" />
*/
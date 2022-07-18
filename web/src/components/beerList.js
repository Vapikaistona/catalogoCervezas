import React, { useEffect, useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Input from '@mui/material/Input';
import { Button } from "@mui/material";
import ShowMoreText from "react-show-more-text";
import Icon from '@mdi/react'
import { mdiLiquor, mdiFlowerPollen, mdiStarCircle } from '@mdi/js'

const Beer = (props) => (
 <TableRow hover="true">
   <TableCell>{props.beer.name}</TableCell>
   <TableCell>{props.beer.breweryName}</TableCell>
   <TableCell>{props.beer.style}</TableCell>
   <TableCell>{props.beer.alchol}</TableCell>
   <TableCell>{props.beer.ibu}</TableCell>
   <TableCell>{props.beer.untappedMark.ratingScore}/{props.beer.untappedMark.ratingNumber}</TableCell>
   <TableCell><ShowMoreText lines={2} more="Más." less="Menos.">{props.beer.description}</ShowMoreText></TableCell>
 </TableRow>
);
 
export default function BeerList() {
 const [beers, setBeers] = useState([]);
 const [query, setQuery] = useState("")
 // This method fetches the records from the database.
 useEffect(() => {
   getBeers();
   return;
 }, [beers.length]);

 function handleKeyPress(e) {
  if (e.key === 'Enter') {
    getBeers(); 
  }
}
 async function getBeers() {
  const response = await fetch(`http://localhost:5000/beers?${query}`);
  if (!response.ok) {
    const message = `An error occurred: ${response.statusText}`;
    window.alert(message);
    return;
  }
  const beers = await response.json();
  setBeers(beers);
};

 // This method will map out the records on the table
 function beerList() {
   return beers.map((beer) => {
     return (
      <Beer
        beer={beer}
        key={beer._id}
      />
     );
   });
 }
 
 // This following section will display the table with the records of individuals.
 return (
   <div>
     <h3>Cervezas</h3>
     <Paper>
      <Input style={{ width: "80%" }} placeholder="Ejemplo: name=Majariega&sort=untappedMark.ratingScore>" onChange={event => setQuery(event.target.value)} onKeyUp={handleKeyPress.bind(this)}/><Button style={{ width: "20%" }} variant="contained" onClick={event => getBeers()}>Buscar</Button>
     </Paper>
     <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell>Marca</TableCell>
            <TableCell>Estilo</TableCell>
            <TableCell><Icon path={mdiLiquor}
              title="Alcohol"
              color="#d78800"/></TableCell>
            <TableCell><Icon path={mdiFlowerPollen}
              title="IBUs"
              color="#0fb100"/></TableCell>
            <TableCell><Icon path={mdiStarCircle}
              title="Puntuación"
              size={1}
              color="#ffcc00"/></TableCell>
            <TableCell>Descripción</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{beerList()}</TableBody>
      </Table>
     </TableContainer>
   </div>
 );
}
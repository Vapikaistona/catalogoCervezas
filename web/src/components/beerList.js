import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
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
 <TableRow hover="true" onClick={() => this.handleNavigation(props.beer.url)}>
   <TableCell>{props.beer.name}</TableCell>
   <TableCell>{props.beer.style}</TableCell>
   <TableCell>{props.beer.alchol}</TableCell>
   <TableCell>{props.beer.ibu}</TableCell>
   <TableCell>{props.beer.untappedMark.ratingScore}<br></br><span style={{color:'#b8b8b8'}}>{props.beer.untappedMark.ratingNumber}</span></TableCell>
   <TableCell>{props.beer.breweryName}</TableCell>
   <TableCell><ShowMoreText lines={2} more="Más." less="Menos.">{props.beer.description}</ShowMoreText></TableCell>
 </TableRow>
);
 
export default function BeerList() {
 const [beers, setBeers] = useState([]);
 const [query, setQuery] = useState("")
 let navigate = useNavigate ();
 // This method fetches the records from the database.
 useEffect(() => {
   getBeers();
   return;
 }, [beers.length]);
 function handleNavigation(url) {
  navigate(url);
 }
 function handleKeyPress(e) {
  if (e.key === 'Enter') {
    getBeers(); 
  }
}
 async function getBeers() {
  const response = await fetch(`http://192.168.86.36:5000/beers?${query}`);
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
      <Input style={{ width: "80%" }} placeholder="Ejemplo: name=Majariega&ibu=$gt 100&sort=untappedMark.ratingScore>" onChange={event => setQuery(event.target.value)} onKeyUp={handleKeyPress.bind(this)}/><Button style={{ width: "20%" }} variant="contained" onClick={event => getBeers()}>Buscar</Button>
     </Paper>
     <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
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
            <TableCell>Marca</TableCell>
            <TableCell>Descripción</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{beerList()}</TableBody>
      </Table>
     </TableContainer>
   </div>
 );
}
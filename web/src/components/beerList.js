import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
 
const Beer = (props) => (
 <tr>
   <td>{props.beer.name}</td>
   <td>{props.beer.breweryName}</td>
   <td>{props.beer.style}</td>
   <td>{props.beer.alchol}</td>
   <td>{props.beer.ibu}</td>
   <td>{props.beer.untappedMark.ratingScore}/{props.beer.untappedMark.ratingNumber}</td>
   <td>{props.beer.description}</td>
 </tr>
);
 
export default function BeerList() {
 const [beers, setBeers] = useState([]);
 
 // This method fetches the records from the database.
 useEffect(() => {
   async function getBeers() {
     const response = await fetch(`http://localhost:5000/beers`);
     if (!response.ok) {
       const message = `An error occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
     const beers = await response.json();
     setBeers(beers);
   }
   getBeers();
   return;
 }, [beers.length]);
 
 
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
     <h3>Beers List</h3>
     <table className="table table-striped" style={{ marginTop: 20 }}>
       <thead>
         <tr>
           <th>Name</th>
           <th>Brewery</th>
           <th>Style</th>
           <th>Alchol</th>
           <th>IBU</th>
           <th>Rating</th>
           <th>Description</th>
         </tr>
       </thead>
       <tbody>{beerList()}</tbody>
     </table>
   </div>
 );
}
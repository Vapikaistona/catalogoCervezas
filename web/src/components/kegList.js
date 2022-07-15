import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
 
const Keg = (props) => (
 <tr>
   <td>{props.keg.name}</td>
   <td>{props.keg.halfprice}</td>
   <td>{props.keg.fullprice}</td>
   <td>
     <Link className="btn btn-link" to={`/edit/${props.keg._id}`}>Edit</Link> |
     <button className="btn btn-link"
       onClick={() => {
         props.deleteKeg(props.keg._id);
       }}
     >
       Delete
     </button>
   </td>
 </tr>
);
 
export default function KegList() {
 const [kegs, setKegs] = useState([]);
 
 // This method fetches the records from the database.
 useEffect(() => {
   async function getKegs() {
     const response = await fetch(`http://localhost:5000/kegs/`);
 
     if (!response.ok) {
       const message = `An error occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
 
     const kegs = await response.json();
     setKegs(kegs);
   }
 
   getKegs();
 
   return;
 }, [kegs.length]);
 
 // This method will delete a record
 async function deleteKeg(id) {
   await fetch(`http://localhost:5000/keg/${id}`, {
     method: "DELETE"
   });
 
   const newKegs = kegs.filter((el) => el._id !== id);
   setKegs(newKegs);
 }
 
 // This method will map out the records on the table
 function kegList() {
   return kegs.map((keg) => {
     return (
      <Keg
        keg={keg}
        deleteKeg={() => deleteKeg(keg._id)}
        key={keg._id}
      />
     );
   });
 }
 
 // This following section will display the table with the records of individuals.
 return (
   <div>
     <h3>Kegs List</h3>
     <table className="table table-striped" style={{ marginTop: 20 }}>
       <thead>
         <tr>
           <th>Name</th>
           <th>HalfPrice</th>
           <th>FullPrice</th>
         </tr>
       </thead>
       <tbody>{kegList()}</tbody>
     </table>
   </div>
 );
}
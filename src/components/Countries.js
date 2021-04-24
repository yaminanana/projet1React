import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from './Card';
const Countries = () => {
//un hook : comme une variable, le premier élément crée la donnée, le deuxième met à jour cette donnée
const [data, setData] = useState([]);
useEffect(() => {// = un hook comme useState
    axios.get("https://restcountries.eu/rest/v2/all?fields=name;population;region;capital;flag").then((res)=> setData(res.data));

 
  
    
}, []);//le useEffect ne s'executera qu'une fois puis s'arrêtera sauf si on lui met une nouvelle donnée dans le callback[]

return (
<div className="countries">
    <ul className="countries-list">
        {data.map((country) =>
        <Card />
        
        )}
    </ul>
</div>
);
};


export default Countries;
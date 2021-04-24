import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from './Card';
const Countries = () => {
//un hook : comme une variable, le premier élément crée la donnée, le deuxième met à jour cette donnée
const [data, setData] = useState([]);
const [sortedData, setSortedData] = useState([]);
const [playOnce, setPlayOnce] = useState(true);
const [rangeValue, setRangeValue] = useState(40);
const [selectedRadio, setSelectedRadio] = useState('');
const radios = ["Africa", "America", "Asia", "Europe", "Oceania"]


useEffect(() => {// = un hook comme useState
    if(playOnce){
        axios.get("https://restcountries.eu/rest/v2/all?fields=name;population;region;capital;flag")
        .then((res)=> { 
            setData(res.data);
            setPlayOnce(false);
        });

    }
    
    //code le tri decroissant de la population :
 const sortedCountry = () => {
     const countryObj = Object.keys(data).map((i) => data[i]);
     //permet de transformer notre array en objet pour pouvoir utiliser sort
     const sortedArray = countryObj.sort((a,b) => {
return b.population - a.population
     });
     sortedArray.length = rangeValue;
     setSortedData(sortedArray)
 };
  sortedCountry();
    
}, [data, rangeValue]);//le useEffect ne s'executera qu'une fois puis s'arrêtera sauf si on lui met une nouvelle donnée dans le callback[]

return (
<div className="countries">
    <div className="sort-container">
        <input type="range" min="1" max="250" value={rangeValue}
        onChange={(e) => setRangeValue(e.target.value)} /> 
    
    <ul>
        {radios.map((radio)=>{
            return (
                <li key={radio}>
                    <input type= "radio" value={radio} id={radio} 
                    checked={radio === selectedRadio} onChange={(e)=> setSelectedRadio(e.target.value)} />
                    <label htmlFor={radio}>{radio}</label>               
                </li>
            );
        })}
    </ul>
    </div>
    <div className="cancel">
        {selectedRadio && <h5 onClick={() => setSelectedRadio 
        ("")}>Annuler recherche</h5>}
    </div>
    <ul className="countries-list">
        {sortedData
        .filter((country) => country.region.includes(selectedRadio))//permet de filtrer les continents avant le map
        .map((country) =>
        <Card country={country} key={country.name} /> //création d'une props pour envoyer les données de country à la card

        
        )}
    </ul>
</div>
);
};


export default Countries;
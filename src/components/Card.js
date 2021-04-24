import React from 'react';

const Card = (props) => {
    const { country } = props;//destructuring= props.country
    

    const numberFormat = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");//pour x (nomb pop) tous les trois caractères on mets un espace

    }
    
    
    
    return (
<li className="card">
    <img src={country.flag} alt="" />
    <div className="data-container">
        <ul>
        <li>{country.name}</li>
        <li>{country.capital}</li>
        <li>pop. {numberFormat(country.population)}</li>
        </ul>
    </div>
</li>
    );
};

export default Card;
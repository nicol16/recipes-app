import React from 'react';
import style from './recipe.module.css';


const Recipe = ({title, calories, image, ingredients, totalTime, source}) => {

    return(


        <div className={style.recipe}>
            <h1>{title}</h1>
            <ol>
                {ingredients.map(ingredient =>(
                    <li>{ingredient.text}</li>
                ))}
            </ol>
            <p>Cantidad de calorias: {calories}</p>
            <p>Cantidad de minutos: {totalTime}</p>
            <p>fuente: {source}</p>
            <img className={style.image} src={image} alt=""/>
        </div>
    );
};

export default Recipe;

import React, {useEffect, useState} from "react";
import './App.css';
import Recipe from "./recipe";


const App = () => {

    const APP_ID = "dc6e99c5";
    const APP_KEY = "425b750c422fd3ad6c3982019f44a262";

    //Recordar que el uso del useState tiene 2 metodos el set que es para setear los valores
    // y el primero para acceder a los datos
    //Los estados son parecidos a las variables, solo que son mas modernos y son muchos mejores para trabajar con API
    const [recipes, setRecipes] = useState([]);

    // const recipes = [];
    const [search, setSearch] = useState('');
    const [query, setQuery] = useState('chicken');

    //Cuando utilizamos api y debemos de utilizar await, es obligatorio utilizar async en la funcion
    const getRecipes = async () => {

        //El await funciona para esperar hasta que los datos del api lleguen
        const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);

        const data = await response.json();


        console.log(data.hits);
        //Forma de agregar datos a un estado, lo correcto es utilizar estados a la hora de trabajar con API
        setRecipes(data.hits);

    //    formas incorrecta
    //     recipes = data.hits;
    //     setRecipes = data.hits;

    };



    //El uso del useEffect es hacer que se ejecute  lo que esta dentro de este
    useEffect( () => {

        getRecipes();

    //    Cada vez que se recarga la pagina se ejecutara la funcion recipe
    //    Como fue agregada la variable query, esto quiere decir que cada vez que la variable query cambia
        //    y esta variable solo cambia cuando se presiona el boton de search
    }, [query]);


    //En event.target.value se guarda cada una de las teclas que fueron digitadas
    const updateSearch = event => {

        console.log("Evento:", event.target.value);

        setSearch(event.target.value);
    }


     const getSearch = event => {

        //El metodo preventDefault evita que la pagina se recargue de nuevo
        event.preventDefault();

        setQuery(search);

        setSearch('');
     }


    return (
        <div className="App">

            {/*Los form siempre deben de tener un metodo onSubmit este metodo debe de tener dentro una funcion
            que se ejecutara a la hora de presionar el boton que en su type tenga submit*/}
            <form onSubmit={getSearch} className="search-form">

                {/*En value va el valor que se mostrara y se ira actualizando con cada tecleo*/}
                <input className="search-bar" type="text" value={search} onChange={updateSearch}/>

                {/*Boton encargado ejecutar el onSubmit del formulario*/}
                <button className="search-button" type="submit">
                    Search
                </button>

            </form>
}
            <div className="recipes">

            {/*    Para poder motrar todos los elementos de un arreglo debemos de utilizar la funcion map */}
            {recipes.map((recipe, index) =>(

                <div key={index}>

                    <Recipe
                        title={recipe.recipe.label}
                        calories={recipe.recipe.calories}
                        image={recipe.recipe.image}
                        ingredients={recipe.recipe.ingredients}
                        totalTime = {recipe.recipe.totalTime}
                        source = {recipe.recipe.source}
                    />
                </div>
            ))};
        </div>
       </div>
    );
}


export default App;

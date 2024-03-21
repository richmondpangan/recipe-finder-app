import React, { useEffect, useState } from 'react';
import {Link, useParams} from 'react-router-dom';
import "../css/Searched.css";

function Cuisine() {

    const [cuisine, setCuisine] = useState([]);
    let params = useParams();

    const getCuisine = async (name) => {

        const check = localStorage.getItem(name);

        // Check if there is an item in local storage; fetch data if there is nothing and store in local storage
        if (check) {
            setCuisine(JSON.parse(check));
        }
        else { 
            const data = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${import.meta.env.VITE_REACT_APP_API_KEY}&cuisine=${name}&number=12`);
            const recipes  = await data.json();

            localStorage.setItem(name, JSON.stringify(recipes.results));
            setCuisine(recipes.results);
        }
    }

    useEffect(() => {
        getCuisine(params.type);
        console.log(params.type);
    },[params.type])

  return (
    <div className='grid'
        animate={{opacity: 1}}
        initial={{opacity: 0}}
        exit={{opacity: 0}}
        transition={{duration: 0.5}}
    >
      {cuisine.map((item) => {
        return(
            <div className='card' key={item.id}>
                <Link to={'/recipe/' + item.id}>
                    <img src={item.image} alt={item.title} />
                    <h4>{item.title}</h4>
                </Link>
            </div>
        );
      })}
    </div>
  )
}

export default Cuisine

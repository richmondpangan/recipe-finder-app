import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {motion} from 'framer-motion';
import {Link, useParams} from 'react-router-dom';

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
            const data = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${import.meta.env.VITE_REACT_APP_API_KEY}&cuisine=${name}`);
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
    <Grid>
      {cuisine.map((item) => {
        return(
            <Card key={item.id}>
                <img src={item.image} alt={item.title} />
            </Card>
        );
      })}
    </Grid>
  )
}

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
    grid-gap: 3rem;
`;

const Card = styled.div`
    img {
        width: 100%;
        border-radius: 2rem;
    }

    a {
        text-decoration: none;
    }

    h4 {
        text-align: center;
        padding: 1rem;
    }
`;

export default Cuisine

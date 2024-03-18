import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Link } from "react-router-dom";

function Searched() {

    const [searchedRecipes, setSearchedRecipes] = useState([]);
    let params = useParams();

    const getSearched = async (name) => {

        const check = localStorage.getItem(`search_${name}`);

        // Check if there is an item in local storage; fetch data if there is nothing and store in local storage
        if (check) {
            setSearchedRecipes(JSON.parse(check));
        }
        else { 
            const data = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${import.meta.env.VITE_REACT_APP_API_KEY}&query=${name}`);
            const recipes  = await data.json();

            localStorage.setItem(`search_${name}`, JSON.stringify(recipes.results));
            setSearchedRecipes(recipes.results);
        }
    }

    useEffect(() => {
        getSearched(params.search);
        console.log(params.search);
    },[params.search])

  return (
    <Grid>
      {searchedRecipes.map((item) => {
        return(
            <Card key={item.id}>
                <Link to={'/recipe/' + item.id}>
                    <img src={item.image} alt={item.title} />
                    <h4>{item.title}</h4>
                </Link>
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

export default Searched

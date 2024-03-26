import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import {motion} from "framer-motion";
import "../css/Searched.css";

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
            const data = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${import.meta.env.VITE_REACT_APP_API_KEY}&query=${name}&number=15`);
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
    <motion.div className="grid"
      animate={{opacity: 1}}
      initial={{opacity: 0}}
      exit={{opacity: 0}}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      {searchedRecipes.map((item) => {
        return(
            <div className="card" key={item.id}>
                <Link to={'/recipe-finder-app/recipe/' + item.id}>
                    <img src={item.image} alt={item.title} />
                    <h4>{item.title}</h4>
                </Link>
            </div>
        );
      })}
    </motion.div>
  )
}

export default Searched

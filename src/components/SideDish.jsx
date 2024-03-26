import { useEffect, useState } from "react";
import {Splide, SplideSlide} from "@splidejs/react-splide";
import '@splidejs/react-splide/css';
import { Link } from "react-router-dom";
import "../css/Home.css"

function SideDish() {

  const [sideDish, setSideDish] = useState([]);

  useEffect(() => {
    getSideDish();
  }, [])

  // Fetch data from API
  const getSideDish = async () => {

    const check = localStorage.getItem('side-dish');
    
    // Check if there is an item in local storage; fetch data if there is nothing and store in local storage
    if (check) {
      setSideDish(JSON.parse(check));
    }
    else {
      const api = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${import.meta.env.VITE_REACT_APP_API_KEY}&query=side+dish&number=20`);
      const data = await api.json();

      // Select a 10 random subset of recipes
      const randomRecipes = getRandomSubset(data.results, 10);

      // Select a random subset from an array
      function getRandomSubset(array, size) {
        const shuffled = array.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, size);
      }

      localStorage.setItem('side-dish', JSON.stringify(randomRecipes));
      setSideDish(randomRecipes);
      console.log(randomRecipes);
    }

  };

  const [cardPerPage, setCardPerPage] = useState(3); // Initial perPage value
  const [gapPerCard, setGapPerCard] = useState("3.5rem"); // Initial gap value

  // Function to update card display per page based on screen width
  const updateCardPerPage = () => {
    if ((window.innerWidth < 768)) {
      setCardPerPage(3);
      setGapPerCard("1.5rem");
    }
    else if (window.innerWidth < 1200) {
      setCardPerPage(3);
      setGapPerCard("2.5rem");
    }
    else {
      setCardPerPage(3); // Set cardPerPage to 4 on larger screens
      setGapPerCard("3.5rem");
    }
  };

  useEffect(() => {
    // Call the updateCardPerPage function initially and add event listener for screen resize
    updateCardPerPage();
    window.addEventListener("resize", updateCardPerPage);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", updateCardPerPage);
    };
  }, []);

  return (
    <div>
      <div className="menu-wrapper">
        <h3>Side Dish</h3>
        <Splide options={{
          perPage: cardPerPage,
          arrows: false,
          pagination: false,
          drag: "free",
          gap: gapPerCard
        }}>
          {sideDish.map((recipe) => {
            return(
              <SplideSlide key={recipe.id}>
                <div className="menu-card">
                  <Link to={'/recipe-finder-app/recipe/' + recipe.id}>
                    <p>{recipe.title}</p>
                    <img src={recipe.image} alt={recipe.title} />
                    <div className="menu-gradient" />
                  </Link>
                </div>
              </SplideSlide>
            );
          })}
        </Splide>
      </div>
    </div>
  );
}

export default SideDish

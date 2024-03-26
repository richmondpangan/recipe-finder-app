import { useEffect, useState } from "react";
import {Splide, SplideSlide} from "@splidejs/react-splide";
import '@splidejs/react-splide/css';
import { Link } from "react-router-dom";
import "../css/Home.css"

function Popular() {

  const [popular, setPopular] = useState([]);

  useEffect(() => {
    getPopular();
  }, [])

  // Fetch data from API
  const getPopular = async () => {

    const check = localStorage.getItem('popular');
    
    // Check if there is an item in local storage; fetch data if there is nothing and store in local storage
    if (check) {
      setPopular(JSON.parse(check));
    }
    else {
      const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${import.meta.env.VITE_REACT_APP_API_KEY}&number=10`);
      const data = await api.json();

      console.log(import.meta.env.VITE_REACT_APP_API_KEY);

      localStorage.setItem('popular', JSON.stringify(data.recipes));
      setPopular(data.recipes);
      console.log(data.recipes);
    }

  };

  const [cardPerPage, setCardPerPage] = useState(4); // Initial perPage value
  const [gapPerCard, setGapPerCard] = useState("4rem"); // Initial gap value

  // Function to update card display per page based on screen width
  const updateCardPerPage = () => {
    if ((window.innerWidth < 768)) {
      setCardPerPage(3);
      setGapPerCard("1.5rem");
    }
    else if (window.innerWidth < 1200) {
      setCardPerPage(3);
      setGapPerCard("3rem");
    }
    else {
      setCardPerPage(4); // Set cardPerPage to 4 on larger screens
      setGapPerCard("4rem");
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
      <div className="popular-wrapper">
        <h3>Trending</h3>
        <Splide options={{
          perPage: cardPerPage,
          arrows: false,
          pagination: false,
          drag: "free",
          gap: gapPerCard
        }}>
          {popular.map((recipe) => {
            return(
              <SplideSlide key={recipe.id}>
                <div className="popular-card">
                  <Link to={'/recipe-finder-app/recipe/' + recipe.id}>
                    <p>{recipe.title}</p>
                    <img src={recipe.image} alt={recipe.title} />
                    <div className="popular-gradient" />
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

export default Popular

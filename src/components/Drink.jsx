import { useEffect, useState } from "react";
import {Splide, SplideSlide} from "@splidejs/react-splide";
import '@splidejs/react-splide/css';
import { Link } from "react-router-dom";
import "../css/Home.css"

function Drink() {

    const [drink, setDrink] = useState([]);

    useEffect(() => {
      getDrink();
    }, [])
  
    // Fetch data from API
    const getDrink = async () => {
  
      const check = localStorage.getItem('drink');
      
      // Check if there is an item in local storage; fetch data if there is nothing and store in local storage
      if (check) {
        setDrink(JSON.parse(check));
      }
      else {
        const api = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${import.meta.env.VITE_REACT_APP_API_KEY}&query=drink&number=10`);
        const data = await api.json();
  
        localStorage.setItem('drink', JSON.stringify(data.results));
        setDrink(data.results);
        console.log(data.results);
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
          <h3>Drinks</h3>
          <Splide options={{
            perPage: cardPerPage,
            arrows: false,
            pagination: false,
            drag: "free",
            gap: gapPerCard
          }}>
            {drink.map((recipe) => {
              return(
                <SplideSlide key={recipe.id}>
                  <div className="menu-card">
                    <Link to={'/recipe/' + recipe.id}>
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

export default Drink

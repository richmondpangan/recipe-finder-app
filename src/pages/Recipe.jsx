import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {motion} from "framer-motion";
import "../css/Recipe.css";

function Recipe() {

    const [details, setDetails] = useState({});
    const [activeTab, setActiveTab] = useState("summary");
    let params = useParams();

    const fetchDetails = async () => {
        const check = localStorage.getItem(`details_${params.name}`);

        if (check) {
            setDetails(JSON.parse(check));
        }
        else {
            const data = await fetch(`https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${import.meta.env.VITE_REACT_APP_API_KEY}`);
            const detailData = await data.json();

            localStorage.setItem(`details_${params.name}`, JSON.stringify(detailData));
            setDetails(detailData);
            console.log(detailData);
        }
    };

    useEffect(() => {
        fetchDetails();
    },[params.name]);

  return (
    <motion.div className="detail-wrapper"
      animate={{opacity: 1}}
      initial={{opacity: 0}}
      exit={{opacity: 0}}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <div className="img-container">
        <h2>{details.title}</h2>
        <img src={details.image} alt={details.title} />
      </div>
      <div className="info-container">
        <div className="button-container">
          <button
            className={`button ${activeTab === "summary" ? "active" : ""}`}
            onClick={() => setActiveTab("summary")}
          >
            Summary
          </button>
          <button
            className={`button ${activeTab === "instructions" ? "active" : ""}`}
            onClick={() => setActiveTab("instructions")}
          >
            Instructions
          </button>
          <button
            className={`button ${activeTab === "ingredients" ? "active" : ""}`}
            onClick={() => setActiveTab("ingredients")}
          >
            Ingredients
          </button>
        </div>
        {activeTab === "summary" && (
          <div className="summary-container">
          <div className="summary" dangerouslySetInnerHTML={{ __html: details.summary }} />
          </div>
        )}
        {activeTab === "instructions" && (
          <div className="instructions-container">
            <div className="instruction" dangerouslySetInnerHTML={{ __html: details.instructions }} />
          </div>
        )}
        {activeTab === "ingredients" && (
          <ul className="ingredients-container">
            {details.extendedIngredients.map((ingredient) => (
              <li className="ingredient" key={ingredient.id}>{ingredient.original}</li>
            ))}
          </ul>
        )}
      </div>
    </motion.div>
  );
}

export default Recipe

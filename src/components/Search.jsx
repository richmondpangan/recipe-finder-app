import {useState} from "react";
import {FaSearch} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../css/Home.css"

function Search() {

    const [input, setInput] = useState("");
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        navigate('/recipe-finder-app/searched/' + input);
    }

  return (
    <form className="form-style" onSubmit={submitHandler}>
        <div>
            <FaSearch></FaSearch>
            <input type="text" onChange={(e) => setInput(e.target.value)} value={input} placeholder="Search a food or recipe" />
        </div>
    </form>
  )
}

export default Search

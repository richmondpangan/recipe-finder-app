import { GiHamburger } from "react-icons/gi";
import { GiNoodles } from "react-icons/gi";
import { FaPizzaSlice } from "react-icons/fa";
import { GiSushis } from "react-icons/gi";
import { GiTacos } from "react-icons/gi";
import {NavLink} from "react-router-dom";
import "../css/Home.css"

function Category() {
  return (
    <div className="cuisine-list">
      <NavLink to={'/recipe-finder-app/cuisine/American'} className="list-item">
        <GiHamburger />
        <h4>American</h4>
      </NavLink>
      <NavLink to={'/recipe-finder-app/cuisine/Chinese'} className="list-item">
        <GiNoodles />
        <h4>Chinese</h4>
      </NavLink>
      <NavLink to={'/recipe-finder-app/cuisine/Italian'} className="list-item">
        <FaPizzaSlice />
        <h4>Italian</h4>
      </NavLink>
      <NavLink to={'/recipe-finder-app/cuisine/Japanese'} className="list-item">
        <GiSushis />
        <h4>Japanese</h4>
      </NavLink>
      <NavLink to={'/recipe-finder-app/cuisine/Mexican'} className="list-item">
        <GiTacos />
        <h4>Mexican</h4>
      </NavLink>
    </div>
  )
}

export default Category

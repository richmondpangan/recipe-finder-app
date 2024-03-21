import {FaPizzaSlice, FaHamburger} from "react-icons/fa";
import {GiNoodles, GiChopsticks} from 'react-icons/gi';
import {NavLink} from "react-router-dom";
import "../css/Home.css"

function Category() {
  return (
    <div className="cuisine-list">
      <NavLink to={'/cuisine/Italian'} className="list-item">
        <FaPizzaSlice />
        <h4>Italian</h4>
      </NavLink>
      <NavLink to={'/cuisine/American'} className="list-item">
        <FaHamburger />
        <h4>American</h4>
      </NavLink>
      <NavLink to={'/cuisine/Thai'} className="list-item">
        <GiNoodles />
        <h4>Thai</h4>
      </NavLink>
      <NavLink to={'/cuisine/Japanese'} className="list-item">
        <GiChopsticks />
        <h4>Japanese</h4>
      </NavLink>
    </div>
  )
}

export default Category

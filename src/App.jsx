import Pages from "./pages/Pages";
import Category from "./components/Category";
import {BrowserRouter, Link} from "react-router-dom";
import Search from "./components/Search";
import {GiCook} from "react-icons/gi";
import "./css/Home.css"

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="nav">
          <GiCook />
          <Link to={'/'} className="logo">Food Recipe</Link>
        </div>
        <Search />
        <Category />
        <Pages />
      </BrowserRouter>
    </>
  )
}

export default App

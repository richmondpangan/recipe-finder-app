import React from 'react';
import Home from './Home';
import Cuisine from './Cuisine';
import Searched from './Searched';
import Recipe from './Recipe';
import {Route, Routes} from 'react-router-dom';

function Pages() {
  return (
    <Routes>
      <Route path='/recipe-finder-app/' element={<Home />} />
      <Route path='/recipe-finder-app/cuisine/:type' element={<Cuisine />} />
      <Route path='/recipe-finder-app/searched/:search' element={<Searched />}></Route>
      <Route path='/recipe-finder-app/recipe/:name' element={<Recipe />}></Route>
    </Routes>
  )
}

export default Pages

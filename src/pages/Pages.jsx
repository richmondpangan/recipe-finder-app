import React from 'react';
import Home from './Home';
import Cuisine from './Cuisine';
import Searched from './Searched';
import Recipe from './Recipe';
import {Route, Routes} from 'react-router-dom';

function Pages() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/cuisine/:type' element={<Cuisine />} />
      <Route path='/searched/:search' element={<Searched />}></Route>
      <Route path='/recipe/:name' element={<Recipe />}></Route>
    </Routes>
  )
}

export default Pages

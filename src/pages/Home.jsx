import Popular from "../components/Popular";
import MainCourse from "../components/MainCourse";
import SideDish from "../components/SideDish";
import Appetizer from "../components/Appetizer";
import Dessert from "../components/Dessert";
import Drink from "../components/Drink";
import {motion} from "framer-motion";

import React from 'react'

function Home() {
  return (
    <motion.div
      animate={{opacity: 1}}
      initial={{opacity: 0}}
      exit={{opacity: 0}}
      transition={{duration: 0.5}}
    >
      <Popular />
      <MainCourse />
      <SideDish />
      <Appetizer />
      <Dessert />
      <Drink />
    </motion.div>
  );
}

export default Home

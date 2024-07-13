import React from "react";
import {useState, useEffect} from 'react'
import Card from "../components/Card";
const Home = ({ customProp }) => {
  // Use customProp as needed
  return (
  <Card customProp={customProp} />
  );
};

export default Home;

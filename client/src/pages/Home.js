import React from "react";
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const Home = () => {

    return (
        <div>
            <h1>Home</h1>
            <Link to="/login/farmer">Login as Farmer</Link>
            <br></br>
            <Link to="/login/admin">Login as Admin</Link>            
        </div>
    )

}

export default Home 
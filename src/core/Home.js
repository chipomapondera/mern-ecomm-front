import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { getProducts } from "./apiCore";

const Home = () => {
    const [productsByArrival, setProductsByArrival] = useState([]);
    const [productsBySell, setProductsBySell] = useState([]);
    const [error, setError ] = useState(false);

    const loadProductsByArrival = () => {
        getProducts("createdAt")
        .then(data => {
            if (data.error) {
                setError(data.error)
            } else {
                setProductsByArrival(data)
            }
        });
    };

    const loadProductsBySell = () => {
        getProducts("sold")
        .then(data => {
            if (data.error) {
                setError(data.error)
            } else {
                setProductsBySell(data)
            }
        });
    };

    useEffect(() => {
        loadProductsByArrival();
        loadProductsBySell();
    }, [])

    return (
        <Layout 
            title="Home Page" 
            description="Node React E-Comm App"
        >
            {JSON.stringify(productsByArrival)}
            <hr/>
            {JSON.stringify(productsBySell)}
        </Layout>
    );
};

export default Home;

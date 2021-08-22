import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { getProducts } from "./apiCore";
import Card from "./Card";
import Search from "./Search";

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
            className="container-fluid"
        >
            <Search />
            <h3 className="mb-4">New Arrivals</h3>
            <div className="row">
                {productsByArrival.map((product, index) => (
                    <div key={index} className="col-4 mb-3">
                        <Card product={product} />
                    </div>
                ))}
            </div>
            <h3 className="mb-4">Best Seller</h3>
            <div className="row">
                {productsBySell.map((product, index) => (
                    <div key={index} className="col-4 mb-3">
                        <Card product={product} />
                    </div>
                ))}
            </div>
        </Layout>
    );
};

export default Home;

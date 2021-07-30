import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import Card from "./Card";
import Checkbox from "./Checkbox";
import { getCategories } from "./apiCore";

const Shop = () => {
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(false);

    const init = () => {
        getCategories()
        .then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setCategories(data);
            }
        });
    };

    useEffect(() => {
        init();
    }, []);

    const handleFilters = (filters, filterBy) => {
        console.log("SHOP: ", filters, filterBy)
    };

    return (
        <Layout 
            title="Shop Page" 
            description="Search and find books of your choice"
            className="container-fluid"
        >
            <div className="row">
                <div className="col-4">
                    <h4>Filter by Categories</h4>
                    <ul>
                        <Checkbox 
                            categories={categories} 
                            handleFilters={
                                filters => handleFilters(filters, "category")
                            } 
                        />
                    </ul>
                </div>
                <div className="col-8">
                    right
                </div>
            </div>
        </Layout>
    );
};

export default Shop;

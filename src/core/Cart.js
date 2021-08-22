import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "./Layout";
import { getCart } from "./cartHelpers";
import Card from "./Card";
import Checkout from "./Checkout";

const Cart = () => {
    const [items, setItems] = useState([]);
    const [run, setRun] = useState(false);

    useEffect(() => {
        setItems(getCart());
    }, [run]);

    const showItems = items => {
        return (
            <div>
                <h3>Your cart has {`${items.length} items`}</h3>
                <hr/>
                {items.map((product, index) => {
                    return (
                        <div className="mb-3">
                        <Card 
                            key={index} 
                            product={product} 
                            showAddToCartButton={false} 
                            cartUpdate = {true}
                            showRemoveProductButton={true}
                            setRun={setRun}
                            run={run}
                        />
                    </div>
                    )
                })}
            </div>
        );
    };

    const noItemsMessage = () => (
        <h2>
            Your card is empty<br/>
            <Link to="/shop">Continue shopping</Link>
        </h2>
    );

    return (
        <Layout 
            title="Shopping Cart" 
            description="Complete your order"
            className="container-fluid"
        >
            <div className="row">
                <div className="col-4">
                    {items.length > 0 ? showItems(items) : noItemsMessage()}
                </div>
                <div className="col-8">
                    <h3 className="mb-4">Your cart summary</h3>
                    <hr/>
                    <Checkout products={items} />
                </div>
            </div>
        </Layout>
    );
};

export default Cart;

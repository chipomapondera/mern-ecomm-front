import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth";
import { createProduct } from "./apiAdmin";

const AddProduct = () =>{
    const [values, setValues] = useState({
        name: "",
        description: "",
        price: "",
        categories: [],
        category: "",
        shipping: "",
        quantity: "",
        photo: "",
        loading: false,
        error: "",
        createdProduct: "",
        redirectToProfile: false,
        formData: ""
    });

    // destructure user and token from localstorage
    const { user, token } = isAuthenticated();

    const {
        name,
        description,
        price,
        categories,
        category,
        shipping,
        quantity,
        loading,
        error,
        createdProduct,
        redirectToProfile,
        formData
    } = values;

    useEffect(() => {
        setValues({ ...values, formData: new FormData() })
    }, []);

    const handleChange = name => event => {
        const value = name === "photo" ? event.target.files[0] : event.target.value
        formData.set(name, value)
        setValues({ ...values, [name]: value })
    };

    const clickSubmit = e => {
        e.preventDefault()
        setValues({ ...values, error: "", loadng: true });
        createProduct(user._id, token, formData)
        .then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error })
            } else {
                setValues({
                    ...values,
                    name: "",
                    description: "",
                    photo: "",
                    price: "",
                    quantity: "",
                    loading: false,
                    createdProduct: data.name
                });
            }
        });
    };

    const newPostForm = () => {
        return (
            <form className="mb-3" onSubmit={clickSubmit}>
                <h4>Post Photo</h4>
                <div className="form-group">
                    <label className="btn btn-secondary">
                        <input 
                            onChange={handleChange("photo")}
                            type="file" 
                            name="photo" 
                            accept="image/*" 
                        />
                    </label>
                </div>

                <div className="form-group">
                    <label className="text-muted">Name</label>
                    <input 
                        onChange={handleChange("name")} 
                        type="text" 
                        className="form-control" 
                        value={name} 
                    />
                </div>

                <div className="form-group">
                    <label className="text-muted">Description</label>
                    <textarea 
                        onChange={handleChange("description")} 
                        className="form-control" 
                        value={description} 
                    />
                </div>

                <div className="form-group">
                    <label className="text-muted">Price</label>
                    <input 
                        onChange={handleChange("price")} 
                        type="number" 
                        className="form-control" 
                        value={price} 
                    />
                </div>
                
                <div className="form-group">
                    <label className="text-muted">Category</label>
                    <select 
                        onChange={handleChange("category")} 
                        className="form-control" 
                    >
                        <option value="">Select Category</option>
                        <option value="60e6ab77fd2d9d0391ede88b">Node</option>
                        <option value="60eaca972c5f4608e48fa8db">Python</option>
                    </select>
                </div>

                <div className="form-group">
                    <label className="text-muted">Shipping</label>
                    <select 
                        onChange={handleChange("shipping")} 
                        className="form-control" 
                    >
                        <option value="">Select Shipping</option>
                        <option value="0">No</option>
                        <option value="1">Yes</option>
                    </select>
                </div>

                <div className="form-group">
                    <label className="text-muted">Quantity</label>
                    <input 
                        onChange={handleChange("quantity")} 
                        type="number" 
                        className="form-control" 
                        value={quantity} 
                    />
                </div>

                <button className= "btn btn-outline-primary">
                    Create product
                </button>
            </form>
        );
    };

    const goBack = () => (
        <div className="mt-5">
            <Link to="/admin/dashboard" className="text-warning">
                Back to Dashboard
            </Link>
        </div>
    );


    return (
        <Layout 
            title="Add a new product" 
            description={`Hi ${user.name}, ready to add a new product?`} 
        >
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {newPostForm()}
                    {goBack()}
                </div>
            </div>
        </Layout>
    );
};

export default AddProduct;


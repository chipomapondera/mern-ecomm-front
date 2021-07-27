import React, { useState, useEffect } from "react";
import { getCategories } from "./apiCore";

const Checkbox = ({ categories }) => {
    const [checked, setChecked] = useState([]);

    const handleToggle = category => () => {
        // return the first index or -1
        const currentCategoryId = checked.indexOf(category);
        const newCheckedCategoryId = [...checked];
        // if currently checked was not already in checked state > push
        // else pull/ take off
        if (currentCategoryId === -1) {
            newCheckedCategoryId.push(category);
        } else {
            newCheckedCategoryId.splice(currentCategoryId, 1);
        }
        console.log(newCheckedCategoryId);
        setChecked(newCheckedCategoryId);
    };

    return categories.map((category, index) => (
        <li key={index} className="list-unstyled">
            <input 
                onChange={handleToggle(category._id)} 
                value={checked.indexOf(category._id === -1)} 
                type="checkbox" 
                className="form-check-input" 
            />
            <label className="form-check-label">{category.name}</label>
        </li>
    ))
};

export default Checkbox;

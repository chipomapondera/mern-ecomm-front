export const addItem = (item, next) => {
    let cart = [];
    if (typeof window !== "undefined") {
        if (localStorage.getItem("cart")) {
            cart = JSON.parse(localStorage.getItem("cart"));
        }
        cart.push({
            ...item,
            count: 1
        });

        // remove duplicates
        // build an Array from new Set and turn it back into array using Array.from
        // so that later we can re-map it
        // so pass the ideas of each object/ product
        // if the loop tries to add the same value again, it'll get ignored
        // ...with the array of ids we got when first map() was used
        // run map() on it again and return the actual product from the cart

        cart = Array.from(new Set(cart.map(product => (product._id)))).map(id => {
            return cart.find(product => product._id === id);
        });

        localStorage.setItem("cart", JSON.stringify(cart));
        next();
    }
};

export const itemTotal = () => {
    if (typeof window !== "undefined") {
        if (localStorage.getItem("cart")) {
            return JSON.parse(localStorage.getItem("cart")).length;
        }
    }
    return 0;
};

export const getCart = () => {
    if (typeof window !== "undefined") {
        if (localStorage.getItem("cart")) {
            return JSON.parse(localStorage.getItem("cart"));
        }
    }
    return [];
};

export const updateItem = (productId, count) => {
    let cart = [];
    if (typeof window !== "undefined") {
        if(localStorage.getItem("cart")) {
            cart = JSON.parse(localStorage.getItem("cart"));
        }

        cart.map((product, index) => {
            if (product._id === productId) {
                cart[index].count = count;
            }
        });
        localStorage.setItem("cart", JSON.stringify(cart));
    }
};

export const removeItem = productId => {
    let cart = [];
    if (typeof window !== "undefined") {
        if(localStorage.getItem("cart")) {
            cart = JSON.parse(localStorage.getItem("cart"));
        }

        cart.map((product, index) => {
            if (product._id === productId) {
                cart.splice(index, 1);
            }
        });
        localStorage.setItem("cart", JSON.stringify(cart));
    }
    return cart;
};

export const emptyCart = next => {
    if (typeof window !== "undefined") {
        localStorage.removeItem("cart");
        next();
    }
};



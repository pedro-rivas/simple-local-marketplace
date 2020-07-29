import React from 'react';

const Product = ({ name, price, category, onClick}) => {

    return(
        <div className="product" onClick={onClick}>
            <p className="product-name">{name}</p>
            <p className="product-price">{`$${price}`}</p>
            <span>
                <p>{category}</p>
                <i className="fas fa-ellipsis-v arrow-right"></i>
            </span>
        </div>
    )
}

export default Product;
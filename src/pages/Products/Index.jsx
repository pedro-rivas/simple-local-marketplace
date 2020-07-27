import React, { useEffect, useState, } from 'react';

import '../../styles/layout.css';
import { database, } from '../../utils/firebase';

import Nav from '../Nav/Index';
import Product from './components/Product';
import Skeleton from './components/Skeleton';

const height = window.innerHeight;

const page = 'Productos';
const phone = 3334022874;

const Home = () => {

    useEffect(()=>{

        document.title = `${ page }`;
        getPosts();

        return () =>{

        }

    },[]);

    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);


    function getPosts(){
        database.ref(`users/${phone}/products/`).once('value',(snap)=>{
            if(snap.val()){
                const result = snap.val();
                let data = [];
                for (const key in result) {
                    if (result.hasOwnProperty(key)) {
                        data.push(result[key]);
                    }
                }
                setProducts(data);
            }
            setLoading(!loading);
        });
    }

    // const Products = () => products.length > 0 ? products.map((post, i) => (
    //     <Product
    //         key={i}
    //         name={post.name}
    //         price={post.price}
    //         url={post.url}
    //     />
    // )) : null;

  return (
    <div className="layout-main-container" style={{height}}>
        <div className="layout-container"  style={{height}}>
            <Nav active={2}/>
            <div className="panel-container"  style={{height}}>
                <h2>{ `${ page }` }</h2>
                <div className="local-nav">
                    <button className="primary" onClick={() => window.location.href = "/products/create/"}>Crear Producto</button>
                </div>
                <ul>
                    <li>Nombre</li>
                    <li>Precio</li>
                    <li>Categoría</li>
                </ul>
                <div>
                    {loading ? <Skeleton/>:null}
                    {products.length > 0 ?
                        products.map((post, i) => {
                            return(
                                <Product
                                    key={i}
                                    name={post.name}
                                    price={post.price}
                                    category={post.category}
                                />)
                        })
                    : <p>No hay productos todavía</p>
                    }
                </div>
            </div>
        </div>
    </div>
  );
}

export default Home;


import React, { useEffect, useState, } from 'react';

import '../../styles/layout.css';
import { database, } from '../../utils/firebase';

import Nav from '../Nav/Index';
import Product from './components/Product';
import Skeleton from './components/Skeleton';
import { colors } from '@material-ui/core';

const height = window.innerHeight;

const page = 'Productos';

const Home = () => {

    const session = JSON.parse(sessionStorage.getItem("user"));
    const user = session.phone;

    useEffect(()=>{

        document.title = `${ page }`;
        getPosts();

        return () =>{

        }

    },[]);

    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);


    function getPosts(){
        database.ref(`users/${user}/products/`).once('value',(snap)=>{
            if(snap.val()){
                const result = snap.val();
                let data = [];
                for (const key in result) {
                    if (result.hasOwnProperty(key)) {
                        data.push({...result[key], key: key});
                    }
                }
                setProducts(data);
            }
            setLoading(!loading);
        });
    }

  return (
    <div className="layout-main-container" style={{height}}>
        <div className="layout-container"  style={{height}}>
            <Nav active={2}/>
            <div className="panel-container"  style={{height}}>
                <h2>{ `${ page }` }</h2>
                <div className="local-nav">
                    {products.length < session.limit ? 
                        <button 
                            className="primary" 
                            onClick={() => window.location.href = "/products/create"}>
                                Crear Producto
                        </button>
                    :
                        <button disabled>
                            Crear Producto
                        </button>
                    }
                    
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
                                    onClick={() => {window.location.href = `/products/watch?url=${post.url}&key=${post.key}&name=${post.name}&price=${post.price}&category=${post.category}&description=${post.description}&token=${post.url.split('token')[1]}&user=${user}&views=${post.views}`}}
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


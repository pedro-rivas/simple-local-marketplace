import React, { useEffect, useState } from 'react';

import { database,  storage } from '../../utils/firebase';

import '../../styles/layout.css';
import Nav from '../Nav/Index';
import CircularProgress from '@material-ui/core/CircularProgress';

const height = window.innerHeight;

const Watch = () => {
    
    const page = 'Crear';
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const user = urlParams.get('user');
    const u = urlParams.get('url');
    const ur = u.replace('users/','users%2F');
    const url = ur.replace('/teul_','%2Fteul_');
    const token = urlParams.get('token');
    const name = urlParams.get('name');
    const price = urlParams.get('price');
    const category = urlParams.get('category');
    const description = urlParams.get('description');
    const key = urlParams.get('key');
    const views = urlParams.get('views');

    useEffect(()=>{

        document.title = `${ page }`;

    },[]);

    const [loading, setLoading] = useState(false);

    function _delete(){
        const imgName = url.split('%2F')[2].split('?')[0];
        const imgPath = `users/${user}/${imgName}`;
        const storageUrl = storage.ref(imgPath);
        setLoading(!loading);
        storageUrl.delete().then(function() {
            let updates = {};
                updates[`users/${user}/products/${key}/`] = null;
                updates[`products/${category}/${key}/`] = null;
            database.ref().update(updates)
                    .then(response => window.location.href = '/products/')
                    .catch(error => console.log('delete error 1: ', error))
        }).catch(function(error) {
            console.log('delete error 2: ', error);
        });
    }

  return (
    <div className="layout-main-container" style={{height}}>
        <div className="layout-container"  style={{height}}>
            <Nav active={2}/>
            <div className="panel-container"  style={{height}}>
                <div style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                    <span>
                        <i 
                            className="fas fa-arrow-left arrow-left" 
                            onClick={()=> window.location.href = '/products/'}>
                        </i>
                    </span>
                    <h2>{ `${ name.slice(0,20) }` }</h2>
                </div>
                <div className="local-nav">
                    <button 
                        className="primary" 
                        onClick={()=> _delete()}
                    >
                        {loading
                            ? 
                            <CircularProgress 
                            size={15}
                            thickness={3}
                            color={'inherit'}
                            />
                        : 'Borrar'
                        }
                    </button>
                </div>
                <div className="watch">
                    <figure>
                        <img alt={name} src={`${url}&token=${token}`}/>
                    </figure>
                    <p>{description}</p>
                    <p>{`$${price}`}</p>
                    <p>
                        <i className="far fa-eye" style={{fontSize:13}}></i>
                        {` ${views}`}
                    </p>
                    <p className="cat">{category}</p>
                </div> 
            </div>
        </div>
    </div>
  );
}

export default Watch;


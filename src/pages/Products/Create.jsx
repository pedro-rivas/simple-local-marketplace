import React, { useEffect, useReducer, useState } from 'react';

import { Alert, } from '@material-ui/lab/';
import { categories, } from './actions';
import { reducer, initialState, } from './reducer';
import { database,  storage } from '../../utils/firebase';

import '../../styles/layout.css';
import Nav from '../Nav/Index';

const phone = 3334022874;
const height = window.innerHeight;


const page = 'Crear';

const Home = () => {

    useEffect(()=>{

        document.title = `${ page }`;

    },[]);

    const [error, setError] = useState('');
    const [progress, setProgress] = useState(0);
    const [state, dispatch] = useReducer(reducer, initialState);

    const Options = () => {
        return categories.map((value, i)=>(
            <option value={ value } key={ i }>{ value }</option>
        ));
    }

    function _createProduct(){
        const file = document.getElementById('file').files[0];
        let size = file.size/1000000;
        const date = new Date().valueOf();
        if(size < 3){
            const storageUrl = storage.ref(`users/${phone}/`).child(`teul_${date}`);
            const task = storageUrl.put(file);
            setProgress(1);	
            task.on('state_changed', function(snap){
                let progress = Math.round((snap.bytesTransferred / snap.totalBytes) * 100);
                setProgress(progress);
            },(error) => {
                setError('error-post-img: '+error);
            },() => {
                task.snapshot.ref.getDownloadURL().then(function(url) {
                    sendProductToServer(url);
                });
            });
        }else{
            setError('Selecciona una imagen menor a 3 mb.');
        }   
    }

    function sendProductToServer(url){
        const product = {
            name: state.name, 
            price: state.price,
            description: state.description,
            category: state.category,
            url,
            user: phone,
            date: new Date().valueOf(),
            views: 0,
        }
        let key = database.ref(`users/${phone}/products/`).push(product).key;
        let updates = {};
        updates[`products/${product.category}/${key}/`] = product;
        database.ref().update(updates)
            .then(response => {window.location.href = "/products/"})
            .catch(error => setError(error))
    }

    (function (){
        const product = {...state};
        const name = product.name.length > 0 ? true : false;
        const price = product.price.length > 0 ? true : false;
        const description = product.description.length > 0 ? true : false;
        const category = product.category.length > 0 ? true : false;
        const file = product.file;

        if(name && price && description && category && file && !product.state){
            dispatch({type: 'UPDATE_STATE', value: true});
        }
    })();

   
  return (
    <div className="layout-main-container" style={{height}}>
        <div className="layout-container"  style={{height}}>
            <Nav active={2}/>
            <div className="panel-container"  style={{height}}>
                <h2>{ `${ page }` }</h2>
                <div className="local-nav">
                   {state.state ? 
                    <button 
                        className="primary" 
                        onClick={()=> _createProduct()}
                    >
                        {progress > 0  && progress < 100 ? `${progress}%` : 'Crear'}
                    </button>
                   : 
                    <button disabled>Crear</button>
                   } 
                </div>
                <div className="form">
                    {error.length > 0 ?
                        <Alert severity="error">{ error }</Alert>
                    : null
                    }
                    <p>{`Nombre ${state.name.length}/20`}</p>
                    <input 
                        onChange={({target})=> dispatch({type: 'UPDATE_NAME', value: target.value})}
                        placeholder="Pollo frito" 
                        maxLength={20} 
                        type="text" 
                        className={"input"}
                    />
                    <p>Precio</p>
                    <input
                        onChange={({target})=> dispatch({type: 'UPDATE_PRICE', value: target.value})} 
                        placeholder={"35.00"}
                        type={"number"} 
                        className={"input"}
                    />
                    <p>{`Descripción ${state.description.length}/100`}</p>
                    <textarea
                        onChange={({target})=> dispatch({type: 'UPDATE_DESCRIPTION', value: target.value})}
                        className="input"
                        style={{fontSize: 16, fontFamily: 'Rubik'}}
                        placeholder={'Pollo frito con verdura y papas...'}
                        maxLength={100}
                    >
                    </textarea>
                    <p>Categoría</p>
                    <select
                        onChange={({target})=> dispatch({type: 'UPDATE_CATEGORY', value: target.value})}
                        value={ state.category }
                        className="input"
                    >
                        <Options/>
                    </select>
                    <p>Imagen</p>
                    <input 
                        onChange={({target})=> dispatch({type: 'UPDATE_FILE', value: true})}
                        accept="image/*, .png, .jpeg, .jpg"
                        id={'file'}
                        type={"file"}  
                        className={"input"}
                    />
                </div>
            </div>
        </div>
    </div>
  );
}

export default Home;


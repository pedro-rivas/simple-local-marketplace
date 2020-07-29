import React, { useEffect, useReducer, useState } from 'react';

import { Alert, } from '@material-ui/lab/';
import CircularProgress from '@material-ui/core/CircularProgress';
import { database,  storage } from '../../utils/firebase';

import '../../styles/layout.css';
import Nav from '../Nav/Index';

const height = window.innerHeight;

const Create = () => {

    const session = JSON.parse(sessionStorage.getItem("user"));
    const user = session.phone; 
    const page = 'Cuenta';

    useEffect(()=>{

        document.title = `${ page }`;

    },[]);

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [account, setAccount] = useState({
        name: session.name ? session.name : '',
        description: session.description ? session.description : '',
        phone: session.phone,
        code: session.code,
    })

    function _save(){
        setLoading(true);
        let updates = {};
        updates[`users/${user}/account/name`] = account.name;
        updates[`users/${user}/account/contact_phone`] = account.phone;
        updates[`users/${user}/account/description`] = account.description;
        database.ref().update(updates)
            .then(response => {
                setLoading(false);
                setError('Tu información se actualizó correctamente.');
                setTimeout(()=>{
                    setError(''); 
                },2500)
            })
            .catch(error => setError(error))
    }

   
  return (
    <div className="layout-main-container" style={{height}}>
        <div className="layout-container"  style={{height}}>
            <Nav active={3}/>
            <div className="panel-container"  style={{height}}>
                <div style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                    <h2>{ `${ page }` }</h2>
                </div>
                <div className="local-nav">
                    <button 
                        className="primary" 
                        onClick={()=> _save()}
                    >
                        {loading
                            ? 
                            <CircularProgress 
                            size={15}
                            thickness={3}
                            color={'inherit'}
                            />
                        : 'Guardar'
                        }
                    </button>
                </div>
                <div className="form">
                    {error.length > 0 ?
                        <Alert severity="success">{ error }</Alert>
                    : null
                    }
                    <p style={{marginBottom:40}}>{`Tu cóidgo es: ${account.code}`}</p>
                    <p>{`Nombre ${account.name.length}/30`}</p>
                    <input 
                        onChange={({target})=> setAccount({...account, name: target.value})} 
                        placeholder="Pizza rica" 
                        maxLength={30} 
                        type="text" 
                        className={"input"}
                        value={account.name}
                    />
                    <p>Teléfono de contacto</p>
                    <input
                        onChange={({target})=> setAccount({...account, phone: target.value})} 
                        placeholder={"4671002536"}
                        value={account.phone}
                        type={"number"} 
                        className={"input"}
                    />
                    <p>{`Descripción ${account.description.length}/220`}</p>
                    <textarea
                        onChange={({target})=> setAccount({...account, description: target.value})} 
                        className="input"
                        style={{fontSize: 16, fontFamily: 'Rubik'}}
                        value={account.description}
                        placeholder={'Pizza rica ofrece una gran variedad de pizzas, abierto de lunes a viernes de 7 a 11 pm.'}
                        maxLength={220}
                    >
                    </textarea>
                </div>
            </div>
        </div>
    </div>
  );
}

export default Create;


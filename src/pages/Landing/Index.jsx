import React, { useState } from 'react';

import '../../styles/landing.css';
import { database,  storage } from '../../utils/firebase';

import CircularProgress from '@material-ui/core/CircularProgress';
import { Alert, } from '@material-ui/lab/';

const height = window.innerHeight;
const width = window.innerWidth;

function Landing() {

  const [account, setAccount] = useState({
    phone:'',
    code:'',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function _create(){
    
    if(account.phone.length > 5 && account.code.length === 4){
      setLoading(true);
      database.ref(`codes/${account.code}`).once('value',(snap)=>{
        const result = snap.val();
        if(result){
           if(!result.active){
              createAccount();
           }else{
             setLoading(false);
             setError('Este código ya ha sido usado por alguien más');
           }
        }else{
          setLoading(false);
          setError('Este código no existe');
        }
      });
    }else{
      setError('Llena todos los campos');
    }
  }

  function createAccount(){
    const a = {
      phone: account.phone,
      code: account.code,
      password: account.code,
      limit:5,
      date: new Date().valueOf(),
    }
    let updates = {};
    updates[`users/${account.phone}/account/`] = a;
    updates[`codes/${account.code}/active/`] = true;
    database.ref().update(updates)
        .then(response => {window.location.href = "/login/"})
        .catch(error => setError(error))
  }

  return (
    <div className='mainContainer'>
     <header className='header'>
       <h5>Teul<span>Marketplace</span></h5>
       <nav>
        <a href='/login'>Iniciar sesión</a>
       </nav>
     </header>
     <section className='mainSection' style={{height: height-70, }}>
       <img 
        alt='food'
        style={{height: height-70, left: -width/3+20}}
        src='https://firebasestorage.googleapis.com/v0/b/teul-marketplace.appspot.com/o/d3ee3d72a591a5a3758c7f53821b566b.svg?alt=media&token=2fb6c1cc-b699-47a0-b6fc-b8005224b3f2'
       />
       <h1>Encuentra productos locales cerca de ti</h1>
     </section> 
     <section>
        <div className="create-account">
            <p>¿Eres un comerciante? Crea tu cuenta:</p> 
            <input 
              placeholder={'Tu teléfono'} 
              type='text'
              maxLength={10}
              onChange={({target}) => setAccount({...account, phone: target.value})}
            />
            <input 
              placeholder={'Tu código'} 
              type='text'
              maxLength={4}
              onChange={({target}) => setAccount({...account, code: target.value})}
            />
            {error.length > 0 ?
                <Alert severity="error">{ error }</Alert>
                : null
            }
            <button 
              onClick={()=> _create()}
              style={{backgroundColor:'black', border:'none', padding:20, fontFamily:'Rubik', fontSize:16,
              color:'white', fontWeight:500, cursor:'pointer', marginTop:20}}
            > 
              {loading
                ? 
                <CircularProgress 
                  size={16}
                  thickness={4}
                  color={'inherit'}
                />
                : 'Crear'
              }
            </button>
        </div>
     </section>     
    </div>
  );
}

export default Landing;

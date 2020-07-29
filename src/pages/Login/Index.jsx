import React, { useState } from 'react';

import '../../styles/landing.css';
import { database, } from '../../utils/firebase';

import CircularProgress from '@material-ui/core/CircularProgress';
import { Alert, } from '@material-ui/lab/';

const height = window.innerHeight;
const width = window.innerWidth;

function Login() {

  const [account, setAccount] = useState({
    phone:'',
    code:'',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);



  function _login(){
    if(account.phone.length > 5 && account.code.length === 4){
        setLoading(true);
        database.ref(`users/${account.phone}/account/`).once('value',(snap)=>{
          const result = snap.val();
          if(result){
             if(result.password === account.code){
                sessionStorage.setItem("user", JSON.stringify(result));
                window.location.href = "/h/";
             }else{
               setLoading(false);
               setError('Tu contraseña es incorrecta');
             }
          }else{
            setLoading(false);
            setError('Esta cuenta no existe');
          }
        });
      }else{
        setError('Llena todos los campos');
      }
    
    // let updates = {};
    // updates[`users/${account.phone}/account/`] = a;
    // updates[`codes/${account.code}/active/`] = true;
    // database.ref().update(updates)
    //     .then(response => {window.location.href = "/login/"})
    //     .catch(error => setError(error))
  }

  return (
    <div className='mainContainer'>
     <section className='mainSection' style={{height: height, backgroundColor:'#66d19e'}}>
       <img 
        alt='food'
        style={{height: height, left: -width/3+20}}
        src='https://firebasestorage.googleapis.com/v0/b/teul-marketplace.appspot.com/o/9a8cf89b930fe8af543bfb552753dd18.svg?alt=media&token=c056371e-ae4d-448f-a7e9-95ff7fd74be1'
       />
       <div className="create-account">
            <input 
              placeholder={'Teléfono'} 
              type='text'
              maxLength={10}
              onChange={({target}) => setAccount({...account, phone: target.value})}
            />
            <input 
              placeholder={'Código'} 
              type='text'
              maxLength={4}
              onChange={({target}) => setAccount({...account, code: target.value})}
            />
            {error.length > 0 ?
                <Alert severity="error">{ error }</Alert>
                : null
            }
            <button 
              onClick={()=> _login()}
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
                : 'Inicia sesión'
              }
            </button>
        </div>
     </section>  
    </div>
  );
}

export default Login;

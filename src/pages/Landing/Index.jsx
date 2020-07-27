import React from 'react';

import '../../styles/landing.css';

const height = window.innerHeight;
const width = window.innerWidth;

export default function landing() {
  return (
    <div className='mainContainer'>
     <header className='header'>
       <h5>Teul<span>Marketplace</span></h5>
       <nav>
        <a href='h/'>Iniciar sesión</a>
       </nav>
     </header>
     <section className='mainSection' style={{height: height-70}}>
       <img 
        alt='food'
        style={{height: height-70, left: -width/3+20}}
        src='https://firebasestorage.googleapis.com/v0/b/teul-marketplace.appspot.com/o/d3ee3d72a591a5a3758c7f53821b566b.svg?alt=media&token=2fb6c1cc-b699-47a0-b6fc-b8005224b3f2'
       />
       <h1>Encuentra productos locales cerca de ti</h1>
     </section> 
    </div>
  );
}



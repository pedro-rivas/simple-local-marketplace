import React, { useEffect, } from 'react';

import '../../styles/layout.css';
import Nav from '../Nav/Index';

const height = window.innerHeight;

const page = 'Inicio';

const Home = () => {

    useEffect(()=>{

        document.title = `${page}`;

    },[]);

  return (
    <div className="layout-main-container" style={{height}}>
        <div className="layout-container"  style={{height}}>
            <Nav active={1}/>
            <div className="panel-container"  style={{height}}>
                <h2>Inicio</h2>
            </div>
        </div>
    </div>
  );
}

export default Home;


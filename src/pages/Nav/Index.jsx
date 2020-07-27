import React from 'react';


const Nav = ( { active } ) => {

    return(
        <nav>
            <figure style={{height:50, display:'flex', justifyContent:'center', alignItems:'center'}}>
            
            </figure>
            <a href="/h/" className={active === 1 ? 'active' : 'inactive'}> 
                <i className="fas fa-home icon"></i> Inicio
            </a>
            <a href="/products/" className={active === 2 ? 'active' : 'inactive'}>
                <i className="fas fa-store icon"></i>Productos
            </a>
            <a href="/products/" className={active === 3 ? 'active' : 'inactive'}>
                <i className="fas fa-user-circle icon"></i>Cuenta
            </a>
            <a href="/signout/" className={active === 4 ? 'active' : 'inactive'}> 
                <i className="fas fa-sign-out-alt icon"></i>Cerrar sesión
            </a>
        </nav>
    )
}

export default Nav;

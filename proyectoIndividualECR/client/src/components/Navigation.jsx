import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import ImgLogo from '../components/ImgLogo';
import '../styles/Nav.scss';




const Navigation = () => {
    return ( 
        <div>

            <nav className='nav'>
                <div className='logoContainer'>
                    <div className='img3'>
                        <ImgLogo/>
                    </div>
                    <div className='img3'>
                        GestorN
                    </div>
                </div>
                <ul className='links'>
                    <div className='linkContainer'>
                        <Link to={"/"} style={{ textDecoration: 'none' }}>
                            <li className='oneLink'>Mis Equipos</li>
                        </Link>
                    </div>
                    <div className='linkContainer'>
                        <Link to={"/mis-contratos"} style={{ textDecoration: 'none' }}>
                            <li className='oneLink'>Mis Contratos</li>
                        </Link>
                    </div>
                    <div className='linkContainer'>
                        <Link to={"/capital-Humano"} style={{ textDecoration: 'none' }}>
                            <li className='oneLink'>Capital Humano</li>
                        </Link>
                    </div>
                    <div className='linkContainer'>
                        <Link to={"/mis-mantenimientos"} style={{ textDecoration: 'none' }}>
                            <li className='oneLink'>Mis Mantenimientos</li>
                        </Link>
                    </div>
                </ul>
            </nav>
        </div>
    );
}

export default Navigation;

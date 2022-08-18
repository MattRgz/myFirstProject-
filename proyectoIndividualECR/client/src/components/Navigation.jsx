import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import ImgLogo from '../components/ImgLogo';
import '../styles/Nav.scss';
import Swal from 'sweetalert2'
import axios from 'axios';




const Navigation = () => {

    const succesAlert = (mensaje) =>{
        Swal.fire({
            icon: 'success',
            title: 'Todo en orden!',
            text: {mensaje},
        })
    }
    const logOut = () =>{
        axios.get("http://localhost:8080/api/users/logout")
            .then(res=> succesAlert("Sesión cerrada exitosamente!"))
            .catch(err=>console.log("No hemos podido cerrar tu sesion"))
    }

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
                    <div className='linkContainer' style={{marginLeft:"30px", cursor:"pointer", textAlign:"center"}}>
                            <li className='oneLink'>Cerrar sesión</li>
                    </div>
                </ul>
            </nav>
        </div>
    );
}

export default Navigation;

import React,{ useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const LoginOut = () => {
    const navigate = useNavigate();
    const succesAlert = (mensaje) =>{
        Swal.fire({
            icon: 'success',
            title: 'Todo en orden!',
            text: mensaje,
        })
    }
    useEffect(() => {
        axios
            .get('http://localhost:8080/api/users/logout', {withCredentials:true})
                .then(res=>{
                    succesAlert('Sesión cerrada con éxito!')
                    navigate("/")
                })
                .catch(err=>{
                    alert(`Mensaje desde el backEnd:
                    ${err.response.data.msg}:
                    ${err.response.data.error}`)
                    console.log('no puedo cerrar sesion')
                    console.log(err)
                })
    }, []);
    return (
        <div>
            Cerrando sesión...
        </div>
    );
}

export default LoginOut;

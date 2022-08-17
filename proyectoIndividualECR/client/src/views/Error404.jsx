import React from 'react';
import Img404 from '../components/Img404';

const Error404 = () => {
    return (
        <div className='container'>
            <h1> Error 404: </h1>
            <h2>Vaya, No hemos podido encontrar la Página que buscas...</h2>
            <div>
                <Img404/>
            </div>
        </div>
    );
}

export default Error404;

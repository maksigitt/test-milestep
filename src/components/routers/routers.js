import React, {lazy, Suspense} from 'react';
import {Route, Routes} from 'react-router-dom';

import './routers.scss';


const Users = lazy(() => import('../../pages/users'));
const NotFound = lazy(() => import('../../pages/404'));

const Routers = () => {
    return (
        <Suspense fallback={null}>
            <Routes>
                <Route path="/" element={<Users/>}/>
                <Route path='*' element={<NotFound/>}/>
            </Routes>
        </Suspense>

    )
}


export default Routers;

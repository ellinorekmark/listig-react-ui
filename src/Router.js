import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NewList from './pages/NewList';



const Home = lazy(() => import('./pages/Home'));
const Overview = lazy(() => import('./pages/Overview'));
const ListView = lazy(() => import('./pages/ViewList'));
const Profile = lazy(() => import('./pages/Profile'));



const AppRouter = () => (


    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/overview" element={<Overview />} />
        <Route path="/list/:id" element={<ListView />} />
        <Route path="/newList" element={<NewList />} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="*" element={() => <div>404 Not Found</div>} />
      </Routes>
    </Suspense>

);

export default AppRouter;

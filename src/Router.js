import React, { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import {CircularProgress} from "@mui/material";

const Home = lazy(() => import('./pages/Home'));
const NewList = lazy(() => import('./pages/NewList'));
const Overview = lazy(() => import('./pages/Overview'));
const ListView = lazy(() => import('./pages/ViewList'));
const Profile = lazy(() => import('./pages/Profile'));
const Admin = lazy(() => import('./pages/Admin'))
const About = lazy(() => import('./pages/About'))
const Public = lazy(() => import('./pages/PublicListView'))


const AppRouter = () => (

    <Suspense fallback={<div><CircularProgress/></div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/web/overview" element={<Overview />} />
        <Route path="/web/list/:id" element={<ListView />} />
        <Route path="/web/newList" element={<NewList />} />
        <Route path="/web/profile" element={<Profile/>} />
        <Route path="/web/about" element={<About/>} />
        <Route path="/web/admin" element={<Admin/>} />
        <Route path="/web/public/:uuid" element={<Public/>} />
        <Route path="*" element={() => <div>404 Not Found</div>} />
      </Routes>
    </Suspense>

);

export default AppRouter;

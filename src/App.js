import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import { UserProvider } from './context/UserContext';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import CreateUserPage from './pages/CreateUserPage';
import UserPage from './pages/UserPage';
import MyProjectsPage from './pages/MyProjectsPage';
import CreateProjectPage from './pages/CreateProjectPage';
import EditProjectPage from './pages/EditProjectPage';
import EditUserPage from './pages/EditUserPage';
import DetailsProjectPage from './pages/DetailsProjectPage';
import RequestPage from './pages/RequestPage';  
import DetailsFuentePage from './pages/DetailsFuentePage';
import DetailsAnotacionPage from './pages/DetailsAnotacionPage';
import DetailsOtroPage from './pages/DetailsOtroPage';

import 'bootstrap/dist/css/bootstrap.min.css'; 

const App = () => {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<CreateUserPage />} />
          <Route path="/user" element={<PrivateRoute element={UserPage} />} />
          <Route path="/edit-usuario/:id" element={<PrivateRoute element={EditUserPage} />} />
          <Route path="/home" element={<PrivateRoute element={HomePage} />} />
          <Route path="/myprojects" element={<PrivateRoute element={MyProjectsPage} />} />
          <Route path="/create-project" element={<PrivateRoute element={CreateProjectPage} />} />
          <Route path="/edit-project/:id" element={<PrivateRoute element={EditProjectPage} />} />
          <Route path="/requests" element={<PrivateRoute element={RequestPage} />} /> 
          <Route path="/project-details/:id" element={<PrivateRoute element={DetailsProjectPage} />} />
          <Route path="/project-details/:id/anotacion" element={<PrivateRoute element={DetailsAnotacionPage} />} />
          <Route path="/project-details/:id/fuente" element={<PrivateRoute element={DetailsFuentePage} />} />
          <Route path="/project-details/:id/otro" element={<PrivateRoute element={DetailsOtroPage} />} />
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;

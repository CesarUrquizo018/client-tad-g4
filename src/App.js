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
import CreateFuentePage from './pages/CreateFuentePage';
import CreateAnotacionPage from './pages/CreateAnotacionPage';
import CreateOtroPage from './pages/CreateOtroPage';
import DetailsFuente from './pages/DetailsFuentePage';
import DetailsAnotacion from './pages/DetailsAnotacionPage';
import DetailsOtro from './pages/DetailsOtroPage';

import 'bootstrap/dist/css/bootstrap.min.css'; 

const App = () => {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<CreateUserPage />} />
          <Route path="/home" element={<PrivateRoute element={HomePage} />} />
          <Route path="/user" element={<PrivateRoute element={UserPage} />} />
          <Route path="/edit-usuario/:id" element={<PrivateRoute element={EditUserPage} />} />
          <Route path="/myprojects" element={<PrivateRoute element={MyProjectsPage} />} />
          <Route path="/create-project" element={<PrivateRoute element={CreateProjectPage} />} />
          <Route path="/edit-project/:id" element={<PrivateRoute element={EditProjectPage} />} />
          <Route path="/project-details/:id" element={<DetailsProjectPage />} />
          <Route path="/requests" element={<PrivateRoute element={RequestPage} />} /> 
          <Route path="/create-anotacion/:id" element={<PrivateRoute element={CreateAnotacionPage} />} />
          <Route path="/create-fuente/:id" element={<PrivateRoute element={CreateFuentePage} />} />
          <Route path="/create-otro/:id" element={<PrivateRoute element={CreateOtroPage} />} />
          <Route path="/details-anotacion/:id" element={<PrivateRoute element={DetailsAnotacion} />} />
          <Route path="/details-fuente/:id" element={<PrivateRoute element={DetailsFuente} />} />
          <Route path="/details-otro/:id" element={<PrivateRoute element={DetailsOtro} />} />
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;
/*
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
import RequestPage from './pages/RequestPage';  // Import the new RequestPage

import 'bootstrap/dist/css/bootstrap.min.css';  // Import Bootstrap CSS

const App = () => {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<CreateUserPage />} />
          <Route path="/home" element={<PrivateRoute element={HomePage} />} />
          <Route path="/user" element={<PrivateRoute element={UserPage} />} />
          <Route path="/edit-usuario/:id" element={<PrivateRoute element={EditUserPage} />} />
          <Route path="/myprojects" element={<PrivateRoute element={MyProjectsPage} />} />
          <Route path="/create-project" element={<PrivateRoute element={CreateProjectPage} />} />
          <Route path="/edit-project/:id" element={<PrivateRoute element={EditProjectPage} />} />
          <Route path="/project-details/:id" element={<DetailsProjectPage />} />
          <Route path="/requests" element={<PrivateRoute element={RequestPage} />} />
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;
*/
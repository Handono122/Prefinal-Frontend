import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap';

import NavigateTo from './pages/Aut/NavigateTo';
import Login from './pages/Aut/Login';
import Register from './pages/Aut/Register';
import EditProfile from './pages/EditProfile';
import Profile from './pages/Profile';
import MyNavbar from './components/MyNavbar';
import { connect } from 'react-redux';
import { userKeepLogin, checkStorage, setUser } from './redux/actions/user';
import ProductDetail from './pages/EditProfile';
import HomePage from './pages/HomePage';

class App extends React.Component {
  componentDidMount() {
    const userLocalStorage = localStorage.getItem('user');

    if (userLocalStorage) {
      const userData = JSON.parse(userLocalStorage); //object string menjadi object lagi
      this.props.setUser(userData);
    } else {
      this.props.checkStorage();
    }
  }

  render() {
    if (this.props.userGlobal.storageIsChecked) {
      return (
        <BrowserRouter>
          <MyNavbar />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/NavigateTo" element={<NavigateTo />} />
            <Route path="/HomePage" element={<HomePage />} />
            <Route path="/EditProfile" element={<EditProfile />} />
            <Route path="/Profile" element={<Profile />} />
            <Route path="/product-detail" element={<ProductDetail />} />
            <Route path="/" element={<HomePage />} />
          </Routes>
        </BrowserRouter>
      );
    }
    return <div>Loading...</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    userGlobal: state.user,
  };
};

const mapDispatchToProps = {
  userKeepLogin,
  checkStorage,
  setUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

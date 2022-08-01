import React from 'react';
import { render } from 'react-dom';
import { Link, Navigate } from 'react-router-dom';
import Axios from 'axios';
import { registerUser } from '../../redux/actions/user';
import { connect } from 'react-redux';

class Register extends React.Component {
  state = {
    //fullName: '',
    username: '',
    email: '',
    password: '',
    passConfirm: '',
    errors: {},
    isLoading: false,
    isLogin: false,
    isRegister: false,
    revealed: false,
  };
  componentDidMount() {
    const user = localStorage.getItem('user');
    if (user) {
      this.setState({ isLogin: true });
    }
  }

  inputHandler = (event) => {
    const value = event.target.value;
    const name = event.target.name;

    this.setState({ [name]: value });
  };

  handleReveale = () => {
    this.setState({ revealed: !this.state.revealed });
  };
  hasError(key) {
    return !!this.state.errors[key];
  }

  registerHandler = () => {
    let errors = {};
    //firstname
    if (this.state.username === '') {
      errors.username = 'UserName is Require';
    }
    if (this.state.password === '') {
      errors.password = 'Password is Require';
    }
    if (this.state.passConfirm === '') {
      errors.passConfirm = 'Repeat Password is Require';
    }
    if (this.state.email === '') {
      errors.email = 'email is Require';
    }
    if (Object.keys(errors).length) {
      this.setState({ errors });
      return false;
    }

    //email
    const expression = /\S+@\S+/;
    let validEmail = expression.test(String(this.state.email).toLowerCase());
    if (!validEmail) {
      errors.email = 'email is invalid';
      this.setState({ errors });
      return false;
    }
    if (!/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(this.state.password)) {
      errors.password = 'Passwords should contain at least 8 characters including an uppercase letter, a symbol, and a number';
      this.setState({ errors });
      return;
    }

    if (this.state.password != this.state.passConfirm) {
      errors.passConfirm = 'Password does not match';
      this.setState({ errors });
      return false;
    }
    this.setState({ isLoading: true });
    const { username, email, password, passConfirm } = this.state;
    Axios.post('http://localhost:2001/users/register', this.state, {
      //fullName,
      username,
      email,
      password,
      role: 'user',
      passConfirm,
    })
      .then((res) => {
        this.setState({ isLoading: false, isRegister: true });
        console.log(res.data);
        alert('Berhasil mendaftarkan user!');
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          isLoading: false,
          errors: {
            username: err.response.data.erroMessage,
            email: err.response.data.erroMessage,
          },
        });
        alert('Gagal mendaftarkan user!');
      });
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12 text-center">
            <h1>Register Now!</h1>
            <p className="lead">Register now and start the club</p>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-4 offset-4">
            <div className="card">
              <div className="card-body">
                <h5 className="font-weight-bold mb-3">Register</h5>

                <div>
                  <input name="username" onChange={this.inputHandler} placeholder="Username" type="text" className={this.hasError('username') ? 'form-control is-invalid' : 'form-control'} />

                  <div className="invalid-feedback">{this.state.errors.username}</div>
                </div>
                <br />

                <div>
                  <input name="email" onChange={this.inputHandler} placeholder="Email" type="text" className={this.hasError('email') ? 'form-control is-invalid' : 'form-control'} />
                  <div className="invalid-feedback">{this.state.errors.email}</div>
                </div>
                <br />

                <div>
                  <input
                    onChange={this.inputHandler}
                    name="password"
                    placeholder="Password"
                    type={this.state.revealed ? 'text' : 'password'}
                    className={this.hasError('password') ? 'form-control is-invalid' : 'form-control'}
                  />

                  <button onClick={this.handleReveale} className="btn btn-outline-secondary btn-sm" type="button" id="button-addon2">
                    {this.state.revealed ? 'hide' : 'show'}
                  </button>
                  <div className="invalid-feedback">{this.state.errors.password}</div>
                </div>
                <br />

                <div>
                  <input
                    name="passConfirm"
                    onChange={this.inputHandler}
                    placeholder="passConfirm"
                    type="password"
                    className={this.hasError('passConfirm') ? 'form-control is-invalid' : 'form-control'}
                  />
                  <button onClick={this.handleReveale} className="btn btn-outline-secondary btn-sm" type="button" id="button-addon2">
                    {this.state.revealed ? 'hide' : 'show'}
                  </button>
                  <div className="invalid-feedback">{this.state.errors.passConfirm}</div>
                </div>
                <br />
                <br />
                <div className="d-flex flex-row justify-content-between align-items-center">
                  <button onClick={() => this.registerHandler(this.state)} className="btn btn-primary mt-2" disabled={this.state.isLoading}>
                    Register
                  </button>
                  <Link to="/login">or login</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        {this.state.isLogin && <Navigate to="/HomePage" />}
        {this.state.isRegister && <Navigate to="/Login" />}
      </div>
    );
  }
}

const mapStateToProps = () => {
  return {};
};
// const mapDispatchToProps = {
//   registerUser,
// };
export default connect(mapStateToProps)(Register);

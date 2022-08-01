import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import Axios from 'axios';
import { setUser } from '../../redux/actions/user';
import { connect } from 'react-redux';
//import useRouter from './useRouter';
class Login extends React.Component {
  state = {
    username: '',
    email: '',
    password: '',
    errMsg: '',
    success: false,
    revealed: false,
    isLogin: false,
    errors: {},
    isRegister: false,
    isLoading: false,
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

    this.setState(() => ({
      [name]: value,
    }));
    // console.log(event.target.value);
    // console.log(event.target.name);
  };
  handleReveale = () => {
    this.setState({ revealed: !this.state.revealed });
  };

  hasError(key) {
    return !!this.state.errors[key];
  }

  onLogin = () => {
    let errors = {};
    //firstname
    if (this.state.username === '') {
      errors.username = 'UserName is Require';
    }
    if (this.state.password === '') {
      errors.password = 'Password is Require';
    }
    if (Object.keys(errors).length) {
      this.setState({ errors });
      return false;
    }
    // if (this.state.password != this.state.passConfirm) {
    //   errors.passConfirm = 'Password does not match';
    //   this.setState({ errors });
    //   return false;
    // }
    this.setState({ isLoading: true });
    //console.log('data', this.state);
    const { username, password } = this.state;
    Axios.post('http://localhost:2001/users/login', {
      username,
      password,
      role: 'user',
    })

      .then((res) => {
        localStorage.setItem('user', JSON.stringify(res.data[0]));
        this.props.setUser(res.data[0]);
        this.setState({ isLoading: false, isLogin: true });
        //alert('Berhasil masuk!');
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          isLoading: false,
          errors: {
            //username: err.response.data.erroMessage,
            password: err.response.data.erroMessage,
          },
        });
        //alert('Gagal masuk!');
      });
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12 text-center">
            <h1 className="mt-5">Log in now!</h1>
            <p className="lead">Log in now and start to share your moment</p>
          </div>
        </div>

        <div className="row mt-1 ">
          <div className="col-4 offset-4">
            {/* {this.props.userGlobal.errMsg ? <div className="alert alert-danger">{this.props.userGlobal.errMsg}</div> : null} */}
            <div className="card">
              <div className="card-body">
                <h5 className="font-weight-bold mb-3">Log in</h5>
                imput Element onchange atribut
                <input onChange={this.inputHandler} name="username" placeholder="Username or Email" type="text" className={this.hasError('username') ? 'form-control is-invalid' : 'form-control'} />
                <div className="invalid-feedback">{this.state.errors.username}</div>
                <br></br>
                <div className="input-group mb-3">
                  <input
                    onChange={this.inputHandler}
                    name="password"
                    placeholder="Password"
                    type={this.state.revealed ? 'text' : 'password'}
                    className={this.hasError('password') ? 'form-control is-invalid' : 'form-control'}
                  />
                  <div className="invalid-feedback">{this.state.errors.password}</div>
                  <br />
                  <br />

                  <button onClick={this.handleReveale} className="btn btn-outline-secondary btn-sm" type="button" id="button-addon2">
                    {this.state.revealed ? 'hide' : 'show'}
                  </button>
                </div>
                <div className="d-flex flex-row justify-content-between align-item-center">
                  <button onClick={() => this.onLogin(this.state)} className="btn btn-warning mt-2" disabled={this.state.isLoading}>
                    LOGIN BOS
                  </button>
                  <Link to="/register" className="text-dark">
                    or register
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        {this.state.isLogin && <Navigate to="/HomePage" />}
      </div>
    );
  }
}
// onClick={() => this.registerHandler(this.state)}

const mapStateToProps = (state) => {
  return {
    userGlobal: state.user,
  };
};

const mapDispatchToProps = {
  setUser,
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);

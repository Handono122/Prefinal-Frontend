import React from 'react';
import { render } from 'react-dom';
import { Link, Navigate } from 'react-router-dom';
import Axios from 'axios';
import { setUser } from '../redux/actions/user';
import { connect } from 'react-redux';

class editProfile extends React.Component {
  state = {
    //fullName: '',
    username: '',
    fullName: '',
    bio: '',
    profilePicture: '',
    errors: {},
    isLoading: false,
    isLogin: false,
    isRegister: false,
    revealed: false,
  };
  componentDidMount() {
    let user = localStorage.getItem('user');
    if (user) {
      user = JSON.parse(user);
      this.setState({ isLogin: true, username: user.username, fullName: user.fullName, bio: user.bio });
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
    if (this.state.bio === '') {
      errors.password = 'Biodata is Require';
    }
    // if (this.state.profilePicture === '') {
    //   errors.passConfirm = 'Repeat Password is Require';
    // }
    if (this.state.fullName === '') {
      errors.email = 'Full Name is Require';
    }
    if (Object.keys(errors).length) {
      this.setState({ errors });
      return false;
    }

    this.setState({ isLoading: true });
    const { username, fullName, bio } = this.state;
    Axios.post('http://localhost:2001/users/edit/' + this.props.userGlobal.idnew_table, {
      //fullName,
      username,
      fullName,
      bio,
      //profilePicture,
    })
      .then((res) => {
        localStorage.setItem('user', JSON.stringify(res.data[0]));
        this.props.setUser(res.data[0]);
        this.setState({ isLoading: false, isRegister: true });
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
        alert('Gagal edit user profile!');
      });
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12 text-center">
            {/* <h1>Register Now!</h1>
            <p className="lead">Register now and start the club</p> */}
          </div>
        </div>

        <div className="row mt-5">
          <div className="col-4 offset-4">
            <div className="card">
              <div className="card-body">
                <h3 className="font-weight-bold mb-3">Edit Profile</h3>

                <div>
                  <input
                    value={this.state.username}
                    name="username"
                    onChange={this.inputHandler}
                    placeholder="Username"
                    type="text"
                    className={this.hasError('username') ? 'form-control is-invalid' : 'form-control'}
                  />

                  <div className="invalid-feedback">{this.state.errors.username}</div>
                </div>
                <br />

                <div>
                  <input
                    value={this.state.fullName}
                    name="fullName"
                    onChange={this.inputHandler}
                    placeholder="FullName"
                    type="text"
                    className={this.hasError('fullName') ? 'form-control is-invalid' : 'form-control'}
                  />
                  <div className="invalid-feedback">{this.state.errors.fullName}</div>
                </div>
                <br />

                <div>
                  <input
                    value={this.state.bio}
                    onChange={this.inputHandler}
                    name="bio"
                    placeholder="Biodata"
                    type="text"
                    className={this.hasError('password') ? 'form-control is-invalid' : 'form-control'}
                  />
                  <div className="invalid-feedback">{this.state.errors.bio}</div>
                </div>

                <br />
                <div className="d-flex flex-row justify-content-between align-items-center">
                  <button onClick={() => this.registerHandler(this.state)} className="btn btn-primary mt-2" disabled={this.state.isLoading}>
                    Edit
                  </button>
                  <Link to="/Profile" className="text-dark">
                    or cancel
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {this.state.isRegister && <Navigate to="/Profile" />}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userGlobal: state.user,
  };
};
const mapDispatchToProps = {
  setUser,
};
export default connect(mapStateToProps, mapDispatchToProps)(editProfile);

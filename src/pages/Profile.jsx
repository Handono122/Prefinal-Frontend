import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap';
import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import Axios from 'axios';
import moment from 'moment';

class Profile extends React.Component {
  state = {
    isLoggedIn: true,
    isEditing: false,
    // isHome: false,
    posts: [],
  };

  componentDidMount() {
    const user = localStorage.getItem('user');
    if (user) {
      this.setState({ isLoggedIn: true });
    } else {
      this.setState({ isLoggedIn: false });
    }
    this.getPosts();
  }

  editProfile = () => {
    this.setState({ isEditing: true });
  };

  // Home = () => {
  //   this.setState({ isHome: true });
  // };

  getPosts = () => {
    Axios.get('http://localhost:2001/media/getAll')
      .then((res) => {
        this.setState({ posts: res.data });
      })
      .catch((err) => {
        this.setState({ post: [] });
      });
  };

  render() {
    const posts = [];

    this.state.posts.forEach((post) => {
      let img = 'http://localhost:2001' + post.image;
      posts.push(
        <div class="row g-2">
          <div class="col mb-2">
            <img src={img} alt="image 1" class="w-100 rounded-3" />
          </div>

          <div className="ml-2">
            <p>{post.fullName || post.username}</p>
            <p className="tx-11 text-muted">{moment(post.createdDate).format('YYYY-MM-DD HH:mm:ss')}</p>
          </div>
        </div>
      );
    });
    return (
      <section className="h-100 gradient-custom-2">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-lg-9 col-xl-7">
              <div className="card">
                <div className="rounded-top text-white d-flex flex-row" style={{ backgroundColor: '#000; height:200px' }}>
                  <div className="ms-4 mt-5 d-flex flex-column  text-center py-1" style={{ width: '150px' }}>
                    <button onClick={this.editProfile} type="button" className="btn btn-outline-dark" data-mdb-ripple-color="dark" style={{ zIndex: 1 }}>
                      Edit profile
                    </button>

                    {/* <button onClick={this.Home} type="button" className="btn btn-outline-dark" data-mdb-ripple-color="dark" style={{ zIndex: 1 }}>
                      Home
                    </button> */}
                  </div>
                  <div className="ms-3 mb-1 h4" style={{ marginTop: '130px', color: 'black' }}>
                    <p>
                      <b>Full Name :</b> {this.props.userGlobal.fullName}
                    </p>
                    <p>
                      <b>Bio :</b>
                      {this.props.userGlobal.bio}
                    </p>
                    <p>
                      <b>User Name : </b>
                      {this.props.userGlobal.username}
                    </p>
                    <p>
                      <b>Email : </b>
                      {this.props.userGlobal.email}
                    </p>
                    <img src="" alt="" />
                  </div>
                </div>
                <div className="p-4 text-black" style={{ backgroundColor: '#f8f9fa' }}>
                  <div className="d-flex justify-content-end text-center py-1">
                    <div>
                      <p className="mb-1 h5">253</p>
                      <p className="small text-muted mb-0">Photos</p>
                    </div>
                    <div className="px-3">
                      <p className="mb-1 h5">1026</p>
                      <p className="small text-muted mb-0">Followers</p>
                    </div>
                    <div>
                      <p className="mb-1 h5">478</p>
                      <p className="small text-muted mb-0">Following</p>
                    </div>
                  </div>
                </div>
                <div className="card-body p-4 text-black">
                  <div className="mb-5">
                    <p className="lead fw-normal mb-1">About</p>
                    <div className="p-4" style={{ backgroundColor: '#f8f9fa' }}>
                      <p className="font-italic mb-1">Web Developer</p>
                      <p className="font-italic mb-1">Lives in Jakarta</p>
                      <p className="font-italic mb-0">Photographer</p>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <p className="lead fw-normal mb-0">Recent photos</p>
                    <p className="mb-0">
                      <a href="#!" className="text-muted">
                        Show all
                      </a>
                    </p>
                  </div>
                  {posts}
                </div>
              </div>
            </div>
          </div>

          {this.state.isEditing && <Navigate to="/editProfile" />}
          {!this.state.isLoggedIn && <Navigate to="/login" />}
        </div>
      </section>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    userGlobal: state.user,
  };
};

const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(Profile);

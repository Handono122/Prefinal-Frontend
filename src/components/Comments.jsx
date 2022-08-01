import React from 'react';
import Axios from 'axios';

class Comments extends React.Component {
  state = {
    isComment: '',
    addFile: null,
  };

  inputHandler = (event) => {
    const value = event.target.value;
    const name = event.target.name;

    this.setState(() => ({
      [name]: value,
    }));
  };
  onComment = () => {
    const { isComment } = this.state;
    const formData = new FormData();
    formData.append('isComment', isComment);
    Axios.post('http://localhost:2001/media/upload', {
      isComment,
      //ext: addFile.name.split('.').pop(),
      iduser: this.state.user.idnew_table,
    })
      .then((res) => {
        this.setState({ isComment: '' });
        this.getPosts();
        let commentPost = document.getElementById('caption');
        commentPost.value = '';

        //alert('Berhasil masuk!');
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          errors: {
            //username: err.response.data.erroMessage,
            //password: err.response.data.erroMessage,
          },
        });
        //alert('Gagal masuk!');
      });
  };

  render() {
    return (
      <section>
        <div className="card-footer py-3 border-0" style={{ backgroundColor: '#f8f9fa' }}>
          <div className="d-flex flex-start w-100">
            <img className="rounded-circle shadow-1-strong me-3" src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(19).webp" alt="avatar" width="40" height="40" />
            <div className="form-outline w-100">
              <textarea onChange={this.inputHandler} className="form-control" id="isComment" rows="4" style={{ background: '#fff' }}></textarea>
              <label className="form-label" for="textAreaExample">
                Message
              </label>
            </div>
          </div>
          <div className="float-end mt-2 pt-1">
            <button type="button" className="btn btn-primary btn-sm">
              Post comment
            </button>
            <button type="button" className="btn btn-outline-primary btn-sm">
              Cancel
            </button>
          </div>
        </div>
        <br />
        <br />
        <div>
          <div className="row d-flex justify-content-center">
            <div>
              <div className="card text-dark">
                <div className="card-body p-4">
                  <div className="d-flex flex-start">
                    <img className="rounded-circle shadow-1-strong me-3" src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(23).webp" alt="avatar" width="60" height="60" />
                    <div>
                      <h6 className="fw-bold mb-1">Maggie Marsh</h6>
                      <div className="d-flex align-items-center mb-3">
                        <p className="mb-0">March 07, 2021</p>
                        <a href="#!" className="link-muted">
                          <i className="fas fa-pencil-alt ms-2"></i>
                        </a>
                        <a href="#!" className="link-muted">
                          <i className="fas fa-redo-alt ms-2"></i>
                        </a>
                        <a href="#!" className="link-muted">
                          <i className="fas fa-heart ms-2"></i>
                        </a>
                      </div>
                      <p className="mb-0">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer
                        took a galley of type and scrambled it.
                      </p>
                    </div>
                  </div>
                </div>

                <hr className="my-0" />

                <div className="card-body p-4">
                  <div className="d-flex flex-start">
                    <img className="rounded-circle shadow-1-strong me-3" src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(26).webp" alt="avatar" width="60" height="60" />
                    <div>
                      <h6 className="fw-bold mb-1">Lara Stewart</h6>
                      <div className="d-flex align-items-center mb-3">
                        <p className="mb-0">March 15, 2021</p>
                        <a href="#!" className="link-muted">
                          <i className="fas fa-pencil-alt ms-2"></i>
                        </a>
                        <a href="#!" className="text-success">
                          <i className="fas fa-redo-alt ms-2"></i>
                        </a>
                        <a href="#!" className="link-danger">
                          <i className="fas fa-heart ms-2"></i>
                        </a>
                      </div>
                      <p className="mb-0">
                        Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classNameical Latin literature from 45 BC, making it over 2000 years old. Richard
                        McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through
                        the cites.
                      </p>
                    </div>
                  </div>
                </div>

                <hr className="my-0" style={{ height: '1px;' }} />

                <div className="card-body p-4">
                  <div className="d-flex flex-start">
                    <img className="rounded-circle shadow-1-strong me-3" src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(33).webp" alt="avatar" width="60" height="60" />
                    <div>
                      <h6 className="fw-bold mb-1">Alexa Bennett</h6>
                      <div className="d-flex align-items-center mb-3">
                        <p className="mb-0">March 24, 2021</p>
                        <a href="#!" className="link-muted">
                          <i className="fas fa-pencil-alt ms-2"></i>
                        </a>
                        <a href="#!" className="link-muted">
                          <i className="fas fa-redo-alt ms-2"></i>
                        </a>
                        <a href="#!" className="link-muted">
                          <i className="fas fa-heart ms-2"></i>
                        </a>
                      </div>
                      <p className="mb-0">
                        There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look
                        even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure.
                      </p>
                    </div>
                  </div>
                </div>

                <hr className="my-0" />

                <div className="card-body p-4">
                  <div className="d-flex flex-start">
                    <img className="rounded-circle shadow-1-strong me-3" src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(24).webp" alt="avatar" width="60" height="60" />
                    <div>
                      <h6 className="fw-bold mb-1">Betty Walker</h6>
                      <div className="d-flex align-items-center mb-3">
                        <p className="mb-0">March 30, 2021</p>
                        <a href="#!" className="link-muted">
                          <i className="fas fa-pencil-alt ms-2"></i>
                        </a>
                        <a href="#!" className="link-muted">
                          <i className="fas fa-redo-alt ms-2"></i>
                        </a>
                        <a href="#!" className="link-muted">
                          <i className="fas fa-heart ms-2"></i>
                        </a>
                      </div>
                      <p className="mb-0">
                        It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is
                        therefore always free from repetition, injected humour, or non-characteristic words etc.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
export default Comments;

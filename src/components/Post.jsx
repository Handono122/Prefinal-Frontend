import React from 'react';
import moment from 'moment';
import Comments from './Comments';

class Post extends React.Component {
  state = {
    showComment: false,
    isLike: false,
  };

  render() {
    let img = 'http://localhost:2001' + this.props.post.image;
    return (
      <div className="card rounded card-post">
        <img src={img} className="card-img-top" />
        <div className="card-header">
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              {/* <img className="img-xs rounded-circle" src="https://bootdey.com/img/Content/avatar/avatar6.png" alt=""> */}
              <div className="ml-2">
                <p>{this.props.post.fullName || this.props.post.username}</p>
                <p className="tx-11 text-muted">{moment(this.props.post.createdDate).format('YYYY-MM-DD HH:mm:ss')}</p>
              </div>
            </div>
            <div className="dropdown">
              <button className="btn p-0" type="button" id="dropdownMenuButton3" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  h="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-more-horizontal icon-lg pb-3px"
                >
                  <circle cx="12" cy="12" r="1"></circle>
                  <circle cx="19" cy="12" r="1"></circle>
                  <circle cx="5" cy="12" r="1"></circle>
                </svg>
              </button>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuButton3">
                <a className="dropdown-item d-flex align-items-center" href="#">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    h="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-meh icon-sm mr-2"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="8" y1="15" x2="16" y2="15"></line>
                    <line x1="9" y1="9" x2="9.01" y2="9"></line>
                    <line x1="15" y1="9" x2="15.01" y2="9"></line>
                  </svg>{' '}
                  <span className="">Unfollow</span>
                </a>
                <a className="dropdown-item d-flex align-items-center" href="#">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    h="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-corner-right-up icon-sm mr-2"
                  >
                    <polyline points="10 9 15 4 20 9"></polyline>
                    <path d="M4 20h7a4 4 0 0 0 4-4V4"></path>
                  </svg>{' '}
                  <span className="">Go to post</span>
                </a>
                <a className="dropdown-item d-flex align-items-center" href="#">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    h="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-share-2 icon-sm mr-2"
                  >
                    <circle cx="18" cy="5" r="3"></circle>
                    <circle cx="6" cy="12" r="3"></circle>
                    <circle cx="18" cy="19" r="3"></circle>
                    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                  </svg>{' '}
                  <span className="">Share</span>
                </a>
                <a className="dropdown-item d-flex align-items-center" href="#">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    h="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-copy icon-sm mr-2"
                  >
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                  </svg>{' '}
                  <span className="">Copy link</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="card-body">
          <p className="mb-3 tx-14">{this.props.post.caption}</p>
          {/* <img className="img-fluid" src="../../../assets/images/sample2.jpg" alt=""> */}
        </div>
        <div className="card-footer">
          <div className="d-flex post-actions">
            <a onClick={() => this.setState({ isLike: !this.state.isLike })} href="javascript:;" className="d-flex align-items-center text-muted mr-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill={this.state.isLike ? 'red' : 'none'}
                stroke="currentColor"
                h="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-heart icon-md"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
              <p className="d-none d-md-block ml-2">Like</p>
            </a>
            <a onClick={() => this.setState({ showComment: !this.state.showComment })} href="javascript:;" className="d-flex align-items-center text-muted mr-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                h="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-message-square icon-md"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
              <p className="d-none d-md-block ml-2">Comment</p>
            </a>
            <a href="javascript:;" className="d-flex align-items-center text-muted">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                h="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-share icon-md"
              >
                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
                <polyline points="16 6 12 2 8 6"></polyline>
                <line x1="12" y1="2" x2="12" y2="15"></line>
              </svg>
              <p className="d-none d-md-block ml-2">Share</p>
            </a>
          </div>
          {this.state.showComment ? <Comments /> : null}
        </div>
      </div>
    );
  }
}
export default Post;

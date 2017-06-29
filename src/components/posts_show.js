import React, {Component} from 'react';
import {fetchPost, deletePost} from '../actions/index'
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

class PostShow extends Component {
  componentDidMount() {
    const {id} = this.props.match.params; //Checks if it matches the id.
    this.props.fetchPost(id);
  }

  onDeleteClick() {
    const {id} = this.props.match.params; //Checks if it matches the id.
    this.props.deletePost(id, () => {
      this.props.history.push('/');
    });
  }

  render(){
    const {post} = this.props;

    if(!post) {
     return <div>Loading...</div>
    }

    return (
      <div>
        <Link to="/">Back to Index</Link>
        <button className="btn btn-danger pull-xs-right" onClick={this.onDeleteClick.bind(this)}> Delete Post </button>
        <h3>{post.title}</h3>
        <h6>Categories: {post.categories}</h6>
        <p>{post.content}</p>
      </div>
    );
  }
}

function mapStateToProps({posts}, ownProps) {
    return {post:posts[ownProps.match.params.id]}; //the post we want to show
}

export default connect(mapStateToProps,{fetchPost, deletePost}) (PostShow);

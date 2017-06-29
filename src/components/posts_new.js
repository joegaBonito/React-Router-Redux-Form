import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {createPost} from '../actions/index';

class PostsNew extends Component {

  renderField(field) {
    return(
      <div className="form-group has-danger">
        <label>{field.label}</label>
        <input className="form-control" type="text" {...field.input} />
        <div className="text-help">
          {field.meta.touched ? field.meta.error : ''}
        </div>
      </div>
    );
  }

  onSubmit(values) {
    this.props.createPost(values,() => this.props.history.push('/'));
  }

  render() {
    const {handleSubmit} = this.props;
    return (
      <div>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field label="Title" name="title" component={this.renderField} />
          <Field label="Categories" name="categories" component={this.renderField} />
          <Field label="Content" name="content" component={this.renderField} />
          <button type="submit" className="btn btn-primary">Submit</button>
          <Link to="/" className="btn btn-danger">Cancel</Link>
        </form>
      </div>
    );
  }
}

function validate(values) {
  //console.log(values) -> {title: ' ', categories: 'aasdf', content: 'asdfadf'}
  const errors = {};
  if(!values.title) {
    errors.title="Enter a title!";
  }
  if(!values.categories) {
    errors.categories="Enter some categories!";
  }
  if(!values.content) {
    errors.content="Enter some contents!";
  }

  //If errors is empty, the form is fine to submit
  //If errors has *any* properties, redux form assumes form is invalid
  return errors;
}

export default reduxForm({
  validate,
  form: 'PostsNewForm'
})(
  connect(null, {createPost}) (PostsNew)
);

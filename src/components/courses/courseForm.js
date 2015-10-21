'use strict';

var React = require('react');
var Input = require('../common/textInput');

var CourseForm = React.createClass({
  propTypes: {
    course: React.PropTypes.object.isRequired,
    authors: React.PropTypes.array.isRequired,
    onSave: React.PropTypes.func.isRequired,
    onChange: React.PropTypes.func.isRequired,
    errors: React.PropTypes.object
  },

  // set state for selector value
  getInitialState: function() {
    return { selectValue: this.props.authors[0] };
  },

  // set the new state on change for selector, and pass it up to state of full course
  handleChange: function(e) {
    this.setState({ selectValue: e.target.value });
    this.props.onChange(e);
  },

  render: function() {
    var createAuthorSelector = function(author, index) {
      return (
        <option key={index}
                value={author.id}>{author.firstName} {author.lastName}</option>
      );
    };

    return (
      <form>
        <h1>Manage Course</h1>
        <Input
          name='title'
          label='Title'
          value={this.props.course.title}
          onChange={this.props.onChange}
          error={this.props.errors.title} />

        <Input
          name='watchHref'
          label='watchHref'
          value={this.props.course.watchHref}
          onChange={this.props.onChange}
          error={this.props.errors.watchHref} />

        <div className='form-group'>
          <label htmlFor='author'>Author</label>
          <div className='field'>
            <select name='author'
                    className='form-control'
                    value={this.state.selectValue}
                    onChange={this.handleChange}>
              <option value='' disabled>Select an author</option>
              {this.props.authors.map(createAuthorSelector, this)}
            </select>
            <div className='input'>{this.props.errors.author}</div>
          </div>
        </div>

        <Input
          name='length'
          label='Length'
          value={this.props.course.length}
          onChange={this.props.onChange}
          error={this.props.errors.length} />

        <Input
          name='category'
          label='Category'
          value={this.props.course.category}
          onChange={this.props.onChange}
          error={this.props.errors.category} />

        <input type='submit' value='Save' className='btn btn-default' onClick={this.props.onSave} />
      </form>
    );
  }
});

module.exports = CourseForm;

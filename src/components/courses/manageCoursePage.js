'use strict';

var React = require('react');
var Router = require('react-router');
var CourseActions = require('../../actions/courseActions');
var AuthorStore = require('../../stores/authorStore');
var CourseStore = require('../../stores/courseStore');
var CourseForm = require('./courseForm');
var toastr = require('toastr');

var ManageCoursePage = React.createClass({
  mixins: [
    Router.Navigation
  ],

  getInitialState: function() {
    return {
      course: { id: '',
                title: '',
                watchHref: '',
                author: {
                  id: '',
                  name: ''
                },
                length: '',
                category: '' },
      authors: AuthorStore.getAllAuthors(),
      errors: {},
      dirty: false
    };
  },

  componentWillMount: function() {
    var courseId = this.props.params.id;

    if (courseId) {
      this.setState({course: CourseStore.getCourseById(courseId)});
    }
  },

  setCourseState: function(event) {
    this.setState({dirty: true});
    var field = event.target.name;
    var value = event.target.value;
    this.state.course[field] = value;
    return this.setState({course: this.state.course});
  },

  courseFormIsValid: function() {
    var formIsValid = true;
    this.state.errors = {};

    if (this.state.course.title.length < 1) {
      this.state.errors.title = 'Title must exist';
      formIsValid = false;
    }

    if (this.state.course.author.id < 1) {
      this.state.errors.author = 'Must choose an author';
      formIsValid = false;
    }

    if (this.state.course.watchHref.length < 1) {
      this.state.errors.watchHref = 'Link must exist';
      formIsValid = false;
    }

    if (this.state.course.length.length < 1) {
      this.state.errors.length = 'Must have play length';
      formIsValid = false;
    }

    if (this.state.course.category.length < 1) {
      this.state.errors.category = 'Course must have a category';
      formIsValid = false;
    }

    this.setState({errors: this.state.errors});
    return formIsValid;
  },

  saveCourse: function(event) {
    event.preventDefault();

    if(!this.courseFormIsValid()) {
      return;
    }
    // Selector only passes author id in. Get full author and combine to style used by course
    var id = this.state.course.author.id || this.state.course.author;
    var authorData = AuthorStore.getAuthorById(id);
    console.log(authorData);
    var authorId = authorData.id;
    var authorName = authorData.firstName + ' ' + authorData.lastName;
    this.state.course.author = { id: authorId, name: authorName };
    this.setState({ course: this.state.course });

    if (this.state.course.id) {
      CourseActions.updateCourse(this.state.course);
    }
    else {
      CourseActions.createCourse(this.state.course);
    }

    this.setState({dirty: false});
    toastr.success('Course Saved!');
    this.transitionTo('courses');
  },

  render: function() {
    return (
      <CourseForm
        course={this.state.course}
        authors={this.state.authors}
        onSave={this.saveCourse}
        onChange={this.setCourseState}
        errors={this.state.errors} />
    );
  }
});

module.exports = ManageCoursePage;

'use strict';

var generators = require('yeoman-generator');
var yosay = require('yosay');
var removeDiacritics = require('diacritics').remove;

var parameters = {};


/* translate the string into a Tuts+-style url fragment */
function urlize (string) {
  var url = string;
  url = removeDiacritics(url);
  url = url.toLowerCase();
  url = url.replace(/ /g, '-');

  return url;
}

module.exports = generators.Base.extend({

  constructor: function() {
    generators.Base.apply(this, arguments)

    this.argument('type', {type: String, optional: true, defaults: "course"})

    //the type argument should be 'course' or 'tutorial'
    if (this.type != 'course' && this.type != 'tutorial')
      this.type = 'course'

  }

  configuring: function() {
    //this.config.save();
  },


  initializing: function() {
    this.log(yosay("Let's make a tuts+ "+this.type+" repo!"));
  },

  prompting: function() {
      var done = this.async();

      this.prompt([{
        name: 'title',
        message: 'What is the name of the "+this.type+"?'
      }, {
        name: 'instructor',
        message: 'Who is the instructor?'
      }], function (answers){

        parameters.title = answers.title;
        parameters.instructor = answers.instructor;

        done();
      }.bind(this));
  },
  default: function() {
      this.log('title: '+parameters.title);
      this.log('instructor: '+parameters.instructor);

      var templateContext = {
        title: parameters.title,
        titleURL: urlize(parameters.title),
        instructor: parameters.instructor,
        instructorURL: urlize(parameters.instructor), 
      }

      this.fs.copy(this.sourceRoot()+'/LICENSE' , this.destinationRoot()+'/LICENSE')

      if (this.type=='course')
        this.fs.copyTpl(this.sourceRoot()+'/README.course.md' , this.destinationRoot()+'/README.md', templateContext)
      if (this.type=='tutorial')
        this.fs.copyTpl(this.sourceRoot()+'/README.tutorial.md' , this.destinationRoot()+'/README.md', templateContext)
  },

});

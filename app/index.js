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


  configuring: function() {
    //this.config.save();
  },


  initializing: function() {
    this.log(yosay("Let's make a tuts+ repo!"));
  },

  prompting: function() {
      var done = this.async();

      this.prompt([{
        name: 'title',
        message: 'What is the name of the course?'
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
        instructorURL: urlize(parameters.instructor)
      }

      this.fs.copy(this.sourceRoot()+'/LICENSE' , this.destinationRoot()+'/LICENSE')

      this.fs.copyTpl(this.sourceRoot()+'/README.md' , this.destinationRoot()+'/README.md', templateContext)
  },

});

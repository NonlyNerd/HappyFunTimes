/*
node ../delme/node_modules/jsdoc/jsdoc.js  --destination delmedocs server/*
*/
"use strict";

module.exports = function(grunt) {

  grunt.initConfig({
    jsdoc: {
      relayserver: {
        src: ['server/*.js'],
        options: {
          destination: 'docs/relayserver',
        },
      },
      game: {
        src: ['public/scripts/*.js'],
        options: {
          destination: 'docs/game',
        },
      },
      controller: {
        src: ['public/examples/scripts/*.js'],
        options: {
          destination: 'docs/controller',
        },
      },
    },
    clean: [
        'docs/relayserver',
        'docs/game',
        'docs/controller',
    ],
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-jsdoc');

  grunt.registerTask('default', ['clean', 'jsdoc']);
};


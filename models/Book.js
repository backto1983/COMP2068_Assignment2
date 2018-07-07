/**
 * File Name: Book.js
 * Author Name: Henrique Oliveira
 * Website Name: Assignment 2 - NodeJS application using ExpressJS, MongoDB / Mongoose and EJS
 * File Description: Book schema
 */

const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: 'Please enter a title.',
  },
  author: {
    type: String,
    required: 'Please enter an author.',
  },
  genre: {
    type: String,
    required: 'Please choose a genre.',
  },
  pages: {
    type: Number,
    required: 'Please enter number of pages.',
  },
  url: {
    type: String,
    required: 'Please enter goodreads URL.',
  },
});

// Make the class public
module.exports = mongoose.model('Book', bookSchema);
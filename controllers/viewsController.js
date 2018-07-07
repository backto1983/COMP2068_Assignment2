/**
 * File Name: viewController.js
 * Author Name: Henrique Oliveira
 * Website Name: Assignment 2 - NodeJS application using ExpressJS, MongoDB / Mongoose and EJS
 * File Description: Logical javaScript statements to control HTML views
 */

 // Link to Book model
const Book = require('../models/Book');

 // Each function below control one view (index, books, ...) 
exports.homePage = (req, res, next) => {
    res.render('index', { 
      title: 'Assignment 2 - NodeJS application using ExpressJS, MongoDB / Mongoose and EJS',
      message: 'Welcome to ReadSpree! Check out our collection of books and find only the best from many different genres.' });
  };

  exports.getBooks = (req, res) => {    
    Book.find((err, books) => {
        if(err) {
            res.render('error');
        } else {
            res.render('books', {
            title: 'List of Books',
            books,
            });
        }
    });
};
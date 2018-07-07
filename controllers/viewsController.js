/**
 * File Name: viewController.js
 * Author Name: Henrique Oliveira
 * Website Name: Assignment 2 - NodeJS application using ExpressJS, MongoDB / Mongoose and EJS
 * File Description: logical javaScript statements to control HTML views
 */

 // Each function below control one view (index, books, ...) 
exports.homePage = (req, res, next) => {
    res.render('index', { 
      title: 'Assignment 2 - NodeJS application using ExpressJS, MongoDB / Mongoose and EJS',
      message: 'Welcome to ReadSpree! Check out our collection of books and find only the best from many different genres.' });
  };
  
  exports.books = (req, res, next) => {
    const message = 'List of Books';
    res.render('books', { 
      title: 'Books',
      message });       
  };
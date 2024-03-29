/**
 * File Name: viewsController.js
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
      message: 'Welcome to ReadSpree! Check out our collection of books and find only the best from many different genres.',
      user: req.user,
     });
  };

  exports.getBooks = (req, res) => {    
    Book.find((err, books) => {
        if(err) {
            res.render('error');
        } else {
            res.render('books', {
            title: 'List of Books',
            books,
            user: req.user,
            });
        }
    });
};

exports.deleteBook = (req, res) => {
    Book.findByIdAndRemove(
      { _id: req.params.id },
      async (err, bookJustDeleted) => {
        if (err) {
          console.log(err);
        } else {
          res.redirect('/books');
        }
      },
    );
  };

  exports.addBook = (req, res) => {
    res.render('addBook', {
      title: 'Add Book',
      user: req.user,
    });
  };

  exports.createBook = async (req, res) => {
    try {
      const book = new Book(req.body);
      await book.save();
      res.redirect('/books');
    } catch (err) {
      console.log(err);
    }
  };

  exports.editBook = (req, res) => {
    // Use Book model to find selected document
    Book.findById({ _id: req.params.id }, (err, book) => {
      if (err) {
        console.log(err);
      } else {
        res.render('editBook', {
          title: 'Edit Book',
          book,
          isActive: 'admin',
          user: req.user,
        });
      }
    });
  };
  
  exports.updateBook = (req, res) => {  
    Book.update({ _id: req.params.id }, req.body, (err) => {
      if (err) {
        console.log(err);
      } else {
        res.redirect('/books');
      }
    });
  };
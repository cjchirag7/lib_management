import * as ActionTypes from './ActionTypes';
import {baseUrl} from '../baseUrl'
import axios from 'axios';

export const addBook = (book) => ({
  type: ActionTypes.ADD_BOOK,
  payload: book
});

export const postBook = (name, author, description, isbn, cat, floor, shelf, copies) => (dispatch) => {

    const newBook = {
      name: name, author: author,
       description: description, isbn: isbn,
        cat: cat, floor: floor, 
        shelf: shelf, copies: copies
    };
        
    return fetch(baseUrl + 'books', {
        method: "POST",
        body: JSON.stringify(newBook),
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "cross-origin"
    })
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            throw error;
      })
    .then(response => response.json())
    .then(response => dispatch(addBook(response)))
    .catch(error =>  { console.log('post books', error.message); alert('Your book could not be posted\nError: '+error.message); });
};

export const fetchBooks = () => (dispatch) => {

    dispatch(booksLoading(true));
    return fetch(baseUrl+'books')
        .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            var errmess = new Error(error.message);
            throw errmess;
      })
    .then(response => response.json())
    .then(books => dispatch(addBooks(books)))
    .catch(error => dispatch(booksFailed(error.message)));
}



export const booksLoading = () => ({
    type: ActionTypes.BOOKS_LOADING
});

export const booksFailed = (errmess) => ({
    type: ActionTypes.BOOKS_FAILED,
    payload: errmess
});

export const addBooks = (books) => ({
    type: ActionTypes.ADD_BOOKS,
    payload: books
});

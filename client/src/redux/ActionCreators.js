import * as ActionTypes from './ActionTypes';
import {baseUrl} from '../baseUrl'

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
    const bearer = 'Bearer ' + localStorage.getItem('token');
    return fetch(baseUrl + 'books', {
        method: "POST",
        body: JSON.stringify(newBook),
        headers: {
          "Content-Type": "application/json",
          'Authorization': bearer
        }
        ,        credentials: "same-origin"
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

export const editBook = (_id, name, author, description, isbn, cat, floor, shelf, copies) => (dispatch) => {

  const newBook = {
    name: name, author: author,
     description: description, isbn: isbn,
      cat: cat, floor: floor, 
      shelf: shelf, copies: copies
  };
  const bearer = 'Bearer ' + localStorage.getItem('token');
  return fetch(baseUrl + 'books/' + _id, {
      method: "PUT"
      ,     credentials: 'same-origin'
      ,      body: JSON.stringify(newBook),
      headers: {
        "Content-Type": "application/json",
        'Authorization': bearer
      } })
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
  .then(response => (dispatch(editBookdispatch(response))))
  .catch(error =>  {  console.log(baseUrl + 'books/' + _id);
  alert('Your book could not be edited\nError: '+error.message); });
};

export const deleteBook = (_id) => (dispatch) => {
  
  const bearer = 'Bearer ' + localStorage.getItem('token');    
  return fetch(baseUrl + 'books/' + _id, {
      method: "DELETE"
      ,       credentials: "same-origin"
      ,       headers: {
        'Authorization': bearer
      }
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
  .then(response => dispatch(deleteBookdispatch(response)))
  .catch(error =>  { console.log('delete book', error.message); alert('Your book could not be deleted\nError: '+error.message); });
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

export const editBookdispatch = (books) => ({
  type: ActionTypes.EDIT_BOOK,
  payload: books
});

export const deleteBookdispatch = (resp) => ({
  type: ActionTypes.DELETE_BOOK,
  payload: resp
});

export const requestLogin = (creds) => {
  return {
      type: ActionTypes.LOGIN_REQUEST,
      creds
  }
}

export const receiveLogin = (response) => {
  return {
      type: ActionTypes.LOGIN_SUCCESS,
      token: response.token,
      userinfo: response.userinfo
  }
}

export const loginError = (message) => {
  return {
      type: ActionTypes.LOGIN_FAILURE,
      message
  }
}

export const loginUser = (creds) => (dispatch) => {

  dispatch(requestLogin(creds))

  return fetch(baseUrl + 'users/login', {
      method: 'POST',
      headers: { 
          'Content-Type':'application/json' 
      },
      body: JSON.stringify(creds)
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
  .then(response => {
      if (response.success) {
          // If login was successful, set the token in local storage
          localStorage.setItem('token', response.token);
          localStorage.setItem('creds', JSON.stringify(creds));
          localStorage.setItem('userinfo', JSON.stringify(response.userinfo));          
          // Dispatch the success action
          dispatch(receiveLogin(response));
      }
      else {
          var error = new Error('Error ' + response.status);
          error.response = response;
          throw error;
      }
  })
  .catch(error => {
    alert(error);
    return dispatch(loginError(error.message));})
};

export const registerUser = (creds) => (dispatch) => {


  return fetch(baseUrl + 'users/signup', {
      method: 'POST',
      headers: { 
          'Content-Type':'application/json' 
      },
      body: JSON.stringify(creds)
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
  .then(response => {
      if (response.success) {
          // If Registration was successful, alert the user
          alert('Registration Successful');
        }
      else {
          var error = new Error('Error ' + response.status);
          error.response = response;
          throw error;
      }
  })
  .catch(error => alert(error))
};

export const requestLogout = () => {
  return {
    type: ActionTypes.LOGOUT_REQUEST
  }
}

export const receiveLogout = () => {
  return {
    type: ActionTypes.LOGOUT_SUCCESS
  }
}


export const logoutUser = () => (dispatch) => {
  dispatch(requestLogout())
  localStorage.removeItem('token');
  localStorage.removeItem('creds');  
  localStorage.removeItem('userinfo');  
  dispatch(receiveLogout())
}

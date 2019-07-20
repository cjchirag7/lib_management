import * as ActionTypes from './ActionTypes';

const Books = (state = { isLoading: true,
    errMess: null,
    books:[]}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_BOOKS:
            return {...state, isLoading: false, errMess: null, books: action.payload};

        case ActionTypes.BOOKS_LOADING:
            return {...state, isLoading: true, errMess: null, books: []}

        case ActionTypes.BOOKS_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        case ActionTypes.ADD_BOOK:
            var book = action.payload;
            return { ...state, books: state.books.concat(book)};

        case ActionTypes.EDIT_BOOK:
            var newbook = action.payload;
            return { ...state, books: state.books.map((book)=>
                {
                if(book._id===newbook._id)
                {
                    return newbook;
                }
            else {
                    return book;
            }
                 })
                }

        case ActionTypes.DELETE_BOOK:
        var resp = action.payload;
        return { ...state, books: state.books.filter((book)=>{
            return book._id!==resp._id}) }

        default:
            return state;
    }
};
export default Books;
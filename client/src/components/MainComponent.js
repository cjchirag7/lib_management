import React, {Component} from 'react';
import Header from './HeaderComponent.js';
import Footer from './FooterComponent.js';
import Home from './HomeComponent.js';
import Booklist from './BooksComponent.js';
import Search from './SearchComponent.js';
import BookDetail from './BookDetailComponent.js';
import {Switch,Route,Redirect, withRouter} from 'react-router-dom';
//import {BOOKS} from '../backup/books';
import {connect} from 'react-redux';
import { postBook, fetchBooks } from '../redux/ActionCreators';

const mapStateToProps= (state)=>{
  return{
    books: state.books   
  };
}

const mapDispatchToProps = dispatch => ({
  fetchBooks: () => { dispatch(fetchBooks())},
  postBook: (name, author, description, isbn, cat, floor, shelf, copies) => dispatch(postBook(name, author, description, isbn, cat, floor, shelf, copies))
});

class Main extends Component {
  
  componentDidMount() {
    this.props.fetchBooks();
    }

    constructor(props){
        super(props);
        this.state={
          isAdmin: false,
          isSignedIn: false
        };
      }
    
    
    render(){
      const BookWithId = ({match}) => {
        return(
          <BookDetail book={this.state.books.books.filter((book) => (book.name)===(match.params.bookName))[0]}
          isLoading={this.props.books.isLoading}
          errMess={this.props.books.errMess}
          />
          );
      };
            
    
    return ( 
          <div className="App">
          <Header isSignedIn={this.state.isSignedIn}/>
          <Switch location={this.props.location}>
                      <Route exact path='/home' component={() => <Home />} />
                      <Route exact path='/search' component={() => <Search 
                      books={this.props.books.books}
                      booksLoading={this.props.books.isLoading}
                      booksErrMess={this.props.books.errMess}
                      isSignedIn={this.state.isSignedIn}/>}/>
                      <Route exact path='/books' component={() => <Booklist
                      books={this.props.books.books}
                      booksLoading={this.props.books.isLoading}
                      booksErrMess={this.props.books.errMess}
                      isSignedIn={this.state.isSignedIn}/>}/>
                      <Route path='/books/:bookName' component={BookWithId} />
                      <Redirect to="/home"/>
          </Switch>
        <Footer/>
          </div>
           );     
    }
    }

    export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Main));


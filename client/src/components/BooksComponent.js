import React,{Component} from 'react';
import { Table } from 'reactstrap';
import {Link} from 'react-router-dom';
import Loading from './LoadingComponent.js';

// RenderMenuItem is a functional component
function RenderBook ({book, onClick,isAdmin, editBook}) {
    return (
            <React.Fragment>
            <td>
            {book.isbn}
            </td>
            <td>
            <Link to={`/books/${book.name}`}>
            {book.name}
            </Link>
            </td>
            <td>
                {book.author}
            </td>
            <td>
                {book.copies}
            </td>
            {isAdmin?(<td className="Option" onClick={()=>{editBook(book.name)();}}><span className="fa fa-pencil"/></td>):(<React.Fragment/>)}
            </React.Fragment>
       );
}


class Booklist extends Component {

    constructor(props){
        super(props);
        this.state={
        }
    }

render(){
    const list = this.props.books.map((book) => {
        return (
                <tr key={book.name}>
                    <RenderBook book={book} isAdmin={this.props.isAdmin}/>
                </tr>
        );
    });
    if (this.props.booksLoading) {
        return(
            <div className="container">
                <div className="row">            
                    <Loading />
                </div>
            </div>
        );
    }
    else if (this.props.booksErrMess) {
        return(
            <div className="container">
                <div className="row heading"> 
                    <div className="col-12">
                        <h4>{this.props.booksErrMess}</h4>
                    </div>
                </div>
            </div>
        );
    }
    else
    {
    return(
        
        <div className="container">
        <div className="row">
            <div className="col-12 heading">
             <h3 align="center">List of All books</h3>
             <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ISBN number</th>
            <th>Name of Book</th>
            <th>Authors</th>
            <th>Copies available</th>
            {this.props.isAdmin?(<th>Edit</th>):(<React.Fragment/>)}
          </tr>
        </thead>
        <tbody>
            {list}
        </tbody>
        </Table>
            </div>
        </div>
    </div>

        );
}
}

}

export default Booklist;
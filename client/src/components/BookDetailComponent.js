import React,{Component} from 'react';
import { Card, CardText, CardHeader, CardFooter, CardBody,CardTitle } from 'reactstrap';
function RenderBook({book,editBook,isAdmin}) {
    if (book != null)
        return(
        <Card>
       
       <CardHeader tag="h3">{book.name} &nbsp; &nbsp; &nbsp;&nbsp;
       {isAdmin?(<span className="fa fa-pencil Option" onClick={()=>{editBook(book.name)();}}/>):(<React.Fragment/>)}
        </CardHeader>
        <CardBody>
          <CardTitle align="right"> - {book.author}</CardTitle>
          <CardText>
              <b> Category: </b> {book.cat} <br/><br/>
              <b> ISBN number: </b> {book.isbn} <br/><br/>
              <b>Descrption: </b><br/> {book.description} <br/><br/>
              <b> Location: </b> <br/>Shelf no. {book.shelf} ,<br/>
              {book.floor===0?' Ground ':book.floor}{(book.floor===1)?'st ':(book.floor===2)?'nd ':(book.floor===3)?'rd ':(book.floor===0)?'':'th '}
              Floor
      </CardText><br/>
        </CardBody>
        <CardFooter className="text-muted">Copies available : {book.copies}</CardFooter>
        </Card>
        );
    else
        return(
            <div></div>
        );
        }


class BookDetail extends Component {

    constructor(props){
        super(props);
        this.state={
        }
    }
    componentDidMount() {
        window.scrollTo(0, 0)
      }
render(){
    return(

        <div className="container full">
        <div className="row heading">
          <div className="col-12">
          <br/>        <br/>
          <RenderBook book={this.props.book} isAdmin={this.props.isAdmin}>
              </RenderBook>
          </div>
        </div>
      </div>
        );
}

}

export default BookDetail;
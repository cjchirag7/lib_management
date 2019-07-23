import React,{Component} from 'react';
import {Row,Col, Card, CardText, CardHeader, CardFooter, CardBody,CardTitle } from 'reactstrap';
import Loading from './LoadingComponent';
function RenderBook({book,isAdmin,toggleEditModal,changeSelected}) {
    if (book != null)
        return(
        <Card>
       
       <CardHeader tag="h3">{book.name} &nbsp; &nbsp; &nbsp;&nbsp;
       {isAdmin?(<span className="fa fa-pencil Option" onClick={()=>{changeSelected(book._id);toggleEditModal();}}/>):(<React.Fragment/>)}
        </CardHeader>
        <CardBody>
          <CardTitle align="right"> - {book.author}</CardTitle>
          <CardText>
              <b> Category: </b> {book.cat} <br/><br/>
              <b> ISBN number: </b> {book.isbn} <br/><br/>
              <b>Descrption: </b><br/> {book.description} <br/><br/>
              <b> Location: </b> <br/>Shelf no. {book.shelf} ,<br/>
              {book.floor===0?' Ground ':book.floor}{(book.floor===1)?'st ':(book.floor===2)?'nd ':(book.floor===3)?'rd ':(book.floor===0)?'':'th '}
              Floor <br/><br/>
             <b> Copies available : </b> {book.copies}
      </CardText><br/>
        </CardBody>
        <CardFooter className="text-muted">
        <Row>
        <Col md={6}>
        Created at : {new Intl.DateTimeFormat('en-US',{year: 'numeric', month: 'short', day: '2-digit', hour: 'numeric',minute: 'numeric', hour12: true }).format(new Date( Date.parse(book.createdAt)))}    
        </Col>
        <Col md={6}>
        Last updated at : {new Intl.DateTimeFormat('en-US',{year: 'numeric', month: 'short', day: '2-digit',hour: 'numeric',minute: 'numeric', hour12: true}).format(new Date( Date.parse(book.updatedAt)))} 
        </Col>
        </Row>
        </CardFooter>
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
  if (this.props.isLoading) {
    return(
        <div className="container">
            <div className="row">            
                <Loading />
            </div>
        </div>
    );
}
else if (this.props.errMess) {
    return(
        <div className="container loading">
            <div className="row heading"> 
                <div className="col-12">
                    <br/><br/><br/><br/>
                    <h3>{this.props.errMess}</h3>
                </div>
            </div>
        </div>
    );
}
else
    return(

        <div className="container full">
        <div className="row heading">
          <div className="col-12">
          <br/>        <br/>
          <RenderBook book={this.props.book} isAdmin={this.props.isAdmin}
                    toggleEditModal={this.props.toggleEditModal}
                    changeSelected={this.props.changeSelected}>
              </RenderBook>

        <br/>
          </div>
        </div>
      </div>
        );
}

}

export default BookDetail;
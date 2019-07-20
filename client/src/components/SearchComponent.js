import React,{Component} from 'react';
import { Form,FormGroup,Row,Col,Label, Input, Badge, ListGroupItem, ListGroup } from 'reactstrap';
import Loading from './LoadingComponent.js';
import {Link} from 'react-router-dom';

class Search extends Component {

    constructor(props){
        super(props);
        this.state={
            name: '',
            author: '',
            cat:['Romance','Technology','Computer Science','Management','Electronics','Physics','Chemistry','Mathematics','Fiction','Philosophy','Language','Arts','Other']
        }
        this.onChange=this.onChange.bind(this);
    }

    onChange(e) {
        const options = this.state.cat;
        let pos=-1;
    
        if (e.target.checked) {
            options.push(e.target.value)
        } else {
          let i=0;
          for(; i<options.length; i++){
              if(options[i]===(e.target.value)) {
                  pos=i;
                  break;
                }
                else{
                }
          }
          options.splice(pos, 1)
        }
        this.setState({ cat: options });
      }

    componentDidMount() {
        window.scrollTo(0, 0)
      }
      
render(){
    var colors=["warning","danger","success","info","secondary"];
    var nameRegex=new RegExp(this.state.name, 'i');
    var authorRegex=new RegExp(this.state.author, 'i');
    const list = this.props.books.map((book) => {
        let category_matched=this.state.cat.some((category)=>(category===book.cat));
        if(((book.name).search(nameRegex)!==-1)&&((book.author).search(authorRegex)!==-1)&&category_matched)
        return (
            <ListGroupItem key={book._id}>
                         <Link to={`/books/${book._id}`}>
                         <b>{`${book.name}  `}</b> 
                         </Link>
                          <Badge color={colors[book.cat.length%5]} pill> {book.cat}</Badge>
             {this.props.isAdmin?(
             <React.Fragment>&nbsp; &nbsp;<span onClick={()=>{this.props.changeSelected(book._id); this.props.toggleEditModal(); }} className="Option fa fa-pencil"/>
                {'  '}&nbsp;   &nbsp;        <span onClick={()=>{this.props.changeSelected(book._id); this.props.toggleDeleteModal();}} className="Option fa fa-trash"/>
                          </React.Fragment>
             ):(<React.Fragment/>)}
            
            <br/> <p className="ml-auto"> Authors : {`    ${book.author}`}</p>
             <p> {book.copies} Copies available</p>
             <p>Location : {` Floor- ${book.floor}, Shelf- ${book.shelf}`}</p>
            </ListGroupItem>        );
            else return (<React.Fragment/>);
    });
    if (this.props.booksLoading) {
        return(
            <div className="container loading">
                <div className="row">            
                    <Loading />
                </div>
            </div>
        );
    }
    else if (this.props.booksErrMess) {
        return(
            <div className="container loading">
                <div className="row heading"> 
                    <div className="col-12">
                        <br/><br/><br/><br/>
                        <h3>{this.props.booksErrMess}</h3>
                    </div>
                </div>
            </div>
        );
    }
    else
    {
    return(
        
        <div className="container loading">
        <div className="row">
            <div className="col-12 heading">
             <h3 align="center">Search your book here : </h3>
             <Form>
        <Row form>
          <Col md={6}>
            <FormGroup>
              <Label for="name">Name of book</Label>
              <Input type="name" name="name" id="name" value={this.state.name} onChange={(e)=>{this.setState({name: e.target.value});}} placeholder="Enter name of the book" />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="author">Author</Label>
              <Input type="author" name="author" id="author" value={this.state.author}  onChange={(e)=>{this.setState({author: e.target.value});}} placeholder="Enter name of author" />
            </FormGroup>
          </Col>
        </Row> 
        <Row>
        <Col sm={6} md={2}>
            Category : {' '}
        </Col>
        </Row>
        <FormGroup check>
        <Row>
        <Col xs={6} md={3}>
          <Label check for="romance">
            <Input defaultChecked type="checkbox" onChange={this.onChange} id="romance" value="Romance" name="cat" />
            Romance 
          </Label>
        </Col>
        <Col xs={6} md={3}>
          <Label check for="fiction">
            <Input defaultChecked type="checkbox" onChange={this.onChange} id="fiction" value="Fiction" name="cat" />
            Fiction
          </Label>
          </Col>

          <Col xs={6} md={3}>
          <Label check for="Arts">
            <Input defaultChecked type="checkbox" onChange={this.onChange} id="Arts" value="Arts" name="cat" />
            Arts
          </Label>
          </Col>
          <Col xs={6} md={3}>
          <Label check for="computer">
            <Input defaultChecked type="checkbox" onChange={this.onChange} id="computer" value="Computer Science" name="cat" />
            Computer Science
          </Label>
          </Col>
          </Row>
          <Row>
        <Col xs={6} md={3}>
          <Label check for="management">
            <Input defaultChecked type="checkbox" onChange={this.onChange} id="management" value="Management" name="cat" />
            Management 
          </Label>
        </Col>
        <Col xs={6} md={3}>
          <Label check for="Physics">
            <Input defaultChecked type="checkbox" onChange={this.onChange} id="Physics" value="Physics" name="cat" />
            Physics
          </Label>
          </Col>

          <Col xs={6} md={3}>
          <Label check for="technology">
            <Input defaultChecked type="checkbox" onChange={this.onChange} id="technology" value="Technology"  name="cat" />
            Technology
          </Label>
          </Col>
          <Col xs={6} md={3}>
          <Label check for="Philosophy">
            <Input defaultChecked type="checkbox" onChange={this.onChange} id="Philosophy" value="Philosophy" name="cat" />
            Philosophy
          </Label>
          </Col>
          </Row>
          <Row>
        <Col xs={6} md={3}>
          <Label check for="Mathematics">
            <Input defaultChecked type="checkbox" onChange={this.onChange} id="Mathematics" value="Mathematics" name="cat" />
            Mathematics 
          </Label>
        </Col>
        <Col xs={6} md={3}>
          <Label check for="Chemistry">
            <Input defaultChecked type="checkbox" onChange={this.onChange} id="Chemistry" value="Chemistry" name="cat" />
            Chemistry
          </Label>
          </Col>

          <Col xs={6} md={3}>
          <Label check for="Electronics">
            <Input defaultChecked type="checkbox" onChange={this.onChange} id="Electronics" value="Electronics" name="cat" />
            Electronics
          </Label>
          </Col>
          <Col xs={6} md={3}>
          <Label check for="Language">
            <Input defaultChecked type="checkbox" onChange={this.onChange} id="Language" value="Language" name="cat" />
            Language
          </Label>
          </Col>
          </Row>
          <Row>
          <Col xs={6} md={3}>
          <Label check for="Other">
            <Input defaultChecked type="checkbox" onChange={this.onChange} id="Other" value="Other" name="cat" />
            Other
          </Label>
          </Col>
        </Row>
        </FormGroup>
        </Form>
            </div>
        </div>
        <div className="row">
        <div className="col-12">
      <br/>
      <ListGroup>
      {list}
      </ListGroup>
      </div>
      </div>
      <br/>
    </div>

        );
}
}

}

export default Search;
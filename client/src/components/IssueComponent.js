import React,{Component} from 'react';
import { Button, Form, FormGroup, Label, Input, Col,Row } from 'reactstrap';
import Loading from './LoadingComponent';


class Issue extends Component {

    constructor(props){
        super(props);
        this.state={
        isbn: '',
        roll: ''
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0)
      }

render(){
    if (this.props.booksLoading||this.props.usersLoading) {
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
    else if (this.props.usersErrMess) {
        return(
            <div className="container loading">
                <div className="row heading"> 
                    <div className="col-12">
                        <br/><br/><br/><br/>
                        <h3>{this.props.usersErrMess}</h3>
                    </div>
                </div>
            </div>
        );
    }
    else
   {
    const bookoptions= this.props.books.map((book,index)=>(<option 
    key={book.isbn}>{book.isbn}</option>));
    const defaultBook=this.props.books[0];
    // To just get list of the students (not the admins)
    let useroptions=this.props.users.filter((user)=>(!user.admin));
    const defaultUser=useroptions[0];
    useroptions= useroptions.map((user,index)=>(<option 
    key={user.roll}>{user.roll}</option>))
    if(this.state.isbn==='') {
        this.setState({isbn: defaultBook.isbn,roll: defaultUser.roll  });
    }
    return (
    <div className="container full">
    <div className="row justify-content-center heading">
    <div className="col-12">
  <h3 align="center">  Issue book</h3>
  </div>
    </div>
    <div className="row row-content justify-content-center">
    <Form onSubmit={(e) => {
        let bookid=this.props.books.filter((book)=>(book.isbn===this.state.isbn))[0]._id
        let studentid=this.props.users.filter((user)=>(user.roll===this.state.roll))[0]._id;
        this.props.postIssue(bookid,studentid);
        e.preventDefault();
    }}>

        <FormGroup row>
          <Label htmlFor="isbn"> ISBN No. of book</Label>
            <Input type="select" defaultValue={defaultBook.name} name="isbn" id="isbn" className="form-control" onInput={(e)=>{this.setState({isbn: e.target.value})}}>
                  {bookoptions}
            </Input>
        </FormGroup>
        <FormGroup row>
          <Label htmlFor="roll"> Roll No. of student </Label>
            <Input type="select" id="roll" 
                   className="form-control" onInput={(e)=>{this.setState({roll: e.target.value})}}>
                   {useroptions}
            </Input>
        </FormGroup>
        <FormGroup row>
          <Label htmlFor="name"> Name of book </Label>
             <Input type="text" id="name" name="name"
                    placeholder="Name of Book" defaultValue={defaultBook.name}
                    value={!this.state.isbn?''
                    :this.props.books.filter((book)=>(book.isbn===this.state.isbn))[0].name}
                    className="form-control" disabled/>
        </FormGroup>
        <FormGroup row>
          <Label htmlFor="author"> Authors </Label>
            <Input type="text" id="author" name="author"
                   placeholder="Name of authors" 
                   defaultValue={defaultBook.author}
                   value={!this.state.isbn?''
                   :this.props.books.filter((book)=>(book.isbn===this.state.isbn))[0].author}
                    className="form-control" disabled/>
         </FormGroup>
         <FormGroup row>
          <Label htmlFor="name_student"> Name of student </Label>
            <Input type="text" id="name_student" name="name_student"
                   placeholder="Name of student" 
                   defaultValue={defaultUser.firstname+' '+defaultUser.lastname}
                   value={!this.state.roll?''
                   :this.props.users.filter((user)=>(user.roll===this.state.roll))[0].firstname+' '+
                   this.props.users.filter((user)=>(user.roll===this.state.roll))[0].lastname}
                    className="form-control" disabled/>
         </FormGroup>
         <FormGroup row>
          <Label htmlFor="username"> Username of student </Label>
            <Input type="text" id="username" name="username"
                   placeholder="Username of student" 
                   defaultValue={defaultUser.username}
                   value={!this.state.roll?''
                   :this.props.users.filter((user)=>(user.roll===this.state.roll))[0].username}
                    className="form-control" disabled/>
         </FormGroup>
         <Row className="align-self-center">
            <Col className="text-center">
              <Button type="submit" className="bg-primary">
                            Submit
               </Button>
            </Col>
        </Row>
      </Form>
     </div>
     <br/>
    </div>
 );

}
}
}

export default Issue;
import React,{Component} from 'react';
import { Card, CardText, CardBody, CardLink,
    CardTitle, Button } from 'reactstrap';
import {Link} from 'react-router-dom';
import Loading from './LoadingComponent.js';

class Stats extends Component {

    constructor(props){
        super(props);
        this.state={
         }
        this.i=1; 
    }
    componentDidMount() {
        window.scrollTo(0, 0)
      }

render(){
    if (this.props.issues.isLoading||this.props.booksLoading||this.props.usersLoading) {
        return(
            <div className="container">
                <div className="row">            
                    <Loading />
                </div>
            </div>
        );
    }
    else if (this.props.issues.errMess) {
        return(
            <div className="container loading">
                <div className="row heading"> 
                    <div className="col-12">
                        <br/><br/><br/><br/>
                        <h3>{this.props.issues.errMess}</h3>
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
    else {

    
        return(

        <div className="container mt-6 text-center align-self-center full">
            <div className="row text-center justify-content-center heading">
            <div className="col-12">
                <h3>Stats</h3>
            </div>
            </div>
            <div className="row">
            <div className="col-12 col-md-6 col-xl-4 mt-4">
            <Card>
                <CardBody>
                    <CardTitle>
                        <h1>{this.props.books.length}</h1>
                    </CardTitle>
                    <CardText>Different books available</CardText>
                        <CardLink tag={Link} to="/books">
                            <Button color="info"><i className="fa fa-eye fa-lg"/>
                             {' '}&nbsp;View
                            </Button>           
                        </CardLink>
                </CardBody>
            </Card>
            </div>

            <div className="col-12 col-md-6 col-xl-4 mt-4">
            <Card>
                <CardBody>
                    <CardTitle>
                        <h1>{this.props.issues.issues.length}</h1>
                    </CardTitle>
                    <CardText>Books Issued</CardText>
                        <CardLink tag={Link} to="/logs">
                            <Button color="info"><i className="fa fa-eye fa-lg"/>
                             {' '}&nbsp;View
                            </Button>           
                        </CardLink>
                </CardBody>
            </Card>
            </div>
            <div className="col-12 col-md-6 col-xl-4 mt-4">
            <Card>
                <CardBody>
                    <CardTitle>
                    <h1>
                    {this.props.issues.issues.filter((issue)=>(!issue.returned)).length}
                    </h1>
                    </CardTitle>
                    <CardText>Books not yet returned</CardText>
                        <CardLink>
                            <Button tag={Link} to="/return" color="info"><i className="fa fa-eye fa-lg"/>
                             {' '}&nbsp;View
                            </Button>           
                        </CardLink>
                </CardBody>
            </Card>
            </div>
            <div className="col-12 col-md-6 col-xl-4 mt-4">
            <Card>
                <CardBody>
                    <CardTitle>
                        <h1>{this.props.users.filter((user)=>(!user.admin)).length}</h1>
                    </CardTitle>
                    <CardText>Students registered</CardText>
                        <CardLink tag={Link} to="/list_students">
                            <Button color="info"><i className="fa fa-eye fa-lg"/>
                             {' '}&nbsp;View
                            </Button>           
                        </CardLink>
                </CardBody>
            </Card>
            </div>
            <div className="col-12 col-md-6 col-xl-4 mt-4">
            <Card>
                <CardBody>
                    <CardTitle>
                        <h1>{this.props.users.filter((user)=>(user.admin)).length}</h1>
                    </CardTitle>
                    <CardText>Administrators in-charge</CardText>
                        <CardLink tag={Link} to="/list_admins">
                            <Button color="info"><i className="fa fa-eye fa-lg"/>
                             {' '}&nbsp;View
                            </Button>           
                        </CardLink>
                </CardBody>
            </Card>
            </div>
            </div>
            
            <br/>
            </div>
          );
        }
    }

}

export default Stats;
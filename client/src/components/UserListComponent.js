import React,{Component} from 'react';
import { Table } from 'reactstrap';
import {Link} from 'react-router-dom';
import Loading from './LoadingComponent.js';

function RenderUser ({user,i}) {
    return (
            <React.Fragment>
            <td>
            {i}
            </td>
            <td>
            <Link to={`/users/${user._id}`}>
            {user.firstname+' '+ user.lastname}
            </Link>
            </td>
            <td>
            {user.roll}
            </td>
            <td>
            {user.username}
            </td>
            <td>
            {user.email}
            </td>
            </React.Fragment>
       );
}

class UserList extends Component {

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

    if (this.props.usersLoading) {
        return(
            <div className="container">
                <div className="row">            
                    <Loading />
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
                        <h3>{this.props.errMess}</h3>
                    </div>
                </div>
            </div>
        );
    }
    else if(this.props.users.length===0){
        return (
            <div className="container loading">
                <div className="row heading"> 
                    <div className="col-12 text-center">
                        <br/><br/><br/><br/>
                        <h4>{'No users found'}</h4> 
                           </div>
                </div>
            </div>
        );
    }
    else {
        const list = this.props.users.map((user) => {
            return (
                    <tr key={user._id}>
                        <RenderUser user={user} 
                                     i={this.i++}
                        />
                    </tr>
            );
        });
    
        return(

        <div className="container mt-6 text-center align-self-center full">
            <div className="row text-center justify-content-center">
            <div className="col-12 heading">
                <h3>List of {this.props.users[0].admin?' admins in-charge': ' students registered'}</h3>
                <Table striped bordered hover responsive>
        <thead>
           <tr>
            <th>S.No.</th>
            <th>Name of {this.props.users[0].admin?' admin': ' student'}</th>
            <th>{this.props.users[0].admin?' Admin Id': ' Roll No.'}</th>
            <th>Username</th>
            <th>Email</th>
            </tr>
        </thead>
        <tbody>
            {list}
        </tbody>
        </Table>
            <br/>
            <br/>
            </div>
            </div>
            </div>
        );
        }
    }

}

export default UserList;
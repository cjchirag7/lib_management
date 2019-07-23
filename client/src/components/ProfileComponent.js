import React,{Component} from 'react';
import {Card,CardBody,CardHeader,Label,CardText,Button,Modal,ModalBody,ModalHeader,FormGroup} from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);
const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);
const matchcreds = (original) => (val) =>  (val===original);

class Profile extends Component {

    constructor(props){
        super(props);
        this.state={
            isEditModalOpen: false,
            isPasswordModalOpen: false
        }
        this.toggleEditModal=this.toggleEditModal.bind(this);
        this.togglePasswordModal=this.togglePasswordModal.bind(this);
    }

    componentDidMount() {
        window.scrollTo(0, 0)
      }

    togglePasswordModal(){
        this.setState({
            isPasswordModalOpen: !this.state.isPasswordModalOpen
        });
    }

    toggleEditModal(){
            this.setState({isEditModalOpen: !this.state.isEditModalOpen});
          }
      

render(){
    if(this.props.auth.userinfo===null){
        return (
            <div className="row heading">
                Failed to fetch. Please reload the page
            </div>
        )
    }
    return(

        <div className="container mt-6 home text-center align-self-center">
            <div className="row text-center justify-content-center">
            
            <Card className="heading">
                
        <CardHeader><h3>My Profile</h3></CardHeader>
        <CardBody>
          <CardText>
          <h5> First Name : {'          '+this.props.auth.userinfo.firstname}</h5>
          <h5> Last Name : {'          '+this.props.auth.userinfo.lastname}</h5>
          <h5> {(this.props.auth.userinfo.admin)?'Admin Id : ':'Roll No.'} : {'          '+this.props.auth.userinfo.roll}</h5>
          <h5> Email : {'          '+this.props.auth.userinfo.email}</h5>
          </CardText>
          
          <Button color="info" onClick={this.toggleEditModal}>Edit &nbsp;{'   '}<span className="fa fa-pencil"/></Button>
        {' '}
{this.props.auth.userinfo.admin?<div/>:        <Button color="info" onClick={this.togglePasswordModal}>Change Password &nbsp;{'   '}<span className="fa fa-key"/></Button>}

        </CardBody>
          </Card>
            </div>
            <Modal isOpen={this.state.isEditModalOpen} toggle={this.toggleEditModal}>
                     <ModalHeader toggle={this.toggleEditModal}>
                         Edit Profile
                     </ModalHeader>
                     <ModalBody>
                     <LocalForm model="user" onSubmit={(values) => {
                               this.toggleEditModal();
                               this.props.editUser(this.props.auth.userinfo._id, values.firstname, 
                                values.lastname, values.roll, values.email);     
                                 }}>
                            <FormGroup>
                                <Label htmlFor="firstname">First Name</Label>
                                <Control.text model=".firstname" id="firstname" name="firstname" 
                            className="form-control" defaultValue={this.props.auth.userinfo.firstname}
                             placeholder="firstname" 
                             validators={{required,minLength: minLength(3),maxLength:maxLength(20)}} />
                            <Errors className="text-danger" model=".firstname" show="touched" messages={{required: 'Required',
                            minLength: ' Must be greater than 2 characters', maxLength:' Must be 20 characters or less'}}/>
                            </FormGroup>
                            <FormGroup>    
                                 <Label htmlFor="lastname">Last Name</Label>
                                <Control.text model=".lastname" id="lastname" name="lastname" 
                            className="form-control"  defaultValue={this.props.auth.userinfo.lastname}
                            placeholder="lastname" validators={{required,minLength: minLength(3),maxLength:maxLength(20)}} />
                            <Errors className="text-danger" model=".lastname" show="touched" messages={{required: 'Required',
                            minLength: ' Must be greater than 2 characters', maxLength:' Must be 20 characters or less'}}/>
                            </FormGroup>
                            <FormGroup>    
                                 <Label htmlFor="roll">Roll No.</Label>
                                <Control.text model=".roll" id="roll" name="roll" 
                            className="form-control"  defaultValue={this.props.auth.userinfo.roll}
                            placeholder="roll" validators={{required,minLength: minLength(3),maxLength:maxLength(12)}} />
                            <Errors className="text-danger" model=".roll" show="touched" messages={{required: 'Required',
                            minLength: ' Must be greater than 2 characters', maxLength:' Must be 12 characters or less'}}/>
                            </FormGroup>
                            <FormGroup>    
                                 <Label htmlFor="email">E-mail</Label>
                                <Control.text model=".email" id="email" name="email"
                                 defaultValue={this.props.auth.userinfo.email} 
                            className="form-control" placeholder="email" validators={{required,validEmail}} />
                            <Errors className="text-danger" model=".email" show="touched" messages={{required: 'Required',
                            validEmail: ' Enter a valid email'}}/>
                            </FormGroup>
                            <Button type="submit" value="submit" color="primary" >Submit</Button>
                        </LocalForm>
                     </ModalBody>
               
          </Modal>

          <Modal isOpen={this.state.isPasswordModalOpen} toggle={this.togglePasswordModal}>
                     <ModalHeader toggle={this.togglePasswordModal}>
                         Change Password
                     </ModalHeader>
                     <ModalBody>
                     <LocalForm model="passwordform" onSubmit={(values) => {
                         if(values.newpassword===values.confirm){
                               this.togglePasswordModal();
                               this.props.editPassword(this.props.auth.userinfo._id, this.props.auth.user.username, 
                                values.newpassword);     
                               }
                        else {
                            alert("Your passwords didn't match. Please try again");
                        }
                                 }}>
                            <FormGroup>
                            <Label htmlFor="password">Current Password</Label>
                                <Control.password model=".password" id="password" name="password" 
                            className="form-control" placeholder="password" validators={{required,minLength: minLength(6),maxLength:maxLength(20),
                            matchcreds: matchcreds(this.props.auth.user.password)}} />
                            <Errors className="text-danger" model=".password" show="touched" messages={{required: 'Required',
                            minLength: ' Must be greater than 5 characters', maxLength:' Must be 20 characters or less',
                            matchcreds: ' Enter the correct password'}}/>
                            </FormGroup>

                            <FormGroup>
                            <Label htmlFor="newpassword">New password</Label>
                                <Control.password model=".newpassword" id="newpassword" name="newpassword" 
                            className="form-control" placeholder="New Password" validators={{required,minLength: minLength(6),maxLength:maxLength(20)
                            }}  />
                            <Errors className="text-danger" model=".newpassword" show="touched" messages={{required: 'Required',
                            minLength: ' Must be greater than 5 characters', maxLength:' Must be 20 characters or less'
                      }}/>
                            </FormGroup>
                            
                            <FormGroup>
                            <Label htmlFor="confirm">Confirm Password</Label>
                                <Control.password model=".confirm" id="confirm" name="confirm" 
                            className="form-control"
                            placeholder="Re-enter the new password" validators={{required,minLength: minLength(6),maxLength:maxLength(20)
                                 } } />
                            <Errors className="text-danger" model=".confirm" show="touched" messages={{required: 'Required',
                            minLength: ' Must be greater than 5 characters', maxLength:' Must be 20 characters or less'
                       }}/>
                            </FormGroup>
                            
                            <Button type="submit" value="submit" color="primary" >Submit</Button>
                        </LocalForm>
                     </ModalBody>               
          </Modal>
            </div>
        );
}

}

export default Profile;
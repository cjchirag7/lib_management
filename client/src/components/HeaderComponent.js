import React,{Component} from 'react';
import {Navbar, Form, FormGroup, Label, Input, Nav, NavbarToggler,Collapse,NavItem, NavbarBrand, Modal, ModalBody, ModalHeader, Button} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { Control, LocalForm, Errors  } from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);
const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);


  function Registerer(props){
    if(props.isSignedIn===false)
    return (
      <React.Fragment>
          &nbsp;
      <Button color="primary" outline onClick={props.toggleRegister}>                    
     <span className="fa fa-user-plus fa-lg"></span> Register
     </Button>
      </React.Fragment>
    );
    else return(
      <React.Fragment>
      </React.Fragment>
    );
  }

  
class Header extends Component{

    constructor(props){
        super(props);
        this.state={
         isNavOpen: false,
         isModalOpen: false,
         isRegisterOpen: false
           }
        this.toggleModal=this.toggleModal.bind(this);
        this.toggleNav=this.toggleNav.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.toggleRegister=this.toggleRegister.bind(this);
    }
    toggleNav(){
        this.setState({
            isNavOpen: !this.state.isNavOpen
        });
    }

    toggleRegister(event){
      this.setState({
        isRegisterOpen: !this.state.isRegisterOpen
      });

    }

    handleLogin(event) {
      this.toggleModal();
      this.props.loginUser({username: this.username.value, password: this.password.value});
      event.preventDefault();

  }

  handleLogout() {
      this.props.logoutUser();
  }
    toggleModal() {
        this.setState({
          isModalOpen: !this.state.isModalOpen
        });
      }

    render(){
        return (
            <React.Fragment>
                 <Navbar color="dark" dark expand="md" fixed="top">
                    <div className="container">
                     <NavbarToggler onClick={this.toggleNav}></NavbarToggler>
                     <NavbarBrand className="mr-auto text-primary" href="/home">
                     Central Library
                     </NavbarBrand>
                     <Collapse isOpen={this.state.isNavOpen} navbar>
                     <Nav navbar>
                        <NavItem className="ml-2">
                            <NavLink className="nav-link text-primary" to="/home">
                               <span className="fa fa-home fa-lg"/> Home
                           </NavLink>
                        </NavItem>
                        <NavItem className="ml-2">
                            <NavLink className="nav-link text-primary" to="/books">
                                <span className="fa fa-book fa-lg"/> Books
                            </NavLink>
                        </NavItem>
                        <NavItem className="ml-2">
                            <NavLink className="nav-link text-primary" to="/search">
                                <span className="fa fa-search fa-lg"/> Search
                            </NavLink>
                        </NavItem>
                     </Nav>
                     <Nav className="ml-auto" navbar>
                     <NavItem>
                                    { !this.props.auth.isAuthenticated ?
                        <Button outline color="primary" onClick={this.toggleModal}>
                                            <span className="fa fa-sign-in fa-lg"></span> Login
                                            {this.props.auth.isLoading ?
                                                <span className="fa fa-spinner fa-pulse fa-fw"></span>
                                                : null
                                            }
                                        </Button>
                                        :
                                        <div>
                                        <div className="navbar-text mr-3">{this.props.auth.user.username}</div>
                                        <Button outline color="primary" onClick={this.handleLogout}>
                                            <span className="fa fa-sign-out fa-lg"></span> Logout
                                            {this.props.auth.isLoading ?
                                                <span className="fa fa-spinner fa-pulse fa-fw"></span>
                                                : null
                                            }
                                        </Button>
                                        </div>
                                    }


                    <Registerer isSignedIn={this.props.auth.isAuthenticated} toggleRegister={()=>{this.toggleRegister()}}/>
                     </NavItem>
                      </Nav>
                     </Collapse>
                    </div>
                 </Navbar>
                 <Modal isOpen={!this.props.auth.isAuthenticated&&this.state.isModalOpen} toggle={this.toggleModal}>
                     <ModalHeader toggle={this.toggleModal}>
                         Sign In
                     </ModalHeader>
                     <ModalBody>
                        <Form onSubmit={this.handleLogin}>
                            <FormGroup>
                                <Label htmlFor="username">Username</Label>
                                <Input type="text" id="username" name="username"
                                    innerRef={(input) => this.username = input} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="password">Password</Label>
                                <Input type="password" id="password" name="password"
                                    innerRef={(input) => this.password = input}  />
                            </FormGroup>
                            <Button type="submit" value="submit" color="primary">Login</Button>
                        </Form>
                    </ModalBody>
                     </Modal>
                 <Modal isOpen={this.state.isRegisterOpen} toggle={this.toggleRegister}>
                     <ModalHeader toggle={this.toggleRegister}>
                         Register 
                     </ModalHeader>
                     <ModalBody>
                     <LocalForm model="user" onSubmit={(values) => {
                   /*      if((this.username.value.trim()=="")||(this.password.value.trim()=="")
                         ||(this.roll.value.trim()=="")||(this.email.value.trim()=="")
                         ||(this.firstname.value.trim()=="")||(this.lastname.value.trim()==""))
                         {
                             alert('Fill all the required * fields');
                         }
                         else if(this.email.value.trim)
                        */
                           this.toggleRegister();
                            this.props.registerUser({
                              username: values.username,
                               password: values.password,
                               email: values.email,
                               roll: values.roll,
                               firstname: values.firstname,
                               lastname: values.lastname });
                              }}>
                            <FormGroup>
                                <Label htmlFor="username">Username</Label>
                                <Control.text model=".username" id="username" name="username" 
                            className="form-control" placeholder="Username" validators={{required,minLength: minLength(3),maxLength:maxLength(20)}} />
                            <Errors className="text-danger" model=".username" show="touched" messages={{required: 'Required',
                            minLength: ' Must be greater than 2 characters', maxLength:' Must be 20 characters or less'}}/>
                            </FormGroup>
                            <FormGroup>
                            <Label htmlFor="password">Password</Label>
                                <Control.password model=".password" id="password" name="password" 
                            className="form-control" placeholder="password" validators={{required,minLength: minLength(6),maxLength:maxLength(20)}} />
                            <Errors className="text-danger" model=".password" show="touched" messages={{required: 'Required',
                            minLength: ' Must be greater than 5 characters', maxLength:' Must be 20 characters or less'}}/>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="firstname">First Name</Label>
                                <Control.text model=".firstname" id="firstname" name="firstname" 
                            className="form-control" placeholder="firstname" validators={{required,minLength: minLength(3),maxLength:maxLength(20)}} />
                            <Errors className="text-danger" model=".firstname" show="touched" messages={{required: 'Required',
                            minLength: ' Must be greater than 2 characters', maxLength:' Must be 20 characters or less'}}/>
                            </FormGroup>
                            <FormGroup>    
                                 <Label htmlFor="lastname">Last Name</Label>
                                <Control.text model=".lastname" id="lastname" name="lastname" 
                            className="form-control" placeholder="lastname" validators={{required,minLength: minLength(3),maxLength:maxLength(20)}} />
                            <Errors className="text-danger" model=".lastname" show="touched" messages={{required: 'Required',
                            minLength: ' Must be greater than 2 characters', maxLength:' Must be 20 characters or less'}}/>
                            </FormGroup>
                            <FormGroup>    
                                 <Label htmlFor="roll">Roll No.</Label>
                                <Control.text model=".roll" id="roll" name="roll" 
                            className="form-control" placeholder="roll" validators={{required,minLength: minLength(3),maxLength:maxLength(12)}} />
                            <Errors className="text-danger" model=".roll" show="touched" messages={{required: 'Required',
                            minLength: ' Must be greater than 2 characters', maxLength:' Must be 12 characters or less'}}/>
                            </FormGroup>
                            <FormGroup>    
                                 <Label htmlFor="email">E-mail</Label>
                                <Control.text model=".email" id="email" name="email" 
                            className="form-control" placeholder="email" validators={{required,validEmail}} />
                            <Errors className="text-danger" model=".email" show="touched" messages={{required: 'Required',
                            validEmail: ' Enter a valid email'}}/>
                            </FormGroup>
                            <Button type="submit" value="submit" color="primary">Sign Up</Button>
                        </LocalForm>
                     </ModalBody>
                 </Modal>
                </React.Fragment>
        );
    }
}

export default Header;
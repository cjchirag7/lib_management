import React,{Component} from 'react';
import {Navbar, Nav, NavbarToggler,Collapse,NavItem, NavbarBrand, Modal, ModalBody, ModalHeader, Button} from 'reactstrap';
import { NavLink } from 'react-router-dom';

function Logger(props){
    if(props.isSignedIn===false)
    return (
      <React.Fragment>
      <Button color="primary" outline onClick={props.signIn}>                    
     <span className="fa fa-sign-in fa-lg"></span> Sign In
     </Button>
      </React.Fragment>
    );
    else return(
      <React.Fragment>
        <Button color="primary" outline onClick={props.signOut}>                     
     <span className="fa fa-sign-out fa-lg"></span> Log out
     </Button>
      </React.Fragment>
    );
  }

  function Registerer(props){
    if(props.isSignedIn===false)
    return (
      <React.Fragment>
          &nbsp;
      <Button color="primary" outline onClick={props.signIn}>                    
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
         isModalOpen: false
           }
        this.toggleModal=this.toggleModal.bind(this);
        this.toggleNav=this.toggleNav.bind(this);
    }
    toggleNav(){
        this.setState({
            isNavOpen: !this.state.isNavOpen
        });
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
                     <span className="fa fa-home fa-lg"/> Home
                     </NavbarBrand>
                     <Collapse isOpen={this.state.isNavOpen} navbar>
                     <Nav navbar>
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
                     <NavItem className="ml-2 mb-1">
                     <Logger isSignedIn={this.props.isSignedIn} signIn={()=>{this.toggleModal()}} />
                     </NavItem> 
                     <NavItem className="ml-2 mb-1">
                    <Registerer isSignedIn={this.props.isSignedIn} register={()=>{this.toggleModal()}}/>
                     </NavItem>
                      </Nav>
                     </Collapse>
                    </div>
                 </Navbar>
                 <Modal isOpen={!this.props.isSignedIn&&this.state.isModalOpen} toggle={this.toggleModal}>
                     <ModalHeader toggle={this.toggleModal}>
                         Sign In
                     </ModalHeader>
                     <ModalBody>
                     </ModalBody>
                 </Modal>
                </React.Fragment>
        );
    }
}

export default Header;
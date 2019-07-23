import React,{Component} from 'react';

class Home extends Component {

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
        <div className="container mt-4 home text-center align-self-center">
        <br/><br/><br/>
            <div className="row mt-3 darkbg text-center justify-content-center">
            <h1 align="center"> Welcome to the Central Library</h1>
            </div>
            <div className="row darkbg">

        <br/><br/><br/>
        <br/><br/><br/>
            <h6>
            The Central Library of Indian Institute of Technology (Indian School of Mines) Dhanbad is the heart of the institute providing direct academic and research supports to all departments.

            The Central Library is an automated library in terms of records organisation and management of all its different sections, search and discovery, information retrieval and service delivery. The whole library operations run on LIBSYS integrated library management software.
            <br/><br/> </h6>
            </div>
            <div className="row darkbg justify-content-center">
            <table>
    <tr> <th colspan="2"><h6>Library Timings</h6></th> </tr>
    <tr> <td><h6>Opening Time</h6> </td> <td> <h6>9.00 A.M.</h6></td></tr>
    <tr> <td>Closing Time </td> <td> 9.00 P.M.</td></tr>
            </table>
            <br/>
            <br/>
                </div>
                <br/><br/>
                <br/><br/><br/>
            </div>
        );
}

}

export default Home;
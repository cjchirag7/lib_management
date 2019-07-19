import React,{Component} from 'react';

class Footer extends Component {

    constructor(props){
        super(props);
        this.state={
        }
    }

render(){
    return(
    <div className="footer">
    <div className="container">
        <div className="row justify-content-center">             
                <div className="col-auto">
                    <br/>
                    <p>© Copyright 2019 Chirag Jain</p>
                </div>
            </div>
        </div>
         </div>
    );
}

}

export default Footer;
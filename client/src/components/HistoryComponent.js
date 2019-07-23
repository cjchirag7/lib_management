import React,{Component} from 'react';
import { Table } from 'reactstrap';
import {Link} from 'react-router-dom';
import Loading from './LoadingComponent.js';

const fineRate=1;
let totalFine=0;
const allowedDays=30;
function RenderIssue ({issue,i}) {
    const dates=[];
    const today= new Date();
    dates.push(today);
    const issueDate=new Date(Date.parse(issue.createdAt));
    const deadline = new Date( Date.parse(issue.createdAt));
    deadline.setDate(deadline.getDate()+30);
    dates.push(deadline);
    const returnDate=issue.returned?new Date(Date.parse((issue.updatedAt))):(new Date(Math.min.apply(null,dates)));
    let fine=0;
      if(((returnDate.getTime()-issueDate.getTime())/(1000 * 60 * 60 * 24))>allowedDays)
      {
        fine=Math.floor((returnDate.getTime()-issueDate.getTime())/(1000 * 60 * 60 * 24))*fineRate;
      }
   totalFine+=fine;
    return (
            <React.Fragment>
            <td>
            {i}
            </td>
            <td>
            <Link to={`/books/${issue.book._id}`}>
            {issue.book.name}
            </Link>
            </td>
            <td>
            {issue.book.isbn}
            </td>
            <td>
                {new Intl.DateTimeFormat('en-US',{year: 'numeric', month: 'short', day: '2-digit'}).format(new Date( Date.parse(issue.createdAt)))}
            </td>
            <td>
                {new Intl.DateTimeFormat('en-US',{year: 'numeric', month: 'short', day: '2-digit'}).format(deadline)}
            </td>
            <td>
                {
        issue.returned?('Returned on '+(new Intl.DateTimeFormat('en-US',{year: 'numeric', month: 'short', day: '2-digit'}).format(new Date( Date.parse(returnDate)))))                    
               :('Not returned yet')
                }
            </td>
            <td>
                {
                    fine
                }
            </td>
            </React.Fragment>
       );
}

class History extends Component {

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

    if (this.props.issues.isLoading) {
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
                        <h3>{this.props.errMess}</h3>
                    </div>
                </div>
            </div>
        );
    }
    else if(this.props.issues.issues.length===0){
        return (
            <div className="container loading">
                <div className="row heading"> 
                    <div className="col-12 text-center">
                        <br/><br/><br/><br/>
                        <h4>{'You have not issued any books.'}</h4> 
                        <h4>{'Request admin to issue a book'}</h4>
                    </div>
                </div>
            </div>
        );
    }
    else {
        const list = this.props.issues.issues.map((issue) => {
            return (
                    <tr key={issue._id}>
                        <RenderIssue issue={issue} 
                                     i={this.i++}
                        />
                    </tr>
            );
        });
    
        return(

        <div className="container mt-6 text-center align-self-center full">
            <div className="row text-center justify-content-center">
            <div className="col-12 heading">
                <h3>Issue History</h3>
                <Table striped bordered hover responsive>
        <thead>
           <tr>
            <th>S.No.</th>
            <th>Name of Book</th>
            <th>ISBN number</th>
            <th>Issue Date</th>
            <th>Return Deadline</th>
            <th>Return status</th> 
            <th>Fine (in Rs.)</th> 
           </tr>
        </thead>
        <tbody>
            {list}
        </tbody>
        </Table>
            <br/>
            <h6> Total Fine due (if all pending books are returned today) : Rs. {totalFine} </h6>
            <br/>
            </div>
            </div>
            </div>
        );
        }
    }

}

export default History;
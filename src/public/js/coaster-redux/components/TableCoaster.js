import React from 'react'
import $ from 'jquery'

class TableCoaster extends React.Component{

  startBot = () => {
    this.props.onStartClick({
      'start':true
    });
  }

	render(){
      const { items } = this.props;
      const listNode = items.map((items,idx) => { 
        return(
          <tr key={idx}> 
            <th scope="row">Yanuar</th> 
            <td style={{width:'100px'}}><a href="">{items.urlSearch}</a></td> 
            <td>{items.profileVisit.length} views</td> 
            <td>{items.totalSearch}</td> 
            <td>0 Leads</td>
            <td><a onClick={this.startBot}>Start</a></td>
            <td><button>View Result</button></td>
          </tr> 
        )
      });

        return(
          <table className="table">
            <thead> 
              <tr> 
                <th>Coaster Name</th> 
                <th>Search Link</th> 
                <th>Profile Visits</th> 
                <th>Total In Search</th> 
                <th>Leads</th> 
                <th>Pause/Delete</th> 
                <th>Results</th>
              </tr> 
            </thead> 
            <tbody> 
              {listNode}
            </tbody> 
          </table>
        )
	}
}


export default TableCoaster;


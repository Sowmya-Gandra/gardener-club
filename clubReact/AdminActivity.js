import React from "react";
import activities from './activities.json';
import {render} from "react-dom";
class AdminActivities extends React.Component{
    constructor(props){
        super(props);
        this.state = {activities: activities, addName: "",
        addDate: ""};

        this.delActivity = this.delActivity.bind(this);
    }

    componentDidMount() {
      let that = this;
      fetch("./activities")
      .then(function (response) {
      console.log(
      "Request status code: ",
      response.statusText,
      response.status,
      response.type
      );
      if (response.ok) {
      return response.json(); 
      } else {
      let info = `Status code: ${response.status}, ${response.statusText}`;
      console.log(response);
      return Promise.reject(info); 
      }
    })
    .then(function (activities) {
    that.setState({ activities: activities });
    console.log(activities);
    })
    .catch(function (info) {
    console.log(info);
    });
    }

     nameHandler(event) {

       this.setState({addName: event.target.value});
      }
     dateHandler(event) {
      this.setState({addDate: event.target.value});
      }
      addActivity() {

        let that = this;
        console.log("Button pressed");
        fetch("./activities", {
        method: "POST",
        headers: {
        "Content-type": "application/json",
        },
        body: JSON.stringify({
        name: that.state.addName,
        dates: [that.state.addDate],
        }),
        })
        .then(function (response) {
        console.log(
        "Request status code: ",
        response.statusText,
        response.status,
        response.type
        );
        if (response.ok) {
        return response.json(); // a promise
        } else {
        let info = `Status code: ${response.status}, ${response.statusText}`;
        console.log(response);
        return Promise.reject(info); //rejected promise!
      }
      })
      .then(function (activities) {
        that.setState({
        activities: activities,
        });
        })
      .catch(function (info) {
      console.log(info);
        });
        }
      }

      delActivity(index) {
        console.log(`Id to delete ${this.state.activities[index]._id}`);
        let that = this;
        console.log("Button pressed");
        fetch(`./activities/${this.state.activities[index]._id}`, {
        method: "DELETE",
        })
        .then(function (response) {
        console.log(
        "Request status code: ",
        response.statusText,
        response.status,
        response.type
        );
        if (response.ok) {
        return response.json(); 
      } else {
        let info = `Status code: ${response.status}, ${response.statusText}`;
        console.log(response);
        return Promise.reject(info); //rejected promise!
        }
        })
        .then(function (activities) {
        that.setState({
        activities: activities,
        });
        })
        .catch(function (info) {
        console.log(info);
        });
        }
        
          render() {
            return (<>
                      <div className="addActivityGrid">

                      <table className="activity-form" >
                      <thead>
<tr><th></th><th></th></tr>
</thead>
<tbody>


            <tr>
              <td>              <label>Name</label></td>
              <td>                        <input type="text"
                        onChange={this.nameHandler.bind(this)}
                        value={this.state.addName}/></td>

            </tr>
            <tr>
              <td>                        <label>Date(s)</label></td>
              <td>
                        <input type="text" value={this.state.addDate}
                        onChange={this.dateHandler.bind(this)}
                        /></td>

            </tr>
            <tr>
              <td>                      </td>
              <td>
              <button onClick={this.addActivity.bind(this)}>Add</button></td>

            </tr>   
    
</tbody>
          </table>
          


                      
                    </div>

                     <table >
            <tr>
              <th></th>
              <th>Name </th>
              <th>Date</th>
            </tr>


            {this.state.activities.map((act, i) => (
        

    
         <tr key={"act" + i}><td>
         <button onClick={this.delActivity.bind(this, i)} >Delete</button>
         </td><td>{act.name}</td>
         <td>{act.dates}</td> 
     </tr>
         
         
            ))}



          </table>
     </>);
        
        }
    


export default AdminActivities;
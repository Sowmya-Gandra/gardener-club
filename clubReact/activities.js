import React from "react";
import { useState, useEffect } from 'react';
import ReactDOM from "react-dom";
import neptune from "./images/flowers.jpeg";
import tomato from "./images/Tomato.jpeg";
import another from "./images/Tomato1.jpeg"
import ActivitiesData from "./activities.json"; 
class Activities extends React.Component {
  constructor(props) {
  super(props);
  this.state = {activities:[]};
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
render(){
  let activityItems = ActivitiesData.map((activity, i)=>{
		return (<tr  key={"choice"+i}>
				<td>{activity.name}</td>
				<td>{activity.dates}</td>			
        </tr>);
	});
  
    
    return (<section>
        <div>
        <h1>Events and Publications</h1>
        <h2>Daily Events</h2>
        <p>Posting about gardening tips and new advanced technologies ,writing articles and collecting journals related to naturefreindly farming.Uploading                      	vedios about gardening.</p>
                <img src={neptune}
                      width="250"
                      height="450" />
                <img src={tomato}
                     width="252"
                     height="450" />
                <img src={another}
                     width="252"
                     height="450" />     
                  <div className="activityTable">
                       <h2>Club Activities</h2>
                       <table>
                          <thead>
                              <tr>
                                  <th>Name</th>
                                  <th>Date(s)</th>
                              </tr>
                          </thead>  
                          <tbody id="NewTable">{activityItems}</tbody>            
                        </table>
                   </div>
                 <p> Work in Progress .....</p>      
        <footer>© 2020 Fremont Gardening Club</footer>
         </div>
         </section>);
}
}
export default Activities;
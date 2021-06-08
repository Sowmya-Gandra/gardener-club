import React from "react";
import ReactDOM from "react-dom";

function Membership(Props){
  return (<section>
            {<div>
              <h1>Membership</h1>
              <h2>Requirements</h2>
                    <p> Curious to participate in the activities and share experiences with fellow members of the club </p>
                    <ul>
                         <li> Completely free </li>
                         <li> Attend meetings via zoom every weekend</li>
                         <li> Upload your garden stories</li>
                    </ul>
              <h1>Application:</h1>
                 <form action="" method="get" className="credentials">
                 <div className="credentials">
                    <label htmlFor ="name">Name:</label>
                    <input type="text"  name="Name"  id ="Name"  placeholder="firstname"  required minLength="1"  maxLength="25"/>
                    <label htmlFor ="email">Email: </label>
                    <input type="email"  name="email"  id="email"  placeholder="email"  required minLength="1"  maxLength="50"/>
                    <label htmlFor ="password">Password: </label>
                    <input type="password" name="password" id="password" placeholder="password" required minLength="1" maxLength="15" />
                    <label htmlFor ="survey">Know about us? </label>
                    <select id="survey" > 
                              <option>--select any--</option> 
                              <option>Facebook</option>
                               <option>Advertisements</option>
                              <option>Friends</option>         
                     </select>
                    <label htmlFor ="comments"> Comments:</label>
                    <textarea name="comments" rows="8" cols="20" id="comments"></textarea>
                    <button id="submit" >signup</button>
                </div></form>
         
            <footer> © 2020 Fremont Gardening Club</footer>
            </div>}
            
         </section> );

}

export default Membership;
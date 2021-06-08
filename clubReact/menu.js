 import React from "react";
 import ReactDOM from "react-dom";
 import AdminActivity from "./AdminActivity";
 let guest = (show,displayPage) =>{ return (<ul id ="naviclist">
                   <li className ={show=="home"?"menunav":""}><a onClick={() => displayPage('home')}>Home</a></li>
                   <li className ={show=="login"?"menunav":""}> <a onClick={() => displayPage('login')}>Login</a></li>
                   <li className ={show=="activities"?"menunav":""}><a onClick={() => displayPage('activities')}>Activities</a></li>
                   <li className ={show=="membership"?"menunav":""}><a onClick={() => displayPage('membership')}>Membership</a></li>
                </ul>);};

let user =(show,displayPage,logout)=>{return (<ul id ="naviclist">
                   <li className ={show=="home"?"menunav":""}><a onClick={() => displayPage('home')}>Home</a></li>
                   <li className ={show=="logout"?"menunav":""}> <a onClick= {logout}>Logout</a></li>
                   <li className ={show=="activities"?"menunav":""}><a onClick={() => displayPage('activities')}>Activities</a></li>
                  
                </ul>);};

let admin= (show,displayPage,logout)=>{return (<ul id ="naviclist">
                   <li className ={show=="home"?"menunav":""}><a onClick={() => displayPage('home')}>Home</a></li>
                   <li className ={show=="logout"?"menunav":""}> <a onClick= {logout}>Logout</a></li>
                   <li className ={show=="activities"?"menunav":""}> <a onClick={() => displayPage('activities')}>Activities</a></li>
                   <li className ={show=="AdminActivity"?"menunav":""}><a onClick={() => displayPage('AdminActivity')}>Manage Activities</a></li>
                </ul>);};

 function Menu(props){
    let{role,show,displayPage,logout}=props;
    let menu=guest(show,displayPage);
    if(props.role=="guest") menu=guest(show,displayPage);
    else if(props.role=="user") menu=user(show,displayPage,logot);
    else if(props.role=="admin") menu=admin(show,displayPage,logout);
        return (
            <div>
               <nav >
                {menu}
               </nav>
             </div>
        )  ;         
    }

export default Menu;
import React from "react";
import ReactDOM from "react-dom";
import Menu from "./menu";
import Home from "./home";
import Login from "./login";
import Activities from "./activities";
import Membership from "./membership";
import activities from './activities.json';
import AdminActivity from "./AdminActivity";
const testBody = { "idx": 1 };

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { role: "admin", show: "home", serverUrl:"http://localhost:3053" };
    }

    displayPage(show) {
        this.setState({ show });
    }
    login(e,p) {
        const requestLogin = {
            method: 'POST',
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify({email:e,password:p})
        };
        fetch(this.state.serverUrl
            +'/login',requestLogin)
        .then(res => res.json())
        .then(
            (result) => {
                console.log("successfully loggedin");
            })
        .catch((error) => {
               console.error('Error:', error);
            });
        }

    logout() {
        const requestOptions = {
            method: 'GET'
        };
        fetch(this.state.serverUrl +
        "/logout", requestOptions)
            .then(res => res.json())
            .then(
                (result) => {
                    console.log("successfully logged out");
                }
            )
         }
    
    deleteactivity() {
        fetch(this.state.serverUrl +'/activity ', {
        method: 'DELETE',
        body:    JSON.stringify(testBody),
        headers: { 'Content-Type': 'application/json' },
    })
    .then(res => res.json())
    .then(json => console.log(json))
    }

    render() {
        let content = <Home />;
        let { role, show } = this.state;
        if (show == 'home') content = <Home />;
        else if (show == 'activities') content = <Activities serverUrl={this.state.serverUrl} events={activities} update />;
        else if (show == 'login') content = <Login login={this.login.bind(this)}/>;
        else if (show == 'membership') content = <Membership />;
        else if (show == 'AdminActivity') content = <AdminActivity />;

        return (
            <>
                <Menu role={role} show={show} displayPage={this.displayPage.bind(this)} logout={this.logout.bind(this)} />
                {content}
            </>
        )
    }

}

ReactDOM.render(<App />, document.getElementById("root"));
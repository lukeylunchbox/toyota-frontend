import React, { Component } from 'react';
import { Switch, BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import './App.css';
import Header from './components//layout/Header'
import Navbar from './components/layout/Navbar'
import Login from './components/auth/Login'
import Loader from './components/layout/Loader'
import Error404 from './components/errors/Error404'
import Error403 from './components/errors/Error403'
import axios from './api/init'
import adminRoutes from './routes/adminRoutes'
import userRoutes from './routes/userRoutes'
import history from './components/layout/history'

class App extends Component {
  state = {
    loaded: false,
    administrator: false,
    loggedIn: false
  }

  componentDidMount() {
    axios.get('auth')
     .then((response) => {
       this.setState({
        loggedIn: response.data.login,
        administrator: response.data.administrator, 
        loaded: true})
     })
    .catch((error)=>{
       console.log(error);
    })
  }
  
  updateLogin = (data) => {
    console.log(data)
    this.setState({
      loggedIn: true,
      administrator: data.administrator,
      loaded: true
  })
  }

  updateLogout = () => {
    axios.get('/users/logout')
    .then(() => {
      this.setState({
        loggedIn: false,
        administrator: false,
        loaded: true
    })
    })
  }
  
  render() {
    const adminRouteComponents = adminRoutes.map(({path, component}, key) => <Route exact path={path} component={component} key={key} />)
    const forbiddenOrLoginRouteComponents = adminRoutes.map(({path}, key) => this.state.loggedIn ? <Route exact path={path} component={Error403} key={key} /> : <Redirect to="/" key={key}/>)
    const userRouteComponents = userRoutes.map(({path, component}, key) => <Route exact path={path} component={component} key={key} />)
    const loginRouteComponents = userRoutes.map(({path}, key) =>  <Route path={path} key={key} render={ () =>  <Redirect to="/" />} />)
    if (!this.state.loaded) { return <Loader /> }
    return(
      <Router history={history} forceRefresh={true}>
      <div>
        { this.state.loggedIn ? <Navbar administrator={this.state.administrator} updateLogout={this.updateLogout}/> : <Header />}
        <div className="container">
          <Switch>
            <Route exact path="/" render={() => (this.state.loggedIn ? ( <Redirect to="/mysop"/>) : ( <Login updateLogin={this.updateLogin} />))}/>
            {this.state.administrator ? adminRouteComponents : forbiddenOrLoginRouteComponents}
            {this.state.loggedIn ? userRouteComponents : loginRouteComponents }
            <Route component={Error404}/>
          </Switch>
        </div>
      </div>
      </Router>
    )
  }
}

export default App;

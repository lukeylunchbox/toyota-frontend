import React, { Component } from 'react'
import instance from '../api/init'

class Login extends Component {
  constructor() {
    super()
    this.state = {
      loggedIn: false,
      employeeNumber: "",
      password: "", 
      errors: {}
    }
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }
  
  onSubmit(e) {
    e.preventDefault()
    const user = {
      employeeNumber: this.state.employeeNumber,
      password: this.state.password,
    }
    instance.post("/users/login", user) 
      .then(res => {
        if (res.data.success) { 
          this.setState({ loggedIn: true})
          this.props.updateLogin(res.data) 
          }
      })
      .catch(err => console.error(err))
 
  }

  render() {
    return (
    <div className="login">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <br/>
            <br/>
            <br/>
              <h3 className="display-8 text-center">Toyota Australia</h3>
              <h3 className="display-8 text-center">Product Planning Division</h3>
              <h3 className="display-8 text-center">Standard Operating Procedures</h3>
            <br/>
            <br/>
            <form onSubmit={this.onSubmit.bind(this)}>
              <div className="form-group">
                <input type="text" 
                className="form-control form-control-lg" 
                placeholder="Toyota Number" 
                name="employeeNumber"
                value={this.state.employeeNumber}
                onChange={this.onChange.bind(this)} 
                />
              </div>
              <br/>
              <div className="form-group">
                <input type="password" 
                className="form-control form-control-lg" 
                placeholder="Password" 
                name="password" 
                value={this.state.password}
                onChange={this.onChange.bind(this)} 
                />
              </div>
              <br/>
              <br/>
              <div className="text-center"> 
              <button type="submit"  className="btn btn-primary">Login</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    )
  }
}

export default Login

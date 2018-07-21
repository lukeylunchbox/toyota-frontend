import React, { Component } from 'react'
import instance from '../api/init'

class ChangePassword extends Component {
  constructor(props) {
    super(props)

    this.state = {
      errors: {},
      oldPassword: "",
      password: "",
      password1: ""
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({[event.target.name]: event.target.value})

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state);

    // on submit form data to update password in database
    const password = {
      oldPassword: this.state.oldPassword,
      password: this.state.password,
      password1: this.state.password1
    }

    instance.patch("/users/password", password) 
    .then(res => {
      console.log(res.data);
    })
    .catch(err => console.error(err))
  }


  render() {
      return (
        <div>
          <div className="data-wrapper2">
            <div className="register">
            <div className="container">
              <div className="row">
                <div className="col-md-8 m-auto">
                  <br/>
                  <p className="lead text-center">Update Password</p>
                  <form className='form' onSubmit={this.handleSubmit}>
                    <div className='form-group'>
                      <label className='label'>Old Password</label>
                      <div className='control'>
                        <input
                          className='form-control form-control-md'
                          type='text'
                          name='oldPassword'
                          value={this.state.oldPassword}
                          onChange={this.handleChange}
                      
                          />
                      </div>
                    </div>

                    <div className='form-group'>
                      <label className='label'>New Password</label>
                      <div className='control'>
                        <input
                          className='form-control form-control-md'
                          type='text'
                          name='password'
                          value={this.state.password}
                          onChange={this.handleChange}
                         
                          />
                      </div>
                    </div>

                    <div className='form-group'>
                      <label className='label'>Confirm New Password</label>
                      <div className='control'>
                        <input
                          className='form-control form-control-md'
                          type='text'
                          name='password1'
                          value={this.state.password1}
                          onChange={this.handleChange}
                          // placeholder={this.state.user.employeeNumber}
                          />
                      </div>
                    </div>

                           <div className="field">
                      <div className="control">
                        <input
                          type="submit"
                          value="Submit"
                          className="btn btn-primary"
                        />
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            </div>
          </div>
        </div>
      )
    }
}

export default ChangePassword
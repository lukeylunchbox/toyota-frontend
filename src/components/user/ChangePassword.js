import React, { Component } from 'react'
import instance from '../api/init'
import ManageSop from '../sop/ManageSop'

class ChangePassword extends Component {
  constructor(props) {
    super(props)

    this.state = {
      errors: {},
      oldPassword: "",
      password: "",
      password2: "",
      dbPasswordError: ""
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  validate = () => {
    let isError = false
    const errors = {
      oldPasswordError: "",
      passwordError: "",
      password2Error: ""
    }

    if (this.state.oldPassword.length < 6 || this.state.oldPassword.length > 30) {
      isError = true
      errors.oldPasswordError = 'Invalid Old password'
    }

    if (this.state.password.length < 6 || this.state.password.length > 30) {
      isError = true
      errors.passwordError = 'Your new password must be between 6 and 30 characters'
    }

    if (this.state.password2.length < 6 || this.state.password2.length > 30)  {
      isError = true
      errors.password2Error = 'Your new password must be between 6 and 30 characters'
    }

    if (this.state.password !== this.state.password2)  {
      isError = true
      errors.password2Error = 'Your passwords do not match'
    }

    if (isError) {
      this.setState(errors)
    }
    return isError
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
    const err = this.validate()
    if (!err) {
    console.log(this.state);

    // on submit form data to update password in database
    const password = {
      oldPassword: this.state.oldPassword,
      password: this.state.password,
      password2: this.state.password2
    }

    instance.patch("/users/password", password) 
    .then(res => {
      alert('Your password was updated')
      this.props.history.go(-1)
    })
    .catch(err => {
      console.error(err)
      this.setState({dbPasswordError: 'Your old password is incorrect'})
  })
    
  } 
}

render() {
  return (
    <div className="data-wrapper4">
      <h3 className="solid-heading">Change Password</h3>
      <br/>
      <form className='form' onSubmit={this.handleSubmit}>
        <div className='form-group'>
          <label className='label'>Old Password</label>
          <div className='control'>
            <input
              className='form-control form-control-md'
              type='password'
              name='oldPassword'
              value={this.state.oldPassword}
              onChange={this.handleChange}
              required
              />
              <div className="form-alert">{this.state.oldPasswordError}</div>
              <div className="form-alert">{this.state.dbPasswordError}</div>
          </div>
        </div>
        <div className='form-group'>
          <label className='label'>New Password</label>
          <div className='control'>
            <input
              className='form-control form-control-md'
              type='password'
              name='password'
              value={this.state.password}
              onChange={this.handleChange}
              required
              />
              <div className="form-alert">{this.state.passwordError}</div>
          </div>
        </div>
        <div className='form-group'>
          <label className='label'>Confirm New Password</label>
          <div className='control'>
            <input
              className='form-control form-control-md'
              type='password'
              name='password2'
              value={this.state.password2}
              onChange={this.handleChange}
              required
              />
              <div className="form-alert">{this.state.password2Error}</div>
          </div>
        </div>
        <br/>
        <div className="field">
          <div className="text-center">
            <input
              type="submit"
              value="Submit"
              className="btn btn-secondary"
            />
          </div>
        </div>
      </form>
    </div>
      )
    }
}

export default ChangePassword
import React, { Component } from 'react'
import instance from '../api/init'
import ManageSop from '../sop/ManageSop'


class ResetPassword extends Component {
  constructor(props) {
    super(props)

    this.state = {
      errors: {},
      password: "",
      password2: ""
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  validate = () => {
    let isError = false
    const errors = {
      passwordError: "",
      password2Error: ""
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

    const password = {
      password: this.state.password,
      password2: this.state.password2
    }

    instance.patch(`/users/${this.props.match.params.id}/password`, password) 
    .then(res => {
      alert('Users password was updated')
      this.props.history.go(-1)
    })
    .catch(err => {
      console.log(password)
      console.error(err)
  })
    
  } 
}

render() {
  return (
    <div className="data-wrapper4">
      <h3 className="solid-heading">Reset User Password</h3>
      <br/>
      <form className='form' onSubmit={this.handleSubmit}>
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

export default ResetPassword
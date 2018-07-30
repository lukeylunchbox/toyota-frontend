import React, { Component } from 'react'
import Loader from '../layout/Loader'
import instance from '../api/init'
import { Link } from 'react-router-dom'


class ViewUser extends Component {
  constructor(props) {
    super(props)

    this.state = {
      user: false,
      firstName: null,
      lastName: null,
      employeeNumber: null,
      email: null,
      department: null,
      active: true,
      administrator: false,
      loaded: false,
      readSops: [],
      unreadSops: [],
      outdatedSops: []
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({[e.target.name]: e.target.value})

    this.setState({
      [name]: value
    });
  }

  validate = () => {
    let isError = false
    const errors = {
      firstNameError: "",
      lastNameError: "",
      employeeNumberError: "",
      emailError: "",
      departmentError: "",
      passwordError: "",
      password2Error: ""
    }
    if (this.state.firstName.length < 3 || this.state.firstName.length > 30) {
      isError = true
      errors.firstNameError = 'First name must be between 2 and 30 characters'
    }

    if (this.state.lastName.length < 3 || this.state.lastName.length > 30) {
      isError = true
      errors.lastNameError = 'Last name must be between 2 and 30 characters'
    }

    if (this.state.employeeNumber.length !== 6) {
      isError = true
      errors.employeeNumberError = 'Please enter a valid employee number'
    }

    if (this.state.email.length < 2 || this.state.email.indexOf("@") === -1 || this.state.email.indexOf(".com.au") === -1) {
      isError = true
      errors.emailError = 'Please enter a valid email address'
    }

    if (isError) {
      this.setState(errors)
    }
    return isError
  }

  onSubmit(e) {
    e.preventDefault();
    const err = this.validate()
    if (!err) {

      // clear form
      this.setState({
        firstName: this.state.firstName,
        firstNameError: "",
        lastName: this.state.lastName,
        lastNameError: "",
        employeeNumber: this.state.employeeNumber,
        employeeNumberError: "",
        email: this.state.email,
        emailError: "",
        department: this.state.department
      })

    // on submit form data to update user in database
    const user = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      employeeNumber: this.state.employeeNumber,
      email: this.state.email  || this.state.user.email,
      department: this.state.department,
      active: this.state.active,
      administrator: this.state.administrator
    }
    instance.patch(`/users/${this.props.match.params.id}`, user) 
    .then(res => {
      alert('User successfully updated')
      this.props.history.go(-1)
    })
    .catch(err => console.error(err))
  }
}

  componentDidMount() {
    instance.get(`/users/${this.props.match.params.id}`)
     .then((response) => {
       this.setState({
        user: true,
        firstName: response.data.user.firstName,
        lastName: response.data.user.lastName,
        employeeNumber: response.data.user.employeeNumber,
        email: response.data.user.email,
        department: response.data.user.department,
        active: response.data.user.active,
        administrator: response.data.user.administrator,
        loaded: true,
        readSops: response.data.summarySop.readSops,
        unreadSops: response.data.summarySop.unreadSops,
        outdatedSops: response.data.summarySop.outdatedSops
       });
     })
    .catch((error) => {
       console.log(error);
    })
  }

  render() {
    const readSops = this.state.readSops.map((sop, i) => <div className="sop-read" key={i}>{sop.title}</div>)
    const unreadSops = this.state.unreadSops.map((sop, i) => <div className="sop-unread-admin" key={i}>{sop.title}</div>)
    const outdatedSops = this.state.outdatedSops.map((sop, i) => <div className="sop-outdated-admin" key={i}>{sop.title}</div>)

    if(this.state.user) {
      return (
        <div>
          <div className="data-wrapper3">
                <div className="col-md-12 m-auto">
                  <h3 className="solid-heading">
                    View / Update User
                  </h3>
                  <br/>
                  <form className='form' onSubmit={this.onSubmit}>
                    <div className='form-group'>
                      <label className='label'>First Name</label>
                      <div className='control'>
                        <input
                          className='form-control form-control-md'
                          type='text'
                          name='firstName'
                          value={this.state.firstName}
                          onChange={this.onChange}
                          />
                      <div className="form-alert">{this.state.firstNameError}</div>
                      </div>
                    </div>

                    <div className='form-group'>
                      <label className='label'>Last Name</label>
                      <div className='control'>
                        <input
                          className='form-control form-control-md'
                          type='text'
                          name='lastName'
                          value={this.state.lastName}
                          onChange={this.onChange}
                          />
                          <div className="form-alert">{this.state.lastNameError}</div>
                      </div>
                    </div>

                    <div className='form-group'>
                      <label className='label'>Employee Number</label>
                      <div className='control'>
                        <input
                          className='form-control form-control-md'
                          type='text'
                          name='employeeNumber'
                          value={this.state.employeeNumber}
                          onChange={this.onChange}
                          />
                          <div className="form-alert">{this.state.employeeNumberError}</div>
                      </div>
                    </div>

                    <div className='form-group'>
                      <label className='label'>Email</label>
                      <div className='control'>
                        <input
                          className='form-control form-control-md'
                          type='text'
                          name='email'
                          value={this.state.email}
                          onChange={this.onChange}
                          />
                          <div className="form-alert">{this.state.emailError}</div>
                      </div>
                    </div>

                     <div className="form-group">
                      <label className='label'>Department</label>
                      <select 
                      className="form-control" 
                      name="department" value={this.state.department} 
                      onChange={this.onChange.bind(this)}>
                        <option>Product Planning & Pricing</option>
                        <option>Product Design</option>
                        <option>Regulations, Conversions & Accessories</option>
                        <option>Vehicle Evaluation</option>
                        <option>Connected Vehicle Services</option>
                        <option>Technical administration</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="checkbox-label">
                        <input
                          className='checkbox'
                          name="active"
                          type="checkbox"
                          checked={this.state.active}
                          onChange={this.onChange}
                        />
                        Active
                      </label>
                    </div>
                    <p></p>
                    <div className="form-group">
                      <label className="checkbox-label">
                        <input
                          className='checkbox'
                          name="administrator"
                          type="checkbox"
                          checked={this.state.administrator}
                          onChange={this.onChange}
                        />
                        Administrator
                      </label>
                    </div>

                    <div className="field">
                      <div className="control">
                        <input
                          type="submit"
                          value="Update User"
                          className="btn btn-secondary"
                        />
                        <span className="tab-space2"></span>
                        <Link className="btn btn-secondary" to={`/users/${this.props.match.params.id}/password`}>Reset Password</Link>
                      </div>
                    </div>
                  </form>

                  <br />

                  <div>
                    <h3 className="head text-center">{this.state.firstName} {this.state.lastName}'s - SOP Status</h3>
                    <h3 className="solid-heading">Unread</h3>
                    {unreadSops.length !== 0 ?
                      <div className="sop-list">
                        {unreadSops}
                      </div>
                      :
                      <div className="read-success-message">
                        <h5>Up to date.</h5>
                      </div>
                    }
                    <h3 className="solid-heading">New Versions Available</h3>
                    {outdatedSops.length !== 0 ?
                      <div className="sop-list">
                        {outdatedSops}
                      </div>
                      : 
                      <div className="read-success-message">
                        <h5>Up to date.</h5>
                      </div>
                    }

                    <h3 className="solid-heading">Read</h3>
                    {readSops.length !== 0 ?
                      <div className="sop-list">
                        {readSops}
                      </div>
                      : 
                      <div className="read-success-message">
                        <h5>No read SOP.</h5>
                      </div>
                    }
                  </div>
                </div>
          </div>
        </div>
      )
    }
    return (
      <Loader/>
    )
  }
}

export default ViewUser
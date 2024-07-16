import PropTypes from 'prop-types'
import React, { Component } from "react"
import {
  Alert,
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Media,
  Row,
} from "reactstrap"

// availity-reactstrap-validation
import { AvField, AvForm } from "availity-reactstrap-validation"

// Redux
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"

//Import Breadcrumb
import Breadcrumb from "../../components/Common/Breadcrumb"

import avatar from "../../assets/images/users/avatar-1.jpg"
// actions
import { editProfile } from "../../store/actions"

import { updateProfile } from "store/auth/profile/saga";

class UserProfile extends Component {
  constructor(props) {
    super(props)
    this.state = { email: "", name: "", password: "", password_confirm: "" , information: JSON.parse(localStorage.getItem("authInformation")), success: "", error: ""}

    // handleValidSubmit
    this.handleValidSubmit = this.handleValidSubmit.bind(this)
  }

  // handleValidSubmit
  async handleValidSubmit(event, values) {
    // this.props.editProfile(values, this.props)
    await updateProfile(values)
    .then(res => {
      if (res.status === 204) {
        this.setState({success: "Profile Updated!"})
        console.log(this.state);
      } else if (res.status !== 204) {
        this.setState({error: res.data.error_description})
      }
    })

    this.setState({password: "", password_confirm: ""})
  }

  componentDidMount() {

  }

  // eslint-disable-next-line no-unused-vars
  componentDidUpdate(prevProps, prevState, ss) {
  
  }

  render() {
    return (
      <React.Fragment>
        <div className="page-content">
          <Container fluid>
            {/* Render Breadcrumb */}
            <Breadcrumb title="User" breadcrumbItem="Profile" />

            <Row>
              <Col lg="12">
                {this.state.error && this.state.error ? (
                  <Alert color="danger">{this.state.error}</Alert>
                ) : null}
                {this.state.success && <Alert color="success">{this.state.success}</Alert>}
              </Col>
            </Row>

            <h4 className="card-title mb-4">Change Password</h4>
            
            <Row>
              <Col lg="6">
                <Card>
                <div className="pt-4">
                  <h4 className="pl-4 pb-4">Password Policies</h4>
                  <ul>
                    <li>Password Minimum Length is 8 characters.</li>
                    <li>Password cannot contain the Username.</li>
                    <li>Password cannot contain the Email address.</li>
                    <li>Password must be included at least 1 special character.</li>
                    <li>Password must be included at least 1 uppercase character.</li>
                    <li>Password must be included at least 1 lowercase character.</li>
                  </ul>
                </div>
                  <CardBody>
                    <AvForm
                      className="form-horizontal"
                      onValidSubmit={(e, v) => {
                        this.handleValidSubmit(e, v)
                      }}
                    >
                      <div className="form-group">
                      <AvField
                          name="idx"
                          label="User ID"
                          value={this.state.information.uid}
                          className="form-control"
                          placeholder=""
                          type="text"
                          disabled
                        />
                      <AvField
                          name="username"
                          label="Username"
                          value={this.state.information.email}
                          className="form-control"
                          placeholder=""
                          type="text"
                          disabled
                        />
                        <AvField
                          name="password"
                          label="Password"
                          value={this.state.password}
                          className="form-control"
                          placeholder="Enter Password"
                          type="password"
                          value={this.state.password}
                          validate={
                            {
                              minLength: {value: 8, errorMessage: 'Your name must be between 8 and 50 characters'},
                              maxLength: {value: 50, errorMessage: 'Your name must be between 8 and 50 characters'}
                            }
                          }
                          required
                        />
                        <AvField
                          name="password_confirm"
                          label="Password Confirmation"
                          value={this.state.password_confirm}
                          className="form-control"
                          placeholder="Enter Confirm Password"
                          type="password"
                          value={this.state.password_confirm}
                          validate={
                            {
                              minLength: { value: 8, errorMessage: 'Your name must be between 8 and 50 characters' },
                              maxLength: { value: 50, errorMessage: 'Your name must be between 8 and 50 characters' },
                              match: { value: 'password' }
                            }
                          }
                          required
                        />
                      </div>
                      <div className="text-center mt-4 float-right">
                        <Button type="submit" color="primary">
                          Update
                        </Button>
                      </div>
                    </AvForm>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </React.Fragment>
    )
  }
}

UserProfile.propTypes = {
  editProfile: PropTypes.func,
  error: PropTypes.any,
  success: PropTypes.any
}

const mapStateToProps = state => {
  const { error, success } = state.Profile
  return { error, success }
}

export default withRouter(
  connect(mapStateToProps, { editProfile })(UserProfile)
)

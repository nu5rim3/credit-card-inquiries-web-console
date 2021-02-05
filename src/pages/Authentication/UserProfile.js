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
  handleValidSubmit(event, values) {
    // this.props.editProfile(values, this.props)
    updateProfile(values)
    .then(res => {
      if (res.status === 'success' && res.data.status === 200) {
        this.setState({success: "Profile Updated!"})
      } else if (res.status === 'success' && res.data.status !== 200) {
        this.setState({error: "Something Wrong!"})
      }
    })
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
                  <CardBody>
                    <AvForm
                      className="form-horizontal"
                      onValidSubmit={(e, v) => {
                        this.handleValidSubmit(e, v)
                      }}
                    >
                      <div className="form-group">
                      <AvField
                          name="username"
                          label="Username"
                          value={this.state.information.username}
                          className="form-control"
                          placeholder="Enter Password"
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
                          validate={
                            {
                              minLength: {value: 6, errorMessage: 'Your name must be between 6 and 16 characters'},
                              maxLength: {value: 20, errorMessage: 'Your name must be between 6 and 16 characters'}
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
                          validate={
                            {
                              minLength: { value: 6, errorMessage: 'Your name must be between 6 and 16 characters' },
                              maxLength: { value: 20, errorMessage: 'Your name must be between 6 and 16 characters' },
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

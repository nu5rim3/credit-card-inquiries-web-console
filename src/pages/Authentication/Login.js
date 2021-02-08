import React, { Component } from "react"
import PropTypes from 'prop-types'

import { Alert, Card, CardBody, Col, Container, Row } from "reactstrap"

// Redux
import { connect } from "react-redux"
import { Link, withRouter } from "react-router-dom"

// availity-reactstrap-validation
import { AvField, AvForm } from "availity-reactstrap-validation"

// actions
import { apiError, loginUser, socialLogin } from "../../store/actions"
import { login } from 'store/auth/login/saga'

// import images
import profile from "../../assets/images/lolcf_logo.svg"

import Spinner from 'components/Common/Spinner';

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      error: ''
    }

    // handleValidSubmit
    this.handleValidSubmit = this.handleValidSubmit.bind(this)
  }

  // handleValidSubmit
  async handleValidSubmit(event, values) {
    this.setState({loading: true})
    var response = await login(values, this.props.history);
    
    if ((response.status === 400) || (response.status === 401) || (response.status === 500)) {
      this.setState({error: response.data.error_description});
    }
  }

  componentDidMount() {
    
  }

  render() {
    return (
      <React.Fragment>
        <div className="account-pages my-5 pt-sm-5">
          <Container>
            <Row className="justify-content-center">
              <Col md={8} lg={6} xl={5}>
                <Card className="overflow-hidden">
                  <div className="bg-soft-primary">
                    <Row className="d-flex align-items-center">
                      <Col className="col-7">
                        <div className="text-gray p-4">
                          <h5 className="text-gray">Welcome Back !</h5>
                          <p>Sign in to continue to Console.</p>
                        </div>
                      </Col>
                      <Col className="col-5 pr-4">
                        <img src={profile} alt="" className="img-fluid" />
                      </Col>
                    </Row>
                  </div>
                  <CardBody className="pt-4">
                    <div className="p-2">
                      <AvForm
                        className="form-horizontal"
                        onValidSubmit={this.handleValidSubmit}
                      >
                        {this.state.error && this.state.error ? (
                          <Alert color="danger">{this.state.error}</Alert>
                        ) : null}

                        <div className="form-group">
                          <AvField
                            name="email"
                            label="Email"
                            className="form-control"
                            placeholder="Enter email"
                            type="email"
                            required
                          />
                        </div>

                        <div className="form-group">
                          <AvField
                            name="password"
                            label="Password"
                            type="password"
                            required
                            placeholder="Enter Password"
                          />
                        </div>

                        <div className="custom-control custom-checkbox">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id="customControlInline"
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="customControlInline"
                          >
                            Remember me
                          </label>
                        </div>

                        <div className="mt-3">
                          <button
                            className="btn btn-primary btn-block waves-effect waves-light"
                            type="submit"
                          >
                            <span className="d-flex justify-content-center"><Spinner type="none" loading={this.state.loading} />  Log In</span>   
                          </button>
                        </div>
                      </AvForm>
                    </div>
                  </CardBody>
                </Card>
                <div className="mt-5 text-center">
                  <p>
                    © {new Date().getFullYear()} LOLC Technologies Services Ltd.
                  </p>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </React.Fragment>
    )
  }
}

Login.propTypes = {
  apiError: PropTypes.any,
  error: PropTypes.any,
  history: PropTypes.object,
  loginUser: PropTypes.func,
  socialLogin: PropTypes.func
}

const mapStateToProps = state => {
  const { error } = state.Login
  return { error }
}

export default withRouter(
  connect(mapStateToProps, { loginUser, apiError, socialLogin })(Login)
)

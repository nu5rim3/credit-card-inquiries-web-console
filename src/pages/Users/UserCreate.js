import React, { useState, useEffect } from "react"
import { Row, Col, Card, CardBody, CardTitle, Label, Input, Button, Alert } from "reactstrap"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import "./datatables.scss"

// Form Validations and Alerts
import { AvForm, AvField } from "availity-reactstrap-validation"

import { createUser } from "store/users/saga";
import Spinner from 'components/Common/Spinner';

const UserCreate = (props) => {

    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(null)
    const [message, setMessage] = useState(null)
    const [visible, setVisible] = useState(false)
    const [form, setForm] = useState();

    const onSubmit = (event, errors, values) => {
        if (errors.length === 0) {
            setLoading(true);
            createUser(values)
                .then(res => {
                    if (res.status === 200) {
                        setStatus(true);
                        setMessage(res.data.message)
                        setVisible(true)
                        form && form.reset()
                    } else {
                        setStatus(false)
                        setMessage(res.data.message)
                        setVisible(true)
                    }
                    setLoading(false)
                    setTimeout(() => {
                        setVisible(false)
                    }, 5000);
                })
        }
    }

    return (
        <React.Fragment>
            <div className="page-content">
                <div className="container-fluid">
                    <Breadcrumbs title="Master" breadcrumbItem="Create Users" />
                    <Row>
                        <Col className="col-12">
                            <Card>
                                <CardBody>
                                    <CardTitle>Fill the required details. </CardTitle>
                                    <AvForm onSubmit={onSubmit} className="mt-5 col-8" ref={c => setForm(c)}>
                                        {visible == true && status != null && status == true &&
                                            <Alert color="success" role="alert" className="mb-5">
                                                {message}
                                            </Alert>
                                        }

                                        {visible == true && status != null && status == false &&
                                            <Alert color="danger" role="alert" className="mb-5">
                                                {message}
                                            </Alert>
                                        }

                                        <div className="row mb-4">
                                            <Label
                                                htmlFor="horizontal-firstname-Input"
                                                className="col-sm-3 col-form-label"
                                            >Windows Login ID</Label>
                                            <Col sm={9}>
                                                <AvField
                                                    name="windowsUserId"
                                                    placeholder="Enter PC ID"
                                                    type="text"
                                                    errorMessage="PC ID is required!"
                                                    validate={{ required: { value: false } }}
                                                />
                                            </Col>
                                        </div>
                                        <div className="row mb-4">
                                            <Label
                                                htmlFor="horizontal-email-Input"
                                                className="col-sm-3 col-form-label"
                                            >Employee/Agent ID <span className="text-danger">*</span></Label>
                                            <Col sm={9}>
                                                <AvField
                                                    name="employeeId"
                                                    placeholder="Enter Employee ID"
                                                    type="text"
                                                    errorMessage="Employee ID is required!"
                                                    validate={{
                                                        required: { value: true }
                                                    }}
                                                />
                                            </Col>
                                        </div>
                                        <div className="row mb-4">
                                            <Label
                                                htmlFor="horizontal-password-Input"
                                                className="col-sm-3 col-form-label"
                                            >Email <span className="text-danger">*</span></Label>
                                            <Col sm={9}>
                                                <AvField
                                                    name="email"
                                                    placeholder="Enter Email Address"
                                                    type="email"
                                                    errorMessage="Email is required!"
                                                    validate={{ required: { value: true }, email: true }}
                                                />
                                            </Col>
                                        </div>
                                        <div className="row mb-4">
                                            <Label
                                                htmlFor="horizontal-password-Input"
                                                className="col-sm-3 col-form-label"
                                            >NIC No <span className="text-danger">*</span></Label>
                                            <Col sm={9}>
                                                <AvField
                                                    name="nic"
                                                    placeholder="Enter NIC No"
                                                    type="text"
                                                    errorMessage="NIC No is required!"
                                                    validate={{
                                                        required: { value: true },
                                                        pattern: { value: /^([0-9]{9}[x|X|v|V]|[0-9]{12})$/m }
                                                    }}
                                                />
                                            </Col>
                                        </div>
                                        <div className="row mb-4">
                                            <Label
                                                htmlFor="horizontal-password-Input"
                                                className="col-sm-3 col-form-label"
                                            >Contact No <span className="text-danger">*</span></Label>
                                            <Col sm={9}>
                                                <AvField
                                                    name="contactNo"
                                                    placeholder="Enter Contact No"
                                                    type="text"
                                                    errorMessage="Contact No is required!"
                                                    helpMessage="Type contact number except leading zero."
                                                    validate={{
                                                        required: { value: true },
                                                        pattern: { value: /^[0-9]{9}$/m }
                                                    }}
                                                />
                                            </Col>
                                        </div>
                                        <div className="row mb-4">
                                            <Label
                                                htmlFor="horizontal-password-Input"
                                                className="col-sm-3 col-form-label"
                                            >Full Name <span className="text-danger">*</span></Label>
                                            <Col sm={9}>
                                                <AvField
                                                    name="fullName"
                                                    placeholder="Enter Full Name"
                                                    type="text"
                                                    errorMessage="Full Name is required!"
                                                    validate={{ required: { value: true } }}
                                                />
                                            </Col>
                                        </div>
                                        <div className="row mb-4">
                                            <Label
                                                htmlFor="horizontal-password-Input"
                                                className="col-sm-3 col-form-label"
                                            >Branch <span className="text-danger">*</span></Label>
                                            <Col sm={9}>
                                                <AvField
                                                    name="branchCode"
                                                    placeholder="Enter Branch Code"
                                                    type="text"
                                                    errorMessage="Branch Code is required!"
                                                    validate={{ required: { value: true } }}
                                                />
                                            </Col>
                                        </div>
                                        <div className="row mb-4">
                                            <Label
                                                htmlFor="horizontal-password-Input"
                                                className="col-sm-3 col-form-label"
                                            >Branch <span className="text-danger">*</span></Label>
                                            <Col sm={9}>
                                                <AvField
                                                    name="branchName"
                                                    placeholder="Enter Branch Name"
                                                    type="text"
                                                    errorMessage="Branch Name is required!"
                                                    validate={{ required: { value: true } }}
                                                />
                                            </Col>
                                        </div>

                                        <div className="row">
                                            <Col sm={12} className="d-flex flex-row flex-row-reverse">
                                                <div>
                                                    <Button
                                                        type="submit"
                                                        color="primary"
                                                        className="w-md d-flex justify-content-between"
                                                    >Create
                                                        <Spinner type="save" loading={loading} />
                                                    </Button>
                                                </div>
                                            </Col>
                                        </div>
                                    </AvForm>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </div>
        </React.Fragment>
    )
}

export default UserCreate;

import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom";
import { Row, Col, Card, CardBody, CardTitle, Label, Input, Button, Alert } from "reactstrap"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import "./datatables.scss"

// Form Validations and Alerts
import { AvForm, AvField } from "availity-reactstrap-validation"

import { getuserById, updateUser } from "store/users/saga";
import Spinner from 'components/Common/Spinner';

const UpdateUser = (props) => {

    const { id } = useParams()

    const [loading, setLoading] = useState(false)
    const [status, setStatus] = useState(null)
    const [message, setMessage] = useState(null)
    const [visible, setVisible] = useState(false)
    const [data, setData] = useState({})
    const [form, setForm] = useState()

    const onSubmit = (event, errors, values) => {
        if (errors.length === 0) {
            setLoading(true);
            updateUser(values)
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
                })
            setTimeout(() => {
                setVisible(false)
            }, 5000);
        }
    }

    useEffect(() => {
        if (id != null && id != undefined) {
            var data = {
                meo_id: id
            }
            getuserById(data)
            .then(res => {
                if (res.status === 200) {
                    setStatus(true);
                    setMessage("Data Loaded!")
                    setVisible(true)
                    setData(res.data)
                } else {
                    setStatus(false)
                    setMessage(res.data.message)
                    setVisible(true)
                }

                setTimeout(() => {
                    setVisible(false)
                }, 5000);
            })
        }
    }, [setData])

    return (
        <React.Fragment>
            <div className="page-content">
                <div className="container-fluid">
                    <Breadcrumbs title="Master" breadcrumbItem="Update User" />
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
                                                    value={data.windowsUserId != null ? data.windowsUserId : ''}
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
                                                    value={data.employeeId != null ? data.employeeId : ''}
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
                                                    value={data.email != null ? data.email : ''}
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
                                                    value={data.nic != null ? data.nic : ''}
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
                                                    value={data.contactNo != null ? data.contactNo : ''}
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
                                                    value={data.fullName != null ? data.fullName : ''}
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
                                                    value={data.branchCode != null ? data.branchCode : ''}
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
                                                    value={data.branchName != null ? data.branchName : ''}
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
                                                    >Update
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

export default UpdateUser;

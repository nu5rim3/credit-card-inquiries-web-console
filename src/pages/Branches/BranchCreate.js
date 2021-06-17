import React, { useState, useEffect } from "react"
import { Row, Col, Card, CardBody, CardTitle, Label, Input, Button, Alert } from "reactstrap"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import "./datatables.scss"

// Form Validations and Alerts
import { AvForm, AvField } from "availity-reactstrap-validation"

import { createBranch } from "store/branches/saga";
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
            createBranch(values)
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
                    <Breadcrumbs title="Master" breadcrumbItem="Create Branch" />
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
                                                htmlFor="horizontal-email-Input"
                                                className="col-sm-3 col-form-label"
                                            >Branch Code<span className="text-danger">*</span></Label>
                                            <Col sm={9}>
                                                <AvField
                                                    name="code"
                                                    placeholder="Enter Branch Code"
                                                    type="text"
                                                    errorMessage="Branch code is required!"
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
                                            >Description <span className="text-danger">*</span></Label>
                                            <Col sm={9}>
                                                <AvField
                                                    name="description"
                                                    placeholder="Enter description Address"
                                                    type="text"
                                                    errorMessage="description is required!"
                                                    validate={{ required: { value: true } }}
                                                />
                                            </Col>
                                        </div>
                                        <div className="row mb-4">
                                            <Label
                                                htmlFor="horizontal-password-Input"
                                                className="col-sm-3 col-form-label"
                                            >District <span className="text-danger">*</span></Label>
                                            <Col sm={9}>
                                                <AvField
                                                    name="district"
                                                    placeholder="Enter District"
                                                    type="text"
                                                    errorMessage="District is required!"
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
                                            >Branch Zone <span className="text-danger">*</span></Label>
                                            <Col sm={9}>
                                                <AvField
                                                    name="branchZone"
                                                    placeholder="Enter Branch Zone"
                                                    type="text"
                                                    errorMessage="Branch Zone is required!"
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
                                            >Company Code<span className="text-danger">*</span></Label>
                                            <Col sm={9}>
                                                <AvField
                                                    name="companyCode"
                                                    placeholder="Enter Company Code"
                                                    type="number"
                                                    errorMessage="Company Code is required!"
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

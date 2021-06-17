import React, { useState, useEffect } from "react"
import { Row, Col, Card, CardBody, CardTitle, Label, Input, Button, Alert } from "reactstrap"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

// Form Validations and Alerts
import { AvForm, AvField } from "availity-reactstrap-validation"

import { sendInvitaion } from "store/invitations/saga";
import Spinner from 'components/Common/Spinner';

const Invitation = (props) => {

    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(null)
    const [message, setMessage] = useState(null)
    const [visible, setVisible] = useState(false)
    const [form, setForm] = useState();
    const [type, setType] = useState(false);

    const onSubmit = (event, errors, values) => {
        if (errors.length === 0) {
            setLoading(true);
            sendInvitaion(values)
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

    function handleType(value) {
        if (value === 'I') {
            setType(true)
        } else {
            setType(false)
        }
    }

    function individualField() {
        return (
            <div className="row mb-4">
                <Label
                    htmlFor="horizontal-firstname-Input"
                    className="col-sm-3 col-form-label"
                >MEO/Agent ID <span className="text-danger">*</span></Label>
                <Col sm={9}>
                    <AvField
                        name="meo_id"
                        placeholder="Enter here MEO/Agent user ID!"
                        type="text"
                        errorMessage="MEO/Agent user id is required!"
                        validate={{ required: { value: true } }}
                    />
                </Col>
            </div>
        )
    }

    function getPreDefineInvitation() {
        return "Welcome to LOLC Finance!";
    }

    return (
        <React.Fragment>
            <div className="page-content">
                <div className="container-fluid">
                    <Breadcrumbs title="Utility" breadcrumbItem="Invitations" />
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
                                            >Type <span className="text-danger">*</span></Label>
                                            <Col sm={9}>
                                                <AvField
                                                    name="type"
                                                    type="select"
                                                    errorMessage="Please select a type!"
                                                    onChange={(e) => handleType(e.target.value)}
                                                    validate={{ required: { value: true } }}
                                                >
                                                    <option value="">-- Select --</option>
                                                    <option value="I">Individual</option>
                                                    <option value="B">Bulk</option>
                                                </AvField>
                                            </Col>
                                        </div>
                                        {type == true && individualField()}
                                        <div className="row mb-4">
                                            <Label
                                                htmlFor="horizontal-email-Input"
                                                className="col-sm-3 col-form-label"
                                            >Invitaion Message <span className="text-danger">*</span></Label>
                                            <Col sm={9}>
                                                <AvField
                                                    name="message"
                                                    placeholder="Message body type here!"
                                                    type="textarea"
                                                    errorMessage="Message body is required!"
                                                    value={getPreDefineInvitation()}
                                                    rows={10}
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
                                                        <Spinner type="send" loading={loading} />
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

export default Invitation;

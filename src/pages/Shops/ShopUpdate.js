import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom";
import { Row, Col, Card, CardBody, CardTitle, Label, Input, Button, Alert } from "reactstrap"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import "./datatables.scss"

// Form Validations and Alerts
import { AvForm, AvField } from "availity-reactstrap-validation"

import { getShopById, updateShop } from "store/shops/saga";

import Spinner from 'components/Common/Spinner';

const UpdateShop = (props) => {

    const { id } = useParams()

    const [loading, setLoading] = useState(false)
    const [status, setStatus] = useState(null)
    const [message, setMessage] = useState(null)
    const [visible, setVisible] = useState(false)
    const [data, setData] = useState({})
    const [form, setForm] = useState()



    const onSubmit = (event, errors, values) => {
        values['shopCode'] = id;
        if (errors.length === 0) {
            setLoading(true);
            
            updateShop(values)
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
                shopCode: id
            }
            getShopById(data)
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
                    <Breadcrumbs title="Master" breadcrumbItem="Update Shop" />
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
                                                htmlFor="horizontal-password-Input"
                                                className="col-sm-3 col-form-label"
                                            >Shop Name <span className="text-danger">*</span></Label>
                                            <Col sm={9}>
                                                <AvField
                                                    name="shopName"
                                                    placeholder="Enter Shop Name"
                                                    type="text"
                                                    errorMessage="Shop Name is required!"
                                                    value={data.shopName != null ? data.shopName : ''}
                                                    validate={{ required: { value: true } }}
                                                />
                                            </Col>
                                        </div>

                                        <div className="row mb-4">
                                            <Label
                                                htmlFor="horizontal-password-Input"
                                                className="col-sm-3 col-form-label"
                                            >Email <span className="text-danger"></span></Label>
                                            <Col sm={9}>
                                                <AvField
                                                    name="email"
                                                    placeholder="Enter Email Address"
                                                    type="email"
                                                    errorMessage="Email is required!"
                                                    value={data.email != null ? data.email : ''}
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
                                                htmlFor="horizontal-email-Input"
                                                className="col-sm-3 col-form-label"
                                            >Description  <span className="text-danger"> </span></Label>
                                            <Col sm={9}>
                                                <AvField
                                                    name="shopDescription"
                                                    placeholder="Enter Description!"
                                                    type="textarea"
                                                    rows={8}
                                                    value={data.shopDescription != null ? data.shopDescription : ''}
                                                    validate={{ required: { value: false } }}
                                                />
                                            </Col>
                                        </div>

                                        <div className="row mb-4">
                                            <Label
                                                htmlFor="horizontal-password-Input"
                                                className="col-sm-3 col-form-label"
                                            >Card Type<span className="text-danger">*</span></Label>
                                            <Col sm={9}>
                                                <AvField
                                                    name="cardType"
                                                    type="select"
                                                    value={data.cardType != null ? data.cardType : ''}
                                                    validate={{ required: { value: true } }}
                                                >
                                                    <option value="">-- Select --</option>
                                                    <option value="GEN">General Credit Card</option>
                                                    <option value="SW">Swairee Credit Card</option>
                                                </AvField>
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

export default UpdateShop;

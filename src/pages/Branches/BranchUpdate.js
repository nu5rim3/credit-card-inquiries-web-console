import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom";
import { Row, Col, Card, CardBody, CardTitle, Label, Input, Button, Alert } from "reactstrap"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import "./datatables.scss"

// Form Validations and Alerts
import { AvForm, AvField } from "availity-reactstrap-validation"

import { getBranchById, updateBranch } from "store/branches/saga";
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
            updateBranch(values)
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
            setInterval(() => {
                setVisible(false)
            }, 5000);
        }
    }

    useEffect(() => {
        if (id != null && id != undefined) {
            var data = {
                meo_id: id
            }
            getBranchById(data)
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
                    <Breadcrumbs title="Master" breadcrumbItem="Update Branch" />
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
                                                    value={data.code != null ? data.code : ''}
                                                    disabled
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
                                                    value={data.description != null ? data.description : ''}
                                                    validate={{ required: { value: true }}}
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
                                                    value={data.district != null ? data.district : ''}
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
                                                    value={data.branchZone != null ? data.branchZone : ''}
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
                                                    value={data.companyCode != null ? data.companyCode : ''}
                                                    validate={{ required: { value: true } }}
                                                />
                                            </Col>
                                        </div>
                                        <div className="row mb-4">
                                            <Label
                                                htmlFor="horizontal-password-Input"
                                                className="col-sm-3 col-form-label"
                                            >Status<span className="text-danger">*</span></Label>
                                            <Col sm={9}>
                                                <AvField
                                                    name="branch_status"
                                                    type="select"
                                                    value={data.status != null ? data.status : ''}
                                                    validate={{ required: { value: true } }}
                                                >
                                                    <option value="">-- Select --</option>
                                                    <option value="A">Active</option>
                                                    <option value="I">Inactive</option>
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

export default UpdateUser;

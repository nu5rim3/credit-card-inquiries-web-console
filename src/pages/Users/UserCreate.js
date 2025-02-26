import React, { useState, useEffect } from "react"
import { Row, Col, Card, CardBody, CardTitle, Label, Input, Button, Alert } from "reactstrap"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import "./datatables.scss"

// Form Validations and Alerts
import { AvForm, AvField, AvCheckboxGroup, AvCheckbox } from "availity-reactstrap-validation"

import { createUser, getuserinfoById } from "store/users/saga";
import { getAllClcEntries } from "store/branches/saga";
import Spinner from 'components/Common/Spinner';

const UserCreate = (props) => {

    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState(false);
    const [status, setStatus] = useState(null)
    const [message, setMessage] = useState(null)
    const [visible, setVisible] = useState(false)
    const [form, setForm] = useState();
    const [branches, setBranches] = useState([]);
    const [branchName, setBranchName] = useState(null);
    const [aduser, setAduser] = useState(null);
    const [userInfo, setUserInfo] = useState(null);

    const onSubmit = (event, errors, values) => {

        if (branchName != null) {
            values['branchName'] = branchName;
        } else {
            values['branchName'] = userInfo.branchName;
        }

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

    const onChangeBranchName = (e) => {
        var index = e.nativeEvent.target.selectedIndex;
        var label = e.nativeEvent.target[index].text;
        setBranchName(label);
    }

    const searchUserInformation = () => {
        if (aduser === null) {
            setStatus(false)
            setMessage("Windows user ID is required!")
            setVisible(true)
        } else {
            setSearch(true)
            getuserinfoById(aduser.toUpperCase())
                .then(res => {
                    setSearch(false);
                    if (res.status === 200 && res.data.responseCode === "000") {
                        setUserInfo(res.data.responseObject.userDetails.length > 0 ? res.data.responseObject.userDetails[0] : null)
                    } else {
                        setStatus(false)
                        setMessage("Data fetching process is failed!")
                        setVisible(true)
                    }
                })
        }

        setTimeout(() => {
            setVisible(false)
        }, 5000)
    }

    useEffect(() => {
        const branches = () => {
            getAllClcEntries()
                .then(res => {
                    if (res.status === 200) {
                        setBranches(res.data.content);
                    }
                })
        };

        // Load branches
        branches();

    }, [setBranches]);

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
                                            <Col sm={7}>
                                                <AvField
                                                    name="windowsUserId"
                                                    placeholder="Enter PC ID"
                                                    type="text"
                                                    errorMessage="PC ID is required!"
                                                    onChange={(e) => setAduser(e.target.value)}
                                                    validate={{ required: { value: false } }}
                                                />
                                            </Col>
                                            <Col md={2}>
                                                <Button
                                                    type="button"
                                                    color="primary"
                                                    className="w-md d-flex justify-content-between"
                                                    onClick={() => searchUserInformation()}
                                                >Search
                                                    <Spinner type="search" loading={search} />
                                                </Button>
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
                                                    helpMessage="Max length is 255 characters!"
                                                    value={(userInfo != null && userInfo.empNo != null) ? userInfo.empNo : ''}
                                                    validate={{
                                                        required: { value: true },
                                                        maxLength: { value: 225 }
                                                    }}
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
                                                    value={(userInfo != null && userInfo.email != null) ? userInfo.email : ''}
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
                                                    helpMessage="All characters should be uppercase!"
                                                    validate={{
                                                        required: { value: true },
                                                        pattern: { value: /^([0-9]{9}[X|V]|[0-9]{12})$/m }
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
                                                    value={(userInfo != null && userInfo.contactNo != null) ? userInfo.contactNo : ''}
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
                                                    value={(userInfo != null && userInfo.userName != null) ? userInfo.userName : ''}
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
                                                    placeholder="Select Branch Code"
                                                    type="select"
                                                    errorMessage="Branch is required!"
                                                    value={(userInfo != null && userInfo.branchCode != null) ? userInfo.branchCode : ''}
                                                    onChange={(e) => onChangeBranchName(e)}
                                                    validate={{ required: { value: true } }}
                                                >
                                                    <option value="">-- Select --</option>
                                                    {branches.length > 0 &&
                                                        branches.map((b, i) => <option key={i} value={b.branchCode}>{b.branchDes}</option>)
                                                    }
                                                </AvField>
                                            </Col>
                                        </div>
                                        <div className="row mb-4">
                                            <Label
                                                htmlFor="horizontal-password-Input"
                                                className="col-sm-3 col-form-label"
                                            >Card Type<span className="text-danger">*</span></Label>
                                            <Col sm={9}>

                                                <AvCheckboxGroup  name="cardType" errorMessage="Card Type is required!" validate={{ required: { value: true } }}>
                                                    <AvCheckbox label="General Credit Card" value="GEN" />
                                                    <AvCheckbox label="Swairee Credit Card" value="SW" />

                                                </AvCheckboxGroup>
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

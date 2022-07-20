import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom";
import { Row, Col, Card, CardBody, CardTitle, Label, Input, Button, Alert } from "reactstrap"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import "./datatables.scss"

// Form Validations and Alerts
import { AvForm, AvField, AvCheckboxGroup, AvCheckbox } from "availity-reactstrap-validation"

import { getuserById, updateUser } from "store/users/saga";
import { getAllClcEntries } from "store/branches/saga";
import Spinner from 'components/Common/Spinner';

const UpdateUser = (props) => {

    const { id } = useParams()

    const [loading, setLoading] = useState(false)
    const [status, setStatus] = useState(null)
    const [message, setMessage] = useState(null)
    const [visible, setVisible] = useState(false)
    const [sWChecked, setSWChecked] = useState(false);
    const [gENChecked, setGENChecked] = useState(false);

    const [swValue, setSwValue] = useState(null);
    const [genValue, setGenValue] = useState(null);
    const [data, setData] = useState({})
    const [form, setForm] = useState()
    const [branches, setBranches] = useState([]);
    const [branchName, setBranchName] = useState(null);

    const onSubmit = (event, errors, values) => {
        if (branchName != null) {
            values['branchName'] = branchName;
        } else {
            for (let b of branches) {
                if (b.branchCode === values['branchCode']) {
                    values['branchName'] = b.branchDes;

                }
            }
        }
        console.log("type " + values['cardType']);
        console.log("type " + values['cardType'][0]);
        console.log("type " + values['cardType'][1]);
        // if (sWChecked === true) {
        //     values['cardType'] = 'SW';
        // } else if (gENChecked === true) {
        //     values['cardType'] = 'GEN';
        // }
        // console.log("after " + values['cardType']);


        if (errors.length === 0) {
            setLoading(true);

            updateUser(values)
                .then(res => {
                    if (res.status === 200) {
                        setStatus(true);
                        setMessage(res.data.message)
                        setVisible(true)
                        form && form.reset();
                        setSWChecked(false);
                        setGENChecked(false);
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

    const onChangeBranchName = (e) => {
        var index = e.nativeEvent.target.selectedIndex;
        var label = e.nativeEvent.target[index].text;
        setBranchName(label);
    }
    const cardTypeHandler = (e) => {
        console.log("e.target.value  " + e.target.value)
        if (e.target.value === 'SW') {
            setSWChecked(e.target.checked);
            setSwValue('SW');
        } else if (e.target.value === 'GEN') {
            setGENChecked(e.target.checked);
            setGenValue('GEN');
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
                        setMessage("Data Loaded!");
                        setVisible(true);
                        setData(res.data);
                        let cardArray = res.data.cardType;

                        for (let index = 0; index < cardArray.length; ++index) {
                            if (cardArray[index] === 'SW') {
                                setSWChecked(true);
                                setSwValue('SW');
                            } else if (cardArray[index] === 'GEN') {
                                setGENChecked(true);
                                setGenValue('GEN');
                            }
                        }
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
    }, [setData, setSWChecked, setGENChecked, setSwValue, setGenValue])

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

    }, [setBranches, setSWChecked, setGENChecked]);

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
                                                    disabled
                                                    value={data.employeeId != null ? data.employeeId : ''}
                                                    helpMessage="Max length is 255 characters!"
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
                                                    value={data.email != null ? data.email : ''}
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
                                                    placeholder="Select Branch Code"
                                                    type="select"
                                                    errorMessage="Branch is required!"
                                                    onChange={(e) => onChangeBranchName(e)}
                                                    value={data.branchCode != null ? data.branchCode : ''}
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

                                                <AvCheckboxGroup inline name="cardType"
                                                    // defaultValue={gENChecked === true ? ['GEN'] : (sWChecked === true ? ['SW'] : (gENChecked === true && sWChecked === true ? ['GEN', 'SW'] : ''))}
                                                    errorMessage="Card Type is required!" onChange={(e) => cardTypeHandler(e)}
                                                    validate={{ required: { value: true } }}

                                                >
                                                    <AvCheckbox label="General Credit Card" value='GEN' checked={gENChecked} />
                                                    <AvCheckbox label="Swairee Credit Card" value='SW' checked={sWChecked} />

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

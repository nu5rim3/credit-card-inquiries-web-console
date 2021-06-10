import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import { MDBDataTable } from "mdbreact"
import { Row, Col, Card, CardBody, CardTitle, Alert } from "reactstrap"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import "./datatables.scss"

import { getAllEntries, getuserById } from "store/users/saga";
import { useForm } from 'react-hook-form';
import Spinner from 'components/Common/Spinner';
import { format } from "prettier";

const Application = (props) => {

  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [allUsers, setAllUsers] = useState(false);
  const [list, setList] = useState([]);
  const [status, setStatus] = useState(null)
  const [message, setMessage] = useState(null)
  const [visible, setVisible] = useState(false)

  const { register, handleSubmit, trigger, watch, errors } = useForm();


  const onSubmit = (data) => {
    setLoading2(true)
    getuserById(data)
      .then(res => {
        if (res.status === 200) {
          setStatus(true);
          setMessage("Data Loaded!")
          setVisible(true)
          setList([])
          setList((o) => [...o, 
            {
              createdBy: res.data.createdBy,
              createdAt: res.data.createdAt,
              updatedBy: res.data.updatedBy,
              updatedAt: res.data.updatedAt,
              empIdPk: res.data.empIdPk,
              windowsUserId: res.data.windowsUserId,
              employeeId: res.data.employeeId,
              email: res.data.email,
              nic: res.data.nic,
              contactNo: res.data.contactNo,
              fullName: res.data.fullName,
              branchCode: res.data.branchCode,
              branchName: res.data.branchName,
              version: res.data.version,
              status: res.data.status,
              option: <div>
                <Link to={`/users/update/${res.data.employeeId}`}
                  className="btn btn-success btn-sm waves-effect waves-light">
                  <span className="d-flex"><Spinner type="none" loading={downloading} />  Update</span>
                </Link>
              </div>
            }
          ])
        } else {
          setStatus(false)
          setMessage(res.data.message)
          setVisible(true)
        }
        setLoading2(false)
      })

    setTimeout(() => {
      setVisible(false)
    }, 5000);
  }

  const getAllUsers = () => {
    setAllUsers(true);
    getAllEntries()
      .then((data) => {
        var dataSet = [];
        data.forEach(e => {
          dataSet.push({
            createdBy: e.createdBy,
            createdAt: e.createdAt,
            updatedBy: e.updatedBy,
            updatedAt: e.updatedAt,
            empIdPk: e.empIdPk,
            windowsUserId: e.windowsUserId,
            employeeId: e.employeeId,
            email: e.email,
            nic: e.nic,
            contactNo: e.contactNo,
            fullName: e.fullName,
            branchCode: e.branchCode,
            branchName: e.branchName,
            version: e.version,
            status: e.status,
            option: <div>
                <Link to={`/users/update/${res.data.employeeId}`}
                  className="btn btn-success btn-sm waves-effect waves-light">
                  <span className="d-flex"><Spinner type="none" loading={downloading} />  Update</span>
                </Link>
              </div>
          });
        });
        setAllUsers(false);
        setList(dataSet);
      })
  }

  const data = {
    columns: [
      {
        label: "Employee ID",
        field: "employeeId",
        sort: "asc",
        width: 150,
      },
      {
        label: "Full Name",
        field: "fullName",
        sort: "asc",
        width: 270,
      },
      {
        label: "Branch Name",
        field: "branchName",
        sort: "asc",
        width: 200,
      },
      {
        label: "Contact No",
        field: "contactNo",
        sort: "asc",
        width: 100,
      },
      {
        label: "Email",
        field: "email",
        sort: "asc",
        width: 150,
      },
      {
        label: "Options",
        field: "option",
        sort: "asc",
        width: 150,
      }
    ],
    rows: list,
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <div className="container-fluid">
          <Breadcrumbs title="Master" breadcrumbItem="Users" />
          <Row>
            <Col className="col-12">
              <Card>
                <CardBody>
                  <CardTitle>Filters </CardTitle>
                  <form onSubmit={handleSubmit(onSubmit)}>
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
                    <Row className="my-4">
                      <Col className="col-8">
                        <div className="form-group row">
                          <label
                            htmlFor="example-date-input"
                            className="col-md-3 col-form-label">MEO/Agent ID: </label>
                          <div className="col-md-7">
                            <input ref={register({ required: true })}
                              className="form-control"
                              type="text"
                              name="meo_id" id="meo_id" />
                            <p>{errors.meo_id?.message}</p>
                          </div>
                        </div>
                      </Col>
                      <Col className="col-4">
                        <div className="d-flex justify-content-end">
                          <button
                            type="submit" className="btn btn-primary waves-effect waves-light">
                            <span className="d-flex"><Spinner type="search" loading={loading2} />  Search</span>
                          </button>
                          <button onClick={getAllUsers}
                            type="button" className="btn btn-success waves-effect waves-light ml-2">
                            <span className="d-flex"><Spinner type="data" loading={allUsers} />  All Users</span>
                          </button>
                          <Link to="/users/create"
                            className="btn btn-primary waves-effect waves-light ml-2">
                            <span className="d-flex"> Create User</span>
                          </Link>
                        </div>
                      </Col>
                    </Row>
                  </form>
                  <MDBDataTable responsive bordered data={data} />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </React.Fragment>
  )
}

Number.prototype.padLeft = function (base, chr) {
  var len = (String(base || 10).length - String(this).length) + 1;
  return len > 0 ? new Array(len).join(chr || '0') + this : this;
}

export default Application;

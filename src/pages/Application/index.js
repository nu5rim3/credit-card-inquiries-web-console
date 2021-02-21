import React, { useState } from "react"
import { Link } from "react-router-dom";
import { MDBDataTable } from "mdbreact"
import { Row, Col, Card, CardBody, CardTitle } from "reactstrap"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import "./datatables.scss"

import { getAllEntries, getCsvFileByRefNo, getCsvAllData } from "store/applications/saga";
import { useForm } from 'react-hook-form';
import Spinner from 'components/Common/Spinner';
import { format } from "prettier";

const Application = (props) => {

  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [bulkDownloading, setBulkDownloading] = useState(false);
  const [list, setList] = useState([]);

  const { register, handleSubmit, trigger, watch } = useForm();
  // hasDocument
  const onSubmit = (data) => {
    setLoading(true);
    getAllEntries(data.date_from, data.date_to)
      .then((data) => {
        var dataSet = [];
        data.forEach(e => {
          dataSet.push({
            referenceNo: e.referenceNo,
            nicNo: e.nic,
            fullName: e.customer.fullName,
            contactNo: e.mobileNumber,
            date: formatDateTime(e.createdAt),
            option: <div>
              <button onClick={() => downloadCsvFile(e)}
                type="button" className="btn btn-success btn-sm waves-effect waves-light">
                <span className="d-flex"><Spinner type="download" loading={downloading} />  Download</span>
              </button>
              {getViewDocument(e)}
            </div>
          });
        });
        setLoading(false);
        setList(dataSet);
      })
  }

  const getViewDocument = (e) => {
    if (e.hasDocument === true) {
      return (<Link to={`view-documents/` + e.referenceNo}
        type="button" className="btn btn-primary btn-sm waves-effect waves-light mt-sm-2 mt-xl-0 ml-xl-2">
        <span className="d-flex"><Spinner type="images" loading={false} />  Documents</span>
      </Link>);
    } else {
      return null;
    }
  }

  const downloadCsvFile = (e) => {
    setDownloading(true);
    getCsvFileByRefNo(e.referenceNo)
      .then((status) => {
        if (status) {
          setDownloading(false);
        }
      })
  }

  const downloadBulkCsvFile = () => {
    var data = watch();
    trigger('date_from');
    trigger('date_to');
    setBulkDownloading(true);
    getCsvAllData(data.date_from, data.date_to)
      .then((status) => {
        if (status) {
          setBulkDownloading(false);
        }
      })
  }

  const formatDateTime = (dateTime) => {
    var d = new Date(dateTime),
      dformat = [(d.getMonth() + 1).padLeft(),
      d.getDate().padLeft(),
      d.getFullYear()].join('/') + ' ' +
        [d.getHours().padLeft(),
        d.getMinutes().padLeft(),
        d.getSeconds().padLeft()].join(':');
    return dformat;
  }

  const data = {
    columns: [
      {
        label: "Reference No",
        field: "referenceNo",
        sort: "asc",
        width: 150,
      },
      {
        label: "NIC No",
        field: "nicNo",
        sort: "asc",
        width: 270,
      },
      {
        label: "Full Name",
        field: "fullName",
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
        label: "Registered Date",
        field: "date",
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
          <Breadcrumbs title="Application" breadcrumbItem="Details" />
          <Row>
            <Col className="col-12">
              <Card>
                <CardBody>
                  <CardTitle>Filters </CardTitle>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <Row className="my-4">
                      <Col className="col-4">
                        <div className="form-group row">
                          <label
                            htmlFor="example-date-input"
                            className="col-md-3 col-form-label">From Date: </label>
                          <div className="col-md-9">
                            <input ref={register({ required: true })}
                              className="form-control"
                              type="date"
                              defaultValue={new Date().toISOString().slice(0, 10)}
                              name="date_from" id="date_from" />
                          </div>
                        </div>
                      </Col>
                      <Col className="col-4">
                        <div className="form-group row">
                          <label
                            htmlFor="example-date-input"
                            className="col-md-3 col-form-label">To Date: </label>
                          <div className="col-md-9">
                            <input ref={register({ required: true })}
                              className="form-control"
                              type="date"
                              defaultValue={new Date().toISOString().slice(0, 10)}
                              name="date_to" id="date_to" />
                          </div>
                        </div>
                      </Col>
                      <Col className="col-4">
                        <div className="d-flex justify-content-end">
                          <button
                            type="submit" className="btn btn-primary waves-effect waves-light">
                            <span className="d-flex"><Spinner type="search" loading={loading} />  Search</span>
                          </button>
                          <button onClick={downloadBulkCsvFile}
                            type="button" className="btn btn-success waves-effect waves-light ml-2">
                            <span className="d-flex"><Spinner type="download" loading={bulkDownloading} />  Bulk Download</span>
                          </button>
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

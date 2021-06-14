import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import { MDBDataTable } from "mdbreact"
import { Row, Col, Card, CardBody, CardTitle, Pagination, PaginationItem, PaginationLink } from "reactstrap"
import ReactPaginate from 'react-paginate';


//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import "./datatables.scss"

import { getAllEntries, getCsvFileByRefNo, getCsvAllData } from "store/applications/saga";
import { useForm } from 'react-hook-form';
import Spinner from 'components/Common/Spinner';

const Application = () => {

  const OFFSET = 10;

  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [bulkDownloading, setBulkDownloading] = useState(false);
  const [page, setPage] = useState(0);
  const [data, setData] = useState([]);
  const [date, setDate] = useState(null);

  const { register, handleSubmit, trigger, watch } = useForm();

  const onLoadData = (date, page) => {
    if (date != null && date != null) {
      setLoading(true);
      getAllEntries(date.date_from, date.date_to, page, OFFSET)
        .then((res) => {
          var dataSet = [];
          if (res !== undefined && res.data.content != undefined) {
            res.data.content.forEach(e => {
              dataSet.push({
                referenceNo: e.referenceNo,
                nicNo: e.nic,
                fullName: (e.customer != null ? e.customer.fullName : ''),
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
            setData(dataSet);
            setPage(0)
            setPage(res.data.totalPages);
          } else {
            setLoading(false);
          }
        })
    }
  }

  // hasDocument
  const onSubmit = (data) => {
    if (data.date_from != null && data.date_to != null) {
      setDate(data);
      onLoadData(data, 0);
    }
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

  const handlePageClick = (data) => {
    let selected = data.selected;
    setPage(0);
    setPage(selected);
    onLoadData(date, selected);
  }

  const pagination = () => {
    return (
      <ReactPaginate
        previousLabel={'Previous'}
        nextLabel={'Next'}
        breakLabel={'...'}
        pageCount={page}
        marginPagesDisplayed={2}
        pageRangeDisplayed={4}
        previousClassName={'page-item'}
        previousLinkClassName={'page-link'}
        containerClassName={'pagination'}
        pageClassName={'page-item'}
        pageLinkClassName={'page-link'}
        activeClassName="active"
        nextClassName={'page-item'}
        nextLinkClassName={'page-link'}
        breakClassName={'page-item'}
        breakLinkClassName={'page-link'}
        onPageChange={handlePageClick}
      />
    )
  }

  const items = {
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
    rows: data,
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
                  <MDBDataTable
                    responsive
                    striped
                    bordered
                    data={items}
                    paging={false}
                  />

                  <div className="d-flex flex-row-reverse">
                    {pagination()}
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Application;

import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import { MDBDataTable } from "mdbreact"
import { Row, Col, Card, CardBody, CardTitle, Alert } from "reactstrap"
import ReactPaginate from 'react-paginate';

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import "./datatables.scss"

import { getAllEntries, getBranchById } from "store/branches/saga";
import { useForm } from 'react-hook-form';
import Spinner from 'components/Common/Spinner';

const Branches = (props) => {

  const OFFSET = 10;

  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [allBranches, setAllBranches] = useState(false);
  const [status, setStatus] = useState(null)
  const [message, setMessage] = useState(null)
  const [visible, setVisible] = useState(false)
  const [page, setPage] = useState(0);
  const [data, setData] = useState([]);
  const [date, setDate] = useState(null);

  const { register, handleSubmit, trigger, watch, errors } = useForm();


  const onSubmit = (data) => {
    setLoading2(true)
    getBranchById(data)
      .then(res => {
        if (res.status === 200) {
          setStatus(true);
          setMessage("Data Loaded!")
          setVisible(true)
          setData([])
          setData((o) => [...o,
            {
              createdBy: res.data.createdBy,
              createdAt: res.data.createdAt,
              updatedBy: res.data.updatedBy,
              updatedAt: res.data.updatedAt,
              code: res.data.code,
              description: res.data.description,
              district: res.data.district,
              branchZone: res.data.branchZone,
              companyCode: res.data.companyCode,
              status: <>
                {res.data.status === "A" ? <button className="btn btn-success btn-sm waves-effect waves-light">Active</button> : <button className="btn btn-danger btn-sm waves-effect waves-light">Inactive</button>}
              </>,
              option: <div>
                <Link to={`/branches/update/${res.data.code}`}
                  className="btn btn-success btn-sm waves-effect waves-light">
                  <span className="d-flex"><Spinner type="none" loading={downloading} />  Update</span>
                </Link>
              </div>
            }
          ])
        } else {
          setStatus(false)
          setMessage(res.data)
          setVisible(true)
        }
        setLoading2(false)
      })

    setInterval(() => {
      setVisible(false)
    }, 5000);
  }

  const onLoadData = (page) => {
    setAllBranches(true);
    getAllEntries(page, OFFSET)
      .then((res) => {
        var dataSet = [];
        if (res !== undefined && res.data.content != undefined) {
          res.data.content.forEach(e => {
            dataSet.push({
              createdBy: e.createdBy,
              createdAt: e.createdAt,
              updatedBy: e.updatedBy,
              updatedAt: e.updatedAt,
              code: e.code,
              description: e.description,
              district: e.district,
              branchZone: e.branchZone,
              companyCode: e.companyCode,
              status: <>
                {e.status === "A" ? <button className="btn btn-success btn-sm waves-effect waves-light">Active</button> : <button className="btn btn-danger btn-sm waves-effect waves-light">Inactive</button>}
              </>,
              option: <div>
                <Link to={`/branches/update/${e.code}`}
                  className="btn btn-success btn-sm waves-effect waves-light">
                  <span className="d-flex"><Spinner type="none" loading={downloading} />  Update</span>
                </Link>
              </div>
            });
          });
          setAllBranches(false);
          setData(dataSet);
          setPage(0)
          setPage(res.data.totalPages);
        } else {
          setAllBranches(false);
        }
      })
  }

  const getallBranches = () => {
    onLoadData(0);
  }

  const handlePageClick = (data) => {
    let selected = data.selected;
    setPage(0);
    setPage(selected);
    onLoadData(selected);
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
        label: "Branch Code",
        field: "code",
        sort: "asc",
        width: 150,
      },
      {
        label: "Branch Name",
        field: "description",
        sort: "asc",
        width: 270,
      },
      {
        label: "Branch Zone",
        field: "branchZone",
        sort: "asc",
        width: 200,
      },
      {
        label: "District",
        field: "district",
        sort: "asc",
        width: 100,
      },
      {
        label: "Status",
        field: "status",
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
                            className="col-md-3 col-form-label">Branch Code: </label>
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
                          <button onClick={getallBranches}
                            type="button" className="btn btn-success waves-effect waves-light ml-2">
                            <span className="d-flex"><Spinner type="data" loading={allBranches} />  All Branches</span>
                          </button>
                          <Link to="/branches/create"
                            className="btn btn-primary waves-effect waves-light ml-2 d-flex">
                            <i className="bx bxs-buildings font-size-16 align-middle mr-2"></i>
                            <span className="d-flex"> Create Branch</span>
                          </Link>
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

Number.prototype.padLeft = function (base, chr) {
  var len = (String(base || 10).length - String(this).length) + 1;
  return len > 0 ? new Array(len).join(chr || '0') + this : this;
}

export default Branches;

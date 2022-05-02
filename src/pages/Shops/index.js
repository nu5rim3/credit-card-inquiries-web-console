import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import { MDBDataTable } from "mdbreact"
import { Row, Col, Card, CardBody, CardTitle, Alert } from "reactstrap"
import ReactPaginate from 'react-paginate';

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import "./datatables.scss"

import { getAllShops, getShopById, getShopQRByCode } from "store/shops/saga";
import { useForm } from 'react-hook-form';
import Spinner from 'components/Common/Spinner';

const Shops = (props) => {

    const OFFSET = 10;

    const [loading, setLoading] = useState(false);
    const [loading2, setLoading2] = useState(false);
    const [downloading, setDownloading] = useState(false);
    const [allShops, setAllShops] = useState(false);
    const [status, setStatus] = useState(null)
    const [message, setMessage] = useState(null)
    const [visible, setVisible] = useState(false)
    const [page, setPage] = useState(0);
    const [data, setData] = useState([]);


    const { register, handleSubmit, trigger, watch, errors } = useForm();


    const onSubmit = (data) => {
        setLoading2(true)
        getShopById(data)
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
                        shopIdPk: res.data.shopIdPk,
                        shopCode: res.data.shopCode,
                        shopDescription: res.data.shopDescription,
                        email: res.data.email,
                        nic: res.data.nic,
                        contactNo: res.data.contactNo,
                        shopName: res.data.shopName,
                        cardType: (res.data.cardType === 'SW') ? "Swairee Credit Card" : "General Credit Card",
                        version: res.data.version,
                        status: res.data.status,
                        option: <div>
                            <button onClick={() => downloadQRCode(res.data)}
                                type="button" className="btn btn-primary btn-sm waves-effect waves-light">
                                <span className="d-flex"><Spinner type="download" loading={downloading} />  Download</span>
                            </button>
                            <Link to={`/shops/update/${res.data.shopCode}`}
                                className="btn btn-success btn-sm waves-effect waves-light mt-sm-2 mt-xl-0 ml-xl-2">
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

        setInterval(() => {
            setVisible(false)
        }, 5000);
    }

    const onLoadData = (page) => {
        setAllShops(true);
        getAllShops(page, OFFSET)
            .then((res) => {
                var dataSet = [];
                if (res !== undefined && res.data.content != undefined) {
                    console.log("res--" + res.shopCode)
                    res.data.content.forEach(e => {
                        dataSet.push({

                            shopCode: e.shopCode,
                            email: e.email,
                            contactNo: e.contactNo,
                            shopName: e.shopName,
                            shopDescription: e.shopDescription,
                            cardType: (e.cardType === 'SW') ? "Swairee Credit Card" : "General Credit Card",
                            option: <div>
                                <button onClick={() => downloadQRCode(e)}
                                    type="button" className="btn btn-primary btn-sm waves-effect waves-light">
                                    <span className="d-flex"><Spinner type="download" loading={downloading} />  Download</span>
                                </button>
                                <Link to={`/shops/update/${e.shopCode}`}
                                    type="button" className="btn btn-success btn-sm waves-effect waves-light mt-sm-2 mt-xl-0 ml-xl-2">
                                    <span className="d-flex"><Spinner type="none" loading={downloading} />  Update</span>
                                </Link>

                            </div>
                        });
                    });
                    setAllShops(false);
                    setData(dataSet);
                    setPage(0)
                    setPage(res.data.totalPages);
                } else {
                    setAllShops(false);
                }
            })
    }

    const getallShops = () => {
        onLoadData(0);
    }

    const downloadQRCode = (e) => {
        setDownloading(true);
        getShopQRByCode(e.shopCode)
            .then((status) => {
                if (status) {
                    setDownloading(false);
                }
            })
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
                label: "Shop No",
                field: "shopCode",
                sort: "asc",
                width: 150,
            },
            {
                label: "Shop Name",
                field: "shopName",
                sort: "asc",
                width: 270,
            },
            {
                label: "Card Type",
                field: "cardType",
                sort: "asc",
                width: 150,
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
                width: 100,
            },
            {
                label: "Options",
                field: "option",
                sort: "asc",
                width: 250,
            }
        ],
        rows: data,
    }

    return (
        <React.Fragment>
            <div className="page-content">
                <div className="container-fluid">
                    <Breadcrumbs title="Master" breadcrumbItem="Shops" />
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
                                                        className="col-md-3 col-form-label">Shop No: </label>
                                                    <div className="col-md-7">
                                                        <input ref={register({ required: true })}
                                                            className="form-control"
                                                            type="text"
                                                            name="shopCode" id="shopCode" />
                                                        <p>{errors.shopCode?.message}</p>
                                                    </div>
                                                </div>
                                            </Col>
                                            <Col className="col-4">
                                                <div className="d-flex justify-content-end">
                                                    <button
                                                        type="submit" className="btn btn-primary waves-effect waves-light">
                                                        <span className="d-flex"><Spinner type="search" loading={loading2} />  Search</span>
                                                    </button>
                                                    <button onClick={getallShops}
                                                        type="button" className="btn btn-success waves-effect waves-light ml-2">
                                                        <span className="d-flex"><Spinner type="data" loading={allShops} />  All Shops</span>
                                                    </button>
                                                    <Link to="/shops/create"
                                                        className="btn btn-primary waves-effect waves-light ml-2 d-flex">
                                                        <i className="bx bx-user font-size-16 align-middle mr-2"></i>
                                                        <span className="d-flex"> Create Shop</span>
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

export default Shops;

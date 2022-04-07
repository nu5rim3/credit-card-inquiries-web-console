import React, { Component } from 'react'
import { MDBDataTable } from "mdbreact"
import { Row, Col, Card, CardBody, CardTitle } from "reactstrap"
import Viewer from 'react-viewer';
import { Link } from "react-router-dom";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

import { getAllDocuments, getImageViewUrl } from "store/documents/saga";
import { getToken } from "helpers/api_helper";

export default class index extends Component {

    constructor(props) {
        super(props);
        this.state = {
            identificationImages: [],
            billingProofImages: [],
            IncomeProofsImages: [],
            SupportiveImages: [],
            GuarantorImages: [],
            identification: false,
            billing: false,
            income: false,
            supportive: false
        }
    }

    async componentDidMount() {
        var token = await getToken().then(res => res);
        if (this.props.match.params.refNo != null) {
            var imagesSet1 = [];
            var imagesSet2 = [];
            var imagesSet3 = [];
            var imagesSet4 = [];
            var imagesSet5 = [];
            await getAllDocuments(this.props.match.params.refNo)
                .then(res => {
                    res.forEach((r) => {
                        if (r.fileCategory === 'identification_document_1') {
                            imagesSet1.push({ src: `${getImageViewUrl()}/${r.filePath}?access_token=${token}&type=${r.fileType.toLowerCase()}`, type: r.fileType })
                        }
                        if (r.fileCategory === 'identification_document_2') {
                            imagesSet2.push({ src: `${getImageViewUrl()}/${r.filePath}?access_token=${token}&type=${r.fileType.toLowerCase()}`, type: r.fileType })
                        }
                        if (r.fileCategory === 'income_proof_document') {
                            imagesSet3.push({ src: `${getImageViewUrl()}/${r.filePath}?access_token=${token}&type=${r.fileType.toLowerCase()}`, type: r.fileType })
                        }
                        if (r.fileCategory === 'other_supporting_document') {
                            imagesSet4.push({ src: `${getImageViewUrl()}/${r.filePath}?access_token=${token}&type=${r.fileType.toLowerCase()}`, type: r.fileType })
                        }
                        if (r.fileCategory === 'g_identification_documents') {
                            imagesSet5.push({ src: `${getImageViewUrl()}/${r.filePath}?access_token=${token}&type=${r.fileType.toLowerCase()}`, type: r.fileType })
                        }
                    })
                });
        }

        this.setState({ identificationImages: imagesSet1, billingProofImages: imagesSet2, IncomeProofsImages: imagesSet3, SupportiveImages: imagesSet4, GuarantorImages: imagesSet5 });
    }

    getIdentificationImages() {
        const { identificationImages } = this.state;

        if (identificationImages.length > 0) {
            return <div>
                <Row>
                    {identificationImages.map((item, index) => {
                        if (item.type.toLowerCase() === 'image/jpeg' || item.type.toLowerCase() === 'image/png' || item.type.toLowerCase() === 'image/apng') {
                            return (
                                <Col key={index.toString()} className="img-item col-3">

                                    <img src={item.src} style={{ width: '100%' }} onClick={() => {
                                        this.setState({
                                            identification: true,
                                            activeIndex: index,
                                        });
                                    }} />
                                </Col>
                            );
                        } else {
                            return <Col key={index.toString()} className="img-item col-3">
                                <Link to={`/view-documents/file${item.src}`}
                                    className="btn btn-primary" ><i className="bx bx-file-blank mr-2"></i>View File</Link>
                            </Col>
                        }
                    })}
                </Row>
                <Viewer
                    visible={this.state.identification}
                    onClose={() => { this.setState({ identification: false }); }}
                    images={identificationImages}
                />
            </div>
        } else {
            return null;
        }
    }

    getBillingProofImages() {
        const { billingProofImages } = this.state;

        if (billingProofImages.length > 0) {
            return <div>
                <Row>
                    {billingProofImages.map((item, index) => {
                        if (item.type.toLowerCase() === 'image/jpeg' || item.type.toLowerCase() === 'image/png' || item.type.toLowerCase() === 'image/apng') {
                            return (
                                <Col key={index.toString()} className="img-item col-3">
                                    <img src={item.src} style={{ width: '100%' }} onClick={() => {
                                        this.setState({
                                            billing: true,
                                            activeIndex: index,
                                        });
                                    }} />
                                </Col>
                            );
                        } else {
                            return <Col key={index.toString()} className="img-item col-3">
                                <Link to={`/view-documents/file${item.src}`}
                                    className="btn btn-primary" ><i className="bx bx-file-blank mr-2"></i>View File</Link>
                            </Col>
                        }
                    })}
                </Row>
                <Viewer
                    visible={this.state.billing}
                    onClose={() => { this.setState({ billing: false }); }}
                    images={billingProofImages}
                />
            </div>
        } else {
            return null;
        }
    }

    getIncomeProofImages() {
        const { IncomeProofsImages } = this.state;

        if (IncomeProofsImages.length > 0) {
            return <div>
                <Row>
                    {IncomeProofsImages.map((item, index) => {
                        if (item.type.toLowerCase() === 'image/jpeg' || item.type.toLowerCase() === 'image/png' || item.type.toLowerCase() === 'image/apng') {
                            return (
                                <Col key={index.toString()} className="img-item col-3">
                                    <img src={item.src} style={{ width: '100%' }} onClick={() => {
                                        this.setState({
                                            income: true,
                                            activeIndex: index,
                                        });
                                    }} />
                                </Col>
                            );
                        } else {
                            return <Col key={index.toString()} className="img-item col-3">
                                <Link to={`/view-documents/file${item.src}`}
                                    className="btn btn-primary" ><i className="bx bx-file-blank mr-2"></i>View File</Link>
                            </Col>
                        }
                    })}
                </Row>
                <Viewer
                    visible={this.state.income}
                    onClose={() => { this.setState({ income: false }); }}
                    images={IncomeProofsImages}
                />
            </div>
        } else {
            return null;
        }
    }

    getSupportiveImages() {
        const { SupportiveImages } = this.state;

        if (SupportiveImages.length > 0) {
            return <div>
                <Row>
                    {SupportiveImages.map((item, index) => {
                        if (item.type.toLowerCase() === 'image/jpeg' || item.type.toLowerCase() === 'image/png' || item.type.toLowerCase() === 'image/apng') {
                            return (
                                <Col key={index.toString()} className="img-item col-3">
                                    <img src={item.src} style={{ width: '100%' }} onClick={() => {
                                        this.setState({
                                            supportive: true,
                                            activeIndex: index,
                                        });
                                    }} />
                                </Col>
                            );
                        } else {
                            return <Col key={index.toString()} className="img-item col-3">
                                <Link to={`/view-documents/file${item.src}`}
                                    className="btn btn-primary" ><i className="bx bx-file-blank mr-2"></i>View File</Link>
                            </Col>
                        }

                    })}
                </Row>
                <Viewer
                    visible={this.state.supportive}
                    onClose={() => { this.setState({ supportive: false }); }}
                    images={SupportiveImages}
                />
            </div>
        } else {
            return null;
        }
    }

    getGuarantorImages() {
        const { GuarantorImages } = this.state;

        if (GuarantorImages.length > 0) {
            return <div>
                <Row>
                    {GuarantorImages.map((item, index) => {
                        if (item.type.toLowerCase() === 'image/jpeg' || item.type.toLowerCase() === 'image/png' || item.type.toLowerCase() === 'image/apng') {
                            return (
                                <Col key={index.toString()} className="img-item col-3">
                                    <img src={item.src} style={{ width: '100%' }} onClick={() => {
                                        this.setState({
                                            supportive: true,
                                            activeIndex: index,
                                        });
                                    }} />
                                </Col>
                            );
                        } else {
                            return <Col key={index.toString()} className="img-item col-3">
                                <Link to={`/view-documents/file${item.src}`}
                                    className="btn btn-primary" ><i className="bx bx-file-blank mr-2"></i>View File</Link>
                            </Col>
                        }

                    })}
                </Row>
                <Viewer
                    visible={this.state.supportive}
                    onClose={() => { this.setState({ supportive: false }); }}
                    images={GuarantorImages}
                />
            </div>
        } else {
            return null;
        }
    }

    render() {

        return (
            <React.Fragment>
                <div className="page-content">
                    <div className="container-fluid">
                        <Breadcrumbs title="Applications" breadcrumbItem="General Application Documents" />
                        <Row>
                            <Col className="col-12">
                                Documents of {this.props.match.params.refNo}
                                <Card className="mt-4">
                                    <CardBody>
                                        <CardTitle>Identification Documents</CardTitle>
                                        {this.getIdentificationImages()}
                                    </CardBody>
                                </Card>

                                <Card>
                                    <CardBody>
                                        <CardTitle>Billing Proofs</CardTitle>
                                        {this.getBillingProofImages()}
                                    </CardBody>
                                </Card>

                                <Card>
                                    <CardBody>
                                        <CardTitle>Income Proofs</CardTitle>
                                        {this.getIncomeProofImages()}
                                    </CardBody>
                                </Card>

                                <Card>
                                    <CardBody>
                                        <CardTitle>Any Other Supporting Documents</CardTitle>
                                        {this.getSupportiveImages()}
                                    </CardBody>
                                </Card>

                                <Card>
                                    <CardBody>
                                        <CardTitle>Guarantor Documents</CardTitle>
                                        {this.getGuarantorImages()}
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

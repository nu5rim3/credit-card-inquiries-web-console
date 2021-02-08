import React, { Component } from 'react'
import { MDBDataTable } from "mdbreact"
import { Row, Col, Card, CardBody, CardTitle } from "reactstrap"
import Viewer from 'react-viewer';

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
            visible: false
        }
    }

    async componentDidMount() {
        var token = await getToken().then(res => res);
        if (this.props.match.params.refNo != null) {
            var imagesSet1 = [];
            var imagesSet2 = [];
            var imagesSet3 = [];
            var imagesSet4 = [];
            await getAllDocuments(this.props.match.params.refNo)
                .then(res => {
                    res.forEach((r) => {
                        if (r.fileCategory === 'identification_document_1') {
                            imagesSet1.push({ src: `${getImageViewUrl()}/${r.filePath}?access_token=${token}` })
                        }
                        if (r.fileCategory === 'identification_document_2') {
                            imagesSet2.push({ src: `${getImageViewUrl()}/${r.filePath}?access_token=${token}` })
                        }
                        if (r.fileCategory === 'income_proof_document') {
                            imagesSet3.push({ src: `${getImageViewUrl()}/${r.filePath}?access_token=${token}` })
                        }
                        if (r.fileCategory === 'other_supporting_document') {
                            imagesSet4.push({ src: `${getImageViewUrl()}/${r.filePath}?access_token=${token}` })
                        }
                    })
                });
        }

        this.setState({ identificationImages: imagesSet1, billingProofImages: imagesSet2, IncomeProofsImages: imagesSet3, SupportiveImages: imagesSet4 });
    }

    getIdentificationImages() {
        const { identificationImages } = this.state;

        if (identificationImages.length > 0) {
            return <div>
                <Row>
                    {identificationImages.map((item, index) => {
                        return (
                            <Col key={index.toString()} className="img-item col-3">
                                <img src={item.src} style={{ width: '100%' }} onClick={() => {
                                    this.setState({
                                        visible: true,
                                        activeIndex: index,
                                    });
                                }} />
                            </Col>
                        );
                    })}
                </Row>
                <Viewer
                    visible={this.state.visible}
                    onClose={() => { this.setState({ visible: false }); }}
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
                        return (
                            <Col key={index.toString()} className="img-item col-3">
                                <img src={item.src} style={{ width: '100%' }} onClick={() => {
                                    this.setState({
                                        visible: true,
                                        activeIndex: index,
                                    });
                                }} />
                            </Col>
                        );
                    })}
                </Row>
                <Viewer
                    visible={this.state.visible}
                    onClose={() => { this.setState({ visible: false }); }}
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
                        return (
                            <Col key={index.toString()} className="img-item col-3">
                                <img src={item.src} style={{ width: '100%' }} onClick={() => {
                                    this.setState({
                                        visible: true,
                                        activeIndex: index,
                                    });
                                }} />
                            </Col>
                        );
                    })}
                </Row>
                <Viewer
                    visible={this.state.visible}
                    onClose={() => { this.setState({ visible: false }); }}
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
                        return (
                            <Col key={index.toString()} className="img-item col-3">
                                <img src={item.src} style={{ width: '100%' }} onClick={() => {
                                    this.setState({
                                        visible: true,
                                        activeIndex: index,
                                    });
                                }} />
                            </Col>
                        );
                    })}
                </Row>
                <Viewer
                    visible={this.state.visible}
                    onClose={() => { this.setState({ visible: false }); }}
                    images={SupportiveImages}
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
                        <Breadcrumbs title="Application" breadcrumbItem="Documents" />
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
                                        { this.getIncomeProofImages() }
                                    </CardBody>
                                </Card>

                                <Card>
                                    <CardBody>
                                        <CardTitle>Any Other Supporting Documents</CardTitle>
                                        { this.getSupportiveImages() }
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

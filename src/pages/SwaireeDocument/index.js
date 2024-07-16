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
            OtherIncomeProofsImages: [],
            BnsCard: [],
            LatestSalarySlip: [],
            BankStatement: [],
            EmploymentIDImages: [],
            EmploymentConfirmationLetterImages: [],
            BusinessRegistrationCertificate: [],
            AccountStatement: [],
            identification: false,
            billing: false,
            otherIncome: false,
            bnsCard: false,
            salarySlip: false,
            bankStatement: false,
            employmentId: false,
            employmentConfirmationLetter: false,
            businessRegistrationCertificate: false,
            accountStatement: false,
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
            var imagesSet6 = [];
            var imagesSet7 = [];
            var imagesSet8 = [];
            var imagesSet9 = [];
            var imagesSet10 = [];

            await getAllDocuments(this.props.match.params.refNo)
                .then(res => {
                    res.forEach((r) => {
                        if (r.fileCategory === 'identification_document_1') {
                            imagesSet1.push({ src: `${getImageViewUrl()}/${r.filePath}?access_token=${token}&type=${r.fileType.toLowerCase()}`, type: r.fileType })
                        }
                        if (r.fileCategory === 'utility_bill_document_1') {
                            imagesSet2.push({ src: `${getImageViewUrl()}/${r.filePath}?access_token=${token}&type=${r.fileType.toLowerCase()}`, type: r.fileType })
                        }
                        if (r.fileCategory === 'other_income_proof_document') {
                            imagesSet3.push({ src: `${getImageViewUrl()}/${r.filePath}?access_token=${token}&type=${r.fileType.toLowerCase()}`, type: r.fileType })
                        }
                        if (r.fileCategory === 'bns_card') {
                            imagesSet4.push({ src: `${getImageViewUrl()}/${r.filePath}?access_token=${token}&type=${r.fileType.toLowerCase()}`, type: r.fileType })
                        }
                        if (r.fileCategory === 'latest_salary_slip') {
                            imagesSet5.push({ src: `${getImageViewUrl()}/${r.filePath}?access_token=${token}&type=${r.fileType.toLowerCase()}`, type: r.fileType })
                        }
                        if (r.fileCategory === 'bank_statement_document') {
                            imagesSet6.push({ src: `${getImageViewUrl()}/${r.filePath}?access_token=${token}&type=${r.fileType.toLowerCase()}`, type: r.fileType })
                        }
                        if (r.fileCategory === 'employment_id_1') {
                            imagesSet7.push({ src: `${getImageViewUrl()}/${r.filePath}?access_token=${token}&type=${r.fileType.toLowerCase()}`, type: r.fileType })
                        }
                        if (r.fileCategory === 'employment_confirmation_letter_1') {
                            imagesSet8.push({ src: `${getImageViewUrl()}/${r.filePath}?access_token=${token}&type=${r.fileType.toLowerCase()}`, type: r.fileType })
                        }
                        if (r.fileCategory === 'business_registration_certificate') {
                            imagesSet9.push({ src: `${getImageViewUrl()}/${r.filePath}?access_token=${token}&type=${r.fileType.toLowerCase()}`, type: r.fileType })
                        }
                        if (r.fileCategory === 'account_statement') {
                            imagesSet10.push({ src: `${getImageViewUrl()}/${r.filePath}?access_token=${token}&type=${r.fileType.toLowerCase()}`, type: r.fileType })
                        }
                    })
                });
        }

        this.setState({
            identificationImages: imagesSet1, billingProofImages: imagesSet2, OtherIncomeProofsImages: imagesSet3, BnsCard: imagesSet4, LatestSalarySlip: imagesSet5,
            BankStatement: imagesSet6, EmploymentIDImages: imagesSet7, EmploymentConfirmationLetterImages: imagesSet8,
            BusinessRegistrationCertificate: imagesSet9, AccountStatement: imagesSet10
        });
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

    getOtherIncomeProofImages() {
        const { OtherIncomeProofsImages } = this.state;

        if (OtherIncomeProofsImages.length > 0) {
            return <div>
                <Row>
                    {OtherIncomeProofsImages.map((item, index) => {
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
                    images={OtherIncomeProofsImages}
                />
            </div>
        } else {
            return null;
        }
    }

    getBnsCard() {
        const { BnsCard } = this.state;

        if (BnsCard.length > 0) {
            return <div>
                <Row>
                    {BnsCard.map((item, index) => {
                        if (item.type.toLowerCase() === 'image/jpeg' || item.type.toLowerCase() === 'image/png' || item.type.toLowerCase() === 'image/apng') {
                            return (
                                <Col key={index.toString()} className="img-item col-3">
                                    <img src={item.src} style={{ width: '100%' }} onClick={() => {
                                        this.setState({
                                            bnsCard: true,
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
                    visible={this.state.bnsCard}
                    onClose={() => { this.setState({ bnsCard: false }); }}
                    images={BnsCard}
                />
            </div>
        } else {
            return null;
        }
    }

    getLatestSalarySlip() {
        const { LatestSalarySlip } = this.state;

        if (LatestSalarySlip.length > 0) {
            return <div>
                <Row>
                    {LatestSalarySlip.map((item, index) => {
                        if (item.type.toLowerCase() === 'image/jpeg' || item.type.toLowerCase() === 'image/png' || item.type.toLowerCase() === 'image/apng') {
                            return (
                                <Col key={index.toString()} className="img-item col-3">
                                    <img src={item.src} style={{ width: '100%' }} onClick={() => {
                                        this.setState({
                                            salarySlip: true,
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
                    visible={this.state.salarySlip}
                    onClose={() => { this.setState({ salarySlip: false }); }}
                    images={LatestSalarySlip}
                />
            </div>
        } else {
            return null;
        }
    }
    getBankStatement() {
        const { BankStatement } = this.state;

        if (BankStatement.length > 0) {
            return <div>
                <Row>
                    {BankStatement.map((item, index) => {
                        if (item.type.toLowerCase() === 'image/jpeg' || item.type.toLowerCase() === 'image/png' || item.type.toLowerCase() === 'image/apng') {
                            return (
                                <Col key={index.toString()} className="img-item col-3">
                                    <img src={item.src} style={{ width: '100%' }} onClick={() => {
                                        this.setState({
                                            bankStatement: true,
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
                    visible={this.state.bankStatement}
                    onClose={() => { this.setState({ bankStatement: false }); }}
                    images={BankStatement}
                />
            </div>
        } else {
            return null;
        }
    }

    getEmploymentIDImages() {
        const { EmploymentIDImages } = this.state;

        if (EmploymentIDImages.length > 0) {
            return <div>
                <Row>
                    {EmploymentIDImages.map((item, index) => {
                        if (item.type.toLowerCase() === 'image/jpeg' || item.type.toLowerCase() === 'image/png' || item.type.toLowerCase() === 'image/apng') {
                            return (
                                <Col key={index.toString()} className="img-item col-3">
                                    <img src={item.src} style={{ width: '100%' }} onClick={() => {
                                        this.setState({
                                            employmentId: true,
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
                    visible={this.state.employmentId}
                    onClose={() => { this.setState({ employmentId: false }); }}
                    images={EmploymentIDImages}
                />
            </div>
        } else {
            return null;
        }
    }
    getEmploymentConfirmationLetterImages() {
        const { EmploymentConfirmationLetterImages } = this.state;

        if (EmploymentConfirmationLetterImages.length > 0) {
            return <div>
                <Row>
                    {EmploymentConfirmationLetterImages.map((item, index) => {
                        if (item.type.toLowerCase() === 'image/jpeg' || item.type.toLowerCase() === 'image/png' || item.type.toLowerCase() === 'image/apng') {
                            return (
                                <Col key={index.toString()} className="img-item col-3">
                                    <img src={item.src} style={{ width: '100%' }} onClick={() => {
                                        this.setState({
                                            employmentConfirmationLetter: true,
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
                    visible={this.state.employmentConfirmationLetter}
                    onClose={() => { this.setState({ employmentConfirmationLetter: false }); }}
                    images={EmploymentConfirmationLetterImages}
                />
            </div>
        } else {
            return null;
        }
    }

    getBusinessRegistrationCertificate() {
        const { BusinessRegistrationCertificate } = this.state;

        if (BusinessRegistrationCertificate.length > 0) {
            return <div>
                <Row>
                    {BusinessRegistrationCertificate.map((item, index) => {
                        if (item.type.toLowerCase() === 'image/jpeg' || item.type.toLowerCase() === 'image/png' || item.type.toLowerCase() === 'image/apng') {
                            return (
                                <Col key={index.toString()} className="img-item col-3">
                                    <img src={item.src} style={{ width: '100%' }} onClick={() => {
                                        this.setState({
                                            businessRegistrationCertificate: true,
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
                    visible={this.state.businessRegistrationCertificate}
                    onClose={() => { this.setState({ businessRegistrationCertificate: false }); }}
                    images={BusinessRegistrationCertificate}
                />
            </div>
        } else {
            return null;
        }
    }

    getAccountStatement() {
        const { AccountStatement } = this.state;

        if (AccountStatement.length > 0) {
            return <div>
                <Row>
                    {AccountStatement.map((item, index) => {
                        if (item.type.toLowerCase() === 'image/jpeg' || item.type.toLowerCase() === 'image/png' || item.type.toLowerCase() === 'image/apng') {
                            return (
                                <Col key={index.toString()} className="img-item col-3">
                                    <img src={item.src} style={{ width: '100%' }} onClick={() => {
                                        this.setState({
                                            accountStatement: true,
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
                    visible={this.state.accountStatement}
                    onClose={() => { this.setState({ accountStatement: false }); }}
                    images={AccountStatement}
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
                        <Breadcrumbs title="Applications" breadcrumbItem="Swairee Application Documents" />
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
                                        <CardTitle>Other Income Proofs</CardTitle>
                                        {this.getOtherIncomeProofImages()}
                                    </CardBody>
                                </Card>

                                <Card>
                                    <CardBody>
                                        <CardTitle>Business Card</CardTitle>
                                        {this.getBnsCard()}
                                    </CardBody>
                                </Card>

                                <Card>
                                    <CardBody>
                                        <CardTitle>Latest Salary Slip</CardTitle>
                                        {this.getLatestSalarySlip()}
                                    </CardBody>
                                </Card>

                                <Card>
                                    <CardBody>
                                        <CardTitle>Current / Savings Account bank statement of the previous month</CardTitle>
                                        {this.getBankStatement()}
                                    </CardBody>
                                </Card>
                                <Card>
                                    <CardBody>
                                        <CardTitle>Employment ID</CardTitle>
                                        {this.getEmploymentIDImages()}
                                    </CardBody>
                                </Card>
                                <Card>
                                    <CardBody>
                                        <CardTitle>Employment Confirmation Letter</CardTitle>
                                        {this.getEmploymentConfirmationLetterImages()}
                                    </CardBody>
                                </Card>
                                <Card>
                                    <CardBody>
                                        <CardTitle>The Business Registration Certificate</CardTitle>
                                        {this.getBusinessRegistrationCertificate()}
                                    </CardBody>
                                </Card>
                                <Card>
                                    <CardBody>
                                        <CardTitle>Current/Savings Account statements of the last 03 months</CardTitle>
                                        {this.getAccountStatement()}
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

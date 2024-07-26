import React, { Component } from "react";
import { MDBDataTable } from "mdbreact";
import { Row, Col, Card, CardBody, CardTitle } from "reactstrap";
import Viewer from "react-viewer";
import { Link } from "react-router-dom";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

import { getAllDocuments, getImageViewUrl } from "store/documents/saga";
import { getToken } from "helpers/api_helper";

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      USER_IDENTIFICATION: [],
      UTILITY_BILL: [],
      PAY_SLIP: [],
      EMLOYEE_ID: [],
      EMPLOYEMENT_CONFIRMATION_LETTER: [],
      BANK_STATEMENT: [],
      PROOF_OF_INCOME: [],
      BUSINESS_CARD: [],
      BUSINESS_REGISTRATION_CRETIFICATION: [],
      SELF_BANK_STATEMENT: [],
      billing: false,
      income: false,
      supportive: false,
    };
  }

  async componentDidMount() {
    var token = await getToken().then((res) => res);
    if (this.props.match.params.refNo != null) {
      USER_IDENTIFICATION_1 = [];
      USER_IDENTIFICATION_2 = [];
      UTILITY_BILL = [];
      PAY_SLIP = [];
      EMLOYEE_ID = [];
      EMPLOYEMENT_CONFIRMATION_LETTER = [];
      BANK_STATEMENT = [];
      PROOF_OF_INCOME = [];
      BUSINESS_CARD = [];
      BUSINESS_REGISTRATION_CRETIFICATION = [];
      SELF_BANK_STATEMENT = [];
      await getAllDocuments(this.props.match.params.refNo).then((res) => {
        res.forEach((r) => {
          if (r.fileCategory === "USER_IDENTIFICATION_1") {
            USER_IDENTIFICATION_1.push({
              src: `${getImageViewUrl()}/${
                r.filePath
              }?access_token=${token}&type=${r.fileType.toLowerCase()}`,
              type: r.fileType,
            });
          }
          if (r.fileCategory === "USER_IDENTIFICATION_2") {
            USER_IDENTIFICATION_2.push({
              src: `${getImageViewUrl()}/${
                r.filePath
              }?access_token=${token}&type=${r.fileType.toLowerCase()}`,
              type: r.fileType,
            });
          }
          if (r.fileCategory === "UTILITY_BILL") {
            UTILITY_BILL.push({
              src: `${getImageViewUrl()}/${
                r.filePath
              }?access_token=${token}&type=${r.fileType.toLowerCase()}`,
              type: r.fileType,
            });
          }
          if (r.fileCategory === "PAY_SLIP") {
            PAY_SLIP.push({
              src: `${getImageViewUrl()}/${
                r.filePath
              }?access_token=${token}&type=${r.fileType.toLowerCase()}`,
              type: r.fileType,
            });
          }
          if (r.fileCategory === "EMLOYEE_ID") {
            EMLOYEE_ID.push({
              src: `${getImageViewUrl()}/${
                r.filePath
              }?access_token=${token}&type=${r.fileType.toLowerCase()}`,
              type: r.fileType,
            });
          }
          if (r.fileCategory === "EMPLOYEMENT_CONFIRMATION_LETTER") {
            EMPLOYEMENT_CONFIRMATION_LETTER.push({
              src: `${getImageViewUrl()}/${
                r.filePath
              }?access_token=${token}&type=${r.fileType.toLowerCase()}`,
              type: r.fileType,
            });
          }
          if (r.fileCategory === "BANK_STATEMENT") {
            BANK_STATEMENT.push({
              src: `${getImageViewUrl()}/${
                r.filePath
              }?access_token=${token}&type=${r.fileType.toLowerCase()}`,
              type: r.fileType,
            });
          }
          if (r.fileCategory === "PROOF_OF_INCOME") {
            PROOF_OF_INCOME.push({
              src: `${getImageViewUrl()}/${
                r.filePath
              }?access_token=${token}&type=${r.fileType.toLowerCase()}`,
              type: r.fileType,
            });
          }
          if (r.fileCategory === "BUSINESS_CARD") {
            BUSINESS_CARD.push({
              src: `${getImageViewUrl()}/${
                r.filePath
              }?access_token=${token}&type=${r.fileType.toLowerCase()}`,
              type: r.fileType,
            });
          }
          if (r.fileCategory === "BUSINESS_REGISTRATION_CRETIFICATION") {
            BUSINESS_REGISTRATION_CRETIFICATION.push({
              src: `${getImageViewUrl()}/${
                r.filePath
              }?access_token=${token}&type=${r.fileType.toLowerCase()}`,
              type: r.fileType,
            });
          }
          if (r.fileCategory === "SELF_BANK_STATEMENT") {
            SELF_BANK_STATEMENT.push({
              src: `${getImageViewUrl()}/${
                r.filePath
              }?access_token=${token}&type=${r.fileType.toLowerCase()}`,
              type: r.fileType,
            });
          }
        });
      });
    }

    this.setState({
      USER_IDENTIFICATION: [...USER_IDENTIFICATION_1, ...USER_IDENTIFICATION_2],
      UTILITY_BILL,
      PAY_SLIP,
      EMLOYEE_ID,
      EMPLOYEMENT_CONFIRMATION_LETTER,
      BANK_STATEMENT,
      PROOF_OF_INCOME,
      BUSINESS_CARD,
      BUSINESS_REGISTRATION_CRETIFICATION,
      SELF_BANK_STATEMENT,
    });
  }

  getIdentificationImages() {
    const { USER_IDENTIFICATION } = this.state;

    if (USER_IDENTIFICATION.length > 0) {
      return (
        <div>
          <Row>
            {USER_IDENTIFICATION.map((item, index) => {
              if (
                item.type.toLowerCase() === "image/jpeg" ||
                item.type.toLowerCase() === "image/png" ||
                item.type.toLowerCase() === "image/jpg"
              ) {
                return (
                  <Col key={index.toString()} className="img-item col-3">
                    <img
                      src={item.src}
                      style={{ width: "100%" }}
                      onClick={() => {
                        this.setState({
                          identification: true,
                          activeIndex: index,
                        });
                      }}
                    />
                  </Col>
                );
              } else {
                return (
                  <Col key={index.toString()} className="img-item col-3">
                    <Link
                      to={`/view-documents/file${item.src}`}
                      className="btn btn-primary"
                    >
                      <i className="bx bx-file-blank mr-2"></i>View File
                    </Link>
                  </Col>
                );
              }
            })}
          </Row>
          <Viewer
            visible={this.state.identification}
            onClose={() => {
              this.setState({ identification: false });
            }}
            images={USER_IDENTIFICATION}
          />
        </div>
      );
    } else {
      return null;
    }
  }

  getBillingProofImages() {
    const { UTILITY_BILL } = this.state;

    if (UTILITY_BILL.length > 0) {
      return (
        <div>
          <Row>
            {UTILITY_BILL.map((item, index) => {
              if (
                item.type.toLowerCase() === "image/jpeg" ||
                item.type.toLowerCase() === "image/png" ||
                item.type.toLowerCase() === "image/jpg"
              ) {
                return (
                  <Col key={index.toString()} className="img-item col-3">
                    <img
                      src={item.src}
                      style={{ width: "100%" }}
                      onClick={() => {
                        this.setState({
                          billing: true,
                          activeIndex: index,
                        });
                      }}
                    />
                  </Col>
                );
              } else {
                return (
                  <Col key={index.toString()} className="img-item col-3">
                    <Link
                      to={`/view-documents/file${item.src}`}
                      className="btn btn-primary"
                    >
                      <i className="bx bx-file-blank mr-2"></i>View File
                    </Link>
                  </Col>
                );
              }
            })}
          </Row>
          <Viewer
            visible={this.state.billing}
            onClose={() => {
              this.setState({ billing: false });
            }}
            images={UTILITY_BILL}
          />
        </div>
      );
    } else {
      return null;
    }
  }

  getpaySlipProofImages() {
    const { PAY_SLIP } = this.state;

    if (PAY_SLIP.length > 0) {
      return (
        <div>
          <Row>
            {PAY_SLIP.map((item, index) => {
              if (
                item.type.toLowerCase() === "image/jpeg" ||
                item.type.toLowerCase() === "image/png" ||
                item.type.toLowerCase() === "image/jpg"
              ) {
                return (
                  <Col key={index.toString()} className="img-item col-3">
                    <img
                      src={item.src}
                      style={{ width: "100%" }}
                      onClick={() => {
                        this.setState({
                          income: true,
                          activeIndex: index,
                        });
                      }}
                    />
                  </Col>
                );
              } else {
                return (
                  <Col key={index.toString()} className="img-item col-3">
                    <Link
                      to={`/view-documents/file${item.src}`}
                      className="btn btn-primary"
                    >
                      <i className="bx bx-file-blank mr-2"></i>View File
                    </Link>
                  </Col>
                );
              }
            })}
          </Row>
          <Viewer
            visible={this.state.income}
            onClose={() => {
              this.setState({ income: false });
            }}
            images={PAY_SLIP}
          />
        </div>
      );
    } else {
      return null;
    }
  }

  getEmployeeIdImages() {
    const { EMLOYEE_ID } = this.state;

    if (EMLOYEE_ID.length > 0) {
      return (
        <div>
          <Row>
            {EMLOYEE_ID.map((item, index) => {
              if (
                item.type.toLowerCase() === "image/jpeg" ||
                item.type.toLowerCase() === "image/png" ||
                item.type.toLowerCase() === "image/jpg"
              ) {
                return (
                  <Col key={index.toString()} className="img-item col-3">
                    <img
                      src={item.src}
                      style={{ width: "100%" }}
                      onClick={() => {
                        this.setState({
                          income: true,
                          activeIndex: index,
                        });
                      }}
                    />
                  </Col>
                );
              } else {
                return (
                  <Col key={index.toString()} className="img-item col-3">
                    <Link
                      to={`/view-documents/file${item.src}`}
                      className="btn btn-primary"
                    >
                      <i className="bx bx-file-blank mr-2"></i>View File
                    </Link>
                  </Col>
                );
              }
            })}
          </Row>
          <Viewer
            visible={this.state.income}
            onClose={() => {
              this.setState({ income: false });
            }}
            images={EMLOYEE_ID}
          />
        </div>
      );
    } else {
      return null;
    }
  }

  getEmployementConfirmationLetterImages() {
    const { EMPLOYEMENT_CONFIRMATION_LETTER } = this.state;

    if (EMPLOYEMENT_CONFIRMATION_LETTER.length > 0) {
      return (
        <div>
          <Row>
            {EMPLOYEMENT_CONFIRMATION_LETTER.map((item, index) => {
              if (
                item.type.toLowerCase() === "image/jpeg" ||
                item.type.toLowerCase() === "image/png" ||
                item.type.toLowerCase() === "image/jpg"
              ) {
                return (
                  <Col key={index.toString()} className="img-item col-3">
                    <img
                      src={item.src}
                      style={{ width: "100%" }}
                      onClick={() => {
                        this.setState({
                          income: true,
                          activeIndex: index,
                        });
                      }}
                    />
                  </Col>
                );
              } else {
                return (
                  <Col key={index.toString()} className="img-item col-3">
                    <Link
                      to={`/view-documents/file${item.src}`}
                      className="btn btn-primary"
                    >
                      <i className="bx bx-file-blank mr-2"></i>View File
                    </Link>
                  </Col>
                );
              }
            })}
          </Row>
          <Viewer
            visible={this.state.income}
            onClose={() => {
              this.setState({ income: false });
            }}
            images={EMPLOYEMENT_CONFIRMATION_LETTER}
          />
        </div>
      );
    } else {
      return null;
    }
  }

  getBankStatementImages() {
    const { BANK_STATEMENT } = this.state;

    if (BANK_STATEMENT.length > 0) {
      return (
        <div>
          <Row>
            {BANK_STATEMENT.map((item, index) => {
              if (
                item.type.toLowerCase() === "image/jpeg" ||
                item.type.toLowerCase() === "image/png" ||
                item.type.toLowerCase() === "image/jpg"
              ) {
                return (
                  <Col key={index.toString()} className="img-item col-3">
                    <img
                      src={item.src}
                      style={{ width: "100%" }}
                      onClick={() => {
                        this.setState({
                          income: true,
                          activeIndex: index,
                        });
                      }}
                    />
                  </Col>
                );
              } else {
                return (
                  <Col key={index.toString()} className="img-item col-3">
                    <Link
                      to={`/view-documents/file${item.src}`}
                      className="btn btn-primary"
                    >
                      <i className="bx bx-file-blank mr-2"></i>View File
                    </Link>
                  </Col>
                );
              }
            })}
          </Row>
          <Viewer
            visible={this.state.income}
            onClose={() => {
              this.setState({ income: false });
            }}
            images={BANK_STATEMENT}
          />
        </div>
      );
    } else {
      return null;
    }
  }

  getProofOfIncomeImages() {
    const { PROOF_OF_INCOME } = this.state;

    if (PROOF_OF_INCOME.length > 0) {
      return (
        <div>
          <Row>
            {PROOF_OF_INCOME.map((item, index) => {
              if (
                item.type.toLowerCase() === "image/jpeg" ||
                item.type.toLowerCase() === "image/png" ||
                item.type.toLowerCase() === "image/jpg"
              ) {
                return (
                  <Col key={index.toString()} className="img-item col-3">
                    <img
                      src={item.src}
                      style={{ width: "100%" }}
                      onClick={() => {
                        this.setState({
                          income: true,
                          activeIndex: index,
                        });
                      }}
                    />
                  </Col>
                );
              } else {
                return (
                  <Col key={index.toString()} className="img-item col-3">
                    <Link
                      to={`/view-documents/file${item.src}`}
                      className="btn btn-primary"
                    >
                      <i className="bx bx-file-blank mr-2"></i>View File
                    </Link>
                  </Col>
                );
              }
            })}
          </Row>
          <Viewer
            visible={this.state.income}
            onClose={() => {
              this.setState({ income: false });
            }}
            images={PROOF_OF_INCOME}
          />
        </div>
      );
    } else {
      return null;
    }
  }

  getBusinessCardImages() {
    const { BUSINESS_CARD } = this.state;

    if (BUSINESS_CARD.length > 0) {
      return (
        <div>
          <Row>
            {BUSINESS_CARD.map((item, index) => {
              if (
                item.type.toLowerCase() === "image/jpeg" ||
                item.type.toLowerCase() === "image/png" ||
                item.type.toLowerCase() === "image/jpg"
              ) {
                return (
                  <Col key={index.toString()} className="img-item col-3">
                    <img
                      src={item.src}
                      style={{ width: "100%" }}
                      onClick={() => {
                        this.setState({
                          income: true,
                          activeIndex: index,
                        });
                      }}
                    />
                  </Col>
                );
              } else {
                return (
                  <Col key={index.toString()} className="img-item col-3">
                    <Link
                      to={`/view-documents/file${item.src}`}
                      className="btn btn-primary"
                    >
                      <i className="bx bx-file-blank mr-2"></i>View File
                    </Link>
                  </Col>
                );
              }
            })}
          </Row>
          <Viewer
            visible={this.state.income}
            onClose={() => {
              this.setState({ income: false });
            }}
            images={BUSINESS_CARD}
          />
        </div>
      );
    } else {
      return null;
    }
  }

  getBusinessRegistrationCretificationImages() {
    const { BUSINESS_REGISTRATION_CRETIFICATION } = this.state;

    if (BUSINESS_REGISTRATION_CRETIFICATION.length > 0) {
      return (
        <div>
          <Row>
            {BUSINESS_REGISTRATION_CRETIFICATION.map((item, index) => {
              if (
                item.type.toLowerCase() === "image/jpeg" ||
                item.type.toLowerCase() === "image/png" ||
                item.type.toLowerCase() === "image/jpg"
              ) {
                return (
                  <Col key={index.toString()} className="img-item col-3">
                    <img
                      src={item.src}
                      style={{ width: "100%" }}
                      onClick={() => {
                        this.setState({
                          income: true,
                          activeIndex: index,
                        });
                      }}
                    />
                  </Col>
                );
              } else {
                return (
                  <Col key={index.toString()} className="img-item col-3">
                    <Link
                      to={`/view-documents/file${item.src}`}
                      className="btn btn-primary"
                    >
                      <i className="bx bx-file-blank mr-2"></i>View File
                    </Link>
                  </Col>
                );
              }
            })}
          </Row>
          <Viewer
            visible={this.state.income}
            onClose={() => {
              this.setState({ income: false });
            }}
            images={BUSINESS_REGISTRATION_CRETIFICATION}
          />
        </div>
      );
    } else {
      return null;
    }
  }

  getSelfBankStatementImages() {
    const { SELF_BANK_STATEMENT } = this.state;

    if (SELF_BANK_STATEMENT.length > 0) {
      return (
        <div>
          <Row>
            {SELF_BANK_STATEMENT.map((item, index) => {
              if (
                item.type.toLowerCase() === "image/jpeg" ||
                item.type.toLowerCase() === "image/png" ||
                item.type.toLowerCase() === "image/jpg"
              ) {
                return (
                  <Col key={index.toString()} className="img-item col-3">
                    <img
                      src={item.src}
                      style={{ width: "100%" }}
                      onClick={() => {
                        this.setState({
                          income: true,
                          activeIndex: index,
                        });
                      }}
                    />
                  </Col>
                );
              } else {
                return (
                  <Col key={index.toString()} className="img-item col-3">
                    <Link
                      to={`/view-documents/file${item.src}`}
                      className="btn btn-primary"
                    >
                      <i className="bx bx-file-blank mr-2"></i>View File
                    </Link>
                  </Col>
                );
              }
            })}
          </Row>
          <Viewer
            visible={this.state.income}
            onClose={() => {
              this.setState({ income: false });
            }}
            images={SELF_BANK_STATEMENT}
          />
        </div>
      );
    } else {
      return null;
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className="page-content">
          <div className="container-fluid">
            <Breadcrumbs
              title="Applications"
              breadcrumbItem="Common Application Documents"
            />
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
                    <CardTitle>Employee ID</CardTitle>
                    {this.getEmployeeIdImages()}
                  </CardBody>
                </Card>
                <Card>
                  <CardBody>
                    <CardTitle>Employement Confirmation Letter</CardTitle>
                    {this.getEmployementConfirmationLetterImages()}
                  </CardBody>
                </Card>
                <Card>
                  <CardBody>
                    <CardTitle>Bank Statement</CardTitle>
                    {this.getBankStatementImages()}
                  </CardBody>
                </Card>
                <Card>
                  <CardBody>
                    <CardTitle>Proof of Income</CardTitle>
                    {this.getProofOfIncomeImages()}
                  </CardBody>
                </Card>
                <Card>
                  <CardBody>
                    <CardTitle>Business Card</CardTitle>
                    {this.getBusinessCardImages()}
                  </CardBody>
                </Card>
                <Card>
                  <CardBody>
                    <CardTitle>Business Registration Cretification</CardTitle>
                    {this.getBusinessRegistrationCretificationImages()}
                  </CardBody>
                </Card>
                <Card>
                  <CardBody>
                    <CardTitle>Self Bank Statement</CardTitle>
                    {this.getSelfBankStatementImages()}
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

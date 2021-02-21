import React from "react"
import { Row, Col } from "reactstrap"

const Footer = () => {
  return (
    <React.Fragment>
      <footer className="footer">
        <div className="container-fluid">
          <Row>
            <Col sm={6}>Copyright © {new Date().getFullYear()} LOLC Finance Plc.</Col>
            <Col sm={6}>
              <div className="text-sm-right d-none d-sm-block">
                LOLC Technologies Services Ltd.
              </div>
            </Col>
          </Row>
        </div>
      </footer>
    </React.Fragment>
  )
}

export default Footer

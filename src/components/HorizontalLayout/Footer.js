import React from "react"
import { Container, Row, Col } from "reactstrap"

const Footer = () => {
  return (
    <React.Fragment>
      <footer className="footer">
        <Container fluid={true}>
          <Row>
            <Col md={6}>Copyright © {new Date().getFullYear()} LOLC Finance Plc.</Col>
            <Col md={6}>
              <div className="text-sm-right d-none d-sm-block">
                LOLC Technologies Services Ltd.
              </div>
            </Col>
          </Row>
        </Container>
      </footer>
    </React.Fragment>
  )
}

export default Footer

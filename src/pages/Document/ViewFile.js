import React, { Component } from "react"
import { Container } from "reactstrap"
import FileViewer from 'react-file-viewer';
import qs from "query-string";

import { getImageViewUrl } from "store/documents/saga";
import { getToken } from "helpers/api_helper";

class ViewFile extends Component {

  constructor(props) {
    super(props)
    this.state = {url: '', type: ''}
  }

  async componentDidMount() {
    var token = await getToken().then(res => res);
    var parsed = qs.parse(this.props.location.search);
    this.setState({url: `${getImageViewUrl()}${this.props.match.params[0].split("/services/api/v1/dashboard/documents/view")[1]}?access_token=${token}`, type: parsed.type.toLowerCase()})
  }

  render() {
    return (
      <React.Fragment>
        <div className="page-content">
          <Container fluid>
          <FileViewer
             fileType={this.state.type.split("/")[1]}
            filePath={this.state.url} />
          </Container>
        </div>
      </React.Fragment>
    )
  }
}
export default ViewFile

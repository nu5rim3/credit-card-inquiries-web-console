import React, { Component } from 'react'

export default class Spinner extends Component {

    dynamicIcon() {
        if (this.props.loading === true) {
            return (
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg"
                        className="mr-2" height="16" width="16" viewBox="0 0 128 128"><g>
                            <path
                                fill="#fff" d="M109.25 55.5h-36l12-12a29.54 29.54 0 00-49.53 12H18.75A46.04 46.04 0 0196.9 31.84l12.35-12.34v36zm-90.5 17h36l-12 12a29.54 29.54 0 0049.53-12h16.97A46.04 46.04 0 0131.1 96.16L18.74 108.5v-36z" /><animateTransform attributeName="transform" type="rotate" from="0 64 64" to="360 64 64" dur="720ms" repeatCount="indefinite" /></g></svg>
                </div>
            );
        } else {
            if (this.props.type === 'search') {
                return (
                    <i className="bx bx-search font-size-16 align-middle mr-2"></i>
                );
            }

            if (this.props.type === 'download') {
                return (
                    <i className="bx bx-download font-size-16 align-middle mr-2"></i>
                );
            }

            if (this.props.type === 'none') {
                return ("");
            }
        }
    }

    render() {
        return (
            <div>
                {this.dynamicIcon()}
            </div>
        )
    }
}

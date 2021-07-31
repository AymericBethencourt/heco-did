import React, { Component } from "react";

class Main extends Component {
  render() {
    return (
      <div id="content" className="mt-3">
        <div className="card mb-4">
          <div className="card-body">
            <button
              type="submit"
              className="btn btn-link btn-block btn-sm"
              onClick={(event) => {
                event.preventDefault();
                this.props.createDid();
              }}
            >
              Create DID
            </button>

            <form
              className="mb-3"
              onSubmit={(event) => {
                event.preventDefault();
                let claim;
                claim = this.input.value.toString();
                this.props.signClaim(claim);
              }}
            >
              <div>
                <label className="float-left">
                  <b>Your DID</b>
                </label>
                <span className="float-right text-muted">{this.props.did}</span>
              </div>
              <div className="input-group mb-4">
                <input
                  type="text"
                  ref={(input) => {
                    this.input = input;
                  }}
                  className="form-control form-control-lg"
                  placeholder="Your claim..."
                  required
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary btn-block btn-lg"
              >
                Sign claim
              </button>
              {this.props.jwt}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Main;

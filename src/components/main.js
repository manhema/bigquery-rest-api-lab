import React, { Component } from "react";
import ReactJson from "react-json-view";
import fetch from "isomorphic-fetch";

let params = {
	firstname: "Tino",
	lastname: "Manhema",
	contact: "+27839480104",
	imageUrl: "https://avobuild.com"
};

let restUri = "http://localhost:8080/bq/visitor";

export default class Main extends Component {
	constructor(props) {
		super(props);
		this.state = {
			result: {}
		};
	}
	validate() {
		fetch(restUri, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(params)
			// body: JSON.stringify(params)
		})
			.then(response => response.json())
			.then(response => {
				console.log(response);
				this.setState({ result: response });
			})
			.catch(error => {
				console.log(error);
				this.setState({ error: error });
			});
	}

	render() {
		return (
			<div>
				<h6 className="text-center">Rest uri endpoint</h6>
				<p className="text-center">
					<small>{restUri}</small>
				</p>

				<h6 className="text-center">Params</h6>
				<ReactJson
					src={params}
					name={false}
					theme={"monokai"}
					indentWidth={2}
					onEdit={true}
				/>

				<div className="text-center" style={{ marginTop: "2rem" }}>
					<button className="text-center" onClick={() => this.validate()}>
						Post Visitor
					</button>
				</div>

				<h6 className="text-center">Result</h6>
				<ReactJson
					src={this.state.result}
					name={false}
					theme={"monokai"}
					indentWidth={2}
					onEdit={false}
				/>
			</div>
		);
	}
}

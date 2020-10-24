import React, { Component } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import Directory from './DirectoryComponent';
import CampsiteInfo from './CampsiteInfoComponent';
import { CAMPSITES } from '../shared/campsites';
import 'typeface-lobster';
import 'typeface-open-sans';

class Main extends Component {
	constructor(props) {
		super(props);
		this.state = {
			campsites: CAMPSITES,
			selectedCampsite: null,
		};
	}

	onCampsiteSelect(campsiteId) {
		this.setState({ selectedCampsite: campsiteId });
	}

	render() {
		return (
			<div>
				<Navbar dark color='primary'>
					<div>
						<NavbarBrand>NuCamp</NavbarBrand>
					</div>
				</Navbar>
				<Directory campsites={this.state.campsites} onClick={(campsiteId) => this.onCampsiteSelect(campsiteId)} />
				<CampsiteInfo campsite={this.state.campsites.filter((campsite) => campsite.id === this.state.selectedCampsite)[0]}></CampsiteInfo>
			</div>
		);
	}
}

export default Main;

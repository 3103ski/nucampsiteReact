import React, { Component } from 'react';
import './App.css';
import { Navbar, NavbarBrand } from 'reactstrap';

class App extends Component {
	render() {
		return (
			<div className='App'>
				<Navbar dark color='primary'>
					<div>
						<NavbarBrand>NuCamp</NavbarBrand>
					</div>
				</Navbar>
			</div>
		);
	}
}

export default App;

import React, { Component } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import Directory from './components/directoryComponent';
import './App.css';

class App extends Component {
	render() {
		return (
			<div className='App'>
				<Navbar dark color='primary'>
					<div>
						<NavbarBrand>NuCamp</NavbarBrand>
					</div>
				</Navbar>
				<Directory />
			</div>
		);
	}
}

export default App;

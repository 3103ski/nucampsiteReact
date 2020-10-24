import React, { Component } from 'react';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import { Switch, Route, Redirect } from 'react-router-dom';
import Directory from './DirectoryComponent';
import { CAMPSITES } from '../shared/campsites';
import 'typeface-lobster';
import 'typeface-open-sans';

class Main extends Component {
	constructor(props) {
		super(props);
		this.state = {
			campsites: CAMPSITES,
		};
	}

	render() {
		const HomePage = () => {
			return <Home />;
		};

		return (
			<div>
				<Header />
				<Switch>
					<Route path='/home' component={Home}></Route>
					<Route exact path='/directory' render={() => <Directory campsites={this.state.campsites} />} />
					<Redirect to='/home' />
				</Switch>
				<Footer />
			</div>
		);
	}
}

export default Main;

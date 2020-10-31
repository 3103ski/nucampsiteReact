// React imports
import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

// Presentational Components
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import CampsiteInfo from './CampsiteInfoComponent';

// Container Components (pages)
import Home from './HomeComponent';
import Directory from './DirectoryComponent';
import Contact from './ContactComponent';
import AboutPage from './AboutComponent';

// Persistant Data
import { CAMPSITES } from '../shared/campsites';
import { COMMENTS } from '../shared/comments';
import { PARTNERS } from '../shared/partners';
import { PROMOTIONS } from '../shared/promotions';

// Fonts
import 'typeface-lobster';
import 'typeface-open-sans';

class Main extends Component {
	constructor(props) {
		super(props);
		this.state = {
			campsites: CAMPSITES,
			comments: COMMENTS,
			partners: PARTNERS,
			promotions: PROMOTIONS,
		};
	}

	render() {
		const HomePage = () => {
			return (
				<Home
					campsite={this.state.campsites.filter((campsite) => campsite.featured)[0]}
					promotion={this.state.promotions.filter((promotion) => promotion.featured)[0]}
					partner={this.state.partners.filter((partner) => partner.featured)[0]}
				/>
			);
		};

		const CampsiteWithId = ({ match }) => {
			return (
				<CampsiteInfo
					campsite={this.state.campsites.filter((campsite) => campsite.id === +match.params.campsiteId)[0]}
					comments={this.state.comments.filter((comment) => comment.campsiteId === +match.params.campsiteId)}
				/>
			);
		};

		return (
			<div>
				<Header />
				<Switch>
					<Route path='/home' component={HomePage}></Route>
					<Route exact path='/contactus' component={Contact} />
					<Route exact path='/aboutus' render={() => <AboutPage partners={this.state.partners} />} />
					<Route exact path='/directory' render={() => <Directory campsites={this.state.campsites} someRandoProp='Hello World' />} />
					<Route exact path='/directory/:campsiteId' component={CampsiteWithId} />
					<Redirect to='/home' />
				</Switch>
				<Footer />
			</div>
		);
	}
}

export default Main;

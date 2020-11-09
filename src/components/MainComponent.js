// React imports
import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import { postComment, fetchCampsites, fetchComments, fetchPromotions, fetchPartners, postFeedback } from '../redux/ActionCreators';

// Presentational Components
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import CampsiteInfo from './CampsiteInfoComponent';

// Container Components (pages)
import Home from './HomeComponent';
import Directory from './DirectoryComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';

// Animations
import { TransitionGroup, CSSTransition } from 'react-transition-group';

// Fonts
import 'typeface-lobster';
import 'typeface-open-sans';

const mapStateToProps = (state) => {
	return {
		campsites: state.campsites,
		comments: state.comments,
		partners: state.partners,
		promotions: state.promotions,
	};
};

const mapDispatchToProps = {
	fetchCampsites: () => fetchCampsites(),
	fetchComments: () => fetchComments(),
	fetchPromotions: () => fetchPromotions(),
	fetchPartners: () => fetchPartners(),
	resetFeedbackForm: () => actions.reset('feedbackForm'),
	postFeedback: (feedback) => postFeedback(feedback),
	postComment: (campsiteId, rating, author, text) => postComment(campsiteId, rating, author, text),
};

class Main extends Component {
	componentDidMount() {
		this.props.fetchPartners();
		this.props.fetchCampsites();
		this.props.fetchPromotions();
		this.props.fetchComments();
	}

	render() {
		const HomePage = () => {
			console.log('PARTNERS', this.props);
			return (
				<Home
					campsite={this.props.campsites.campsites.filter((campsite) => campsite.featured)[0]}
					campsitesLoading={this.props.campsites.isLoading}
					campsitesErrorMsg={this.props.campsites.errorMsg}
					promotion={this.props.promotions.promotions.filter((promotion) => promotion.featured)[0]}
					promotionsLoading={this.props.promotions.isLoading}
					promotionsErrorMsg={this.props.promotions.errorMsg}
					partner={this.props.partners.partners.filter((partner) => partner.featured)[0]}
					partnersLoading={this.props.partners.isLoading}
					partnersErrorMsg={this.props.partners.errorMsg}
				/>
			);
		};

		const CampsiteWithId = ({ match }) => {
			return (
				<CampsiteInfo
					campsite={this.props.campsites.campsites.filter((campsite) => campsite.id === +match.params.campsiteId)[0]}
					isLoading={this.props.campsites.isLoading}
					errMess={this.props.campsites.errorMsg}
					comments={this.props.comments.comments.filter((comment) => comment.campsiteId === +match.params.campsiteId)}
					commentsErrMess={this.props.comments.errorMsg}
					postComment={this.props.postComment}
				/>
			);
		};

		return (
			<div>
				<Header />
				<TransitionGroup>
					<CSSTransition key={this.props.location.key} classNames='page' timeout={300}>
						<Switch>
							<Route path='/home' component={HomePage} />
							<Route exact path='/directory' render={() => <Directory campsites={this.props.campsites} />} />
							<Route path='/directory/:campsiteId' component={CampsiteWithId} />
							<Route exact path='/contactus' render={() => <Contact postFeedback={this.props.postFeedback} resetFeedbackForm={this.props.resetFeedbackForm} />} />
							<Route exact path='/aboutus' render={() => <About partners={this.props.partners} />} />
							<Redirect to='/home' />
						</Switch>
					</CSSTransition>
				</TransitionGroup>
				<Footer />
			</div>
		);
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));

// React
import React from 'react';
// Components
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';
import { Loading } from './loadingComponent';
import { FadeTransform } from 'react-animation-components';
// Static
import { baseUrl } from '../shared/baseUrl';

function RenderCard({ item, isLoading, errorMsg }) {
	if (isLoading) {
		return <Loading />;
	}
	if (errorMsg) {
		return <h4>{errorMsg}</h4>;
	}
	return (
		<FadeTransform in transformProps={{ exitTransform: 'scale(0.9) translateY(10%)' }}>
			<Card>
				<CardImg src={baseUrl + item.image} alt={item.name} />
				<CardBody>
					<CardTitle>{item.name}</CardTitle>

					<CardText>{item.description}</CardText>
				</CardBody>
			</Card>
		</FadeTransform>
	);
}

function Home(props) {
	return (
		<div className='container'>
			<div className='row'>
				<div className='col-md m-1'>
					<RenderCard item={props.campsite} isLoading={props.campsitesLoading} errorMsg={props.campsitesErrorMsg} />
				</div>
				<div className='col-md m-1'>
					<RenderCard item={props.promotion} isLoading={props.promotionsLoading} errorMsg={props.promotionsErrorMsg} />
				</div>
				<div className='col-md m-1'>
					<RenderCard item={props.partner} isLoading={props.partnersLoading} errorMsg={props.partnersErrorMsg} />
				</div>
			</div>
		</div>
	);
}

export default Home;

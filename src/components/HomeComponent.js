import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';
import { Loading } from './loadingComponent';

function RenderCard({ item, isLoading, errMsg }) {
	if (isLoading) {
		return <Loading />;
	}
	if (errMsg) {
		return <h4>{errMsg}</h4>;
	}
	return (
		<Card>
			<CardImg src={item.image} alt={item.name} />
			<CardBody>
				<CardTitle>{item.name}</CardTitle>
				<CardText>{item.description}</CardText>
			</CardBody>
		</Card>
	);
}

function Home(props) {
	return (
		<div className='container'>
			<div className='row'>
				<div className='col-md m-1'>
					<RenderCard item={props.campsite} isLoading={props.campsitesLoading} errMsgs={props.campsitesErrMsg} />
				</div>
				<div className='col-md m-1'>
					<RenderCard item={props.promotion} />
				</div>
				<div className='col-md m-1'>
					<RenderCard item={props.partner} />
				</div>
			</div>
		</div>
	);
}

export default Home;

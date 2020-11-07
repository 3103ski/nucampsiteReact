import React from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './loadingComponent';

function RenderDirectoryItem({ campsite }) {
	return (
		<Card>
			<Link to={`/directory/${campsite.id}`}>
				<CardImg width='100%' src={baseUrl + campsite.image} alt={campsite.name} />
				<CardImgOverlay>
					<CardTitle>{campsite.name}</CardTitle>
				</CardImgOverlay>
			</Link>
		</Card>
	);
}

function Directory(props) {
	let directory = props.campsites.campsites.map((campsite) => {
		return (
			<div className='col-md-5 m-1' key={campsite.id}>
				<RenderDirectoryItem campsite={campsite}></RenderDirectoryItem>
			</div>
		);
	});

	if (props.isLoading) {
		return (
			<div className='container'>
				<div className='row'>
					<Loading />
				</div>
			</div>
		);
	}

	if (props.errMsg) {
		return (
			<div className='container'>
				<div className='row'>
					<div className='col'>
						<h4>{props.errMsg}</h4>
					</div>
				</div>
			</div>
		);
	}
	return (
		<div className='container'>
			<div className='row'>
				<div className='col'>
					<Breadcrumb>
						<BreadcrumbItem>
							<Link to='/home'>Home</Link>
						</BreadcrumbItem>
						<BreadcrumbItem active>Directory</BreadcrumbItem>
					</Breadcrumb>
					<h2>Directory</h2>
					<hr />
				</div>
			</div>
			<div className='row'>{directory}</div>
		</div>
	);
}

export default Directory;

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

function DirectoryList({ campsites }) {
	const directory = campsites.campsites.map((campsite) => {
		return (
			<div className='col-md-5 m-1' key={campsite.id}>
				<RenderDirectoryItem campsite={campsite}></RenderDirectoryItem>
			</div>
		);
	});
	if (campsites.isLoading) {
		return <Loading />;
	}
	if (campsites.errorMsg) {
		return (
			<div className='col'>
				<h4>{campsites.errorMsg}</h4>
			</div>
		);
	}
	return directory;
}

function Directory({ campsites }) {
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
			<div className='row'>
				<DirectoryList campsites={campsites} />
			</div>
		</div>
	);
}

export default Directory;

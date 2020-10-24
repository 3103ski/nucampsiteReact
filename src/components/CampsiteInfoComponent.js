import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

function RenderComments({ comments }) {
	if (comments) {
		return (
			<div className={`col-md-5 m-1`}>
				<h4>Comments</h4>
				{comments.map((comment) => {
					return (
						<p>
							{comment.text} <br />
							-- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comment.date)))}
						</p>
					);
				})}
			</div>
		);
	} else {
		return <div />;
	}
}

function RenderCampsite({ campsite }) {
	return (
		<div className='col-md-5 m-1'>
			<Card>
				<CardImg top src={campsite.image} alt={campsite.name}></CardImg>
				<CardBody>
					<CardTitle>{campsite.name}</CardTitle>
					<CardText>{campsite.description}</CardText>
				</CardBody>
			</Card>
		</div>
	);
}

function CampsiteInfo({ campsite }) {
	if (campsite) {
		return (
			<div className='container'>
				<div className={`row`}>
					<RenderCampsite campsite={campsite} />
					<RenderComments comments={campsite.comments} />
				</div>
			</div>
		);
	} else {
		return <div />;
	}
}

export default CampsiteInfo;
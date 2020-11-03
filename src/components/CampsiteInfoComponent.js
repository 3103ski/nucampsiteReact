import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, BreadcrumbItem, Breadcrumb, Modal, ModalHeader, ModalBody, Button, Row, Label, Col } from 'reactstrap';
import { Control, Errors, LocalForm } from 'react-redux-form';
import { Link } from 'react-router-dom';
import { Loading } from './loadingComponent';

// validators
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;
class CommentForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			modalIsOpen: false,
		};
	}

	toggleModalHandler = () => {
		return this.setState({ modalIsOpen: !this.state.modalIsOpen });
	};

	submitHandler = (values) => {
		this.toggleModalHandler();
		this.props.addComment(this.props.campsiteId, values.rating, values.author, values.comment);
	};

	render() {
		return (
			<>
				<Modal isOpen={this.state.modalIsOpen} toggle={this.toggleModalHandler}>
					<ModalHeader toggle={this.toggleModalHandler}>
						Submit Comment <span className></span>
					</ModalHeader>
					<ModalBody>
						<LocalForm onSubmit={(values) => this.submitHandler(values)}>
							<Row className='form-group'>
								<Label htmlFor='rating' md={2}>
									Rating
								</Label>
								<Col md={10}>
									<Control.select name='rating' id='rating' model='.rating' className='form-control'>
										<option value='1'>1</option>
										<option value='2'>2</option>
										<option value='3'>3</option>
										<option value='4'>4</option>
										<option value='5'>5</option>
									</Control.select>
								</Col>
							</Row>
							<Row className='form-group'>
								<Label htmlFor='author' md={2}>
									Author
								</Label>
								<Col md={10}>
									<Control.text
										validators={{ minLength: minLength(2), maxLength: maxLength(15) }}
										name='author'
										id='author'
										model='.author'
										className='form-control'
										placeholder='Your name'></Control.text>
									<Errors
										show='touched'
										component='div'
										className='text-danger'
										model='.author'
										messages={{ maxLength: 'Entry must be less than 15 characters', minLength: 'Entry must be at least 2 characters' }}
									/>
								</Col>
							</Row>
							<Row className='form-group'>
								<Label htmlFor='comment' md={2}>
									Comment
								</Label>
								<Col md={10}>
									<Control.textarea name='comment' id='comment' model='.comment' className='form-control' placeholder='' rows={6}></Control.textarea>
								</Col>
							</Row>
							<Row className='form-group'>
								<Col md={10}>
									<Button type='submit' color='primary' onClick={this.toggleModalHandler}>
										Submit Comment
									</Button>
								</Col>
							</Row>
						</LocalForm>
					</ModalBody>
				</Modal>
				<Button outline onClick={this.toggleModalHandler}>
					<span className='fa fa-pencil fa-lg mr-2' />
					Submit Comment
				</Button>
			</>
		);
	}
}

function RenderComments({ comments, addComment, campsiteId }) {
	if (comments) {
		return (
			<div className={`col-md-5 m-1`}>
				<h4>Comments</h4>
				{comments.map((comment, index) => {
					return (
						<p key={index}>
							{comment.text} <br />
							-- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comment.date)))}
						</p>
					);
				})}
				<CommentForm campsiteId={campsiteId} addComment={addComment} />
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
					<CardText>{campsite.description}</CardText>
				</CardBody>
			</Card>
		</div>
	);
}

function CampsiteInfo(props) {
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
	if (props.campsite) {
		return (
			<div className='container'>
				<div className='row'>
					<div className='col'>
						<Breadcrumb>
							<BreadcrumbItem>
								<Link to='/directory'>Directory</Link>
							</BreadcrumbItem>
							<BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
						</Breadcrumb>
						<h2>{props.campsite.name}</h2>
						<hr />
					</div>
				</div>
				<div className='row'>
					<RenderCampsite campsite={props.campsite} />
					<RenderComments comments={props.comments} addComment={props.addComment} campsiteId={props.campsite.id} />
				</div>
			</div>
		);
	} else {
		return <div />;
	}
}

export default CampsiteInfo;

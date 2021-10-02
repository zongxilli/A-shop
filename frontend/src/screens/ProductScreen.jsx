import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
	Row,
	Col,
	Image,
	ListGroup,
	Card,
	Button,
	Form,
} from 'react-bootstrap';
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import Meta from '../components/Meta';
import Message from '../components/Message';
import {
	listProductDetails,
	createProductReview,
} from '../actions/productActions';
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants';

const getPrice = (price) => {
	if (price < 10) return 'X';
	else if (price < 100) return Math.floor(price / 10) + 'X';
	else if (price < 1000) return Math.floor(price / 100) + 'XX';
	else if (price < 10000) return Math.floor(price / 1000 + 'XXX');
};

const ProductScreen = ({ history, match }) => {
	const [qty, setQty] = useState(1);
	const [rating, setRating] = useState(0);
	const [comment, setComment] = useState('');

	const dispatch = useDispatch();

	const productDetails = useSelector((state) => state.productDetails);
	const { loading, product, error } = productDetails;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const productReviewCreate = useSelector((state) => state.productReviewCreate);
	const {
		loading: loadingProductReview,
		success: successProductReview,
		error: errorProductReview,
	} = productReviewCreate;

	useEffect(() => {
		if (successProductReview) {
			setRating(0);
			setComment('');
		}
		if (!product._id || product._id !== match.params.id) {
			dispatch(listProductDetails(match.params.id));
			dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
		}
	}, [dispatch, match, successProductReview]);

	const addToCartHandler = () => {
		history.push(`/cart/${match.params.id}?qty=${qty}`);
	};

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(
			createProductReview(match.params.id, {
				rating,
				comment,
			})
		);
	};

	return (
		<>
			<Link className='btn btn-light my-3' to='/'>
				Go Back
			</Link>
			{/* if is loading (loading == true) => show {Loader} */}
			{/* else if there is any error (error != null) => show error {Message} */}
			{/* else (loading finished & no error) => showing our {main page} */}
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : (
				<>
					<Meta title={product.name} />
					<Row>
						{/* //=-------------------- Product Image -------------------- */}
						<Col md={6}>
							<Image src={product.image} alt={product.name} fluid />
						</Col>
						{/* //=-------------------- Product Introduction -------------------- */}
						<Col md={3}>
							<ListGroup variant='flush'>
								{/* .......... Name .......... */}
								<ListGroup.Item>
									<h3>{product.name}</h3>
								</ListGroup.Item>

								{/* .......... Rating .......... */}
								<ListGroup.Item>
									<Rating
										value={product.rating}
										text={`${product.numReviews}`}
									/>
								</ListGroup.Item>

								{/* .......... Price .......... */}
								{/* <ListGroup.Item>Price: ${product.price}</ListGroup.Item> */}

								{/* .......... Category .......... */}
								{/* <ListGroup.Item>Category: {product.category}</ListGroup.Item> */}

								{/* .......... Description .......... */}
								<ListGroup.Item>
									Description: {product.description}
								</ListGroup.Item>
							</ListGroup>
						</Col>
						{/* //=-------------------- Product Buy Options -------------------- */}
						<Col md={3}>
							<Card>
								{/* .......... Price .......... */}
								<ListGroup variant='flush'>
									{/* <ListGroup.Item>
										<Row>
											<Col>Price:</Col>
											<Col>
												<strong>${getPrice(product.price)}</strong>
											</Col>
										</Row>
									</ListGroup.Item> */}

									{/* .......... Status .......... */}
									<ListGroup.Item>
										<Row>
											<Col>Status:</Col>
											<Col>
												{product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
											</Col>
										</Row>
									</ListGroup.Item>

									{/* .......... Quantity .......... */}
									{/* If the count in stock is <= 0 => we don't have {Select} option */}
									{product.countInStock > 0 && (
										<ListGroup.Item>
											<Row>
												<Col>Quantity: </Col>
												<Col>
													{/* <Form.Control
														as="select"
														value={qty}
														onChange={(e) => setQty(e.target.value)}>
														{[...Array(product.countInStock).keys()].map(
															(x) => (
																<option
																	key={x + 1}
																	value={x + 1}
																	style={{ color: 'black' }}>
																	{x + 1}
																</option>
															)
														)}
													</Form.Control> */}
													{product.countInStock}
												</Col>
											</Row>
										</ListGroup.Item>
									)}
									{/* .......... AddToCart Button .......... */}
									{/* If the count in stock is <= 0 => this {addToCart} button is disabled */}
									<ListGroup.Item>
										<Button
											onClick={addToCartHandler}
											className='btn-block'
											type='button'
											//
											disabled
										>
											Add To Cart (Currently Unavailable)
										</Button>
									</ListGroup.Item>
								</ListGroup>
							</Card>
						</Col>
					</Row>

					{/* //=-------------------- Product Review -------------------- */}
					
				</>
			)}
		</>
	);
};

export default ProductScreen;

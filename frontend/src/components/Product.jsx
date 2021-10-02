import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import Rating from './Rating';

const getPrice = (price) => {
	if (price < 10) return 'X';
	else if (price < 100) return Math.floor(price / 10) + 'X';
	else if (price < 1000) return Math.floor(price / 100) + 'XX';
	else if (price < 10000) return Math.floor(price / 1000 + 'XXX');
};

const Product = ({ product }) => {
	return (
		<Card className='my-3 p-3 rounded'>
			<Link to={`/product/${product._id}`}>
				<Card.Img src={product.image} variant='top' />
			</Link>

			<Card.Body>
				<Link to={`/product/${product._id}`}>
					<Card.Title as='div'>
						<strong>{product.name}</strong>
					</Card.Title>
				</Link>

				<Card.Text as='div'>
					<Rating
						value={product.rating}
						text={`${product.numReviews} reviews`}
						// color="red"
					/>
				</Card.Text>

				<Card.Text as='h3'>${getPrice(product.price)}</Card.Text>
			</Card.Body>
		</Card>
	);
};

export default Product;

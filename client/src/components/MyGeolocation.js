import React from 'react';

function MyGeolocation(props) {
	return (
		<section className="container section">
			<div className="level is-mobile">
				<div className="level-item has-text-centered">
					<div>
						<p className="heading">latitude</p>
						<p className="title">{props.latitude}</p>
					</div>
				</div>
				<div className="level-item has-text-centered">
					<div>
						<p className="heading">longitude</p>
						<p className="title">{props.longitude}</p>
					</div>
				</div>
			</div>
		</section>
	);
}

export default MyGeolocation;

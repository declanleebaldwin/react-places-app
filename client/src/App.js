import React, { useState } from 'react';
import './App.css';
import axios from 'axios';
import MyGeolocation from './components/MyGeolocation';
import Hero from './components/Hero';
function App() {
	const [latitude, setLatitude] = useState(null);
	const [longitude, setLongitude] = useState(null);
	const [typeList, setTypeList] = useState(['bakery', 'bar', 'gym', 'restaurant']);
	const [searchText, setSearchText] = useState('');
	const [placesNearby, setPlacesNearby] = useState([]);
	const typeListItems = typeList
		.filter((type) => searchText === '' || type.includes(searchText))
		.map((type, index) => (
			<li className="typeListItem is-size-5" onClick={() => findPlacesHandler(type)} key={index}>
				{type}
			</li>
		));
	const placesNearbyListItems = placesNearby.map((place) => (
		<li className="placeListItem" key={place.id}>
			{place.name}
		</li>
	));

	navigator.geolocation.getCurrentPosition(success, error);
	function success(position) {
		setLatitude(position.coords.latitude);
		setLongitude(position.coords.longitude);
	}

	function error() {
		console.log('unable to get location');
	}
	async function findPlacesHandler(type) {
		try {
			const response = await axios.post('/api/places', { type: type, latitude: latitude, longitude, longitude });
			console.log(response);
			if(response.data.status === "OVER_QUERY_LIMIT") {
				alert(response.data.error_message);
			} else {
				setPlacesNearby(response.data.results);
			}
		} catch (error) {
			console.log(error);
		}
	}
	return (
		<div>
			<Hero title="Places Near Me" />
			<MyGeolocation latitude={latitude} longitude={longitude} />
			<section className="container section" style={{minHeight: "448px"}}>
				<div className="columns">
					<div className="column is-half">
						<h3 className="title is-3">Where would you like to go?</h3>
						<input
							className="input"
							type="text"
							value={searchText}
							onChange={(e) => setSearchText(e.target.value)}
							placeholder="gym"
						/>
						<ul>{typeListItems}</ul>
					</div>
				</div>
			</section>
			<section className="container section">
				<div className="columns">
					<div className="column is-half">
						<h3 className="title is-3">Do you like any of these?</h3>
						<ul>{placesNearbyListItems}</ul>
					</div>
				</div>
			</section>
		</div>
	);
}

export default App;

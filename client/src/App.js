import React, { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
	const [latitude, setLatitude] = useState(null);
	const [longitude, setLongitude] = useState(null);
	const [typeList, setTypeList] = useState(["bakery", "bar", "gym", "restaurant"]);
	const [searchText, setSearchText] = useState("");
	const typeListItems = typeList
		.filter((type) => searchText === "" || type.includes(searchText))
		.map((type, index) => (
			<li className="typeListItem is-size-5" onClick={() => findPlacesHandler(type)} key={index}>
				{type}
			</li>
		));

	navigator.geolocation.getCurrentPosition(success, error);
	function success(position) {
		setLatitude(position.coords.latitude);
		setLongitude(position.coords.longitude);
	}

	function error() {
		console.log("unable to get location");
	}
	async function findPlacesHandler(type) {
		console.log(type);
		try {
			const response = await axios.post('/api/world', { post: type });
			console.log(response.data);
		} catch(error) {
			console.log(error);
		}

	}
	return (
		<div>
			<section className="hero is-primary">
				<div className="hero-body">
					<div className="container">
						<h1 className="title">Places Near Me</h1>
						<h2 className="subtitle"></h2>
					</div>
				</div>
			</section>
			<section className="container section">
				<div className="level is-mobile">
					<div className="level-item has-text-centered">
						<div>
							<p className="heading">latitude</p>
							<p className="title">{latitude}</p>
						</div>
					</div>
					<div className="level-item has-text-centered">
						<div>
							<p className="heading">longitude</p>
							<p className="title">{longitude}</p>
						</div>
					</div>
				</div>
			</section>
			<section className="container section">
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
		</div>
	);
}

export default App;

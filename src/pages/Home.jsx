import React, { useState } from "react";

import { MdSearch } from "react-icons/md";

import { Button } from "uikit-react";
import { options, geourl } from "../api";
import { ImSpinner9 } from "react-icons/im";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [cities, setCities] = useState([]);

    const fetchCities = async () => {
        const link = `${geourl}/cities?minPopulation=1000000&namePrefix=${search}`;
        setIsLoading(true);

        if (search) {
            try {
                let response = await fetch(link, options);
                if (response.ok) {
                    let data = await response.json();
                    setIsLoading(false);
                    setCities(data.data);
                } else {
                    setIsLoading(false);
                    setError("Error fetching city");
                }
            } catch (e) {
                setIsLoading(false);
                setError("Error fetching city");
            }
        } else {
            setIsLoading(false);
            setError("No city included");
        }
    };

    let timeout;

    return (
        <>
            <h1 className="uk-text-center">Search for a place</h1>
            <div className="uk-inline" style={{ width: "100%" }}>
                <span className="uk-form-icon">
                    <MdSearch />
                </span>
                <input
                    className="uk-input"
                    type="text"
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                    }}
                />
            </div>
            <div className="search-button">
                <Button
                    onClick={(e) => {
                        if (search.length >= 1) {
                            fetchCities(search);
                        }
                    }}
                >
                    <MdSearch />
                    &nbsp; Search
                </Button>
            </div>

            {isLoading && (
                <>
                    <hr />
                    <div className="uk-text-center">
                        <ImSpinner9 className="spin" color="white" size="30" />
                    </div>
                </>
            )}

            {cities.length > 1 && !isLoading && !error && (
                <>
                    <hr />
                    <h4>Select a city</h4>
                    <div className="uk-child-width-1-3@m uk-grid-match uk-grid">
                        {cities.map((city) => (
                            <div>
                                <div
                                    className="uk-card uk-card-secondary uk-card"
                                    onClick={(e) => {
                                        navigate(
                                            `/city/${encodeURIComponent(
                                                city.latitude
                                            )}/${encodeURIComponent(
                                                city.longitude
                                            )}/${encodeURIComponent(city.city)}`
                                        );
                                    }}
                                >
                                    <h3 className="uk-card-title">
                                        {city.city}
                                    </h3>
                                    <p>{city.country}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </>
    );
};

export default Home;

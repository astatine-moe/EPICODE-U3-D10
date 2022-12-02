import React from "react";
import { Outlet, Link } from "react-router-dom";

import { MdHome, MdSearch, MdSave } from "react-icons/md";
import { LinkContainer } from "react-router-bootstrap";

const MyNavbar = () => {
    return (
        <header>
            <nav>
                <ul>
                    <li>
                        <Link to="/" className="nav-link">
                            <div className="icon">
                                <MdSearch />
                            </div>

                            <div className="nav-text">Search</div>
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default MyNavbar;

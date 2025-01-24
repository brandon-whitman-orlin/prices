import React from 'react';
import PropTypes from 'prop-types';

import './Navbar.css';

const Navbar = ({ links, name = '' }) => {
    // Add the "nav-link" class to any <a> element that doesn't already have it
    const updatedLinks = links.map((link, index) => {
        const linkClass = link.props.className || '';
        const updatedClassName = linkClass.includes('nav-link')
            ? linkClass
            : `${linkClass} nav-link`.trim();

        return React.cloneElement(link, { className: updatedClassName, key: index });
    });

    return (
        <nav className="navbar">
            {name && (
                <a href="/">
                    <h2>{name}</h2>
                </a>
            )}
            <ul className="nav-list">
                {updatedLinks.map((link, index) => {
                    const isActive = link.props.className.includes('active');
                    return (
                        <li className="nav-item" key={index}>
                            {isActive ? (
                                <div className="active">{link}</div>
                            ) : (
                                link
                            )}
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
};

Navbar.propTypes = {
    links: PropTypes.arrayOf(PropTypes.element).isRequired,
    name: PropTypes.string,
};

export default Navbar;

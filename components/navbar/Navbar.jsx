import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import './Navbar.css';

import { ReactComponent as DropdownCaret } from "../../assets/icons/caret.svg"; // Import the SVG

const Navbar = ({ links, name = '' }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Track dropdown state
    const dropdownRef = useRef(null); // Reference to the dropdown button

    // Handle scroll events
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        // Close the dropdown when clicking outside of it
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false); // Close dropdown if click is outside
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        // Clean up the event listeners when the component is unmounted
        return () => {
            window.removeEventListener('scroll', handleScroll);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Add the "nav-link" class to any <a> element that doesn't already have it
    const updatedLinks = links.map((link, index) => {
        // Ensure link is a valid React element
        if (React.isValidElement(link)) {
            const linkClass = link.props.className || '';
            const updatedClassName = linkClass.includes('nav-link')
                ? linkClass
                : `${linkClass} nav-link`.trim();

                if (link.props.className?.split(' ').includes('dropdown')) {
                    const updatedChildren = React.Children.map(link.props.children, (child) => {
                        if (child.props?.className === 'dropdown-caret') {
                            return <DropdownCaret className="dropdown-caret" aria-hidden="true" />;
                        }
                        if (child.props?.className === 'dropdown-menu') {
                            return React.cloneElement(child, {
                                className: `dropdown-menu${isDropdownOpen ? ' opened' : ''}`,
                                inert: isDropdownOpen ? undefined : "true",
                                children: React.Children.map(child.props.children, (menuItem) => {
                                    if (menuItem.props?.className === 'dropdown-option') {
                                        return React.cloneElement(menuItem, {
                                            tabIndex: isDropdownOpen ? 0 : -1,
                                        });
                                    }
                                    return menuItem;
                                }),
                            });
                        }
                        return child;
                    });
                
                    return React.cloneElement(link, {
                        className: `${link.props.className} ${isDropdownOpen ? 'opened' : ''}`,
                        onClick: (e) => {
                            e.preventDefault();
                            setIsDropdownOpen((prevState) => !prevState);
                        },
                        onKeyDown: (e) => {
                            if (e.key === "Enter" || e.key === " ") { // Space or Enter triggers dropdown
                                e.preventDefault();
                                setIsDropdownOpen((prevState) => !prevState);
                            }
                        },
                        tabIndex: 0, // Makes the div focusable
                        role: "button", // Improves accessibility
                        ref: dropdownRef,
                        key: index,
                    }, updatedChildren);
                }

            return React.cloneElement(link, { className: updatedClassName, key: index });
        }

        // If the element is not a valid React element, we simply return it as is
        return link;
    });

    return (
        <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
            {name && (
                <a href="/" className='site-name'>
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
    name: PropTypes.node, // Accepts both strings and JSX
};

export default Navbar;

import React from 'react';
import './IconLink.css'; // Optional styles for the icons

import { ReactComponent as SourceIcon } from '../../assets/icons/book.svg';

const IconLink = ({ type, href }) => {
    const icons = {
        source: <SourceIcon className="icon" />,
    };

    return (
        <a
            href={href}
            className={`icon-link ${type}`}
            target='_blank'
        >
            {icons[type] || "❓"} {/* Fallback for unknown types */}
        </a>
    );
};

export default IconLink;

import React from 'react';
import './InfoCard.css';

import IconLink from '../../components/iconlink/IconLink';

import { ReactComponent as UpGraph } from '../../assets/icons/upgraph.svg';
import { ReactComponent as DownGraph } from '../../assets/icons/downgraph.svg';

const InfoCard = ({ info }) => {
    const {
        desire,
        inaugurationPercentageChange,
        title,
        currentMeasure,
        sign,
        units = "", // Default to an empty string if units are not provided
        dailyChange,
        frequency,
        lastMeasure,
        inauguration,
        description,
        lastUpdated,
        sourceUrl,
    } = info;

    const backgroundColor =
        (desire === 'positive' && inaugurationPercentageChange > 0) || (desire === 'negative' && inaugurationPercentageChange < 0)
            ? `var(--negative)`
            : `var(--positive)`;

    // Format the current measure display based on sign and units
    const formattedMeasure =
        sign === '$'
            ? `${sign}${currentMeasure}`
            : `${currentMeasure}${sign || ""}`;

    return (
        <div className="infoCard" style={{ backgroundColor }}>
            {/* Header with Title and Amount */}
            <div className="infoCard-header">
                <h3 className="title">{title}</h3>
                <h4 className="amount">
                    {formattedMeasure} {units}
                </h4>
            </div>

            <h3 className="change">
                {dailyChange > 0 ? (
                    <>
                        <UpGraph className="icon" /> Up {Math.abs(dailyChange)}%
                    </>
                ) : (
                    <>
                        <DownGraph className="icon" /> Down {Math.abs(dailyChange)}%
                    </>
                )}
                {` since last ${frequency} (${lastMeasure}).`}
            </h3>

            <h3 className="change">
                {inaugurationPercentageChange > 0 ? (
                    <>
                        <UpGraph className="icon" /> Up {Math.abs(inaugurationPercentageChange)}%
                    </>
                ) : (
                    <>
                        <DownGraph className="icon" /> Down {Math.abs(inaugurationPercentageChange)}%
                    </>
                )}
                {` since inauguration (${inauguration}).`}
            </h3>

            <p className="description">{description}</p>

            <div className="controls">
                <small className="last-updated">{`Last Updated: ${lastUpdated}`}</small>
                <IconLink type="source" href={sourceUrl} />
            </div>
        </div>
    );
};

export default InfoCard;

const formatDate = (dateStr) => {
    const [year, month, day] = dateStr.split("-");
    return `${month}-${day}-${year}`;
};

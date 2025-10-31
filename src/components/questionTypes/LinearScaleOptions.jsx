import React from 'react';

const LinearScaleOptions = ({ selectedStartValue, setSelectedStartValue, selectedEndValue, setSelectedEndValue }) => {
    const startValues = [0, 1];
    const endValues = Array.from({ length: 9 }, (_, i) => i + 2);

    return (
        <div className="flex items-center space-x-2">
            <select value={selectedStartValue} onChange={(e) => setSelectedStartValue(parseInt(e.target.value))}>
                {startValues.map(value => (
                    <option key={value} value={value}>{value}</option>
                ))}
            </select>
            <span>to</span>
            <select value={selectedEndValue} onChange={(e) => setSelectedEndValue(parseInt(e.target.value))}>
                {endValues.map(value => (
                    <option key={value} value={value}>{value}</option>
                ))}
            </select>
        </div>
    );
};

export default LinearScaleOptions;

import React from 'react'

type FieldProps = {
    text: string;
    value: string;
    valueColor: string;
}

export const Field = ({ text, value, valueColor }: FieldProps) => {

    return (
        <div className="stat">
            <div className="stat-title">{text}</div>
            <div className={`stat-value text-3xl ${valueColor}`}>{value}</div>
        </div>
    )
}
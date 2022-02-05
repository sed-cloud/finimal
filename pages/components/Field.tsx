import React from 'react'

type FieldProps = {
    text: string;
    value: string;
    valueColor: string;
}

export const Field = ({ text, value, valueColor }: FieldProps) => {

    return (
        <div>
            <p className={`text-stone-700 font-["Poppins"] font-bold text-lg mr-4`}>
                {text}
            </p>
            <p className={`${valueColor} font-["Poppins"] font-bold text-lg`}>
                {value}
            </p>
        </div>
    )
}
import React from "react";

type TooltipProps = {
    text: string
}

export const Tooltip = ({ text }: TooltipProps) => {
    return (
        <div className="grid">
            <p className="tooltip rounded shadow-lg p-2 font-normal font-['Poppins'] bg-stone-800 text-stone-50 mt-10 m-4 justify-self-center">
                {text}
            </p>
        </div>
    )
}
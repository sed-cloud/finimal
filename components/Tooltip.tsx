import React from "react";

type TooltipProps = {
    text: string
}

export const Tooltip = ({ text }: TooltipProps) => {
    return (
        <div className="grid">
            <p className="
            transition-all
            ease-in-out 
            delay-0
            group-hover:delay-500

            tooltip
            rounded-xl
            shadow-lg
            p-2
            font-normal
            font-['Poppins']
            bg-stone-800
            text-stone-50
            mt-12
            m-4
            justify-self-center"
            >
                <div className="border-b-2 rotate-45 w-4 h-4 left-[calc(50%_-_8px)] absolute border-8 border-stone-800 -top-2"></div>
                {text}
            </p>
        </div>
    )
}
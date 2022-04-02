import { MouseEventHandler } from "react";

type ButtonGroupProps = {
    selected: string
    items: string[]
    callback: MouseEventHandler<HTMLButtonElement>;
}

const ButtonGroup = ({ selected, items, callback }: ButtonGroupProps) => {
    return (
        <div className="
            transition-all 
            ease-in-out 
            durration-300

            bg-stone-200 
            text-stone-900
            font-['Poppins']
            font-bold
            rounded-xl
            flex
            content-center
            "
            >
            {items.map((value, index) => {
                return <button
                    key={index}
                    onClick={callback}
                    data-value={value}
                    className={`
                        transition-all 
                        ease-in-out 
                        durration-300
                        
                        text-stone-900
                        font-['Poppins']
                        font-bold
                        ${index === 0 ? 'rounded-l-xl' : ''}
                        ${index === items.length - 1 ? 'rounded-r-xl' : ''}
                        ${value === selected ? 'bg-blue-700' : 'bg-stone-200 '}
                        ${value === selected ? 'text-stone-50' : 'text-stone-900 '}
                        px-4
                        `}
                >{value}</button>
            })}
        </div>
    )
}

export default ButtonGroup
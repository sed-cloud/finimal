type MultiSelectProps = {
    text: string
    items: {
        checked: boolean
        text: string
    }[]
    callback: (itemName: string) => void;
}

const MultiSelect = ({ text, items, callback }: MultiSelectProps) => {
    console.log(items)
    return (
        <div className="dropdown">
            <button tabIndex={0} className="
                transition-all 
                ease-in-out 
                durration-300

                bg-stone-200 
                text-stone-900
                px-4
                py-2
                font-['Poppins']
                font-bold
                rounded-xl

                hover:bg-stone-600
                hover:text-red-50
            ">{text}</button>
            <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                {items.map((item, index) => {
                    return (<button
                        className="
                        label
                        justify-start
                        cursor-pointer
                        rounded-xl
                        hover:bg-stone-200 pl-2"
                        key={index} onClick={() => callback(item.text)}>
                        <input type="checkbox" checked={item.checked} className="checkbox mr-2" />
                        <span className="text-ellipsis overflow-hidden whitespace-nowrap">{item.text}</span>
                    </button>)
                })}
            </ul>
        </div>
    )
}

export default MultiSelect;
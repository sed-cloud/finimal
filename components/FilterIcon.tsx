import { faFilter } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { MultiSelectContent } from "./MultiSelect"

type FitlerIconProps = {
    items: {
        checked: boolean
        text: string
    }[]
    callback: (itemName: string) => void;
}

const FilterIcon = ({ items, callback }: FitlerIconProps) => {
    return (
        <div className="dropdown dropdown-end">
            <button className={`
            transition-all 
            ease-in-out 
            durration-300

            text-stone-900
            px-4
            rounded-xl
            hover:text-cyan-600
            font-["Poppins"]
            
            `}
            >
                <FontAwesomeIcon icon={faFilter} size={'lg'} />
            </button>
            <MultiSelectContent items={items} callback={callback} />
        </div>
    )
}

export default FilterIcon
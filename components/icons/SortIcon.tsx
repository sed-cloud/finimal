import { faArrowDown, faArrowsUpDown, faArrowUp } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

type SortIconProps = {
    sortType: 'none' | 'ascending' | 'descending'
    callback: () => void;
}

const SortIcon = ({ sortType, callback }: SortIconProps) => {
    return (
        <div className="">
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
                onClick={callback}
            >
                <FontAwesomeIcon icon={
                    sortType === 'none' ? faArrowsUpDown : sortType === 'ascending' ? faArrowUp : faArrowDown
                } size={'lg'} />
            </button>
        </div>
    )
}

export default SortIcon
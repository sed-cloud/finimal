import { faWallet } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

type CryptoIconProps = {
    disabled: boolean
}

const CryptoIcon = ({ disabled }: CryptoIconProps) => {
    return (
        <button className={`
            transition-all 
            ease-in-out 
            durration-300

            text-stone-900
            px-4
            rounded-xl

            ${disabled ? 'bg-stone-100' : 'bg-stone-200 hover:bg-emerald-50 hover:text-emerald-50'}
            
            `}
            disabled={disabled}
        >
            <FontAwesomeIcon icon={faWallet} size={'lg'} className='opacity-50' />
        </button>)
}

export default CryptoIcon
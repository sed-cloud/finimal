import { faWallet } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Tooltip } from "../Tooltip"

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
            
            has-tooltip
            group
            `}
            disabled={disabled}
        >
            <Tooltip text={disabled ? 'Connecting crypto wallets is currently not available' : 'Connect yor crypto wallet using metamask'} />
            <FontAwesomeIcon icon={faWallet} size={'lg'} className='opacity-50' />
        </button>)
}

export default CryptoIcon
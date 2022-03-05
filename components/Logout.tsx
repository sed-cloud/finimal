import { useAuth } from "../contexts/auth"


export const Logout = () => {
    const { logout } = useAuth()
    return (
        <button className='
                transition-all 
                ease-in-out 
                durration-300

                bg-stone-200 
                text-stone-900
                px-4
                py-2
                font-["Poppins"]
                font-bold
                rounded-xl

                hover:bg-red-600
                hover:text-red-50
                '
            onClick={() => logout('/')}>
            logout
        </button>
    )
}
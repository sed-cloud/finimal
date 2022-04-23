import SortIcon from "../icons/SortIcon";

type SortTableHeaderProps = {
    text: string;
    sortType: 'none' | 'ascending' | 'descending';
    callback: () => void;
}


export default function SortTableHeader({ text, sortType, callback }: SortTableHeaderProps) {
    return (<div className="bg-white flex flex-row justify-between place-items-center">
        <div className=" 
                            font-['Poppins']
                            font-bold
                            rounded-md

                            px-1
                            py-1
                            capitalize
                            ">{text}</div>
        <SortIcon sortType={sortType} callback={callback} />
    </div>);
}
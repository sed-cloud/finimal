import FilterIcon from "../icons/FilterIcon";

type FilterTableHeaderProps = {
    text: string;
    items: string[];
    checkedItems: string[];
    callback: (itemName: string) => void;
}


export default function FilterTableHeader({ text, items, checkedItems, callback }: FilterTableHeaderProps) {
    return (<div className="bg-white flex flex-row justify-between place-items-center">
        <div className=" 
                            font-['Poppins']
                            font-bold
                            rounded-md

                            px-1
                            py-1
                            capitalize
                            ">{text}</div>
        <FilterIcon items={items.map(item => {
            return {
                text: item,
                checked: checkedItems.includes(item)
            };
        })} callback={callback} />
    </div>);
}
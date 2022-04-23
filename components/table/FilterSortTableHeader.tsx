import FilterIcon from "../icons/FilterIcon";
import SortIcon from "../icons/SortIcon";

type FilterSortTableHeaderProps = {
    text: string;
    items: string[];
    checkedItems: string[];
    sortType: 'none' | 'ascending' | 'descending'
    filterCallback: (itemName: string) => void;
    sortCallback: () => void;
}


export default function FilterSortTableHeader({ text, items, checkedItems, sortType, filterCallback, sortCallback }: FilterSortTableHeaderProps) {
    return (<div className="bg-white flex flex-row justify-between place-items-center">
        <div className=" 
                            font-['Poppins']
                            font-bold
                            rounded-md

                            px-1
                            py-1
                            capitalize
                            ">{text}</div>
        <div className="flex flex-row">
            <FilterIcon items={items.map(item => {
                return {
                    text: item,
                    checked: checkedItems.includes(item)
                };
            })} callback={filterCallback} />
            <SortIcon sortType={sortType} callback={sortCallback} />
        </div>
    </div>);
}
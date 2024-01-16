
import React, { useState, ChangeEvent } from "react";

type profileType = {
    id: string;
    name: string;
    email: string;
    image?: string;
};


type MultiSelectProps = {
    persons: profileType[];
};


const MultiSelectTailwind: React.FC<MultiSelectProps> = ({
    persons,
}) => {

    const [items, setItems] = useState<profileType[]>(persons);
    const [selectedItems, setSelectedItems] = useState<profileType[]>([]);
    const [inputValue, setInputValue] = useState<string>("");
    const [lastIndex, setLastIndex] = useState<number>(-1);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleSelect = (person: profileType) => {
        if (!selectedItems.includes(person)) {
            setSelectedItems([...selectedItems, person]);
            setItems(items.filter((item) => item !== person));
            setInputValue("");
            const input = document.querySelector("input");
            input?.focus();
        }
    };

    
    const handleRemove = (person: profileType) => {
        setSelectedItems(selectedItems.filter((item) => item !== person));
        setItems([...items, person]);
        const input = document.querySelector("input");
        input?.focus();
    };

    
    const handleBackspace = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace") {
            if (inputValue.length === 0){
                if (lastIndex === -1) {
                    setLastIndex(selectedItems.length - 1);
                } else {
                    handleRemove(selectedItems[lastIndex]);
                    setLastIndex(-1);
                }
        }
        }
    };

    const filteredItems = items.filter((item) =>
        item.name.toLowerCase().includes(inputValue.toLowerCase())
    );
    return (
        <div className="relative flex flex-wrap border-b-4 border-blue-500  bg-slate-100 min-h-14 lg:max-w-[1100px] w-full">
            {selectedItems.map((person, index) => (
                <div
                    key={index}
                    className={`flex gap-2 items-center justify-between p-2 m-2 bg-gray-200 rounded-full text-gray-500 border-2  ${lastIndex === index ? "border-green-500" : ""
                        }`}
                >
                    <div className="flex items-center">
                        <img
                            className="w-8 h-8 rounded-full"
                            src={person.image}
                            alt="avatar"
                        />
                        <span className="ml-2 font-semibold ">{person.name}</span>
                    </div>
                    <button onClick={() => handleRemove(person)} className="px-0.5">
                        X
                    </button>
                </div>
            ))}

            <div className="relative">
                <div className="absolute">
                    <input
                        className="p-2 m-2 bg-gray-200 bg-transparent focus:outline-none"
                        type="text"
                        placeholder="select person profile..."
                        value={inputValue}
                        onKeyDown={handleBackspace}
                        onClick={() => setIsOpen(true)} 
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            setInputValue(e.target.value);
                            setIsOpen(true);
                        }}
                    />
                    {isOpen && (
                        <div className="flex flex-col overflow-y-auto" style={{
                            maxHeight: "250px",
                            width: "300px"
                        }}>
                            {filteredItems.length === 0 ? (
                                <div className="flex items-center justify-between p-2 w-full bg-gray-200 cursor-pointer hover:bg-gray-300">No matching profiles found.</div>
                            ) : (
                            filteredItems.map((person, id) => (
                                <div
                                    key={id}
                                    className="flex items-center justify-between p-2 w-full bg-gray-200 cursor-pointer hover:bg-gray-300"
                                    onClick={() => handleSelect(person)}
                                    
                                >
                                    <div className="flex items-center text-gray-500 rounded-full hover:bg-gray-300">
                                        <img
                                            className="w-8 h-8 rounded-full"
                                            src={person.image}
                                            alt="avatar"
                                        />
                                        <span className="ml-2 font-semibold">{person.name}</span>
                                        <span className="ml-2 text-xs text-gray-400">
                                            {person.email}
                                        </span>
                                    </div>
                                </div>
                            )))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
export default MultiSelectTailwind;
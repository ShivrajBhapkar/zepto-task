// Import necessary dependencies and styles
import React, { useEffect, useRef, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

// Define the shape of an item
type Item = {
    id: string;
    value: string;
    highlighted?: boolean;
    icon?: React.ReactNode; // New property for the icon
};

// Define the properties for the MultiSelect component
type MultiSelectProps = {
    raised?: boolean;
    items: Item[];
    placeholder: string;
};

// Define the MultiSelectTailwind component
const MultiSelectTailwind: React.FC<MultiSelectProps> = ({
    raised = true,
    items,
    placeholder = "Select an Item",
}) => {
    // State variables to manage component behavior
    const [showAllSelectedMessage, setShowAllSelectedMessage] = useState(false);
    const [showNotInListMessage, setShowNotInListMessage] = useState(false);
    const [selectedItems, setSelectedItems] = useState<Item[]>([]);
    const [opened, setIsOpened] = useState(false);
    const [inputValue, setInputValue] = useState("");

    // Refs to access DOM elements
    const wrapperRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // useEffect to handle changes in selectedItems and show appropriate messages
    useEffect(() => {
        setShowAllSelectedMessage(selectedItems.length === items.length);
        setShowNotInListMessage(false); // Reset showMessage state when the selected items change
    }, [selectedItems, items]);

    // useEffect to handle document click and keydown events
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                wrapperRef.current &&
                !wrapperRef.current.contains(event.target as Node) &&
                inputRef.current &&
                !inputRef.current.contains(event.target as Node)
            ) {
                setIsOpened(false);
            }
        };

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Backspace") {
                if (inputRef.current && inputRef.current.value === "") {
                    const lastItem = selectedItems[selectedItems.length - 1];
                    if (lastItem) {
                        setSelectedItems((prevItems) =>
                            prevItems.map((item) => (item === lastItem ? { ...item, highlighted: true } : item))
                        );
                    }
                } else {
                    const lastHighlightedItem = selectedItems.find((item) => item.highlighted);
                    if (lastHighlightedItem) {
                        setSelectedItems((prevItems) =>
                            prevItems.filter((item) => item !== lastHighlightedItem)
                        );
                    }
                }
            }
        };

        // Add event listeners
        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleKeyDown);

        // Remove event listeners on component unmount
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [selectedItems]);

    // Function to handle click on wrapper
    const onClickWrapper = () => {
        setIsOpened(!opened);
    };

    // Function to handle click on delete icon of an item
    const onClickDeleteItem = (id: string) => {
        setSelectedItems(selectedItems.filter((item) => item.id !== id));
    };

    // Function to handle click on a dropdown item
    const onDropDownClicked = (newItem: Item) => {
        setSelectedItems([...selectedItems, newItem]);
        setInputValue("");
        setShowNotInListMessage(false);
    };

    // Filter items based on selected items and input value
    const filteredItems = items.filter(
        (item) =>
            selectedItems.findIndex((sel) => sel.id === item.id) === -1 &&
            item.value.toLowerCase().includes(inputValue.toLowerCase())
    );

    // useEffect to show "not in list" message
    useEffect(() => {
        setShowNotInListMessage(filteredItems.length === 0 && inputValue.trim() !== "");
    }, [filteredItems, inputValue]);

    // Return the JSX for the component
    return (
        <div
            className={`w-full ${raised ? "shadow-md" : ""} p-2 rounded`}
            ref={wrapperRef}
        >
            <div className="flex flex-wrap items-center border-b-2 border-blue-700 z-10">
                {selectedItems.map(({ id, value, icon }) => (
                    <div className="flex flex-col rounded-full border-2 border-gray-400 m-2" key={id}>
                        <span
                            className="bg-blue-100 text-blue-500  rounded m-2 text-sm cursor-pointer flex items-center justify-center"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {typeof icon === 'string' && (
                                <img src={icon} alt={value} height="22px" width="22px" className="mr-1" />
                            )}
                            {value}
                            <AiOutlineClose
                                className="ml-1 cursor-pointer"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onClickDeleteItem(id);
                                }}
                            />
                        </span>
                    </div>
                ))}
                <div className="flex items-center">
                    <input
                        type="text"
                        placeholder={placeholder}
                        onClick={onClickWrapper}
                        ref={inputRef}
                        value={inputValue}
                        onChange={(e) => {
                            setInputValue(e.target.value);
                            setShowNotInListMessage(false); // Reset showMessage when user types
                        }}
                        className="p-1 outline-none"
                    />
                </div>
            </div>
            {showNotInListMessage && (
                <div className="text-red-500 mt-2">
                    User is not in the list. Please select a valid item.
                </div>
            )}
            {opened && (
                <ul
                    className={`mt-4 flex flex-col items-center z-50  justify-start left-0 absolute overflow-y-auto ${raised ? "shadow-lg shadow-gray-500" : ""}`}
                    style={{
                        top: (inputRef.current?.offsetTop || 3) + (inputRef.current?.offsetHeight || 3),
                        left: inputRef.current?.offsetLeft || 3,
                        maxHeight: "200px",
                        width: "300px"
                    }}
                >
                    {showAllSelectedMessage ? (
                        <li className="cursor-not-allowed w-full text-red-400 pl-2 space-y-2 py-1 max-w-18 min-w-10 flex items-center justify-start">
                            All items are selected
                        </li>
                    ) : (
                        filteredItems.map(({ id, value, icon }) => (
                            <li
                                key={id}
                                className="cursor-pointer w-full  pl-2 space-y-2 py-1 max-w-18 min-w-10 text-blue-500 flex items-center justify-start"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onDropDownClicked({ id, value, icon });
                                }}
                            >
                                <div className="flex items-center justify-start w-[100%] mt-2">
                                    {typeof icon === 'string' && (
                                        <img src={icon} height="20px" width="18px" alt={value} className="mr-2" />
                                    )}
                                  
                                    <span>{value}</span>
                                </div>
                            </li>
                        ))
                    )}
                </ul>
            )}
        </div>
    );
};

// Export the MultiSelectTailwind component
export default MultiSelectTailwind;
import * as React from 'react';
import * as Popover from '@radix-ui/react-popover';
import { Input } from "@/components/ui/input";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from './ui/button';

type FoodItem = {
    name: string;
    price: number;
    _id: string;
};

type ComboBoxProps = {
    items: FoodItem[];
    onSelect: (item: FoodItem) => void;
};

const ComboBox = ({ items, onSelect }: ComboBoxProps) => {
    const [inputValue, setInputValue] = React.useState('');
    const [open, setOpen] = React.useState(false);

    const filteredItems = items.filter(item =>
        item.name.toLowerCase().includes(inputValue.toLowerCase())
    );

    return (
        <Popover.Root open={open} onOpenChange={setOpen}>
            <Popover.Trigger asChild>
                <Button variant="outline"
                    className="w-full justify-between p-2 border border-gray-300 rounded"
                    aria-expanded={open}
                >
                    <span>{inputValue || "Select food item..."}</span>
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </Popover.Trigger>
            <Popover.Content className="w-full p-2 bg-white border border-gray-300 rounded shadow-lg">
                <Input 
                    placeholder="Search food item..." 
                    value={inputValue} 
                    onChange={(e) => setInputValue(e.target.value)} 
                />
                <div className="max-h-60 overflow-auto">
                    {filteredItems.length === 0 && (
                        <div className="p-2 text-sm text-gray-500">No food item found.</div>
                    )}
                    {filteredItems.map((item) => (
                        <div
                            key={item._id}
                            onClick={() => {
                                onSelect(item);
                                setInputValue(item.name);
                                setOpen(false);
                            }}
                            className="p-2 hover:bg-gray-100 cursor-pointer flex justify-between items-center"
                        >
                            <span>{item.name}</span>
                            {inputValue === item.name && <Check className="h-4 w-4 text-green-500" />}
                        </div>
                    ))}
                </div>
            </Popover.Content>
        </Popover.Root>
    );
};

export default ComboBox;

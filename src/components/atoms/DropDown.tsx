import React from "react";

interface DropdownProps {
    isOpen: boolean;
    children: React.ReactNode;
    ref?: React.Ref<HTMLDivElement>;
}

const Dropdown = React.forwardRef<HTMLDivElement, DropdownProps>(({ isOpen, children }, ref) => {
    return (
        isOpen ? (
            <div ref={ref} className="z-10 mt-11 list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 absolute left-0 mt-2">
                {children}
            </div>
        ) : null
    );
});

export default Dropdown;

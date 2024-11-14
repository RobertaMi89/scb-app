import React from "react";

interface DropdownProps {
    isOpen: boolean;
    children: React.ReactNode;
    ref?: React.Ref<HTMLDivElement>;
}

const Dropdown = React.forwardRef<HTMLDivElement, DropdownProps>(({ isOpen, children }, ref) => {
    return (
        isOpen ? (
            <div
                ref={ref}
                role="menu"
                aria-expanded={isOpen}
                aria-hidden={!isOpen}
                className="z-10 mt-12 list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 absolute left-0">
                {children}
            </div>
        ) : null
    );
});

export default Dropdown;

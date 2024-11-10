interface DropdownProps {
    isOpen: boolean;
    children: React.ReactNode;

}

const Dropdown = ({ isOpen, children }: DropdownProps) => (
    isOpen ? (
        <div className="z-10 mt-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 absolute left-0 mt-2">
            {children}
        </div>
    ) : null
);

export default Dropdown;

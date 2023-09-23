import { FaCheck } from "react-icons/fa6";

export default function Checkbox({ toggleCheckbox, complete }: { toggleCheckbox: () => void; complete: boolean }) {
    return (
        <button className="border-2 w-6 h-6 rounded-full flex justify-center items-center" data-cy="checkbox" onClick={toggleCheckbox}>
            {complete && <FaCheck size="20px" />}

            <span className="sr-only">{complete ? "Mark as incomplete" : "Mark as complete"}</span>
        </button>
    );
}

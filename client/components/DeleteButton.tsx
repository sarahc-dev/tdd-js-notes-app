import { RiDeleteBin6Line } from "react-icons/ri";

export default function DeleteButton({ handleDelete }: { handleDelete: () => void }) {
    return (
        <button data-cy="delete" onClick={handleDelete}>
            <RiDeleteBin6Line size="20px" />
            <span className="sr-only">Delete</span>
        </button>
    );
}

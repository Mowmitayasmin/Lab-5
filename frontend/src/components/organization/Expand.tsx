import  { useState } from "react";
import { ChevronUp, ChevronDown, Edit, TrashIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { Organizationdata } from "../../hooks/useEntryForm";

interface ExpandProps {
  x: Organizationdata;
  handleDelete: (id: string | number) => void;
}

const Expand = ({ x, handleDelete }: ExpandProps) => {
  const [expanded, setExpanded] = useState(false);

  const navigate = useNavigate();
  return (
    <div className="border p-2 rounded">
      <div className="flex justify-between items-center">
        <span className="text-lg">{x.title}</span>
        <div className="flex gap-2">
          <button
            onClick={() => setExpanded(!expanded)}
            className="p-1 rounded hover:bg-gray-200"
          >
            {expanded ? <ChevronUp /> : <ChevronDown />}
          </button>

          <button
            onClick={() => navigate(`/${x.id}/edit`)}
            className="p-1 rounded hover:bg-gray-200"
          >
            <Edit />
          </button>

          <button
            onClick={() => handleDelete(x?.id)}
            className="p-1 rounded hover:bg-red-200 text-red-600"
          >
            <TrashIcon />
          </button>
        </div>
      </div>

      {expanded && (
        <div id="employee-list" className="mt-2">
          <ul className="employee text-sm flex flex-col gap-2">
            <li>Description: {x.description}</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Expand;

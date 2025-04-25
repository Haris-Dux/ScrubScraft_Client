interface TrouserOption {
  _id: number;
  name: string;
  price: string;
  selected: boolean;
}

interface TrouserDetailsFormProps {
  trouserOptions: TrouserOption[];
  selectedTrouser: TrouserOption | null;
  setSelectedTrouser: (option: TrouserOption | null) => void;
}

export default function TrouserDetailsForm({
  trouserOptions,
  selectedTrouser,
  setSelectedTrouser,
}: TrouserDetailsFormProps) {
  const handleOptionChange = (option: TrouserOption) => {
    setSelectedTrouser(option);
  };

  return (
    <div className="max-w-xl space-y-4">
      <div className="space-y-2 text-sm">
        <div className="flex items-center gap-1">
          <span className="text-gray-900">Do you want a Trouser?</span>
          <span className="text-red-500">*</span>
        </div>

        <div className="space-y-2">
            {trouserOptions?.filter((option) => option.selected)?.map((option) => (
              <div key={option?._id} className="flex items-center capitalize gap-2">
              <input
                type="radio"
                id={`trouser-${option?._id}`}
                name="trouser"
                value={option?._id}
                checked={selectedTrouser?._id === option?._id}
                onChange={() => handleOptionChange(option)}
                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <label htmlFor={`trouser-${option?._id}`} className="text-gray-900">
                {option?.name}
              </label>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

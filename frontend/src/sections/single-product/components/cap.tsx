import { useEffect, useState } from "react";

// type NameEngravingFormProps = {
//   setNameEngraving: (
//     value: { name: string; position: "left" | "right" } | null
//   ) => void;
// };

type EngravingPosition = "left" | "right";
type EngravingOption = "yes" | "no";

export default function CapForm({ setCap }: any) {
  const [engravingOption, setEngravingOption] = useState<EngravingOption>("no");
  const [engravingText, setEngravingText] = useState("");
  const [engravingPosition, setEngravingPosition] =
    useState<EngravingPosition>("left");

  const handleOptionChange = (value: EngravingOption) => {
    setEngravingOption(value);
    if (value === "no") {
      setEngravingText("");
      setEngravingPosition("left");
      setCap(null);
    }
  };

  useEffect(() => {
    if (engravingOption === "yes" && engravingText && engravingPosition) {
      setCap({
        name: engravingText,
        position: engravingPosition,
      });
    } else {
      setCap(null);
    }
  }, [engravingOption, engravingText, engravingPosition, setCap]);

  return (
    <div className="max-w-xl space-y-4">
      <div className="space-y-2 text-sm">
        <div className="flex items-center gap-1">
          <span className="text-gray-900">Do You want to add cap?</span>
          <span className="text-red-500">*</span>
          {/* <span className="text-gray-600">(+ Rs.200.00 PKR)</span> */}
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <input
              type="radio"
              id="engrave-yes"
              name="engraving"
              value="yes"
              checked={engravingOption === "yes"}
              onChange={() => handleOptionChange("yes")}
              className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <label htmlFor="engrave-yes" className="text-gray-900">
              Yes (NO EXCHANGE) (+ Rs.200 PKR)
            </label>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="radio"
              id="engrave-no"
              name="engraving"
              value="no"
              checked={engravingOption === "no"}
              onChange={() => handleOptionChange("no")}
              className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <label htmlFor="engrave-no" className="text-gray-900">
              No
            </label>
          </div>
        </div>
      </div>

      {engravingOption === "yes" && (
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center gap-1">
              <label htmlFor="engraving-text" className="text-gray-900 text-sm">
                Please specify what you want to be engraved
              </label>
              <span className="text-red-500">*</span>
            </div>
            <input
              type="text"
              id="engraving-text"
              value={engravingText}
              onChange={(e) => setEngravingText(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required={engravingOption === "yes"}
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-1">
              <span className="text-gray-900 text-sm">
                Select engraving position
              </span>
              <span className="text-red-500">*</span>
            </div>
            <div className="flex gap-6">
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  id="position-left"
                  name="position"
                  value="left"
                  checked={engravingPosition === "left"}
                  onChange={() => setEngravingPosition("left")}
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <label
                  htmlFor="position-left"
                  className="text-gray-900 text-sm"
                >
                  Left Side
                </label>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  id="position-right"
                  name="position"
                  value="right"
                  checked={engravingPosition === "right"}
                  onChange={() => setEngravingPosition("right")}
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <label
                  htmlFor="position-right"
                  className="text-gray-900 text-sm"
                >
                  Right Side
                </label>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* <div className="text-gray-900 text-sm">
        Selections will add{" "}
        <span className="font-bold text-blue-600">Rs.200 PKR</span> to the total
        price
      </div> */}
    </div>
  );
}

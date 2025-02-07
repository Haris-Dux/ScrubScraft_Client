import type React from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaTshirt, FaRulerHorizontal } from "react-icons/fa";
import { MdClose } from "react-icons/md";

interface Measurements {
  shirtLength: string;
  chest: string;
  shoulder: string;
  sleeveLength: string;
  trouserWaist: string;
  trouserLength: string;
  otherNote: string;
}

export default function CustomSizeModal({
  isOpen,
  onCancel,
  setCustomSize,
}: any) {
  const [measurements, setMeasurements] = useState<Measurements>({
    shirtLength: "",
    chest: "",
    shoulder: "",
    sleeveLength: "",
    trouserWaist: "",
    trouserLength: "",
    otherNote: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setMeasurements((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCustomSize(measurements);
    toast.success("Custom size saved successfully");
    onCancel();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={onCancel}
    >
      <div
        className="bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Custom Size</h2>
            <button
              title="button"
              type="button"
              onClick={onCancel}
              className="text-gray-500 hover:text-gray-700"
            >
              <MdClose size={24} />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <InputField
                name="shirtLength"
                label="Shirt Length"
                value={measurements.shirtLength}
                onChange={handleChange}
                icon={<FaTshirt className="text-gray-400" />}
              />
              <InputField
                name="chest"
                label="Chest"
                value={measurements.chest}
                onChange={handleChange}
                icon={<FaRulerHorizontal className="text-gray-400" />}
              />
              <InputField
                name="shoulder"
                label="Shoulder"
                value={measurements.shoulder}
                onChange={handleChange}
                icon={<FaRulerHorizontal className="text-gray-400" />}
              />
              <InputField
                name="sleeveLength"
                label="Sleeve Length"
                value={measurements.sleeveLength}
                onChange={handleChange}
                icon={<FaRulerHorizontal className="text-gray-400" />}
              />
              <InputField
                name="trouserWaist"
                label="Trouser Waist"
                value={measurements.trouserWaist}
                onChange={handleChange}
                icon={<FaRulerHorizontal className="text-gray-400" />}
              />
              <InputField
                name="trouserLength"
                label="Trouser Length"
                value={measurements.trouserLength}
                onChange={handleChange}
                icon={<FaRulerHorizontal className="text-gray-400" />}
              />
            </div>
            <div>
              <label
                htmlFor="otherNote"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Other Note
              </label>
              <textarea
                id="otherNote"
                name="otherNote"
                rows={3}
                className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
                value={measurements.otherNote}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={onCancel}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

interface InputFieldProps {
  name: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon: React.ReactNode;
}

function InputField({ name, label, value, onChange, icon }: InputFieldProps) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {icon}
        </div>
        <input
          type="text"
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className="w-full pl-10 pr-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
          required
        />
      </div>
    </div>
  );
}

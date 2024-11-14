import { X } from "lucide-react";
import { useState } from "react";
import {  Folder, FolderHeart, FolderInput, FolderKey, FolderLock } from "lucide-react";

export default function ({ onClose } : { onClose: () => void }) {
  const [folderName, setFolderName] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedIcon, setSelectedIcon] = useState("");

  const colors = [
    { name: "Yellow", value: "bg-amber-600" },
    { name: "Yellow", value: "bg-yellow-600" },
    { name: "Teal", value: "bg-lime-600" },
    { name: "Teal", value: "bg-green-600" },
    { name: "Teal", value: "bg-teal-600" },
    { name: "Purple", value: "bg-purple-500" },
    { name: "Red", value: "bg-red-600" },
    { name: "Red", value: "bg-rose-600" },
    { name: "Indigo", value: "bg-indigo-600" },
    { name: "Indigo", value: "bg-blue-600" },
    { name: "Indigo", value: "bg-cyan-600" },
  ];

  const icons = [
    { name: "Folder", component: Folder },
    { name: "FolderHeart", component: FolderHeart },
    { name: "FolderInput", component: FolderInput },
    { name: "FolderKey", component: FolderKey },
    { name: "FolderLock", component: FolderLock },
  ];

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (folderName && selectedColor && selectedIcon) {
      console.log("Folder Name:", folderName);
      console.log("Selected Color:", selectedColor);
      console.log("Selected Icon:", selectedIcon);
    }
  };

  return (
    <div className="bg-card p-6 rounded-lg shadow-xl w-96 border border-card-foreground/20 shadow-purple-500/10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-card-foreground">Create Notes</h2>
        <button onClick={onClose} className="text-muted-foreground hover:text-card-foreground">
          <X size={20} />
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="folderName" className="block text-sm font-medium text-card-foreground mb-1">
            Note title
          </label>
          <input
            id="folderName"
            type="text"
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
            placeholder="Enter folder name"
            className="w-full p-2 bg-input text-card-foreground rounded border border-input focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-card-foreground mb-2">Icon Color</label>
          <div className="flex gap-3 flex-wrap">
            {colors.map((color) => (
              <button
                key={color.value}
                type="button"
                onClick={() => setSelectedColor(color.value)}
                className={`h-8 w-8 rounded-full ${
                  color.value
                } border-2 focus:outline-none focus:ring-2 focus:ring-primary ${
                  selectedColor === color.value ? "border-primary" : "border-transparent"
                }`}
                aria-label={`Select ${color.name} color`}
              />
            ))}
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-card-foreground mb-2">Icon</label>
          <div className="flex gap-3 flex-wrap">
            {icons.map((icon) => (
              <button
                key={icon.name}
                type="button"
                onClick={() => setSelectedIcon(icon.name)}
                className={`p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                  selectedIcon === icon.name
                    ? "bg-primary text-primary-foreground"
                    : `bg-secondary ${selectedColor != "" ? `text${selectedColor.replace("bg", "")}` : "text-secondary-foreground"}`
                }`}
                aria-label={`Select ${icon.name} icon`}
              >
                <icon.component className="h-6 w-6" />
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-secondary text-secondary-foreground rounded hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-secondary"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-primary"
            disabled={!folderName || !selectedColor || !selectedIcon}
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
}

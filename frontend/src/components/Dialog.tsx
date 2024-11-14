import React, { useState } from "react";
import { X } from "lucide-react";
import CreateFolders from "./Dialogs/CreateFolders";
import Note from "./Dialogs/Note";

const Dialog = ({ isOpen, onClose, type }) => {
  const [inputValue, setInputValue] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`New ${type} created:`, inputValue);
    setInputValue("");
    onClose();
  };

  let Dialog = null;
  switch (type) {
    case "folder":
      Dialog = CreateFolders;
      break;
    case "note":
      Dialog = Note;
      break;
    default:
      Dialog = () => <div>Unknown dialog type</div>;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <Dialog onClose={onClose} />
    </div>
  );
};

export default Dialog;

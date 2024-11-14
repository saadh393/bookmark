import React, { useEffect, useRef, useState } from "react";
import {
  Plus,
  Image,
  Headphones,
  Youtube,
  MessageCircle,
  FileText,
  MoreHorizontal,
  Layers,
  Folder,
} from "lucide-react";

const Toolbar = ({ onPlusClick }) => {
  const [showPopup, setShowPopup] = useState(false);

  const tools = [
    { icon: Image, color: "text-muted-foreground" },
    { icon: Headphones, color: "text-chart-5" },
    { icon: Youtube, color: "text-chart-1" },
    { icon: MessageCircle, color: "text-chart-2" },
    { icon: FileText, color: "text-muted-foreground" },
    { icon: MoreHorizontal, color: "text-muted-foreground" },
  ];

  const onPlusClickMod = (type) => {
    setShowPopup(false)
    onPlusClick(type)
  }

  const popupItems = [
    { icon: Layers, label: "Quick Link", onClick: () => onPlusClickMod("quicklink") },
    { icon: Folder, label: "Folder", onClick: () => onPlusClickMod("folder") },
    { icon: FileText, label: "Note", onClick: () => onPlusClickMod("note") },
  ];


  return (
    <div className="bg-card p-2 flex justify-center relative">
      <div className="flex space-x-4 bg-accent rounded-full px-4 py-2">
        <button  className="relative m-0 p-0 mr-4 mb-6 bg-gray-600" onFocus={() => setShowPopup(!showPopup)} onBlur={() => setShowPopup(false)}>
          <Plus className="w-6 h-6 text-primary cursor-pointer absolute left-1/2 top=1/2 z-20" />
          
          {showPopup && (
            <label  className="absolute bottom-full left-1/2 transform -translate-x-1/2  bg-popover rounded-lg shadow-lg w-40 bg-zinc-800 py-2 mb-6 transition-all">
              {popupItems.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 p-4 hover:bg-zinc-900  cursor-pointer"
                  onClick={item.onClick}
                >
                  <item.icon className="w-5 h-5 text-popover-foreground" />
                  <span className="text-sm text-popover-foreground">{item.label}</span>
                </div>
              ))}
            </label>
          )}
        </button>
        {tools.map((Tool, index) => (
          <Tool.icon key={index} className={`w-6 h-6 ${Tool.color} cursor-pointer`} />
        ))}
      </div>
    </div>
  );
};

export default Toolbar;

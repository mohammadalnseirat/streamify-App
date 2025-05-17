import React from "react";
import { useThemeStore } from "../store/useThemeStore";
import { PaletteIcon } from "lucide-react";
import { THEMES } from "../constant";

const ThemeSelector = () => {
  const { theme, setTheme } = useThemeStore();
  return (
    <div className="dropdown dropdown-end lg:dropdown-end">
      {/* Dropdown Trigger */}
      <div tabIndex={0} className="btn btn-ghost btn-circle group">
        <PaletteIcon className="size-6 text-base-content opacity-70 group-hover:text-primary group-hover:scale-110 transition-all duration-200" />
      </div>
      {/* Dropdown content */}
      <div
        tabIndex={0}
        className="dropdown-content  mt-6 p-2 shadow-2xl bg-base-200 backdrop-blur-lg rounded-2xl
        w-64 border border-base-content/10 max-h-80 overflow-y-auto fixed lg:absolute left-[60%] lg:left-auto -translate-x-1/2 lg:translate-x-0
        animate-in fade-in zoom-in duration-200"
      >
        <div className="space-y-2">
          {THEMES.map((themeColor) => (
            <button
              key={themeColor.name}
              className={`px-2 w-full py-3 flex items-center justify-between gap-2 rounded-xl transition-all duration-200  ${
                themeColor.name === theme
                  ? "bg-primary/10 text-primary shadow-sm shadow-primary/20"
                  : "hover:bg-base-content/5"
              }`}
              onClick={() => setTheme(themeColor.name)}
            >
              <PaletteIcon className="size-4 text-primary" />
              <span className="text-sm font-semibold text-primary">
                {themeColor.label}
              </span>
              <div className="ml-auto flex gap-1">
                {themeColor.colors.map((color, i) => (
                  <span
                    key={i}
                    className="size-2 rounded-full shadow-sm"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ThemeSelector;

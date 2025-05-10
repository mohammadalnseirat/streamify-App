import React from "react";
import { useThemeStore } from "../store/useThemeStore";
import { PaletteIcon } from "lucide-react";
import { THEMES } from "../constant";

const ThemeSelector = () => {
  const { theme, setTheme } = useThemeStore();
  return (
    <div className="dropdown dropdown-end">
      {/* Dropdown Trigger */}
      <div tabIndex={0} className="btn btn-ghost btn-circle">
        <PaletteIcon className="size-6 text-base-content opacity-70" />
      </div>
      {/* Dropdown content */}
      <div
        tabIndex={0}
        className="dropdown-content mt-3 p-1 shadow-2xl  bg-base-200 backdrop-blur-lg rounded-2xl
        w-56 border border-base-content/10 max-h-80 overflow-y-auto"
      >
        <div className="space-y-2">
          {THEMES.map((themeColor) => (
            <button
              key={themeColor.name}
              className={`px-4 w-full py-3 flex items-center gap-2 rounded-xl ${
                themeColor.name === theme
                  ? "bg-primary/10 text-primary"
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
                    className="size-2 rounded-full"
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

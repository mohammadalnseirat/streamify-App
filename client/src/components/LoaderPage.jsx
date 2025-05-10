import { ShipWheelIcon } from "lucide-react";
import { useThemeStore } from "../store/useThemeStore";

const LoaderPage = () => {
  const { theme } = useThemeStore();
  return (
    <div data-theme={theme} className="flex items-center justify-center h-screen">
      <ShipWheelIcon className="size-10 animate-spin text-primary" />
    </div>
  );
};

export default LoaderPage;

import { ShipWheelIcon } from "lucide-react";

const LoaderPage = () => {
  return (
    <div data-theme="forest" className="flex items-center justify-center h-screen">
      <ShipWheelIcon className="size-10 animate-spin text-primary" />
    </div>
  );
};

export default LoaderPage;

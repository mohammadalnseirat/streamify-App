import { toast } from "react-toastify";

const Navbar = () => {
  return <div>
    <button onClick={() => toast.success("Hello")}>Create toast</button>
  </div>;
};

export default Navbar;

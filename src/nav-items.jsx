import { HomeIcon } from "lucide-react";
import Index from "./pages/Index.jsx";
import Callback from "./pages/Callback.jsx";

export const navItems = [
  {
    title: "Home",
    to: "/",
    icon: <HomeIcon className="h-4 w-4" />,
    page: <Index />,
  },
  {
    title: "Callback",
    to: "/callback",
    icon: null,
    page: <Callback />,
  },
];

import {
  Activity,
  FileText,
  House,
  ShoppingBag,
  ShoppingCart,
  UsersRound,
  Wallet
} from "lucide-react";

export const navLinks = [
  {
    url: "/",
    icon: <Activity />,
    label: "Dashboard",
  },
  {
    url: "/USPS Create Order",
    icon: <ShoppingCart />,
    label: "USPS Create Order",
  },
  {
    url: "/USPS CSV",
    icon: <ShoppingCart />,
    label: "USPS CSV",
  },
  {
    url: "/Fedex Order",
    icon: <ShoppingCart />,
    label: "Fedex Order",
  },
  {
    url: "/Amazon CSV Generator",
    icon: <FileText />,
    label: "Amazon CSV Generator",
  },
  {
    url: "/Deposits",
    icon: <Wallet />,
    label: "Deposits",
  },
  {
    url: "/Addresses",
    icon: <House />,
    label: "Addresses",
  },
  {
    url: "/Reseller API",
    icon: <UsersRound />,
    label: "Reseller API",
  },
];

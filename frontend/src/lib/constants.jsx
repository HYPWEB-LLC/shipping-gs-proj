import {
  Activity,
  FileText,
  House,
  ShoppingCart,
  Tag,
  Wallet,
  Webhook
} from "lucide-react";

export const navLinks = [
  {
    url: "/",
    icon: <Activity />,
    label: "Dashboard",
  },
  {
    url: "/createOrders",
    icon: <ShoppingCart />,
    label: "USPS Create Order",
  },
  {
    url: "/USPS CSV",
    icon: <ShoppingCart />,
    label: "USPS CSV",
  },
  {
    url: "/fedexOrder",
    icon: <ShoppingCart />,
    label: "Fedex Order",
  },
  {
    url: "/AmazonCSVGenerator",
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
    url: "/FAQs",
    icon: <Tag />,
    label: "FAQs  ",
  },
  {
    url: "/Reseller API",
    icon: <Webhook />,
    label: "Reseller API",
  },
];
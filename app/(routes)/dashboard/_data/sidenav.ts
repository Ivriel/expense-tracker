import { BarChart3, LayoutGrid, PiggyBank, ReceiptText, ShieldCheck } from "lucide-react";

export const SidenavMenuList = [
  {
    id: 1,
    name: "Dashboard",
    icon:LayoutGrid,
    path:'/dashboard'
  },
  {
    id: 2,
    name: "Budgets",
    icon:PiggyBank,
    path:'/dashboard/budgets'
  },
  {
    id: 3,
    name: "Expenses",
    icon:ReceiptText,
    path:'/dashboard/expenses'
  },
  {
    id:4,
    name:"Reports",
    icon:BarChart3,
    path:'/dashboard/reports'
  }
];
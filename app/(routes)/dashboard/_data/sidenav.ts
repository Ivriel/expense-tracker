import { BanknoteArrowDown, BanknoteArrowUp, BarChart3, LayoutGrid, PiggyBank } from "lucide-react";

export const SidenavMenuList = [
  {
    id: 1,
    name: "Dashboard",
    icon:LayoutGrid,
    path:'/dashboard'
  },
  {
    id:2,
    name:'Income',
    icon:BanknoteArrowUp,
    path:'/dashboard/income'
  },
  {
    id: 3,
    name: "Budgets",
    icon:PiggyBank,
    path:'/dashboard/budgets'
  },
  {
    id: 4,
    name: "Expenses",
    icon:BanknoteArrowDown,
    path:'/dashboard/expenses'
  },
  {
    id:5,
    name:"Reports",
    icon:BarChart3,
    path:'/dashboard/reports'
  }
];
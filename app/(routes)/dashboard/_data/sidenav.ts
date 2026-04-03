import { BanknoteArrowDown, BanknoteArrowUp, BarChart3, LayoutGrid, PiggyBank, Target, Activity } from "lucide-react";

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
    name:"Goals",
    icon:Target,
    path:'/dashboard/goals'
  },
  {
    id:6,
    name:"Cash Flow",
    icon:Activity,
    path:'/dashboard/cashflow'
  },
  {
    id:7,
    name:"Reports",
    icon:BarChart3,
    path:'/dashboard/reports'
  }
];
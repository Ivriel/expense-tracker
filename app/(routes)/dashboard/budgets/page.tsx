import BudgetList from "./_components/BudgetList";

export default function BudgetsPage () {
  return (
    <div className="p-5">
      <h2 className="font-bold text-3xl">My <span className="text-purple-600">Budgets</span></h2>
      <BudgetList />
    </div>
  );
}

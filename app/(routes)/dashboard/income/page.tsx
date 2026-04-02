import IncomeList from "./_components/IncomeList";

export default function IncomePage () {
  return (
    <div className="p-5">
      <h2 className="font-bold text-3xl">My <span className="text-purple-600">Incomes</span></h2>
      <IncomeList />
    </div>
  );
}

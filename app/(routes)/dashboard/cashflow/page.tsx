import CashFlowClient from "./_components/CashFlowClient";

export default function CashFlowPage () {
  return (
    <div className="p-5">
      <h2 className="font-bold text-3xl">Cash <span className="text-purple-600">Flow</span></h2>
      <p className="text-gray-500">Track your income and expenses flow over time</p>
      <CashFlowClient />
    </div>
  );
}

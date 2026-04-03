import GoalList from "./_components/GoalList";

export default function GoalsPage () {
  return (
    <div className="p-5">
      <h2 className="font-bold text-3xl">My <span className="text-purple-600">Goals</span></h2>
      <GoalList />
    </div>
  );
}

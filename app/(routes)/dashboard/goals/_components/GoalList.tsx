"use client"
import { useCallback, useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { Goal } from "@/db/schema";
import { getAllGoals } from "@/server/goal";
import CreateGoal from "./CreateGoal";
import GoalItem from "./GoalItem";
import GoalListSkeleton from "./GoalListSkeleton";
import { useFilterStore } from "@/store/useFilterStore";

export default function GoalList() {
  const { user } = useUser();
  const [goalList, setGoalList] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);
  const { getFilterParams } = useFilterStore();

  const fetchGoals = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    const filterParams = getFilterParams();
    const response = await getAllGoals(filterParams);
    if (response?.success && response.result) {
      setGoalList(response.result as Goal[]);
    }
    setLoading(false);
  }, [user, getFilterParams]);

  useEffect(() => {
    fetchGoals();
  }, [fetchGoals]);

  return (
    <div className="mt-7">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch">
        <CreateGoal refreshData={fetchGoals} />
        {loading ? (
          [1, 2, 3, 4, 5].map((item, index) => (
            <GoalListSkeleton key={index} />
          ))
        ) : (
          goalList.map((goal, index) => (
            <GoalItem goal={goal} key={index} refreshData={fetchGoals} />
          )))}
      </div>
    </div>
  );
}

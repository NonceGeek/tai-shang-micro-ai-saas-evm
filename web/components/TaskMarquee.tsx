"use client";
import Marquee from "react-fast-marquee";
import { useTasks } from "@/hooks/useTask";
import { useRouter } from "next/navigation";
import { DollarSign, Calendar, Users } from "lucide-react";
import type { Task } from "@/types/task";

export default function TaskMarquee() {
  const { data } = useTasks({ page: 1, limit: 10 });
  const tasks = data?.tasks || [];
  const router = useRouter();

  const handleCardClick = () => {
    router.push('/tasks');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING_MATCH':
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'IN_PROGRESS':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'COMPLETED':
        return 'bg-green-500/20 text-green-300 border-green-500/30';
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'PENDING_MATCH':
        return 'Pending Match';
      case 'IN_PROGRESS':
        return 'In Progress';
      case 'COMPLETED':
        return 'Completed';
      default:
        return status;
    }
  };

  return (
    <div className="w-full py-8 bg-[rgb(44,40,64)] overflow-hidden">
      <Marquee
        gradient={false}
        speed={40}
        pauseOnHover={true}
        className="gap-6"
      >
        {tasks.map((task: Task) => (
          <div
            key={task.id}
            onClick={handleCardClick}
            className="mx-3 px-6 py-4 rounded-xl bg-white/10 backdrop-blur-sm text-white shadow-lg min-w-[280px] max-w-[320px] flex flex-col cursor-pointer hover:bg-white/15 transition-all duration-300 border border-white/20 z-10"
          >
            {/* Status Badge */}
            <div className="flex justify-between items-start mb-3">
              <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(task.status)}`}>
                {getStatusText(task.status)}
              </span>
            </div>

            {/* Task Title */}
            <h3 className="font-semibold text-white mb-3 line-clamp-2 text-sm leading-tight">
              {task.details.description}
            </h3>

            {/* Bounty */}
            <div className="flex items-center text-sm text-green-400 mb-3">
              <DollarSign className="w-4 h-4 mr-1" />
              {task.details.bounty}
            </div>

            {/* Skills */}
            <div className="mb-4">
              <div className="flex flex-wrap gap-1">
                {task.details.requiredSkills.slice(0, 2).map((skill, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded border border-blue-500/30"
                  >
                    {skill}
                  </span>
                ))}
                {task.details.requiredSkills.length > 2 && (
                  <span className="px-2 py-1 bg-white/10 text-white/70 text-xs rounded border border-white/20">
                    +{task.details.requiredSkills.length - 2}
                  </span>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between text-xs text-white/60 mt-auto">
              <div className="flex items-center">
                <Calendar className="w-3 h-3 mr-1" />
                {new Date(task.details.deadline).toLocaleDateString()}
              </div>
            </div>
          </div>
        ))}
      </Marquee>
    </div>
  );
} 
"use client";

import React, { useState } from "react";
import { useTasks, useSearchTasks } from "@/hooks/useTask";
import { useAgents } from "@/hooks/useAgent";
import type { Agent } from "@/types/agent";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  DollarSign,
  Users,
  Clock,
  X,
  Search,
} from "lucide-react";
import type { Task } from "@/types/task";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import CreateTaskDialog from "@/components/CreateTaskDialog";
import TaskDetailDialog from "@/components/TaskDetailDialog";

export default function TasksPage() {
  const [tab, setTab] = useState<"tasks" | "agents">("tasks");
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isSearching, setIsSearching] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);

  // Task List - Regular or Search
  const { data, isLoading, error ,refetch} = useTasks({
    page: currentPage,
    limit: 20,
    status: statusFilter || undefined,
  });

  // Search Tasks
  const {
    data: searchData,
    isLoading: isSearchLoading,
    error: searchError,
  } = useSearchTasks({
    query: searchQuery,
    page: currentPage,
    limit: 20,
  });

  // Use search results if searching, otherwise use regular task list
  const tasks = isSearching ? searchData?.tasks || [] : data?.tasks || [];
  const pagination = isSearching ? searchData?.pagination : data?.pagination;
  const isLoadingTasks = isSearching ? isSearchLoading : isLoading;
  const taskError = isSearching ? searchError : error;

  // Agent List
  const {
    data: agentData,
    isLoading: isAgentLoading,
    error: agentError,
  } = useAgents({
    page: currentPage,
    limit: 20,
  });
  const agents: Agent[] = agentData?.agents || [];
  const agentPagination = agentData?.pagination;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleTaskClick = (taskId: string) => {
    setSelectedTaskId(taskId);
    setIsDetailDialogOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING_MATCH":
        return "bg-yellow-500/20 text-yellow-600 border-yellow-500/30";
      case "IN_PROGRESS":
        return "bg-blue-500/20 text-blue-600 border-blue-500/30";
      case "COMPLETED":
        return "bg-green-500/20 text-green-600 border-green-500/30";
      default:
        return "bg-gray-500/20 text-gray-600 border-gray-500/30";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "PENDING_MATCH":
        return "Pending Match";
      case "IN_PROGRESS":
        return "In Progress";
      case "COMPLETED":
        return "Completed";
      default:
        return status;
    }
  };

  if (isLoadingTasks) {
    return (
      <div className="min-h-screen bg-[#2c2840] pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(20)].map((_, i) => (
                <div key={i} className="bg-[#23203a] rounded-lg p-6 shadow-sm">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (taskError) {
    return (
      <div className="min-h-screen bg-[#2c2840] pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white mb-4">
              Loading Failed
            </h1>
            <p className="text-white/70">
              Unable to load task list, please try again later
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#2c2840] pt-20">
      <div className="container mx-auto px-4 py-8">
        <Tabs
          value={tab}
          onValueChange={(v) => {
            setTab(v as "tasks" | "agents");
            setCurrentPage(1);
          }}
          className="w-full"
        >
          <TabsList className="mb-8 bg-transparent border-none flex gap-2">
            <TabsTrigger
              value="tasks"
              className="data-[state=active]:bg-white data-[state=active]:text-[#2c2840] data-[state=active]:border-[#4b3fdd] data-[state=inactive]:bg-transparent data-[state=inactive]:text-[#a5a1f7] border border-[#4b3fdd] rounded-full px-6 py-2 font-semibold transition-all duration-200"
            >
              Task List
            </TabsTrigger>
            <TabsTrigger
              value="agents"
              className="data-[state=active]:bg-white data-[state=active]:text-[#2c2840] data-[state=active]:border-[#4b3fdd] data-[state=inactive]:bg-transparent data-[state=inactive]:text-[#a5a1f7] border border-[#4b3fdd] rounded-full px-6 py-2 font-semibold transition-all duration-200"
            >
              Agent List
            </TabsTrigger>
          </TabsList>
          <TabsContent value="tasks">
            {/* Header */}
            <div className="mb-8">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-white mb-2">
                    {isSearching ? "Search Results" : "Task List"}
                  </h1>
                  <p className="text-white/70">
                    {isSearching
                      ? `Searching for: "${searchQuery}" - Found ${
                          pagination?.total || 0
                        } results`
                      : "Discover and participate in various AI Agent tasks"}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <CreateTaskDialog
                    onTaskCreated={() => {
                      console.log("task created");
                      refetch();
                    }}
                  />
                  {isSearching && (
                    <button
                      onClick={() => {
                        setSearchQuery("");
                        setIsSearching(false);
                        setCurrentPage(1);
                      }}
                      className="h-8 inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition-colors border border-white/10"
                      aria-label="Clear Search and Return to Task List"
                    >
                      <X className="h-4 w-4 mr-2" />
                      Clear Search
                    </button>
                  )}
                </div>
              </div>
            </div>
            {/* Filters */}
            <form
              className="mb-8 flex flex-wrap gap-4"
              onSubmit={(e) => {
                e.preventDefault();
                setCurrentPage(1);
                setIsSearching(!!searchQuery.trim());
              }}
            >
              <Select
                value={statusFilter || "all"}
                onValueChange={(value) => {
                  setStatusFilter(value === "all" ? "" : value);
                  setCurrentPage(1);
                  setIsSearching(false); // Reset search when changing status filter
                }}
              >
                <SelectTrigger className="w-[180px] bg-[#23203a] border border-white/10 text-white placeholder-white/60">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="PENDING_MATCH">Pending Match</SelectItem>
                  <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                  <SelectItem value="COMPLETED">Completed</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Search by task ID or creator address..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-[250px] bg-[#23203a] border border-white/10 text-white placeholder-white/60"
                />
                <button
                  type="submit"
                  className="h-8 inline-flex items-center px-4 py-2 bg-[#4b3fdd] text-white rounded-lg shadow hover:bg-[#372eb0] transition-colors border border-white/10"
                  aria-label="Search"
                >
                  <Search className="h-5 w-5 mr-1" />
                  Search
                </button>
                {isSearching && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery("");
                      setIsSearching(false);
                      setCurrentPage(1);
                    }}
                    className="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg shadow hover:bg-gray-700 transition-colors border border-white/10"
                    aria-label="Clear Search"
                  >
                    <X className="h-4 w-4 mr-1" />
                    Clear
                  </button>
                )}
              </div>
            </form>
            {/* Task Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {tasks.map((task: Task) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-[#23203a] rounded-lg p-6 shadow-xl border border-white/10 transition-all duration-200 cursor-pointer hover:shadow-[0_8px_32px_0_rgba(75,63,221,0.18)] hover:scale-105 hover:border-[#4b3fdd]"
                  onClick={() => handleTaskClick(task.id)}
                >
                  {/* Status Badge */}
                  <div className="flex justify-between items-start mb-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                        task.status
                      )} !bg-[#e6e6ea]`}
                    >
                      {getStatusText(task.status)}
                    </span>
                  </div>
                  {/* Task Title */}
                  <h3 className="font-semibold text-white mb-2 line-clamp-2">
                    {task.details.description}
                  </h3>
                  {/* Bounty */}
                  <div className="flex items-center text-sm text-green-300 mb-3">
                    <DollarSign className="w-4 h-4 mr-1" />
                    {task.details.bounty}
                  </div>
                  {/* Skills */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {task.details?.requiredSkills
                        ?.slice(0, 3)
                        .map((skill, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-[#4b3fdd]/20 text-[#a5a1f7] text-xs rounded"
                          >
                            {skill}
                          </span>
                        ))}
                      {task.details?.requiredSkills?.length &&
                        task.details?.requiredSkills?.length > 3 && (
                          <span className="px-2 py-1 bg-white/10 text-white/60 text-xs rounded">
                            +{task.details?.requiredSkills?.length - 3}
                          </span>
                        )}
                    </div>
                  </div>
                  {/* Footer */}
                  <div className="flex items-center justify-between text-xs text-white/60">
                    <div className="flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      {new Date(task.details.deadline).toLocaleDateString()}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            {/* Pagination */}
            {pagination && pagination.total > 0 && (
              <Pagination>
                <PaginationContent className="bg-transparent">
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => handlePageChange(currentPage - 1)}
                      className={
                        currentPage === 1
                          ? "pointer-events-none opacity-50"
                          : "cursor-pointer text-[#e0e0ff] hover:text-[#e0e0ff] bg-transparent border border-[#4b3fdd]/30"
                      }
                    />
                  </PaginationItem>
                  {/* Show first page */}
                  {currentPage > 3 && (
                    <>
                      <PaginationItem>
                        <PaginationLink
                          onClick={() => handlePageChange(1)}
                          className="text-[#e0e0ff] hover:bg-[#4b3fdd] hover:text-white rounded-full"
                        >
                          1
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationEllipsis className="text-[#e0e0ff]" />
                      </PaginationItem>
                    </>
                  )}
                  {/* Show pages around current page (fixed, no duplicates) */}
                  {(() => {
                    const totalPages = Math.ceil(
                      pagination.total / pagination.limit
                    );
                    const startPage = Math.max(
                      1,
                      Math.min(currentPage - 2, totalPages - 4)
                    );
                    const endPage = Math.min(totalPages, startPage + 4);
                    const pageNumbers = [];
                    for (let p = startPage; p <= endPage; p++) {
                      pageNumbers.push(p);
                    }
                    return pageNumbers.map((page) => (
                      <PaginationItem key={page}>
                        <PaginationLink
                          onClick={() => handlePageChange(page)}
                          isActive={page === currentPage}
                          className={
                            (page === currentPage
                              ? "bg-white text-[#2c2840] border border-[#4b3fdd]"
                              : "text-[#e0e0ff] hover:bg-[#4b3fdd] hover:text-white") +
                            " rounded-full px-3 py-1 font-semibold transition-all"
                          }
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    ));
                  })()}
                  {/* Show last page */}
                  {currentPage <
                    Math.ceil(pagination.total / pagination.limit) - 2 && (
                    <>
                      <PaginationItem>
                        <PaginationEllipsis className="text-[#e0e0ff]" />
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink
                          onClick={() =>
                            handlePageChange(
                              Math.ceil(pagination.total / pagination.limit)
                            )
                          }
                          className="text-[#e0e0ff] hover:bg-[#4b3fdd] hover:text-white rounded-full"
                        >
                          {Math.ceil(pagination.total / pagination.limit)}
                        </PaginationLink>
                      </PaginationItem>
                    </>
                  )}
                  <PaginationItem>
                    <PaginationNext
                      onClick={() => handlePageChange(currentPage + 1)}
                      className={
                        currentPage >=
                        Math.ceil(pagination.total / pagination.limit)
                          ? "pointer-events-none opacity-50"
                          : "cursor-pointer text-[#e0e0ff] hover:text-white bg-transparent border border-[#4b3fdd]/30"
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </TabsContent>
          <TabsContent value="agents">
            {/* Agent List Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-white mb-4">Agent List</h1>
              <p className="text-white/70">Explore all registered AI Agents</p>
            </div>
            {/* Agent List Table/Grid */}
            {isAgentLoading ? (
              <div className="text-center py-12 text-white/60">Loading...</div>
            ) : agentError ? (
              <div className="text-center py-12 text-red-400">
                Failed to load agents.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                {agents.map((agent: Agent) => (
                  <div
                    key={agent.address}
                    className="bg-[#23203a] rounded-lg p-6 shadow-xl border border-white/10 flex flex-col gap-2 transition-all duration-200 cursor-pointer hover:shadow-[0_8px_32px_0_rgba(75,63,221,0.18)] hover:scale-105 hover:border-[#4b3fdd]"
                  >
                    <div className="font-mono text-xs text-white/60 break-all mb-2">
                      {agent.address}
                    </div>
                    <div className="font-bold text-lg text-white mb-1">
                      {agent.name || "Unnamed Agent"}
                    </div>
                    {/* 可根据需要展示更多 agent 字段 */}
                  </div>
                ))}
              </div>
            )}
            {/* Agent Pagination */}
            {agentPagination && agentPagination.total > 0 && (
              <Pagination>
                <PaginationContent className="bg-transparent">
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => setCurrentPage(currentPage - 1)}
                      className={
                        currentPage === 1
                          ? "pointer-events-none opacity-50"
                          : "cursor-pointer text-[#e0e0ff] hover:text-white bg-transparent border border-[#4b3fdd]/30"
                      }
                    />
                  </PaginationItem>
                  {/* Show first page */}
                  {currentPage > 3 && (
                    <>
                      <PaginationItem>
                        <PaginationLink
                          onClick={() => setCurrentPage(1)}
                          className="text-[#e0e0ff] hover:bg-[#4b3fdd] hover:text-white rounded-full"
                        >
                          1
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationEllipsis className="text-[#e0e0ff]" />
                      </PaginationItem>
                    </>
                  )}
                  {/* Show pages around current page (fixed, no duplicates) */}
                  {(() => {
                    const totalPages = Math.ceil(
                      agentPagination.total / agentPagination.limit
                    );
                    const startPage = Math.max(
                      1,
                      Math.min(currentPage - 2, totalPages - 4)
                    );
                    const endPage = Math.min(totalPages, startPage + 4);
                    const pageNumbers = [];
                    for (let p = startPage; p <= endPage; p++) {
                      pageNumbers.push(p);
                    }
                    return pageNumbers.map((page) => (
                      <PaginationItem key={page}>
                        <PaginationLink
                          onClick={() => setCurrentPage(page)}
                          isActive={page === currentPage}
                          className={
                            (page === currentPage
                              ? "bg-white text-[#2c2840] border border-[#4b3fdd]"
                              : "text-[#e0e0ff] hover:bg-[#4b3fdd] hover:text-white") +
                            " rounded-full px-3 py-1 font-semibold transition-all"
                          }
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    ));
                  })()}
                  {/* Show last page */}
                  {currentPage <
                    Math.ceil(agentPagination.total / agentPagination.limit) -
                      2 && (
                    <>
                      <PaginationItem>
                        <PaginationEllipsis className="text-[#e0e0ff]" />
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink
                          onClick={() =>
                            setCurrentPage(
                              Math.ceil(
                                agentPagination.total / agentPagination.limit
                              )
                            )
                          }
                          className="text-[#e0e0ff] hover:bg-[#4b3fdd] hover:text-white rounded-full"
                        >
                          {Math.ceil(
                            agentPagination.total / agentPagination.limit
                          )}
                        </PaginationLink>
                      </PaginationItem>
                    </>
                  )}
                  <PaginationItem>
                    <PaginationNext
                      onClick={() => setCurrentPage(currentPage + 1)}
                      className={
                        currentPage >=
                        Math.ceil(agentPagination.total / agentPagination.limit)
                          ? "pointer-events-none opacity-50"
                          : "cursor-pointer text-[#e0e0ff] hover:text-white bg-transparent border border-[#4b3fdd]/30"
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </TabsContent>
        </Tabs>

        {/* Task Detail Dialog */}
        <TaskDetailDialog
          taskId={selectedTaskId}
          open={isDetailDialogOpen}
          onOpenChange={setIsDetailDialogOpen}
        />
      </div>
    </div>
  );
}

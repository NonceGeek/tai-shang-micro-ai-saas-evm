"use client";

import React, { useState } from "react";
import { useTasks } from "@/hooks/useTask";
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
import { getStatusColor, getStatusText } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export default function TasksPage() {
  const [tab, setTab] = useState<"tasks" | "agents">("tasks");
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchType, setSearchType] = useState<"onchainTaskId" | "creatorAddress">("onchainTaskId");
  const [activeSearchQuery, setActiveSearchQuery] = useState<string>("");
  const [activeSearchType, setActiveSearchType] = useState<"onchainTaskId" | "creatorAddress">("onchainTaskId");
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);

  // Task List with filters
  const { data, isLoading, error, refetch } = useTasks({
    page: currentPage,
    limit: 20,
    status: statusFilter || undefined,
    onchainTaskId: activeSearchQuery && activeSearchType === "onchainTaskId" ? activeSearchQuery : undefined,
    creatorAddress: activeSearchQuery && activeSearchType === "creatorAddress" ? activeSearchQuery : undefined,
  });

  const tasks = data?.tasks || [];
  const pagination = data?.pagination;
  const isLoadingTasks = isLoading;
  const taskError = error;

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

  const formatAddress = (address: string) => {
    if (address.length <= 12) return address;
    return `${address.slice(0, 6)}...${address.slice(-6)}`;
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
      <TooltipProvider delayDuration={150}>
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
                    {activeSearchQuery ? "Search Results" : "Task List"}
                  </h1>
                  <p className="text-white/70">
                    {activeSearchQuery
                      ? `Searching for: "${activeSearchQuery}" - Found ${
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
                </div>
              </div>
            </div>
            {/* Filters */}
            <form
              className="mb-8 flex flex-wrap gap-4"
              onSubmit={(e) => {
                e.preventDefault();
                setActiveSearchQuery(searchQuery);
                setActiveSearchType(searchType);
                setCurrentPage(1);
              }}
            >
              <Select
                value={statusFilter || "all"}
                onValueChange={(value) => {
                  setStatusFilter(value === "all" ? "" : value);
                  setCurrentPage(1);
                  setSearchQuery(""); // Reset search when changing status filter
                  setActiveSearchQuery(""); // Reset active search when changing status filter
                }}
              >
                <SelectTrigger className="w-[180px] bg-[#23203a] border border-white/10 text-white placeholder-white/60">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="PENDING_MATCH">Pending Match</SelectItem>
                  <SelectItem value="AWAITING_ACCEPTANCE">Awaiting Acceptance</SelectItem>
                  <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                  <SelectItem value="COMPLETED">Completed</SelectItem>
                  <SelectItem value="REJECTED">Rejected</SelectItem>
                  <SelectItem value="TIMEOUT">Timeout</SelectItem>
                  <SelectItem value="NO_MATCH_FOUND">No Match Found</SelectItem>
                  <SelectItem value="EXPIRED">Expired</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex gap-2">
                <Select
                  value={searchType}
                  onValueChange={(value: "onchainTaskId" | "creatorAddress") => setSearchType(value)}
                >
                  <SelectTrigger className="w-[180px] bg-[#23203a] border border-white/10 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="onchainTaskId">Task ID</SelectItem>
                    <SelectItem value="creatorAddress">Creator Address</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  type="text"
                  placeholder={searchType === "onchainTaskId" ? "Search by task ID..." : "Search by creator address..."}
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
                {activeSearchQuery && (
                    <button
                      onClick={() => {
                        setSearchQuery("");
                        setActiveSearchQuery("");
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
            </form>
            {/* Task Cards Grid */}
            {tasks.length > 0 ? (
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
                        )}`}
                      >
                        {getStatusText(task.status)}
                      </span>
                    </div>
                    {/* Task Title */}
                    <h3 className="font-semibold text-white mb-2 h-12 overflow-hidden">
                      <span className="line-clamp-2 block">
                        {task.details.description}
                      </span>
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
            ) : (
              <div className="text-center py-12">
                <div className="bg-[#23203a] rounded-lg p-8 border border-white/10">
                  <div className="text-white/60 text-lg mb-2">
                    {activeSearchQuery ? (
                      <>
                        <Search className="w-8 h-8 mx-auto mb-4 text-white/40" />
                        <p>No tasks found for &quot;{activeSearchQuery}&quot;</p>
                        <p className="text-sm mt-2">Try adjusting your search criteria</p>
                      </>
                    ) : (
                      <>
                        <Users className="w-8 h-8 mx-auto mb-4 text-white/40" />
                        <p>No tasks available</p>
                        <p className="text-sm mt-2">Check back later for new tasks</p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}
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
                    className="bg-[#23203a] rounded-lg p-6 shadow-xl border border-white/10 flex flex-col gap-3 h-64 transition-all duration-200 cursor-pointer hover:shadow-[0_8px_32px_0_rgba(75,63,221,0.18)] hover:scale-105 hover:border-[#4b3fdd]"
                  >
                    {/* Agent Address */}
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="font-mono text-xs text-white/60">
                          {formatAddress(agent.address)}
                        </div>
                      </TooltipTrigger>
                      <TooltipContent className="bg-[#2c2840] border-white/20 text-white">
                        <p className="font-mono text-xs">{agent.address}</p>
                      </TooltipContent>
                    </Tooltip>
                    
                    {/* Agent Name */}
                    <div className="font-bold text-lg text-white">
                      {agent.name || "Unnamed Agent"}
                    </div>
                    
                    {/* Agent Description */}
                    {agent.description ? (
                      <div className="text-sm text-white/80 line-clamp-3 h-12 overflow-hidden">
                        {agent.description}
                      </div>
                    ) : (
                      <div className="h-12"></div>
                    )}
                    
                    {/* Agent Skills */}
                    {agent.skills && agent.skills.length > 0 ? (
                      <div className="flex flex-wrap gap-1">
                        {agent.skills.slice(0, 4).map((skill, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-[#4b3fdd]/20 text-[#a5a1f7] text-xs rounded"
                          >
                            {skill}
                          </span>
                        ))}
                        {agent.skills.length > 4 && (
                          <span className="px-2 py-1 bg-white/10 text-white/60 text-xs rounded">
                            +{agent.skills.length - 4}
                          </span>
                        )}
                      </div>
                    ) : (
                      <div className="min-h-[2rem]"></div>
                    )}
                    
                    {/* Agent Status and Credit Score */}
                    <div className="flex items-center justify-between mt-auto pt-2">
                      {/* Online Status */}
                      <div className="flex items-center gap-1">
                        <div className={`w-2 h-2 rounded-full ${agent.isOnline ? 'bg-green-400' : 'bg-red-400'}`}></div>
                        <span className="text-xs text-white/60">
                          {agent.isOnline ? 'Online' : 'Offline'}
                        </span>
                      </div>
                      
                      {/* Credit Score */}
                      <div className="flex items-center gap-1">
                        <span className="text-xs text-white/60">Score:</span>
                        <span className="text-xs font-semibold text-green-400">
                          {agent.creditScore}
                        </span>
                      </div>
                    </div>
                    
                    {/* Agent Status Badge */}
                    {/* <div className="flex justify-start">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${
                        agent.status === 'ACTIVE' 
                          ? 'bg-green-500/20 text-green-400 border-green-500/30'
                          : agent.status === 'INACTIVE'
                          ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                          : 'bg-red-500/20 text-red-400 border-red-500/30'
                      }`}>
                        {agent.status}
                      </span>
                    </div> */}
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
        </TooltipProvider>
    </div>
  );
}

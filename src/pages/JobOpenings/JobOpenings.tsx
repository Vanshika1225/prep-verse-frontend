import { Box, Typography, useTheme } from "@mui/material";
import { useState } from "react";

import ApplyConfirmModal from "./ApplyConfirm/ApplyConfirm";
import JobFilterBar from "./JobFilterBar/JobFilterBar";
import JobList from "./JobList/JobList";
import JobSidebar from "./JobsSidebar/JobsSidebar";
import { mainGrid } from "./style";
import { defaultJobFilters, type JobFilterState, type JobItem } from "./types";

import {
  useApplyJobMutation,
  useConfirmApplyMutation,
  useGetFiltersQuery,
  useGetJobsQuery,
  useGetPopularSkillsQuery,
  useGetRecommendedJobsQuery,
  useGetTopCompaniesQuery,
} from "@/services/JobOpeningsApi";

const JobOpenings = () => {
  const theme = useTheme();
  const [filters, setFilters] = useState<JobFilterState>(defaultJobFilters);
  const [activeJobForApply, setActiveJobForApply] = useState<JobItem | null>(
    null,
  );
  const [applyUrl, setApplyUrl] = useState<string>("");
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const { data: jobsResponse, isLoading: isJobsLoading } = useGetJobsQuery({
    page: filters.page,
    limit: filters.limit,
    search: filters.search,
    location: filters.location,
    experience: filters.experience,
    jobType: filters.jobType,
    workMode: filters.workMode,
    sort: filters.sort,
    skill: filters.skill,
    company: filters.company,
  });

  const { data: filtersData } = useGetFiltersQuery();
  const { data: recommendedData } = useGetRecommendedJobsQuery();
  const { data: topCompaniesData } = useGetTopCompaniesQuery();
  const { data: popularSkillsData } = useGetPopularSkillsQuery();

  const [applyJob] = useApplyJobMutation();
  const [confirmApply, { isLoading: isConfirming }] = useConfirmApplyMutation();

  const handleFilterChange = (updated: Partial<JobFilterState>) => {
    setFilters((prev) => ({ ...prev, ...updated }));
  };

  const handleClearFilters = () => {
    setFilters(defaultJobFilters);
  };

  const handleSkillClick = (skillName: string) => {
    setFilters((prev) => ({
      ...prev,
      skill: prev.skill === skillName ? "" : skillName,
      page: 1,
    }));
  };

  const handleCompanyClick = (companyName: string) => {
    setFilters((prev) => ({
      ...prev,
      company: prev.company === companyName ? "" : companyName,
      page: 1,
    }));
  };

  const handleApplyClick = async (job: JobItem) => {
    try {
      const res = await applyJob(job._id).unwrap();
      if (res.data?.applyUrl) {
        setApplyUrl(res.data.applyUrl);
        setActiveJobForApply(job);
        window.open(res.data.applyUrl, "_blank");
        setIsConfirmModalOpen(true);
      }
    } catch (err) {
      console.error("Failed to start job application:", err);
    }
  };

  const handleConfirmApplied = async () => {
    if (!activeJobForApply) return;
    try {
      await confirmApply({
        jobId: activeJobForApply._id,
        body: { applied: true },
      }).unwrap();
      setIsConfirmModalOpen(false);
      setActiveJobForApply(null);
    } catch (err) {
      console.error("Failed to confirm application:", err);
    }
  };

  const jobs = jobsResponse?.data?.jobs ?? [];
  const pagination = jobsResponse?.data?.pagination;
  const recommendedJobs = recommendedData?.data ?? [];
  const topCompanies = topCompaniesData?.data ?? [];
  const popularSkills = popularSkillsData?.data ?? [];

  return (
    <Box sx={{ width: "100%", p: { xs: 2, md: 0 } }}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography variant="h5-bold" sx={{ color: theme.palette.black.main }}>
          Job Openings
        </Typography>
        <Typography
          variant="body-medium"
          sx={{ color: theme.palette.black.secondary, mt: 0.5 }}
        >
          Find the best opportunities and apply to your dream roles
        </Typography>
      </Box>

      <Box sx={mainGrid}>
        <Box sx={{ minWidth: 0 }}>
          <JobFilterBar
            filters={filters}
            {...(filtersData?.data !== undefined
              ? { filterOptions: filtersData.data }
              : {})}
            onChange={handleFilterChange}
            onClear={handleClearFilters}
          />

          <JobList
            jobs={jobs}
            {...(pagination !== undefined ? { pagination } : {})}
            sort={filters.sort}
            isLoading={isJobsLoading}
            onSortChange={(sort) => handleFilterChange({ sort, page: 1 })}
            onPageChange={(page) => handleFilterChange({ page })}
            onApply={handleApplyClick}
          />
        </Box>

        <JobSidebar
          recommendedJobs={recommendedJobs}
          topCompanies={topCompanies}
          popularSkills={popularSkills}
          selectedSkill={filters.skill ?? ""}
          onSelectSkill={handleSkillClick}
          onSelectCompany={handleCompanyClick}
          onSelectJob={handleApplyClick}
          onGoToTracker={() => {
            window.location.href = "/job-tracker";
          }}
        />
      </Box>

      <ApplyConfirmModal
        open={isConfirmModalOpen}
        job={activeJobForApply}
        applyUrl={applyUrl}
        isConfirming={isConfirming}
        onClose={() => {
          setIsConfirmModalOpen(false);
          setActiveJobForApply(null);
        }}
        onConfirmApplied={handleConfirmApplied}
      />
    </Box>
  );
};

export default JobOpenings;

import { Box } from "@mui/material";

import type { JobSidebarProps } from "../types";

import JobTrackerBanner from "./JobTrackerBanner/JobTrackerBanner";
import PopularSkillsCard from "./PopularSkillsCard/PopularSkillsCard";
import RecommendedJobsCard from "./RecommendedJobsCard/RecommendedJobsCard";
import TopCompaniesCard from "./TopCompaniesCard/TopCompaniesCard";

const JobSidebar = ({
  recommendedJobs,
  topCompanies,
  isLoading,
  popularSkills,
  selectedSkill,
  onSelectSkill,
  onSelectCompany,
  onSelectJob,
  onGoToTracker,
  isTopCompaniesLoading,
  isPopularSkillCardLoading,
}: JobSidebarProps) => {
  return (
    <Box sx={{ width: "100%" }}>
      <RecommendedJobsCard
        jobs={recommendedJobs}
        {...(isLoading === undefined ? {} : { isLoading })}
        onSelectJob={onSelectJob}
      />
      <TopCompaniesCard
        companies={topCompanies}
        onSelectCompany={onSelectCompany}
        {...(isTopCompaniesLoading === undefined
          ? {}
          : { isLoading: isTopCompaniesLoading })}
      />
      <PopularSkillsCard
        skills={popularSkills}
        {...(selectedSkill === undefined ? {} : { selectedSkill })}
        onSelectSkill={onSelectSkill}
        {...(isPopularSkillCardLoading === undefined
          ? {}
          : { isLoading: isPopularSkillCardLoading })}
      />
      <JobTrackerBanner
        {...(onGoToTracker === undefined ? {} : { onGoToTracker })}
      />
    </Box>
  );
};

export default JobSidebar;

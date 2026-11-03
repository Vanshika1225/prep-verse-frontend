import { Box } from "@mui/material";

import type { JobSidebarProps } from "../types";

import JobTrackerBanner from "./JobTrackerBanner/JobTrackerBanner";
import PopularSkillsCard from "./PopularSkillsCard/PopularSkillsCard";
import RecommendedJobsCard from "./RecommendedJobsCard/RecommendedJobsCard";
import TopCompaniesCard from "./TopCompaniesCard/TopCompaniesCard";

const JobSidebar = ({
  recommendedJobs,
  topCompanies,
  popularSkills,
  selectedSkill,
  onSelectSkill,
  onSelectCompany,
  onSelectJob,
  onGoToTracker,
}: JobSidebarProps) => {
  return (
    <Box sx={{ width: "100%" }}>
      <RecommendedJobsCard jobs={recommendedJobs} onSelectJob={onSelectJob} />
      <TopCompaniesCard
        companies={topCompanies}
        onSelectCompany={onSelectCompany}
      />
      <PopularSkillsCard
        skills={popularSkills}
        {...(selectedSkill === undefined ? {} : { selectedSkill })}
        onSelectSkill={onSelectSkill}
      />
      <JobTrackerBanner
        {...(onGoToTracker === undefined ? {} : { onGoToTracker })}
      />
    </Box>
  );
};

export default JobSidebar;

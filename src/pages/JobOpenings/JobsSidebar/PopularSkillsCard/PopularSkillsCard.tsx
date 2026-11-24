import { Box, Skeleton, Typography, useTheme } from "@mui/material";

import { sidebarCard, skillChipStyle, skillsChipGrid } from "../../style";
import type { PopularSkillsCardProps } from "../../types";

import NoDataFound from "@/components/NoDataFound/NoDataFound";

const PopularSkillsCard = ({
  skills,
  selectedSkill,
  onSelectSkill,
  isLoading = false,
}: PopularSkillsCardProps) => {
  const theme = useTheme();

  return (
    <Box sx={sidebarCard}>
      <Typography
        variant="p-bold"
        sx={{ color: theme.palette.black.main, fontSize: 15 }}
      >
        Popular Skills
      </Typography>

      {isLoading ? (
        <Box sx={skillsChipGrid}>
          {Array.from({ length: 8 }).map((_, index) => (
            <Skeleton
              key={index}
              variant="rounded"
              width={index % 2 === 0 ? 75 : 100}
              height={32}
              sx={{ borderRadius: "20px" }}
            />
          ))}
        </Box>
      ) : skills.length === 0 ? (
        <NoDataFound message="Something went wrong in fetching popular Skills" />
      ) : (
        <Box sx={skillsChipGrid}>
          {skills.map((skill) => {
            const isSelected = selectedSkill === skill.name;

            return (
              <Box
                key={skill.name}
                onClick={() => onSelectSkill(skill.name)}
                sx={skillChipStyle(theme, isSelected)}
              >
                {skill.name}
              </Box>
            );
          })}
        </Box>
      )}
    </Box>
  );
};

export default PopularSkillsCard;

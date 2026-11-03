import { Box, Typography, useTheme } from "@mui/material";

import { sidebarCard, skillChipStyle, skillsChipGrid } from "../../style";
import type { PopularSkillsCardProps } from "../../types";

const PopularSkillsCard = ({
  skills,
  selectedSkill,
  onSelectSkill,
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
    </Box>
  );
};

export default PopularSkillsCard;

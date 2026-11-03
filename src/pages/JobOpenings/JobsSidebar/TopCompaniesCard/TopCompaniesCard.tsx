import { Avatar, Box, Typography, useTheme } from "@mui/material";

import {
  comapnyLogoNameOuterBox,
  companyLogoBox,
  companyLogoImg,
  companyNameAvatar,
  companyNameStyle,
  openingStyle,
  sidebarCard,
  topCompanyRow,
} from "../../style";
import type { TopCompaniesCardProps } from "../../types";

const TopCompaniesCard = ({
  companies,
  onSelectCompany,
}: TopCompaniesCardProps) => {
  const theme = useTheme();

  return (
    <Box sx={sidebarCard}>
      <Box sx={{ mb: 2 }}>
        <Typography
          variant="p-bold"
          sx={{
            color: theme.palette.black.main,
            fontSize: 15,
            mb: 2,
          }}
        >
          Top Companies Hiring
        </Typography>
      </Box>

      {companies.map((comp) => (
        <Box
          key={comp.company}
          onClick={() => onSelectCompany?.(comp.company)}
          sx={topCompanyRow}
        >
          <Box sx={comapnyLogoNameOuterBox}>
            <Box
              sx={{
                ...companyLogoBox,
                width: 38,
                height: 38,
                borderRadius: "8px",
              }}
            >
              {comp.companyLogo ? (
                <Box
                  component="img"
                  src={comp.companyLogo}
                  alt={comp.company}
                  sx={companyLogoImg}
                />
              ) : (
                <Avatar sx={companyNameAvatar(theme)}>
                  {comp.company.charAt(0).toUpperCase()}
                </Avatar>
              )}
            </Box>

            <Typography variant="body-bold" sx={companyNameStyle}>
              {comp.company}
            </Typography>
          </Box>

          <Typography variant="body1-medium" sx={openingStyle}>
            {comp.openings} Openings
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default TopCompaniesCard;

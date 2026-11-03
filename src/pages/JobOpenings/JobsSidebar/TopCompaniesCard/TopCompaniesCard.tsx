import { Avatar, Box, Skeleton, Typography, useTheme } from "@mui/material";

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

import NoDataFound from "@/components/NoDataFound/NoDataFound";

const TopCompaniesCard = ({
  companies,
  onSelectCompany,
  isLoading = false,
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

      {isLoading ? (
        Array.from({ length: 4 }).map((_, index) => (
          <Box key={index} sx={topCompanyRow}>
            <Box sx={comapnyLogoNameOuterBox}>
              <Skeleton
                variant="rounded"
                width={38}
                height={38}
                sx={{ borderRadius: "8px" }}
              />

              <Skeleton variant="text" width={100} height={24} />
            </Box>

            <Skeleton variant="text" width={75} height={24} />
          </Box>
        ))
      ) : companies.length === 0 ? (
        <NoDataFound message="Something went wrong in fetching top companies" />
      ) : (
        companies.map((comp) => (
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
        ))
      )}
    </Box>
  );
};

export default TopCompaniesCard;

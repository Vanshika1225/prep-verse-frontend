import ArticleRoundedIcon from "@mui/icons-material/ArticleRounded";
import BarChartRoundedIcon from "@mui/icons-material/BarChartRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import CodeRoundedIcon from "@mui/icons-material/CodeRounded";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import ExpandLessRoundedIcon from "@mui/icons-material/ExpandLessRounded";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import RouteRoundedIcon from "@mui/icons-material/RouteRounded";
import WorkOutlineRoundedIcon from "@mui/icons-material/WorkOutlineRounded";
import {
  Box,
  Typography,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Chip,
  Card,
  Button,
  useTheme,
  Drawer,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
  badgeStyle,
  CardStyle,
  menuItemStyle,
  practiceItemStyle,
  subMenuStyle,
} from "./sidebar.styles";

import Logo from "@/components/Logo";
import { drawerWidth } from "@/constants/constants";

const menuItems = [
  {
    text: "Dashboard",
    icon: <DashboardRoundedIcon />,
    path: "/dashboard",
  },
  {
    text: "DSA Practice",
    icon: <CodeRoundedIcon />,
    children: [
      {
        text: "Problem List",
        path: "/practice/problems",
      },
      {
        text: "Pattern Wise",
        path: "/practice/patterns",
      },
      {
        text: "Random Practice",
        path: "/practice/random-practice",
      },
      {
        text: "Contests",
        path: "/practice/contests",
      },
    ],
  },
  {
    text: "Study Planner",
    icon: <CalendarMonthRoundedIcon />,
    path: "/study-planner",
  },
  {
    text: "Job Tracker",
    icon: <WorkOutlineRoundedIcon />,
    path: "/job-tracker",
  },
  {
    text: "Job Openings",
    icon: <WorkOutlineRoundedIcon />,
    path: "/job-openings",
    badge: true,
  },
  {
    text: "Notes & Docs",
    icon: <DescriptionOutlinedIcon />,
    path: "/notes",
  },
  {
    text: "Roadmap",
    icon: <RouteRoundedIcon />,
    path: "/roadmap",
  },
  {
    text: "Goals",
    icon: <FlagOutlinedIcon />,
    path: "/goals",
  },
  {
    text: "Analytics",
    icon: <BarChartRoundedIcon />,
    path: "/analytics",
  },
  {
    text: "Resume Builder",
    icon: <ArticleRoundedIcon />,
    path: "/resume-builder",
  },
];

const Sidebar = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const pathname = location.pathname;

  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openPractice, setOpenPractice] = useState(true);

  const handleNavigate = (path: string) => {
    void navigate(path);

    if (isMobile) {
      setMobileOpen(false);
    }
  };

  const drawerContent = (
    <>
      {isMobile && (
        <IconButton
          onClick={() => setMobileOpen(false)}
          sx={{
            position: "absolute",
            top: 12,
            right: -1,
            zIndex: 2,
            width: 32,
            height: 32,
            color: theme.palette.white.main,
            bgcolor: theme.palette.sidebar.main,
            borderRadius: "8px 0 0 8px",

            "&:hover": {
              bgcolor: theme.palette.sidebar.main,
            },
          }}
        >
          <ChevronLeftRoundedIcon />
        </IconButton>
      )}

      <Box
        sx={{
          px: 3,
          py: 2.5,
        }}
      >
        <Logo size={38} color={theme.palette.white.main} />
      </Box>

      <Box
        sx={{
          flex: 1,
          px: 1.5,
          py: 2,
          overflowY: "auto",
        }}
      >
        <List disablePadding>
          {menuItems.map((item) => {
            if (item.children) {
              return (
                <Box key={item.text}>
                  <ListItemButton
                    onClick={() => setOpenPractice(!openPractice)}
                    sx={practiceItemStyle(
                      theme,
                      pathname.startsWith("/practice"),
                    )}
                  >
                    <ListItemIcon>{item.icon}</ListItemIcon>

                    <ListItemText
                      primary={item.text}
                      slotProps={{
                        primary: {
                          sx: {
                            fontSize: 14,
                            fontWeight: 500,
                            color: theme.palette.white.main,
                          },
                        },
                      }}
                    />

                    {openPractice ? (
                      <ExpandLessRoundedIcon />
                    ) : (
                      <ExpandMoreRoundedIcon />
                    )}
                  </ListItemButton>

                  <Collapse in={openPractice}>
                    <List disablePadding>
                      {item.children.map((child) => (
                        <SubMenu
                          key={child.path}
                          text={child.text}
                          active={pathname === child.path}
                          onClick={() => handleNavigate(child.path)}
                        />
                      ))}
                    </List>
                  </Collapse>
                </Box>
              );
            }

            return (
              <MenuItem
                key={item.path}
                text={item.text}
                icon={item.icon}
                active={pathname === item.path}
                badge={item.badge ?? false}
                onClick={() => handleNavigate(item.path)}
              />
            );
          })}
        </List>

        <Card elevation={0} sx={CardStyle}>
          <Typography variant="p-bold" sx={{ color: theme.palette.white.main }}>
            👑 Pro Plan
          </Typography>

          <Typography
            variant="body1-medium"
            sx={{
              mt: 1,
              color: theme.palette.black.secondary,
              lineHeight: 1.7,
            }}
          >
            Unlock advanced analytics, AI recommendations and premium study
            resources.
          </Typography>

          <Button
            fullWidth
            variant="contained"
            sx={{
              mt: 2,
            }}
          >
            Upgrade Now
          </Button>
        </Card>
      </Box>
    </>
  );

  return (
    <>
      {isMobile && !mobileOpen && (
        <IconButton
          onClick={() => setMobileOpen(true)}
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: theme.zIndex.drawer + 1,
            color: theme.palette.sidebar.main,

            "&:hover": {
              bgcolor: "transparent",
            },
          }}
        >
          <MenuRoundedIcon />
        </IconButton>
      )}

      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={isMobile ? mobileOpen : true}
        onClose={() => setMobileOpen(false)}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          width: drawerWidth,
          flexShrink: 0,

          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            bgcolor: theme.palette.sidebar.main,
            color: theme.palette.white.main,
            borderRight: "1px solid rgba(255,255,255,0.06)",
            display: "flex",
            flexDirection: "column",
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
};

export default Sidebar;

interface MenuItemProps {
  icon: React.ReactNode;
  text: string;
  active?: boolean;
  badge?: boolean;
  expanded?: boolean;
  hasChildren?: boolean;
  onClick?: () => void;
}

const MenuItem = ({
  icon,
  text,
  active = false,
  badge = false,
  onClick,
}: MenuItemProps) => {
  const theme = useTheme();

  return (
    <ListItemButton sx={menuItemStyle(theme, active)} onClick={onClick}>
      <ListItemIcon>{icon}</ListItemIcon>

      <ListItemText
        primary={text}
        slotProps={{
          primary: {
            sx: {
              fontSize: 14,
              fontWeight: active ? 600 : 500,
              color: theme.palette.white.main,
            },
          },
        }}
      />

      {badge && <Chip label="NEW" size="small" sx={badgeStyle} />}
    </ListItemButton>
  );
};

interface SubMenuProps {
  text: string;
  active?: boolean;
  onClick?: () => void;
}

const SubMenu = ({ text, active = false, onClick }: SubMenuProps) => {
  const theme = useTheme();

  return (
    <ListItemButton onClick={onClick} sx={subMenuStyle(theme, active)}>
      <ListItemText
        primary={text}
        slotProps={{
          primary: {
            sx: {
              fontSize: 13,
              fontWeight: active ? 600 : 500,
              color: theme.palette.white.main,
            },
          },
        }}
      />
    </ListItemButton>
  );
};

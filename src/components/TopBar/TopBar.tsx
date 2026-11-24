import LocalFireDepartmentRoundedIcon from "@mui/icons-material/LocalFireDepartmentRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import {
  Avatar,
  Box,
  Chip,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Skeleton,
  Typography,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { topBarStyles } from "./topbarStyles";

import { useStreak } from "@/hooks/useStreak";
import { logout as logoutAction } from "@/redux/slices/authSlice";
import {
  profileApi,
  useGetProfileQuery,
  useLogoutMutation,
} from "@/services/profileApi";
import { getInitials } from "@/utils/CommonMethods";
import { clearAuth, getUser } from "@/utils/authMethods";

const TopBar = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { currentStreak, isLoading: streakLoading } = useStreak();
  const { data: profileData } = useGetProfileQuery();
  const [logoutMutation] = useLogoutMutation();

  const profile = profileData?.data;
  const user = getUser();
  const userName = profile?.name ?? (user?.["name"] as string) ?? "User";
  const userEmail = profile?.email ?? (user?.["email"] as string) ?? "";

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);

  const handleMenuClose = () => setAnchorEl(null);

  const handleProfile = () => {
    handleMenuClose();
    void navigate("/profile");
  };

  const handleLogout = async () => {
    handleMenuClose();

    const userId = profile?.userId ?? (user?.["id"] as string) ?? "";
    if (!userId) return;

    const { data: response } = await logoutMutation({ userId });

    if (response?.success) {
      clearAuth();
      dispatch(profileApi.util.resetApiState());
      dispatch(logoutAction());
      void navigate("/login");
    }
  };

  return (
    <Box sx={topBarStyles.container}>
      {streakLoading ? (
        <Skeleton
          variant="rounded"
          width={120}
          height={36}
          sx={{ borderRadius: "20px" }}
        />
      ) : (
        <Chip
          icon={<LocalFireDepartmentRoundedIcon />}
          label={`${currentStreak} Day Streak`}
          sx={topBarStyles.streakChip(theme)}
        />
      )}

      <IconButton
        onClick={(e) => setAnchorEl(e.currentTarget)}
        sx={topBarStyles.avatarButton}
        aria-controls={menuOpen ? "profile-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={menuOpen ? "true" : undefined}
      >
        <Avatar
          src={profile?.avatar ?? undefined}
          sx={topBarStyles.avatar(theme)}
        >
          {getInitials(userName)}
        </Avatar>
      </IconButton>

      <Menu
        id="profile-menu"
        anchorEl={anchorEl}
        open={menuOpen}
        onClose={handleMenuClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        slotProps={{ paper: { sx: topBarStyles.menuPaper(theme) } }}
      >
        <Box sx={topBarStyles.menuHeader(theme)}>
          <Typography variant="body-bold">{userName}</Typography>
          <Typography
            variant="body1-medium"
            sx={topBarStyles.menuHeaderEmail(theme)}
          >
            {userEmail}
          </Typography>
        </Box>

        <MenuItem onClick={handleProfile} sx={topBarStyles.menuItem(theme)}>
          <ListItemIcon sx={topBarStyles.menuItemIcon}>
            <PersonOutlineRoundedIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="body-medium" color="inherit">
            My Profile
          </Typography>
        </MenuItem>

        <Divider sx={topBarStyles.divider(theme)} />

        <MenuItem
          onClick={() => void handleLogout()}
          sx={topBarStyles.logoutItem(theme)}
        >
          <ListItemIcon sx={topBarStyles.menuItemIcon}>
            <LogoutRoundedIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="body-medium" color="inherit">
            Log Out
          </Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default TopBar;

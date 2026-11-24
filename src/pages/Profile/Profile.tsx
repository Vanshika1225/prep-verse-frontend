import AddRoundedIcon from "@mui/icons-material/AddRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import CodeRoundedIcon from "@mui/icons-material/CodeRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import EmojiEventsRoundedIcon from "@mui/icons-material/EmojiEventsRounded";
import LinkRoundedIcon from "@mui/icons-material/LinkRounded";
import LocalFireDepartmentRoundedIcon from "@mui/icons-material/LocalFireDepartmentRounded";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import PhotoCameraRoundedIcon from "@mui/icons-material/PhotoCameraRounded";
import PublicRoundedIcon from "@mui/icons-material/PublicRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import {
  Avatar,
  Box,
  Button,
  ButtonBase,
  Chip,
  CircularProgress,
  Fade,
  IconButton,
  InputAdornment,
  LinearProgress,
  Modal,
  Skeleton,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useRef, useState } from "react";

import {
  completionItems,
  emptyForm,
  formGroups,
  MAX_FILE_SIZE,
  platforms,
  profileFields,
} from "./constants";
import { profileStyles } from "./profile.styles";
import type {
  CompletionKey,
  DetailItem,
  ProfileFieldConfig,
  ProfileFieldKey,
  ProfileForm,
  StatItem,
  UpdateProfileRequest,
  UserProfile,
} from "./types";

import { useStreak } from "@/hooks/useStreak";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "@/services/profileApi";
import { getInitials } from "@/utils/CommonMethods";
import { resizeImageToDataUrl } from "@/utils/resizeImage";

const toForm = (p: UserProfile): ProfileForm => ({
  name: p.name ?? "",
  phone: p.phone ?? "",
  bio: p.bio ?? "",
  city: p.city ?? "",
  country: p.country ?? "",
  leetcodeHandle: p.leetcodeHandle ?? "",
  codeforcesHandle: p.codeforcesHandle ?? "",
  codechefHandle: p.codechefHandle ?? "",
});

const getChanges = (
  form: ProfileForm,
  p: UserProfile,
): UpdateProfileRequest => {
  const changes: UpdateProfileRequest = {};
  profileFields.forEach(({ key }) => {
    const next = form[key].trim();
    if (next !== (p[key] ?? "")) changes[key] = next;
  });
  return changes;
};

const Profile = () => {
  const theme = useTheme();

  const { data, isLoading } = useGetProfileQuery();
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();
  const { currentStreak, longestStreak } = useStreak();

  const profile = data?.data;

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [editOpen, setEditOpen] = useState(false);
  const [focusKey, setFocusKey] = useState<ProfileFieldKey | null>(null);
  const [form, setForm] = useState<ProfileForm>(emptyForm);
  const [avatarBusy, setAvatarBusy] = useState(false);
  const [avatarError, setAvatarError] = useState("");

  if (isLoading) return <ProfileSkeleton />;
  if (!profile) return null;

  const changes = getChanges(form, profile);
  const hasChanges = Object.keys(changes).length > 0;

  const openEdit = (key: ProfileFieldKey | null = null) => {
    setForm(toForm(profile));
    setFocusKey(key);
    setEditOpen(true);
  };

  const closeEdit = () => setEditOpen(false);

  const runUpdate = async (payload: UpdateProfileRequest) => {
    const result = await updateProfile(payload);
    return "data" in result && result?.data?.success;
  };

  const handleSave = async () => {
    if (await runUpdate(changes)) closeEdit();
  };

  const saveAvatar = async (avatar: string | null) => {
    setAvatarError("");
    setAvatarBusy(true);
    const ok = await runUpdate({ avatar });
    setAvatarBusy(false);
    if (!ok) setAvatarError("Could not update your photo. Try again.");
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setAvatarError("Please choose an image file.");
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      setAvatarError("Image must be under 5 MB.");
      return;
    }

    setAvatarError("");
    setAvatarBusy(true);
    const avatar = await resizeImageToDataUrl(file);
    if (!avatar) {
      setAvatarBusy(false);
      setAvatarError("Could not read that image. Try another one.");
      return;
    }
    setAvatarBusy(false);
    await saveAvatar(avatar);
  };

  const handleMissingClick = (key: CompletionKey) => {
    if (key === "avatar") fileInputRef.current?.click();
    else openEdit(key);
  };

  const missing = completionItems.filter(
    ({ key }) => !(key === "avatar" ? profile.avatar : profile[key]),
  );
  const completion = Math.round(
    ((completionItems.length - missing.length) / completionItems.length) * 100,
  );

  const linkedCount = platforms.filter((p) => profile[p.key]).length;

  const stats: StatItem[] = [
    {
      icon: <LocalFireDepartmentRoundedIcon />,
      value: currentStreak,
      label: "Current streak",
      tone: "warning",
    },
    {
      icon: <EmojiEventsRoundedIcon />,
      value: longestStreak,
      label: "Longest streak",
      tone: "primary",
    },
    {
      icon: <LinkRoundedIcon />,
      value: `${linkedCount}/${platforms.length}`,
      label: "Platforms linked",
      tone: "primary",
    },
  ];

  const details: DetailItem[] = [
    {
      key: "phone",
      label: "Phone",
      icon: <PhoneOutlinedIcon fontSize="small" />,
      value: profile.phone,
    },
    {
      key: "city",
      label: "City",
      icon: <LocationOnOutlinedIcon fontSize="small" />,
      value: profile.city,
    },
    {
      key: "country",
      label: "Country",
      icon: <PublicRoundedIcon fontSize="small" />,
      value: profile.country,
    },
  ];

  return (
    <Box sx={profileStyles.container}>
      <Box sx={profileStyles.banner(theme)}>
        <Box sx={profileStyles.bannerPattern(theme)} />
        <Box sx={profileStyles.bannerGlow(theme)} />
      </Box>

      <Box sx={profileStyles.profileInfoRow}>
        <ButtonBase
          sx={profileStyles.avatarWrap}
          onClick={() => fileInputRef.current?.click()}
          disabled={avatarBusy}
          aria-label="Change profile photo"
        >
          <Box sx={profileStyles.avatarOuter(theme)}>
            <Avatar
              src={profile.avatar ?? undefined}
              sx={profileStyles.avatar(theme)}
            >
              {getInitials(profile.name)}
            </Avatar>
          </Box>

          <Box
            className="avatar-overlay"
            sx={profileStyles.avatarOverlay(theme, avatarBusy)}
          >
            {avatarBusy ? (
              <CircularProgress size={26} color="inherit" />
            ) : (
              <>
                <PhotoCameraRoundedIcon sx={{ fontSize: 22 }} />
                <Typography variant="body1-bold" color="inherit">
                  Change
                </Typography>
              </>
            )}
          </Box>
        </ButtonBase>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          hidden
          onChange={(e) => void handleAvatarChange(e)}
        />

        <Box sx={profileStyles.headerInfo}>
          <Typography variant="h5-bold">{profile.name}</Typography>
          <Typography
            variant="body-medium"
            sx={profileStyles.headerEmail(theme)}
          >
            {profile.email}
          </Typography>

          <Box sx={profileStyles.headerMeta}>
            {profile.city && (
              <Chip
                size="small"
                icon={<LocationOnOutlinedIcon />}
                label={profile.city}
                sx={profileStyles.metaChip(theme)}
              />
            )}
          </Box>

          {profile.avatar && (
            <Button
              variant="borderless"
              size="small"
              onClick={() => void saveAvatar(null)}
              disabled={avatarBusy}
              sx={profileStyles.removePhotoBtn}
            >
              Remove photo
            </Button>
          )}

          {avatarError && (
            <Typography
              variant="body1-medium"
              sx={profileStyles.avatarError(theme)}
            >
              {avatarError}
            </Typography>
          )}
        </Box>

        <Button
          variant="outlined"
          startIcon={<EditRoundedIcon />}
          onClick={() => openEdit()}
          sx={profileStyles.editBtn}
        >
          Edit Profile
        </Button>
      </Box>

      <Box sx={profileStyles.statsRow}>
        {stats.map((s) => (
          <Box key={s.label} sx={profileStyles.statCard(theme)}>
            <Box sx={profileStyles.statIcon(theme, s.tone)}>{s.icon}</Box>
            <Box>
              <Typography variant="h5-bold">{s.value}</Typography>
              <Typography
                variant="body1-medium"
                sx={profileStyles.statLabel(theme)}
              >
                {s.label}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>

      {missing.length > 0 && (
        <Box
          sx={profileStyles.sectionCard(theme)}
          style={{ marginBottom: theme.spacing(3) }}
        >
          <Box sx={profileStyles.sectionHeader}>
            <Box sx={profileStyles.sectionIcon(theme)}>
              <TrendingUpRoundedIcon fontSize="small" />
            </Box>
            <Typography variant="p-bold">Profile strength</Typography>
            <Typography
              variant="h6-bold"
              sx={profileStyles.completionValue(theme)}
            >
              {completion}%
            </Typography>
          </Box>

          <LinearProgress
            variant="determinate"
            value={completion}
            sx={profileStyles.progress(theme)}
          />

          <Typography
            variant="body1-medium"
            sx={{ ...profileStyles.mutedText(theme), mt: 2 }}
          >
            Tap an item to add it
          </Typography>
          <Box sx={profileStyles.chipRow}>
            {missing.map((item) => (
              <Chip
                key={item.key}
                icon={<AddRoundedIcon />}
                label={item.label}
                onClick={() => handleMissingClick(item.key)}
                sx={profileStyles.missingChip(theme)}
              />
            ))}
          </Box>
        </Box>
      )}

      <Box sx={profileStyles.layout}>
        <Box sx={profileStyles.sectionCard(theme)}>
          <Box sx={profileStyles.sectionHeader}>
            <Box sx={profileStyles.sectionIcon(theme)}>
              <PersonOutlineRoundedIcon fontSize="small" />
            </Box>
            <Typography variant="p-bold">About</Typography>
          </Box>

          <Box sx={profileStyles.bioBox(theme)}>
            {profile.bio ? (
              <Typography variant="body-medium">{profile.bio}</Typography>
            ) : (
              <Box sx={profileStyles.bioEmpty}>
                <Typography
                  variant="body-medium"
                  sx={profileStyles.mutedText(theme)}
                >
                  Tell others what you're preparing for.
                </Typography>
                <Button
                  variant="borderless"
                  size="small"
                  startIcon={<AddRoundedIcon />}
                  onClick={() => openEdit("bio")}
                  sx={profileStyles.addBtn}
                >
                  Add bio
                </Button>
              </Box>
            )}
          </Box>

          <Box sx={profileStyles.detailList}>
            {details.map((d) => (
              <Box key={d.key} sx={profileStyles.detailRow(theme)}>
                <Box sx={profileStyles.detailIcon(theme)}>{d.icon}</Box>
                <Box sx={profileStyles.detailText}>
                  <Typography
                    variant="body1-medium"
                    sx={profileStyles.mutedText(theme)}
                  >
                    {d.label}
                  </Typography>
                  {d.value ? (
                    <Typography variant="body-bold">{d.value}</Typography>
                  ) : (
                    <Button
                      variant="borderless"
                      size="small"
                      onClick={() => openEdit(d.key)}
                      sx={profileStyles.addBtn}
                    >
                      Add {d.label.toLowerCase()}
                    </Button>
                  )}
                </Box>
              </Box>
            ))}
          </Box>
        </Box>

        <Box sx={profileStyles.sectionCard(theme)}>
          <Box sx={profileStyles.sectionHeader}>
            <Box sx={profileStyles.sectionIcon(theme)}>
              <CodeRoundedIcon fontSize="small" />
            </Box>
            <Typography variant="p-bold">Coding platforms</Typography>
          </Box>

          <Box sx={profileStyles.platformList}>
            {platforms.map((p) => {
              const handle = profile[p.key];
              const color = p.getColor(theme);

              const content = (
                <>
                  <Box sx={profileStyles.platformIcon(color)}>
                    <CodeRoundedIcon fontSize="small" />
                  </Box>
                  <Box sx={profileStyles.platformText}>
                    <Typography variant="body-bold">{p.label}</Typography>
                    <Typography
                      variant="body1-medium"
                      sx={profileStyles.mutedText(theme)}
                    >
                      {handle ?? "Not linked"}
                    </Typography>
                  </Box>
                </>
              );

              return handle ? (
                <Box
                  key={p.key}
                  component="a"
                  href={`${p.baseUrl}${encodeURIComponent(handle)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={profileStyles.platformCard(theme, true)}
                >
                  {content}
                  <OpenInNewRoundedIcon
                    className="platform-arrow"
                    sx={profileStyles.platformArrow(theme)}
                  />
                </Box>
              ) : (
                <Box key={p.key} sx={profileStyles.platformCard(theme, false)}>
                  {content}
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => openEdit(p.key)}
                  >
                    Link
                  </Button>
                </Box>
              );
            })}
          </Box>
        </Box>
      </Box>

      <Modal
        open={editOpen}
        onClose={closeEdit}
        slotProps={{ backdrop: { sx: profileStyles.modalBackdrop } }}
      >
        <Fade in={editOpen}>
          <Box sx={profileStyles.modalPaper(theme)}>
            <Box sx={profileStyles.modalHeader(theme)}>
              <Typography variant="h6-bold">Edit Profile</Typography>
              <IconButton size="small" onClick={closeEdit}>
                <CloseRoundedIcon fontSize="small" />
              </IconButton>
            </Box>

            <Box sx={profileStyles.modalBody}>
              {formGroups.map((group) => (
                <Box key={group.id}>
                  <Typography
                    variant="body-bold"
                    sx={profileStyles.groupTitle(theme)}
                  >
                    {group.title}
                  </Typography>

                  <Box sx={profileStyles.formGrid}>
                    {profileFields
                      .filter((f) => f.group === group.id)
                      .map((field) => (
                        <FormField
                          key={field.key}
                          field={field}
                          value={form[field.key]}
                          autoFocus={field.key === focusKey}
                          onChange={(v) =>
                            setForm((prev) => ({ ...prev, [field.key]: v }))
                          }
                        />
                      ))}
                  </Box>
                </Box>
              ))}
            </Box>

            <Box sx={profileStyles.modalFooter(theme)}>
              <Typography
                variant="body1-medium"
                sx={profileStyles.footerHint(theme)}
              >
                {hasChanges ? "You have unsaved changes" : "No changes yet"}
              </Typography>
              <Button variant="outlined" onClick={closeEdit}>
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={() => void handleSave()}
                disabled={isUpdating || !hasChanges}
              >
                {isUpdating ? "Saving..." : "Save Changes"}
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};

export default Profile;

interface FormFieldProps {
  field: ProfileFieldConfig;
  value: string;
  autoFocus: boolean;
  onChange: (value: string) => void;
}

const FormField = ({ field, value, autoFocus, onChange }: FormFieldProps) => {
  const theme = useTheme();

  return (
    <Box sx={profileStyles.formField(Boolean(field.half))}>
      <Typography variant="body-bold" sx={profileStyles.textFieldLabel(theme)}>
        {field.label}
      </Typography>

      <TextField
        fullWidth
        size="small"
        autoFocus={autoFocus}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={field.placeholder}
        multiline={field.multiline}
        rows={field.multiline ? field.rows : undefined}
        sx={field.multiline ? profileStyles.inputMultiline : undefined}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment
                position="start"
                sx={profileStyles.adornment(theme)}
              >
                {field.icon}
              </InputAdornment>
            ),
          },
          htmlInput: { maxLength: field.maxLength },
        }}
      />

      {field.multiline && field.maxLength && (
        <Typography
          variant="body1-medium"
          sx={profileStyles.fieldCounter(theme)}
        >
          {value.length}/{field.maxLength}
        </Typography>
      )}
    </Box>
  );
};

const ProfileSkeleton = () => (
  <Box sx={profileStyles.container}>
    <Skeleton variant="rounded" height={180} sx={{ borderRadius: 4 }} />

    <Box sx={profileStyles.skeletonHeader}>
      <Skeleton variant="circular" width={110} height={110} />
      <Box sx={profileStyles.skeletonInfo}>
        <Skeleton variant="text" width="40%" height={35} />
        <Skeleton variant="text" width="30%" height={22} />
      </Box>
    </Box>

    <Box sx={profileStyles.statsRow}>
      {Array.from({ length: 3 }).map((_, i) => (
        <Skeleton
          key={i}
          variant="rounded"
          height={88}
          sx={{ borderRadius: 3 }}
        />
      ))}
    </Box>

    <Box sx={profileStyles.layout}>
      <Skeleton variant="rounded" height={320} sx={{ borderRadius: 3 }} />
      <Skeleton variant="rounded" height={320} sx={{ borderRadius: 3 }} />
    </Box>
  </Box>
);

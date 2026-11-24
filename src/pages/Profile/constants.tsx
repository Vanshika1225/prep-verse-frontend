import CodeRoundedIcon from "@mui/icons-material/CodeRounded";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import NotesRoundedIcon from "@mui/icons-material/NotesRounded";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import PublicRoundedIcon from "@mui/icons-material/PublicRounded";

import type {
  CompletionItem,
  FormGroup,
  PlatformConfig,
  ProfileFieldConfig,
  ProfileForm,
} from "./types";

export const BIO_MAX_LENGTH = 300;
export const MAX_FILE_SIZE = 5 * 1024 * 1024;

export const formGroups: FormGroup[] = [
  { id: "personal", title: "Personal details" },
  { id: "platforms", title: "Coding platforms" },
];

export const profileFields: ProfileFieldConfig[] = [
  {
    key: "name",
    label: "Name",
    placeholder: "Your full name",
    group: "personal",
    icon: <PersonOutlineRoundedIcon fontSize="small" />,
  },
  {
    key: "phone",
    label: "Phone",
    placeholder: "+91 XXXXX XXXXX",
    group: "personal",
    icon: <PhoneOutlinedIcon fontSize="small" />,
  },
  {
    key: "bio",
    label: "Bio",
    placeholder: "Tell us about yourself...",
    group: "personal",
    icon: <NotesRoundedIcon fontSize="small" />,
    multiline: true,
    rows: 3,
    maxLength: BIO_MAX_LENGTH,
  },
  {
    key: "city",
    label: "City",
    placeholder: "e.g. Mohali",
    group: "personal",
    icon: <LocationOnOutlinedIcon fontSize="small" />,
    half: true,
  },
  {
    key: "country",
    label: "Country",
    placeholder: "e.g. India",
    group: "personal",
    icon: <PublicRoundedIcon fontSize="small" />,
    half: true,
  },
  {
    key: "leetcodeHandle",
    label: "LeetCode Handle",
    placeholder: "e.g. Vanshika1609",
    group: "platforms",
    icon: <CodeRoundedIcon fontSize="small" />,
  },
  {
    key: "codeforcesHandle",
    label: "Codeforces Handle",
    placeholder: "e.g. tourist",
    group: "platforms",
    icon: <CodeRoundedIcon fontSize="small" />,
  },
  {
    key: "codechefHandle",
    label: "CodeChef Handle",
    placeholder: "e.g. gennady",
    group: "platforms",
    icon: <CodeRoundedIcon fontSize="small" />,
  },
];

export const platforms: PlatformConfig[] = [
  {
    key: "leetcodeHandle",
    label: "LeetCode",
    baseUrl: "https://leetcode.com/u/",
    getColor: (theme) => theme.palette.warning.main,
  },
  {
    key: "codeforcesHandle",
    label: "Codeforces",
    baseUrl: "https://codeforces.com/profile/",
    getColor: (theme) => theme.palette.primary.main800,
  },
  {
    key: "codechefHandle",
    label: "CodeChef",
    baseUrl: "https://www.codechef.com/users/",
    getColor: (theme) => theme.palette.warning.main200,
  },
];

export const completionItems: CompletionItem[] = [
  { key: "avatar", label: "Profile photo" },
  { key: "bio", label: "Bio" },
  { key: "phone", label: "Phone" },
  { key: "city", label: "City" },
  { key: "country", label: "Country" },
  { key: "leetcodeHandle", label: "LeetCode" },
  { key: "codeforcesHandle", label: "Codeforces" },
  { key: "codechefHandle", label: "CodeChef" },
];

export const emptyForm: ProfileForm = {
  name: "",
  phone: "",
  bio: "",
  city: "",
  country: "",
  leetcodeHandle: "",
  codeforcesHandle: "",
  codechefHandle: "",
};
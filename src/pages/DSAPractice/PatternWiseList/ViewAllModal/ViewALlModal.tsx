import { TrendingUpRounded } from "@mui/icons-material";
import { Box, Typography, useTheme } from "@mui/material";

import { getColorSet, PATTERNS } from "../data";
import { IconBadge, LinearBar } from "../shared";
import { styles } from "../style";

import ReusableModal from "@/components/ModalBox/ModalBox";

interface PatternsModalProps {
  open: boolean;
  onClose: () => void;
  patterns: {
    name: string;
    progress: number;
  }[];
}

const PatternsModal = ({ open, onClose, patterns }: PatternsModalProps) => {
  const theme = useTheme();

  return (
    <ReusableModal
      open={open}
      onClose={onClose}
      maxWidth="sm"
      heading="Patterns Progress"
    >
      <Box sx={styles.modalBoxWrapper}>
        {patterns.map((pattern, index) => {
          const patternInfo = PATTERNS[index];

          const colorKey = patternInfo?.colorKey ?? "primary";
          const icon = patternInfo?.icon ?? TrendingUpRounded;

          const { color, bg } = getColorSet(theme, colorKey);

          return (
            <Box
              key={pattern.name}
              sx={{
                p: 1.5,
                borderRadius: "10px",
                border: `1px solid ${theme.palette.divider}`,
                bgcolor: theme.palette.background.default,
              }}
            >
              <Box sx={styles.innerModalBoxStyle}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    minWidth: 0,
                  }}
                >
                  <IconBadge icon={icon} color={color} bg={bg} size={32} />

                  <Typography
                    variant="body-bold"
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "wrap",
                    }}
                  >
                    {pattern.name}
                  </Typography>
                </Box>

                <Typography
                  variant="body-medium"
                  sx={{
                    color,
                    fontWeight: 700,
                    flexShrink: 0,
                  }}
                >
                  {pattern.progress}%
                </Typography>
              </Box>

              <LinearBar percent={pattern.progress} color={color} />
            </Box>
          );
        })}
      </Box>
    </ReusableModal>
  );
};

export default PatternsModal;

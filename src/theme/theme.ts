/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { alpha, createTheme, darken } from "@mui/material";

declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    borderless: true;
    rounded: true;
  }
}

const pxToRem = (px: number) => `${px / 16}rem`;

const colors = {
  primary: {
    main: "#5023e7",
    light: "#8B6CFF",
    dark: "#5838E5",
    main100: "#F5F1FF",
  },

  secondary: {
    main: "#A78BFA",
    light: "#F5F1FF",
  },

  success: {
    main: "#22C55E",
    light: "#DCFCE7",
  },

  warning: {
    main: "#F59E0B",
    light: "#FEF3C7",
    main100: "#B45309",
    main200:"#92400E"
  },

  error: {
    main: "#EF4444",
    light: "#FEE2E2",
  },

  sidebar: {
    main: "#0F172A",
    hover: "#1E293B",
    active: "#6D4AFF",
    main100: "#172033",
  },

  white: {
    main: "#FFFFFF",
    light: "#faf9f9aa",
    main100: "#F3EEFF",
    main200: "#E4D7FF",
    main300: "#FAFAFB",
    main400: "#CBD5E1",
  },

  black: {
    main: "#111827",
    main100: "#191a29",
    secondary: "#6B7280",
  },

  border: {
    main: "#E5E7EB",
  },
};

const buttonColors: any = {
  primary: colors.primary.main,
};

const createVariant = (
  variant: any,
  fontSize: number,
  fontWeight: number,
  smallFontSize: number | null,
) => {
  const fontFamily = '"Poppins", sans-serif';

  return {
    props: { variant },
    style: {
      fontSize: pxToRem(fontSize),
      fontWeight,
      fontFamily,
      ...(smallFontSize && {
        "@media (max-width:600px)": {
          fontSize: pxToRem(smallFontSize),
        },
      }),
    },
  };
};

const Theme = createTheme({
  palette: {
    ...colors,
  },
  typography: {
    fontFamily: '"Poppins", sans-serif',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: colors.white.main,
          fontFamily: '"Poppins", sans-serif',
          scrollbarWidth: "thin", // Firefox
          scrollbarColor: "#d9dadb transparent",
        },

        "*": {
          fontFamily: '"Poppins", sans-serif !important',
          scrollbarWidth: "thin",
          scrollbarColor: "#c0bfbf transparent",
        },

        /* Chrome / Edge / Safari */
        "*::-webkit-scrollbar": {
          width: "2px",
          height: "2px",
        },

        "*::-webkit-scrollbar-track": {
          background: "transparent",
        },

        "*::-webkit-scrollbar-corner": {
          background: "transparent",
        },
        "*::-webkit-scrollbar-thumb": {
          backgroundColor: "rgba(123,127,135,0.3)",
          borderRadius: "999px",
        },

        "*::-webkit-scrollbar-thumb:hover": {
          backgroundColor: "rgba(123,127,135,0.3)",
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontWeight: "400",
          color: colors.black.main,
        },
      },
      variants: [
        // Headings
        createVariant("h1-bold", 56, 700, 40),
        createVariant("h1-medium", 56, 500, 40),
        createVariant("h2-bold", 48, 700, 36),
        createVariant("h2-medium", 48, 500, 36),
        createVariant("h3-bold", 40, 700, 24),
        createVariant("h3-medium", 40, 500, 24),
        createVariant("h4-bold", 32, 700, 20),
        createVariant("h4-medium", 32, 500, 20),
        createVariant("h5-bold", 24, 700, 16),
        createVariant("h5-medium", 24, 500, 16),
        createVariant("h6-bold", 20, 700, 14),
        createVariant("h6-medium", 20, 500, 14),

        // Paragraph
        createVariant("p-bold", 15, 700, 12),
        createVariant("p-medium", 15, 400, 12),
        createVariant("p-secondary-bold", 15, 700, null),
        createVariant("p-secondary-medium", 15, 400, null),

        // Body
        createVariant("body-bold", 14, 500, null),
        createVariant("body-medium", 14, 400, null),
        createVariant("body-secondary-bold", 14, 400, null),
        createVariant("body-secondary-medium", 14, 400, null),

        // Body1
        createVariant("body1-bold", 12, 700, null),
        createVariant("body1-medium", 12, 400, null),
        createVariant("body1-secondary-bold", 12, 700, null),
        createVariant("body1-secondary-medium", 12, 400, null),
      ],
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          "& input:-webkit-autofill, & input:-webkit-autofill:focus": {
            WebkitBoxShadow: `0 0 0 100px ${colors.white.main} inset`,
            WebkitTextFillColor: colors.black.main,
            caretColor: colors.black.main,
            transition: "background-color 5000s ease-in-out 0s",
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          height: "35px",
          borderRadius: "8px",
          "& .MuiOutlinedInput-notchedOutline": {
            border: `1px solid ${colors.black.secondary}`,
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            border: `1px solid ${colors.primary.main}`,
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            border: `1px solid ${colors.primary.main}`,
          },
          "&.Mui-error": {
            backgroundColor: `${colors.error.main}20`,
          },
          "&.Mui-error .MuiOutlinedInput-notchedOutline": {
            borderColor: colors.error.main,
          },
        },
        input: {
          "&::placeholder": {
            color: colors.black.main,
          },
          "&:-webkit-autofill, &:-webkit-autofill:focus": {
            WebkitBoxShadow: `0 0 0 100px ${colors.white.main} inset`,
            WebkitTextFillColor: colors.black.main,
            caretColor: colors.black.main,
            transition: "background-color 5000s ease-in-out 0s",
          },
        },
      },
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
      styleOverrides: {
        root: {
          "&:focus": {
            outline: "none",
            border: "none",
          },
          "&:hover": {
            border: "none",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          textTransform: "none",
          fontWeight: 500,
        },
      },
      variants: [
        {
          props: { size: "small" },
          style: {
            fontSize: "13px",
            padding: "6px 10px",
          },
        },
        {
          props: { size: "medium" },
          style: {
            fontSize: "14px",
            padding: "10px 16px",
          },
        },
        {
          props: { size: "large" },
          style: {
            fontSize: "16px",
            padding: "12px 20px",
          },
        },
        {
          props: { variant: "contained" },
          style: () => {
            const colorValue = colors.primary.main;

            return {
              backgroundColor: colorValue,
              color: colors.white.main,
              border: "1px solid transparent",
              transition: "all 0.2s ease",

              "&:hover": {
                backgroundColor: darken(colorValue, 0.08),
                border: "1px solid transparent",
                boxShadow: "0 6px 16px rgba(109,78,255,0.25)",
                transform: "translateY(-1px)",
              },

              "&:active": {
                transform: "translateY(0)",
              },
            };
          },
        },
        {
          props: { variant: "outlined" },
          style: ({ ownerState }: any) => {
            const colorKey = ownerState.color || "primary";
            const colorValue = buttonColors[colorKey] || colors.primary.main;

            return {
              backgroundColor: "transparent",
              color: colors.primary.dark,
              border: `1px solid ${colorValue}`,
              transition: "all 0.2s ease",

              "&:active": {
                backgroundColor: alpha(colorValue, 0.12),
              },

              "&:focus": {
                border: `1px solid ${colorValue}`,
              },
            };
          },
        },
        {
          props: { variant: "outlined" },
          style: ({ ownerState }: any) => {
            const colorKey = ownerState.color || "primary";
            const colorValue = buttonColors[colorKey] || colors.primary.main;

            return {
              backgroundColor: "transparent",
              color: colorValue,
              border: `1px solid ${colorValue}`,
              ":hover": {
                backgroundColor: colors.white.light,
                color: colors.primary.main,
                border: `1px solid ${colorValue}`,
              },
              ":focus": {
                border: `1px solid ${colorValue}`,
              },
            };
          },
        },
        {
          props: { variant: "borderless" },
          style: ({ ownerState }: any) => {
            const colorKey = ownerState.color || "primary";
            const colorValue = buttonColors[colorKey] || colors.primary.main;

            return {
              backgroundColor: "transparent",
              color: colorValue,
              border: "none",
              minWidth: "auto",
              ":hover": {
                backgroundColor: "transparent",
                textDecoration: "underline",
              },
            };
          },
        },
        {
          props: { variant: "rounded" },
          style: ({ ownerState }: any) => {
            const colorKey = ownerState.color || "primary";
            const colorValue = buttonColors[colorKey] || colors.primary.main;

            return {
              borderRadius: "999px",
              backgroundColor: colorValue,
              color: colors.white.main,
              padding: "10px 20px",
              ":hover": {
                backgroundColor: darken(colorValue, 0.1),
              },
            };
          },
        },
      ],
    },
    MuiAlert: {
      variants: [
        {
          props: { variant: "filled", severity: "success" },
          style: {
            color: colors.success.main,
            backgroundColor: colors.success.light,
          },
        },
        {
          props: { variant: "filled", severity: "error" },
          style: {
            color: colors.error.main,
            backgroundColor: colors.error.light,
          },
        },
        {
          props: { variant: "filled", severity: "warning" },
          style: {
            color: colors.warning.main,
            backgroundColor: colors.warning.light,
          },
        },
        {
          props: { variant: "filled", severity: "info" },
          style: {
            color: colors.secondary.main,
            backgroundColor: colors.secondary.main,
          },
        },
      ],
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          "&:hover": {
            background: "#0033661a",
          },
          "&.Mui-disabled": {
            color: "#00336633",
          },
          "&:active": {
            background: "#00336633",
          },
        },
      },
    },
  },
});

export default Theme;

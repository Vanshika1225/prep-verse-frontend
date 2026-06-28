import "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    black: {
      main: string;
      main100:string,
      secondary: string;
    };
    white: {
      main: string;
      light: string;
    };
  }

  interface PaletteOptions {
    black?: {
      main: string;
      main100:string;
      secondary: string;
    };
    white?: {
      main: string;
      light: string;
    };
  }
}

declare module "@mui/material/styles" {
  interface TypographyVariants {
    "h1-bold": React.CSSProperties;
    "h1-medium": React.CSSProperties;
    "h2-bold": React.CSSProperties;
    "h2-medium": React.CSSProperties;
    "h3-bold": React.CSSProperties;
    "h3-medium": React.CSSProperties;
    "h4-bold": React.CSSProperties;
    "h4-medium": React.CSSProperties;
    "h5-bold": React.CSSProperties;
    "h5-medium": React.CSSProperties;
    "h6-bold": React.CSSProperties;
    "h6-medium": React.CSSProperties;

    "p-bold": React.CSSProperties;
    "p-medium": React.CSSProperties;
    "p-secondary-bold": React.CSSProperties;
    "p-secondary-medium": React.CSSProperties;

    "body-bold": React.CSSProperties;
    "body-medium": React.CSSProperties;
    "body-secondary-bold": React.CSSProperties;
    "body-secondary-medium": React.CSSProperties;

    "body1-bold": React.CSSProperties;
    "body1-medium": React.CSSProperties;
    "body1-secondary-bold": React.CSSProperties;
    "body1-secondary-medium": React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    "h1-bold"?: React.CSSProperties;
    "h1-medium"?: React.CSSProperties;
    "h2-bold"?: React.CSSProperties;
    "h2-medium"?: React.CSSProperties;
    "h3-bold"?: React.CSSProperties;
    "h3-medium"?: React.CSSProperties;
    "h4-bold"?: React.CSSProperties;
    "h4-medium"?: React.CSSProperties;
    "h5-bold"?: React.CSSProperties;
    "h5-medium"?: React.CSSProperties;
    "h6-bold"?: React.CSSProperties;
    "h6-medium"?: React.CSSProperties;

    "p-bold"?: React.CSSProperties;
    "p-medium"?: React.CSSProperties;
    "p-secondary-bold"?: React.CSSProperties;
    "p-secondary-medium"?: React.CSSProperties;

    "body-bold"?: React.CSSProperties;
    "body-medium"?: React.CSSProperties;
    "body-secondary-bold"?: React.CSSProperties;
    "body-secondary-medium"?: React.CSSProperties;

    "body1-bold"?: React.CSSProperties;
    "body1-medium"?: React.CSSProperties;
    "body1-secondary-bold"?: React.CSSProperties;
    "body1-secondary-medium"?: React.CSSProperties;
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    "h1-bold": true;
    "h1-medium": true;
    "h2-bold": true;
    "h2-medium": true;
    "h3-bold": true;
    "h3-medium": true;
    "h4-bold": true;
    "h4-medium": true;
    "h5-bold": true;
    "h5-medium": true;
    "h6-bold": true;
    "h6-medium": true;

    "p-bold": true;
    "p-medium": true;
    "p-secondary-bold": true;
    "p-secondary-medium": true;

    "body-bold": true;
    "body-medium": true;
    "body-secondary-bold": true;
    "body-secondary-medium": true;

    "body1-bold": true;
    "body1-medium": true;
    "body1-secondary-bold": true;
    "body1-secondary-medium": true;
  }
}
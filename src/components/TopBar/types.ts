export interface TopBarProps {
  title?: string;
  subtitle?: string;
}

export interface ProfileMenuProps {
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
  onProfile: () => void;
  onLogout: () => void;
  userName: string;
  userEmail: string;
}

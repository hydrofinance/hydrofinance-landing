export type ContactItemType = {
  primaryText: string;
  icon: string;
  redirectTo: string;
};

export const CONTACT_ITEMS: ContactItemType[] = [
  {
    primaryText: "menuTelegram",
    icon: "TELEGRAM",
    redirectTo: "https://TODO",
  },
  {
    primaryText: "menuTwitter",
    icon: "TWITTER",
    redirectTo: "https://TODO",
  },
  {
    primaryText: "menuMedium",
    icon: "MEDIUM",
    redirectTo: "https://medium.com/TODO",
  },
  {
    primaryText: "menuGithub",
    icon: "GITHUB",
    redirectTo: "https://github.com/hydrofinance",
  },
];

export type ContactItemType = {
  primaryText: string;
  icon: string;
  redirectTo: string;
};

export const CONTACT_ITEMS: ContactItemType[] = [
  {
    primaryText: "menuTelegram",
    icon: "TELEGRAM",
    redirectTo: "https://t.me/HydroProtocolOfficial",
  },
  {
    primaryText: "menuTwitter",
    icon: "TWITTER",
    redirectTo: "https://twitter.com/H2O_Protocol",
  },
  {
    primaryText: "menuMedium",
    icon: "MEDIUM",
    redirectTo: "https://medium.com/@H2OProtocol",
  },
  {
    primaryText: "menuGithub",
    icon: "GITHUB",
    redirectTo: "https://github.com/hydrofinance",
  },
];

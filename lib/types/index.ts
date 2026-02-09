export type IProfile = {
  name: string;
  address?: string;
  bio?: string;
  mail?: string;
  website?: string;
  location?: string;
  avatar?: string;
};

export type ISocialLink = {
  name: string;
  handle: string;
};

export type IWalletInfo = {
  chain: string;
  address: string;
};

export type IENSProfile = {
  profile: IProfile;
  socials?: ISocialLink[];
  wallets?: IWalletInfo[];
};

export type MulticallResult<T> =
  | { status: "success"; result: T }
  | { status: "failure"; error: unknown };

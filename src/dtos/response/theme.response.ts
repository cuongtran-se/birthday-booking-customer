export interface ThemeDataResponse {
  id: number;
  themeName: string;
  themeDescription: string;
  themeImgUrl: string;
  active: boolean;
}
export interface ThemeArrayResponse {
  status: string;
  message: string;
  data: ThemeDataResponse[] | [];
}

export interface ThemeObjectResponse {
  status: string;
  message: string;
  data: ThemeDataResponse;
}
// Theme In Venue
export interface ThemeInVenueDataResponse {
  id: number;
  active: boolean;
  theme: ThemeDataResponse;
}
export interface ThemeInVenueArrayResponse {
  status: string;
  message: string;
  data: ThemeInVenueDataResponse[] | [];
}

export interface ThemeInVenueObjectResponse {
  status: string;
  message: string;
  data: ThemeInVenueDataResponse;
}

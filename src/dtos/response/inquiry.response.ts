export type InquiryDataResponse = {
  id: number;
  inquiryQuestion: string;
  inquiryReply: string;
  status: string;
  active: boolean;
};
export interface InquiryArrayResponse {
  status: string;
  message: string;
  data: InquiryDataResponse[] | [];
}
export interface InquiryObjectResponse {
  status: string;
  message: string;
  data: InquiryDataResponse;
}

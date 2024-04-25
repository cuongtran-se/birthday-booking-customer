import { AccountDataResponse } from "./auth.response";
import { PackageDataResponse } from "./package.response";
import { PartyDatedDataResponse } from "./partyDated.response";
import { PaymentDataResponse } from "./payment.response";
import { RoomDataResponse } from "./room.response";
import { SlotInRoomDataResponse } from "./slot.response";
import { ThemeInVenueDataResponse } from "./theme.response";
import { UpgradeServiceDataResponse } from "./upgradeService.response";
import { VenueDataResponse } from "./venue.response";

export interface PackageInBookingDataResponse {
  id: number;
  createAt: string;
  updateAt: string;
  deleteAt: string;
  apackage: PackageDataResponse;
}

export interface PartyBookingDataResponse {
  themeInVenue: ThemeInVenueDataResponse | undefined;
  id: number;
  createAt: string;
  updateAt: string;
  deleteAt: string;
  kidName: string;
  kidDOB: string;
  email: string;
  phone: string;
  status: string;
  reservationAgent: string;
  participantAmount: number;
  date: string;
  account: AccountDataResponse;
  upgradeServices: UpgradeServiceDataResponse[];
  packageInBookings: PackageInBookingDataResponse[] | [];
  paymentList: PaymentDataResponse[] | [];
  review: any;
  slotInRoom: SlotInRoomDataResponse;
  active: boolean;
  venueObject: VenueDataResponse;
  roomObject: RoomDataResponse;
  isPayment: boolean;
  totalPrice: number;
}

export interface PartyBookingObjectResponse {
  status: string;
  message: string;
  data: PartyBookingDataResponse;
}

export interface PartyBookingArrayResponse {
  status: string;
  message: string;
  data: PartyBookingDataResponse[] | [];
}

export interface DataUpgrade {
  serviceId: number;
  count: number;
}
export interface BookingRequest {
  kidName?: string;
  kidDOB?: string;
  participantAmount?: number;
  reservationAgent?: string;
  email?: string;
  phone?: string;
  packageDecoId?: number;
  packageFoodId?: number;
  slotInRoomId?: number;
  dataUpgrade?: DataUpgrade[] | [];
  date?: string;
}

export interface BookingUpdateOrganzationTimeRequest {
  partyBookingId: number;
  slotInRoomId?: number | null;
  date?: string | null;
}

export interface BookingUpdatePackage {
  partyBookingId: number;
  packageDecoId?: number | null;
  packageFoodId?: number | null;
}

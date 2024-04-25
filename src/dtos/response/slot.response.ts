export interface SlotDataResponse {
  id: number
  timeStart: string
  timeEnd: string
  validTimeRange: boolean
  account: []
  active: boolean
}
export interface SlotInRoomDataResponse {
  capacity: any
  id: number
  active: boolean
  status: boolean
  slot: SlotDataResponse
}

export interface SlotInRoomArrayResponse {
  status: string
  message: string
  data: SlotInRoomDataResponse[] | []
}

export interface SlotNotAddArrayResponse {
  status: string
  message: string
  data: SlotDataResponse[] | []
}

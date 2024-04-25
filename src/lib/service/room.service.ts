import { AxiosResponse } from "axios";
import axiosClient from "./axiosClient";
import { GetRoomRequest } from "@/dtos/request/room.request";

export const roomService = {
  getAllRoomCheckSlot: (
    payload: GetRoomRequest,
  ): Promise<AxiosResponse<any>> => {
    const url = `/api/room/check-slot-in-room-for-customer/${payload.venueId}?date=${payload.date}`;
    return axiosClient.get(url);
  },
};
{/* <div className="container mx-auto">
      <Typography.Title level={3}>Chọn một ngày</Typography.Title>
      <DatePicker
        format="YYYY-MM-DD"
        // disabledDate={disabledDate}
        // disabledTime={disabledDateTime}
        // showTime={{ defaultValue: dayjs("00:00:00", "HH:mm:ss") }}
        // defaultValue={dayjs(dateQuery)}
        value={dayjs(dateQuery)}
        onChange={onChange}
      />
      <Flex vertical>
        <Spin spinning={loading} />
        {roomList && roomList?.length > 0 ? (
          roomList?.map((room, index: number) => <RoomCard room={room} />)
        ) : (
          <Empty description="Không có dữ liệu" />
        )}
      </Flex>
    </div> */}

    // const dispatch = useAppDispatch();

  // const [dateQuery, setDateQuery] = React.useState("2024-04-01");

  // const roomList = useAppSelector((state) => state.roomReducer.roomList);
  // const loading = useAppSelector((state) => state.roomReducer.loading);

  // const onChange: DatePickerProps["onChange"] = (date, dateString) => {
  //   if (date !== null) {
  //     const partDate = date.format("YYYY-MM-DD");
  //     setDateQuery(partDate);
  //     // setBookingData((prev) => ({
  //     //   ...prev,
  //     //   date: partDate,
  //     // }));
  //     // setBookingDataDisplay((prev) => ({
  //     //   ...prev,
  //     //   date: partDate,
  //     // }));
  //   }
  // };

  // const fetchAllRoomCheckSlot = async () => {
  //   const res = await dispatch(
  //     getAllRoomCheckSlot({ date: dateQuery, venueId: params.venueId }),
  //   );
  // };

  // useEffect(() => {
  //   fetchAllRoomCheckSlot();
  // }, [dateQuery, params?.venueId]);

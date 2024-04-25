"use client";
import RoomCard from "@/components/booking-history/RoomCard";
import { ChildItem, Item } from "@/components/booking/Item";
import PackageDetail from "@/components/booking/PackageDetail";
import UpgradeServiceBookingDetail from "@/components/booking/UpgradeServiceBookingDetail";
import { BookingUpdateOrganzationTimeRequest } from "@/dtos/request/partyBooking.request";
import { RoomDataResponse } from "@/dtos/response/room.response";
import { SlotInRoomDataResponse } from "@/dtos/response/slot.response";
import { PARTYB_BOOKING_STATUS } from "@/enums/partyBooking";
import { SERVICE_ENUM } from "@/enums/service";
import {
  createInquiryForChangePackageInVenue,
  createInquiryForChangeThemeInVenue,
} from "@/lib/features/action/inquiry.action";
import {
  getAllPackageDecorNotChoose,
  getAllPackageFoodNotChoose,
} from "@/lib/features/action/package.action";
import {
  cancelBooking,
  getBookingById,
  updateOrganizationTime,
  updatePackage,
} from "@/lib/features/action/partyBooking.action";
import { createPaymentByBookingId } from "@/lib/features/action/payment.action";
import { createReview } from "@/lib/features/action/review.action";
import { getAllRoomCheckSlot } from "@/lib/features/action/room.action";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { formatDateto } from "@/utils/format";
import {
  CalendarOutlined,
  EnvironmentOutlined,
  EyeOutlined,
  SwapOutlined,
  HomeTwoTone,
  HomeOutlined,
} from "@ant-design/icons";
import { ModalForm, ProFormRadio } from "@ant-design/pro-components";
import {
  Button,
  Card,
  DatePicker,
  DatePickerProps,
  Divider,
  Empty,
  Flex,
  Form,
  Image,
  Input,
  Popconfirm,
  Rate,
  Skeleton,
  Space,
  Spin,
  Tooltip,
  Typography,
  message,
} from "antd";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import * as React from "react";

const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(today.getDate() + 1);
export default function BookingDetail({ params }: { params: any }) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.partyBookingReducer.loading);
  const booking = useAppSelector(
    (state) => state.partyBookingReducer.bookingById,
  );
  const roomList = useAppSelector((state) => state.roomReducer.roomList);
  const loadingRoomList = useAppSelector((state) => state.roomReducer.loading);
  const packageDecorNotChooseList = useAppSelector(
    (state) => state.packageReducer.packageDecorNotChooseList,
  );
  const packageFoodNotChooseList = useAppSelector(
    (state) => state.packageReducer.packageFoodNotChooseList,
  );

  const [dateQuery, setDateQuery] = React.useState(
    dayjs(tomorrow).format("YYYY-MM-DD"),
  );

  const [slotInRoom, setSlotInRoom] =
    React.useState<SlotInRoomDataResponse | null>(null);

  const fetchBookingById = async () => {
    await dispatch(getBookingById(params?.id)).then((res) => {
      console.log(JSON.stringify(res, null, 2));
    });
  };

  const fetchInQueue = async () => {
    await fetchBookingById();
  };

  React.useEffect(() => {
    fetchInQueue();
  }, []);

  const fetchAllRoom = async () => {
    if (
      typeof booking?.venueObject?.id !== "undefined" &&
      booking?.venueObject?.id !== null &&
      dateQuery !== null
    ) {
      const res = await dispatch(
        getAllRoomCheckSlot({
          venueId: booking?.venueObject?.id,
          date: dateQuery,
        }),
      );
    }
  };

  React.useEffect(() => {
    if (dateQuery !== null) {
      fetchAllRoom();
    }
  }, [dateQuery]);

  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    if (date !== null) {
      const partDate = date.format("YYYY-MM-DD");
      setDateQuery(partDate);
    }
  };

  const fetchAllPackageDecorNotChoose = async () => {
    await dispatch(getAllPackageDecorNotChoose(params?.id)).then((res) => {
      console.log(JSON.stringify(res, null, 2));
    });
  };

  const fetchAllPackageFoodrNotChoose = async () => {
    await dispatch(getAllPackageFoodNotChoose(params?.id)).then((res) => {
      console.log(JSON.stringify(res, null, 2));
    });
  };

  React.useEffect(() => {
    fetchAllPackageDecorNotChoose();
    fetchAllPackageFoodrNotChoose();
  }, [params?.id]);

  const createOnePayment = async () => {
    const res = await dispatch(createPaymentByBookingId(params?.id));
    if (res?.meta?.requestStatus === "fulfilled") {
      const url = res?.payload as string;
      window.open(url);
    } else {
      message.error("Lỗi khi thanh toán!");
    }
  };

  const updateSlotInRoomAndDate = async (params: {
    slotInRoomId: number | null;
    date: string | null;
  }) => {
    if (typeof booking?.id !== "undefined") {
      const res = await dispatch(
        updateOrganizationTime({
          partyBookingId: booking?.id,
          slotInRoomId: params.slotInRoomId,
          date: params.date,
        }),
      );
      if (res?.meta?.requestStatus === "fulfilled") {
        message.success("Thay đổi thành công!");
        await fetchBookingById();
        return true;
      } else {
        message.error("Lỗi khi gửi yêu cầu. Vui lòng thử lại!");
        return false;
      }
    }
  };

  const updatePackageDeco = async (packageDecoId: number | null) => {
    if (typeof booking?.id !== "undefined") {
      const res = await dispatch(
        updatePackage({
          partyBookingId: booking?.id,
          packageDecoId,
          packageFoodId: booking?.packageInBookings?.find(item => item?.apackage?.packageType === SERVICE_ENUM.FOOD)?.apackage?.id,
        }),
      );
      if (res?.meta?.requestStatus === "fulfilled") {
        message.success("Thay đổi thành công!");
        await fetchBookingById();
        return true;
      } else {
        message.error("Lỗi khi gửi yêu cầu. Vui lòng thử lại!");
        return false;
      }
    }
  };
  const updatePackageFood = async (packageFoodId: number | null) => {
    if (typeof booking?.id !== "undefined") {
      const res = await dispatch(
        updatePackage({
          partyBookingId: booking?.id,
          packageDecoId: booking?.packageInBookings?.find(item => item?.apackage?.packageType === SERVICE_ENUM.DECORATION)?.apackage?.id,
          packageFoodId,
        }),
      );
      if (res?.meta?.requestStatus === "fulfilled") {
        message.success("Thay đổi thành công!");
        await fetchBookingById();
        return true;
      } else {
        message.error("Lỗi khi gửi yêu cầu. Vui lòng thử lại!");
        return false;
      }
    }
  };

  const createOneInquiryForChangePackageInVenue = async (id: number) => {
    if (typeof booking?.id !== "undefined") {
      const res = await dispatch(
        createInquiryForChangePackageInVenue({
          bookingId: booking?.id,
          packageInVenueId: id,
        }),
      );
      if (res?.meta?.requestStatus === "fulfilled") {
        message.success("Gửi yêu cầu thay đổi gói dịch vụ thành công!");
        return true;
      } else {
        message.error("Lỗi khi gửi yêu cầu!");
        return false;
      }
    }
  };

  const createOneReview = async (request: {
    id: number;
    payload: {
      reviewMessage: string;
      rating: number;
    };
  }) => {
    if (typeof booking?.id !== "undefined") {
      const res = await dispatch(createReview(request));
      if (res?.meta?.requestStatus === "fulfilled") {
        message.success("Gửi đánh giá đi thành công!");
        await fetchBookingById();
        return true;
      } else {
        message.error("Lỗi khi gửi yêu cầu!");
        return false;
      }
    }
  };

  const cancelOneBooking = async (id: number) => {
    const res = await dispatch(cancelBooking(id));
    if (res?.meta?.requestStatus === "fulfilled") {
      await fetchBookingById();
      message.success("Cancel booking success!");
      return true;
    } else {
      message.error(res?.payload?.message);
      return false;
    }
  };
  console.log(slotInRoom);
  if (loading || booking === null) {
    return (
      <React.Fragment>
        <Skeleton className="container mx-auto mt-10" active />
        <Skeleton className="container mx-auto" active />
        <Skeleton className="container mx-auto" active />
        <Skeleton className="container mx-auto" active />
        <Skeleton className="container mx-auto" active />
        <Skeleton className="container mx-auto" active />
      </React.Fragment>
    );
  }

  // if (booking === null) {
  //   return (
  //     <React.Fragment>
  //       <Empty className="p-20" />
  //     </React.Fragment>
  //   );
  // }

  const renderTitle = () => {
    switch (booking?.status) {
      case PARTYB_BOOKING_STATUS.PENDING:
        return (
          <React.Fragment>
            Bữa tiệc của bạn đang chờ{" "}
            <Typography.Title style={{ margin: 0, color: "blue" }} level={3}>
              xác nhận
            </Typography.Title>
          </React.Fragment>
        );
      case PARTYB_BOOKING_STATUS.CONFIRMED:
        return (
          <React.Fragment>
            Bữa tiệc của bạn đã được{" "}
            <Typography.Title style={{ margin: 0, color: "orange" }} level={3}>
              xác nhận
            </Typography.Title>
          </React.Fragment>
        );
      case PARTYB_BOOKING_STATUS.COMPLETED:
        return (
          <React.Fragment>
            Bữa tiệc của bạn đã{" "}
            <Typography.Title style={{ margin: 0, color: "green" }} level={3}>
              hoàn thành
            </Typography.Title>
          </React.Fragment>
        );
      case PARTYB_BOOKING_STATUS.CANCELLED:
        return (
          <React.Fragment>
            Bữa tiệc của bạn đã{" "}
            <Typography.Title style={{ margin: 0, color: "red" }} level={3}>
              bị huỷ
            </Typography.Title>
          </React.Fragment>
        );
      default:
        return <React.Fragment>Đang tải...</React.Fragment>;
    }
  };
  const renderHTitle = () => {
    switch (booking?.status) {
      case PARTYB_BOOKING_STATUS.PENDING:
        return (
          <Typography.Title style={{ margin: 0, color: "blue" }} level={3}>
            Chờ xác nhận
          </Typography.Title>
        );

      case PARTYB_BOOKING_STATUS.CONFIRMED:
        return (
          <Typography.Title style={{ margin: 0, color: "orange" }} level={3}>
            Đã xác nhận
          </Typography.Title>
        );
      case PARTYB_BOOKING_STATUS.COMPLETED:
        return (
          <Typography.Title style={{ margin: 0, color: "green" }} level={3}>
            Đã hoàn thành
          </Typography.Title>
        );
      case PARTYB_BOOKING_STATUS.CANCELLED:
        return (
          <Typography.Title style={{ margin: 0, color: "red" }} level={3}>
            Đã huỷ
          </Typography.Title>
        );
      default:
        return <React.Fragment>Đang tải...</React.Fragment>;
    }
  };
  const renderColor = () => {
    switch (booking?.status) {
      case PARTYB_BOOKING_STATUS.PENDING:
        return "blue";
      case PARTYB_BOOKING_STATUS.CONFIRMED:
        return "orange";
      case PARTYB_BOOKING_STATUS.COMPLETED:
        return "green";
      case PARTYB_BOOKING_STATUS.CANCELLED:
        return "red";
      default:
        return "black";
    }
  };

  return booking !== null ? (
    <div className="container mx-auto mt-10">
      <div className="">
        <Flex justify="space-between" gap={30}>
          <div className="w-3/4">
            <Space
              style={{ width: "100%" }}
              direction="vertical"
              size={"large"}
            >
              <Typography.Title
                style={{
                  color: renderColor(),
                }}
                level={5}
              >
                {renderHTitle()}
              </Typography.Title>

              <Typography.Title style={{ margin: 0 }} level={3}>
                {renderTitle()}
              </Typography.Title>

              <Space direction="vertical" size={"middle"}>
                <Flex justify="space-between" gap={20}>
                  <Flex gap={20} align="center">
                    <HomeOutlined style={{ fontSize: 30 }} />
                    <div>Phòng: </div>
                    <div className="font-bold">
                      {booking?.roomObject?.roomName}
                    </div>
                  </Flex>
                  {booking?.status === PARTYB_BOOKING_STATUS.PENDING && (
                    <ModalForm
                      title="Đổi ngày và phòng"
                      trigger={
                        <Button
                          onClick={() => {
                            if (dateQuery !== null) {
                              fetchAllRoom();
                            } else {
                              setDateQuery(booking?.date);
                            }
                          }}
                          style={{ padding: 0 }}
                          type="link"
                        >
                          <SwapOutlined />
                          Đổi thời gian tổ chức
                        </Button>
                      }
                      style={{ padding: 0 }}
                      width={window.innerWidth - 300}
                      onFinish={async () => {
                        if (slotInRoom !== null && dateQuery !== null) {
                          const result = updateSlotInRoomAndDate({
                            slotInRoomId: slotInRoom?.id,
                            date: dateQuery,
                          });
                          return result;
                        }
                      }}
                    >
                      <Space direction="vertical">
                        <DatePicker
                          defaultValue={dayjs(booking?.date)}
                          onChange={onChange}
                        />
                        <Flex vertical>
                          {roomList && roomList?.length > 0 ? (
                            roomList?.map((room, index: number) =>
                              !loadingRoomList ? (
                                <RoomCard
                                  key={index}
                                  room={room}
                                  slotInRoom={slotInRoom}
                                  setSlotInRoom={setSlotInRoom}
                                />
                              ) : (
                                <>
                                  <Skeleton
                                    style={{ height: 100, width: 1020 }}
                                    active
                                  />
                                  <Skeleton
                                    style={{ height: 100, width: 1020 }}
                                    active
                                  />
                                </>
                              ),
                            )
                          ) : (
                            <Empty description="Không có dữ liệu" />
                          )}
                        </Flex>
                      </Space>
                    </ModalForm>
                  )}{" "}
                </Flex>

                <Flex align="start" gap={20}>
                  <CalendarOutlined style={{ fontSize: 30 }} />
                  <Space direction="vertical">
                    <div>Thời gian check-in</div>
                    <div className="font-bold">
                      {formatDateto(booking?.date)}
                    </div>
                    <div className="text-sm font-thin text-gray-700">
                      {`vào lúc ${booking?.slotInRoom?.slot?.timeStart}`}
                    </div>
                  </Space>
                  <Divider className="mx-0 mt-2 h-16" type="vertical" />
                  <Space direction="vertical">
                    <div>Thời gian check-out</div>
                    <div className="font-bold">
                      {formatDateto(booking?.date)}
                    </div>
                    <div className="text-sm font-thin text-gray-700">
                      {`vào lúc ${booking?.slotInRoom?.slot?.timeEnd}`}
                    </div>
                  </Space>
                </Flex>

                <Flex align="start" gap={20}>
                  <EnvironmentOutlined style={{ fontSize: 30 }} />
                  <Flex vertical gap={4}>
                    <div className="font-bold">Địa chỉ</div>
                    <div className="text-sm font-thin text-gray-700">
                      {booking?.venueObject?.district}
                    </div>
                  </Flex>
                </Flex>
              </Space>

              <Typography.Title style={{ margin: 0 }} level={3}>
                Chi tiết của bữa tiệc
              </Typography.Title>
              <Space className="w-full" direction="vertical" size={"middle"}>
                <Flex align="center" justify="space-between" gap={20}>
                  <Space size={"large"}>
                    <Image
                      width={100}
                      height={100}
                      className="rounded-xl"
                      src={booking?.venueObject?.venueImgUrl ?? ""}
                    />
                    <Space direction="vertical">
                      <Typography.Title className="m-0 font-bold" level={4}>
                        {booking?.venueObject?.venueName}
                      </Typography.Title>
                      <div className="text-sm font-thin text-gray-700">
                        {booking?.venueObject?.district}
                      </div>
                    </Space>
                  </Space>

                  <Button type="link">Xem đường đi</Button>
                </Flex>
                <Item
                  title="Tên khách hàng"
                  description={booking?.account?.fullName}
                />
                <Item
                  title="Sức chứa tối đa"
                  description={`${booking?.roomObject?.capacity} người`}
                />
                <Item
                  title="Chi tiết địa điểm"
                  description={booking?.venueObject?.venueDescription}
                />
                <Item
                  title="Chi tiết gói Trang trí"
                  description={
                    <Flex gap={5}>
                      <ModalForm
                        title="Gói dịch vụ đã chọn"
                        trigger={
                          <Button style={{ padding: 0 }} type="link">
                            <EyeOutlined />
                            Xem chi tiết
                          </Button>
                        }
                        style={{ padding: 0 }}
                      >
                        <PackageDetail
                          packageInVenue={
                            booking?.packageInBookings?.[0]?.apackage
                          }
                        />
                      </ModalForm>
                      {booking?.status === "CONFIRMED" ||
                        (booking?.status === "PENDING" && (
                          <ModalForm
                            title="Các gói dịch vụ trang trí khác"
                            trigger={
                              <Button type="link">
                                <SwapOutlined />
                                Thay đổi
                              </Button>
                            }
                            // form={form}
                            autoFocusFirstInput
                            modalProps={{
                              destroyOnClose: true,
                              onCancel: () => console.log("run"),
                            }}
                            onFinish={async (values) => {
                              let result: boolean | undefined = false;
                              result = await updatePackageDeco(values?.id);

                              return result;
                            }}
                          >
                            {packageDecorNotChooseList?.length > 0 ? (
                              <ProFormRadio.Group
                                name="id"
                                layout="horizontal"
                                style={{ marginBottom: 10 }}
                                options={packageDecorNotChooseList?.map(
                                  (item, index) => ({
                                    label: (
                                      <Card
                                        key={index}
                                        hoverable
                                        style={{ width: 200, marginBottom: 10 }}
                                        cover={
                                          <Image
                                            style={{
                                              width: "100%",
                                              height: 100,
                                              objectFit: "cover",
                                            }}
                                            alt="example"
                                            src={item?.packageImgUrl}
                                          />
                                        }
                                      >
                                        <Space direction="vertical">
                                          <Card.Meta
                                            title={item?.packageName}
                                          />
                                          <ModalForm
                                            title="Chi tiết gói dịch vụ"
                                            trigger={
                                              <Button
                                                style={{ padding: 0 }}
                                                type="link"
                                              >
                                                <EyeOutlined />
                                                Chi tiết
                                              </Button>
                                            }
                                            style={{ padding: 0 }}
                                          >
                                            <PackageDetail
                                              packageInVenue={item}
                                            />
                                          </ModalForm>
                                        </Space>
                                      </Card>
                                    ),
                                    value: item?.id,
                                  }),
                                )}
                              />
                            ) : (
                              <Empty style={{ margin: "auto" }} />
                            )}
                          </ModalForm>
                        ))}
                    </Flex>
                  }
                  align={"center"}
                />
                <Item
                  title="Chi tiết gói Món ăn"
                  description={
                    <Flex gap={5}>
                      <ModalForm
                        title="Gói dịch vụ đã chọn"
                        trigger={
                          <Button style={{ padding: 0 }} type="link">
                            <EyeOutlined />
                            Xem chi tiết
                          </Button>
                        }
                        style={{ padding: 0 }}
                      >
                        <PackageDetail
                          packageInVenue={
                            booking?.packageInBookings?.[1]?.apackage
                          }
                        />
                      </ModalForm>
                      {booking?.status === "CONFIRMED" ||
                        (booking?.status === "PENDING" && (
                          <ModalForm
                            title="Các gói dịch vụ khác"
                            trigger={
                              <Button type="link">
                                <SwapOutlined />
                                Thay đổi
                              </Button>
                            }
                            // form={form}
                            autoFocusFirstInput
                            modalProps={{
                              destroyOnClose: true,
                              onCancel: () => console.log("run"),
                            }}
                            onFinish={async (values) => {
                              let result: boolean | undefined = false;
                              result = await updatePackageFood(values?.id);

                              return result;
                            }}
                          >
                            {packageFoodNotChooseList?.length > 0 ? (
                              <ProFormRadio.Group
                                name="id"
                                layout="horizontal"
                                style={{ marginBottom: 10 }}
                                options={packageFoodNotChooseList?.map(
                                  (item, index) => ({
                                    label: (
                                      <Card
                                        key={index}
                                        hoverable
                                        style={{ width: 200, marginBottom: 10 }}
                                        cover={
                                          <Image
                                            style={{
                                              width: "100%",
                                              height: 100,
                                              objectFit: "cover",
                                            }}
                                            alt="example"
                                            src={item?.packageImgUrl}
                                          />
                                        }
                                      >
                                        <Space direction="vertical">
                                          <Card.Meta
                                            title={item?.packageName}
                                          />
                                          <ModalForm
                                            title="Chi tiết gói dịch vụ"
                                            trigger={
                                              <Button
                                                style={{ padding: 0 }}
                                                type="link"
                                              >
                                                <EyeOutlined />
                                                Chi tiết gói dịch vụ
                                              </Button>
                                            }
                                            style={{ padding: 0 }}
                                          >
                                            <PackageDetail
                                              packageInVenue={item}
                                            />
                                          </ModalForm>
                                        </Space>
                                      </Card>
                                    ),
                                    value: item?.id,
                                  }),
                                )}
                              />
                            ) : (
                              <Empty style={{ margin: "auto" }} />
                            )}
                          </ModalForm>
                        ))}
                    </Flex>
                  }
                  align={"center"}
                />
                <Item
                  title="Chi tiết nâng cấp dịch vụ"
                  description={
                    <ModalForm
                      title="Dịch vụ đã nâng cấp"
                      trigger={
                        <Button style={{ padding: 0 }} type="link">
                          <EyeOutlined />
                          Xem chi tiết
                        </Button>
                      }
                      style={{ padding: 0 }}
                    >
                      <UpgradeServiceBookingDetail
                        upgradeServices={booking?.upgradeServices}
                      />
                    </ModalForm>
                  }
                  align={"center"}
                />
                <Item
                  title="Thông tin của bé"
                  description={
                    <Space
                      className="mb-5 w-full border"
                      direction="vertical"
                      size={"small"}
                    >
                      <ChildItem
                        title="Tên của bé:"
                        description={booking?.kidName}
                      />
                      <ChildItem
                        title="Ngày sinh của bé:"
                        description={booking?.kidDOB}
                      />
                      <ChildItem
                        title="Số người tham gia:"
                        description={booking?.participantAmount + " người"}
                      />
                    </Space>
                  }
                />
                <Item
                  title="Thông tin cá nhân"
                  description={
                    <Space
                      className="h-40 w-full border"
                      direction="vertical"
                      size={"small"}
                    >
                      <ChildItem
                        title="Tên của bạn:"
                        description={booking?.account?.fullName}
                      />
                      <ChildItem
                        title="Email của bạn:"
                        description={booking?.email}
                      />
                      <ChildItem
                        title="Số điện thoại:"
                        description={booking?.phone}
                      />
                    </Space>
                  }
                />
              </Space>
            </Space>
            {booking?.status !== "CANCELLED" && (
              <Flex justify="space-between">
                <div></div>
                <Popconfirm
                  title="Action"
                  description="Are you sure to cancel this booking?"
                  onConfirm={() => cancelOneBooking(booking?.id)}
                  onCancel={() => null}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button danger>Cancel</Button>
                </Popconfirm>
              </Flex>
            )}
          </div>
          <div className="w-1/3" style={{ borderWidth: 2 }}>
            <div className="h-50 mt-5 rounded-lg p-6 shadow">
              <Typography.Title
                style={{ color: "rgb(41 182 246 / var(--tw-bg-opacity))" }}
                className="m-0"
                level={4}
              >
                Xác nhận thanh toán
              </Typography.Title>

              <Flex className="my-5" justify="space-between">
                <Typography style={{ fontSize: 15 }}>Phí phòng:</Typography>
                <Typography style={{ fontSize: 15 }} className="font-medium">
                  {booking?.roomObject?.pricing?.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </Typography>
              </Flex>

              <Flex className="my-5" justify="space-between">
                <Typography style={{ fontSize: 15 }}>
                  Phí dịch vụ decor:
                </Typography>
                <Typography style={{ fontSize: 15 }} className="font-medium">
                  {booking?.packageInBookings
                    .find(
                      (item) =>
                        item?.apackage?.packageType === SERVICE_ENUM.DECORATION,
                    )
                    ?.apackage?.pricing?.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                </Typography>
              </Flex>

              <Flex className="my-5" justify="space-between">
                <Typography style={{ fontSize: 15 }}>
                  Phí dịch vụ food({booking?.participantAmount} người):
                </Typography>
                <Typography style={{ fontSize: 15 }} className="font-medium">
                  {(
                    Number(
                      booking?.packageInBookings.find(
                        (item) =>
                          item?.apackage?.packageType === SERVICE_ENUM.FOOD,
                      )?.apackage?.pricing,
                    ) * booking?.participantAmount
                  )?.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </Typography>
              </Flex>

              <Flex className="my-5" justify="space-between">
                <Typography style={{ fontSize: 15 }}>
                  Phí nâng cấp dịch vụ:
                </Typography>
                <Typography style={{ fontSize: 15 }} className="font-medium">
                  {booking?.upgradeServices
                    .reduce(
                      (
                        accumulator: number,
                        current: { pricing: number; count: number },
                      ) => {
                        return accumulator + current.pricing * current.count;
                      },
                      0,
                    )
                    ?.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                </Typography>
              </Flex>

              <Flex className="my-5" justify="space-between">
                <Typography style={{ fontSize: 19 }}>Tổng số tiền:</Typography>
                <Typography style={{ fontSize: 19 }} className="font-medium">
                  {booking?.totalPrice?.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </Typography>
              </Flex>

              {booking?.status !== PARTYB_BOOKING_STATUS.CANCELLED ? (
                <Space direction="vertical">
                  {booking?.paymentList?.some(
                    (item) => item.status === "SUCCESS",
                  ) ? (
                    <Typography.Title
                      style={{ color: "green" }}
                      className="m-0"
                      level={5}
                    >
                      Đã thanh toán
                    </Typography.Title>
                  ) : (
                    <Popconfirm
                      title="Xác nhận thanh toán"
                      description="Bạn có chắc chắn muốn thanh toán?"
                      onConfirm={createOnePayment}
                      onCancel={() => null}
                      okText="Đồng ý"
                      cancelText="Huỷ"
                    >
                      <Button type="primary">Thanh toán cọc (50%)</Button>
                    </Popconfirm>
                  )}
                </Space>
              ) : (
                <Typography.Title
                  style={{ color: "red" }}
                  className="m-0"
                  level={5}
                >
                  Đã huỷ
                </Typography.Title>
              )}
            </div>

            {!booking?.review &&
              booking?.status === PARTYB_BOOKING_STATUS.COMPLETED && (
                <div className="h-50 mt-5 rounded-lg p-6 shadow">
                  <Typography.Title
                    style={{ color: "rgb(41 182 246 / var(--tw-bg-opacity))" }}
                    className="m-0"
                    level={4}
                  >
                    Viết đánh giá
                  </Typography.Title>
                  <Form
                    onFinish={async (values) => {
                      let result: undefined | boolean = false;
                      if (typeof booking?.id !== "undefined") {
                        result = await createOneReview({
                          id: booking?.id,
                          payload: {
                            reviewMessage: values?.reviewMessage,
                            rating: values?.rating,
                          },
                        });
                      }
                      return result;
                    }}
                  >
                    <Form.Item name={"reviewMessage"}>
                      <Input.TextArea placeholder="Viết đánh giá ..." />
                    </Form.Item>
                    <Form.Item name={"rating"}>
                      <Rate />
                    </Form.Item>
                    <Form.Item>
                      <Button htmlType="submit" type="primary">
                        Gửi đánh giá
                      </Button>
                    </Form.Item>
                  </Form>
                </div>
              )}
            <div className="h-50 mt-5 rounded-lg p-6 shadow">
              <Typography.Title
                style={{ color: "rgb(41 182 246 / var(--tw-bg-opacity))" }}
                className="m-0"
                level={4}
              >
                Thông tin liên hệ
              </Typography.Title>
              <Space direction="vertical">
                <div className="text-gray-600">Hotline: 0909900009</div>
                <div className="text-gray-600">Fanpage: lovekids@123</div>
                <div className="text-gray-600">Email: lovekids@gmail.com</div>
              </Space>
            </div>
          </div>
        </Flex>
      </div>
    </div>
  ) : (
    <Empty className="pt-10" />
  );
}

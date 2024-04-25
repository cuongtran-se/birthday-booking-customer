"use client";
import * as React from "react";
import {
  Avatar,
  Button,
  Card,
  DatePicker,
  DatePickerProps,
  Descriptions,
  DescriptionsProps,
  Divider,
  Empty,
  Flex,
  Form,
  Popconfirm,
  Row,
  Space,
  Spin,
  Typography,
  message,
} from "antd";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

import {
  CheckCircleFilled,
  CloseOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { Box, Container, Step, StepLabel, Stepper } from "@mui/material";
import {
  ModalForm,
  ProForm,
  ProFormDatePicker,
  ProFormDigit,
  ProFormText,
} from "@ant-design/pro-components";
import { createPartyBooking } from "@/lib/features/action/partyBooking.action";
import { ServiceDataResponse } from "@/dtos/response/service.response";
import { VenueDataResponse } from "@/dtos/response/venue.response";
import dayjs from "dayjs";
import { PackageDataResponse } from "@/dtos/response/package.response";
import { useRouter } from "next/navigation";
import AuthGuard from "@/app/AuthGuard";
import ServiceCards from "@/app/service-cards";
import { getAllRoomCheckSlot } from "@/lib/features/action/room.action";
import RoomCard from "@/components/booking/RoomCard";
import { BookingRequest } from "@/dtos/request/partyBooking.request";
import { SlotInRoomDataResponse } from "@/dtos/response/slot.response";
import {
  getAllPackageDecor,
  getAllPackageFood,
} from "@/lib/features/action/package.action";
import PackageDecorList from "@/components/booking/PackageDecorList";
import PackageFoodList from "@/components/booking/PackageFoodList";
import { getAllService } from "@/lib/features/action/service.action";
import { Item } from "@/components/booking/Item";
import PackageDetail from "@/components/booking/PackageDetail";
import UpgradeServiceDetail from "@/components/booking/UpgradeServiceDetail";
import { RoomDataResponse } from "@/dtos/response/room.response";

const { Title } = Typography;
const steps = [
  "Chọn ngày & địa điểm",
  "Diền thông tin",
  "Chọn gói dịch vụ Decor",
  "Chọn gói dịch vụ Food Menu",
  "Nâng cấp dịch vụ",
  "Xác nhận & đặt chỗ",
];
export interface DataUpgradeDisplay {
  service: ServiceDataResponse;
  count: number;
}
export interface BookingDataDisplay {
  kidName?: string;
  kidDOB?: string;
  email?: string;
  phone?: string;
  participantAmount?: number;
  packageDeco?: PackageDataResponse;
  packageFood?: PackageDataResponse;
  room?: RoomDataResponse;
  slotInRoom?: SlotInRoomDataResponse;
  dataUpgrade?: DataUpgradeDisplay[] | [];
  date?: string;
  venue?: VenueDataResponse;
  totalPriceService?: number;
  totalPriceBooking?: number;
}

const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(today.getDate() + 1);
export default function Booking({ params }: { params: any }) {
  const router = useRouter();
  const venueId = params?.venueId;
  const [bookingData, setBookingData] = React.useState<BookingRequest | null>(
    null,
  );
  const [bookingDataDisplay, setBookingDataDisplay] =
    React.useState<BookingDataDisplay | null>(null);
  const [services, setServices] = React.useState<
    { service: ServiceDataResponse; count: number }[] | []
  >([]);
  const [dataUpgrade, setDataUpgrade] = React.useState<
    { serviceId: number; count: number }[] | []
  >([]);
  const [venue, setVenue] = React.useState<VenueDataResponse | null>(null);
  const [venueList, setVenueList] = React.useState<VenueDataResponse[] | []>(
    [],
  );
  const [totalPriceSerivce, setTotalPriceService] = React.useState(0);
  const [totalPriceBooking, setTotalPriceBooking] = React.useState(0);

  const userInfo = useAppSelector((state) => state.auth.userInfo);

  const loadingCreatePartyBooking = useAppSelector(
    (state) => state.partyBookingReducer.loading,
  );

  // Dispatch API
  const dispatch = useAppDispatch();

  const [dateQuery, setDateQuery] = React.useState(dayjs(tomorrow).format('YYYY-MM-DD'));

  const roomList = useAppSelector((state) => state.roomReducer.roomList);
  const loading = useAppSelector((state) => state.roomReducer.loading);
  const packageDecorList = useAppSelector(
    (state) => state.packageReducer.packageDecorList,
  );
  const packageFoodList = useAppSelector(
    (state) => state.packageReducer.packageFoodList,
  );

  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    if (date !== null) {
      const partDate = date.format("YYYY-MM-DD");
      setDateQuery(partDate);
      setBookingData((prev) => ({
        ...prev,
        date: partDate,
      }));
      setBookingDataDisplay((prev) => ({
        ...prev,
        date: partDate,
      }));
    }
  };

  const fetchAllRoomCheckSlot = async () => {
    const res = await dispatch(
      getAllRoomCheckSlot({ date: dateQuery, venueId }),
    );
  };

  React.useEffect(() => {
    fetchAllRoomCheckSlot();
  }, [dateQuery, venueId]);

  React.useEffect(() => {
    setBookingData((prev) => ({
      ...prev,
      date: dateQuery,
    }));
    setBookingDataDisplay((prev) => ({
      ...prev,
      date: dateQuery,
    }));
  }, []);

  const fetchAllPackageDecor = async () => {
    const res = await dispatch(getAllPackageDecor(venueId));
  };

  const fetchAllPackageFood = async () => {
    const res = await dispatch(getAllPackageFood(venueId));
  };

  const fetchAllService = async () => {
    const res = await dispatch(getAllService(venueId));
  };

  React.useEffect(() => {
    fetchAllPackageDecor();
    fetchAllPackageFood();
    fetchAllService();
  }, []);

  const createOnePartyBooking = async () => {
    if (bookingData !== null) {
      const res = await dispatch(createPartyBooking(bookingData));
      if (res?.meta?.requestStatus === "fulfilled") {
        return true;
      }
      res?.payload.map((item: any) => {
        if (item === "Invalid email format") {
          message.error("Email sai định dạng!");
        }
      });
      return false;
    }
  };

  // Steps component
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());

  const isStepOptional = (step: number) => {
    return null;
  };

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleFinish = async () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    if (activeStep + 1 === 6) {
      const result = await createOnePartyBooking();
      if (result) {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
      }
      scrollToTop();
    }
  };
  const handleNext = async () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    switch (activeStep + 1) {
      case 1:
        scrollToTop();
        if (
          typeof bookingData?.date !== "undefined" &&
          typeof bookingData?.slotInRoomId !== "undefined"
        ) {
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
          setSkipped(newSkipped);
          // fetchAllThemeInVenue();
          scrollToTop();
        } else {
          message.error(
            "Vui lòng tích chọn đầy đủ thông tin trước khi đến bước tiếp theo!",
          );
        }

        break;
      case 2:
        scrollToTop();
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
        break;
      case 3:
        scrollToTop();
        if (typeof bookingData?.packageDecoId !== "undefined") {
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
          setSkipped(newSkipped);
          // fetchAllService();
          scrollToTop();
        } else {
          message.error(
            "Vui lòng tích chọn đầy đủ thông tin trước khi đến bước tiếp theo!",
          );
        }
        break;
      case 4:
        scrollToTop();
        if (typeof bookingData?.packageFoodId !== "undefined") {
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
          setSkipped(newSkipped);
          // fetchAllService();
          scrollToTop();
        } else {
          message.error(
            "Vui lòng tích chọn đầy đủ thông tin trước khi đến bước tiếp theo!",
          );
        }
        break;
      case 5:
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
        scrollToTop();
        if (typeof bookingData?.dataUpgrade === "undefined") {
          setBookingData((prev) => ({ ...prev, dataUpgrade: [] }));
          setBookingDataDisplay((prev) => ({ ...prev, dataUpgrade: [] }));
        }
        break;

      default:
        break;
    }
  };

  const handleBack = () => {
    scrollToTop();
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    // setActiveStep(0);
    router.push("/booking-history");
  };
  console.log(bookingData);
  console.log(bookingDataDisplay);

  function scrollToTop() {
    window.scrollTo(0, 0);

    return null;
  }

  const [form] = Form.useForm();
  const [form2] = Form.useForm();

  const items: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "Địa điểm",
      children: (
        <Space>
          <Typography>
            {bookingDataDisplay?.venue?.venueName || "venue name"}
          </Typography>
          {/* <Tooltip><a>{venue?.location || "location"}</a></Tooltip> */}
        </Space>
      ),
    },
    {
      key: "2",
      label: "Gói dịch vụ Trang trí",
      children: (
        <ModalForm
          title="Gói dịch vụ đang chọn"
          trigger={
            <Button type="primary">
              <EyeOutlined />
              Xem chi tiết
            </Button>
          }
        >
          <PackageDetail packageInVenue={bookingDataDisplay?.packageDeco} />
        </ModalForm>
      ),
    },
    {
      key: "3",
      label: "Gói dịch vụ Đồ ăn",
      children: (
        <ModalForm
          title="Gói dịch vụ đang chọn"
          trigger={
            <Button type="primary">
              <EyeOutlined />
              Xem chi tiết
            </Button>
          }
        >
          <PackageDetail packageInVenue={bookingDataDisplay?.packageFood} />
        </ModalForm>
      ),
    },
    {
      key: "6",
      label: "Dịch vụ nâng cấp",
      children: (
        <ModalForm
          title="Dịch vụ nâng cấp"
          trigger={
            <Button type="primary">
              <EyeOutlined />
              Xem chi tiết
            </Button>
          }
        >
          <UpgradeServiceDetail
            dataUpgrade={bookingDataDisplay?.dataUpgrade}
            totalPriceSerivce={bookingDataDisplay?.totalPriceService}
          />
        </ModalForm>
      ),
    },
    {
      key: "4",
      label: "Thời gian check-in",
      children: bookingDataDisplay?.slotInRoom?.slot?.timeStart,
    },
    {
      key: "5",
      label: "Thời gian check-out",
      children: bookingDataDisplay?.slotInRoom?.slot?.timeEnd,
    },
    {
      key: "7",
      label: "Số tiền hiện tại",
      children: bookingDataDisplay?.totalPriceBooking?.toLocaleString(),
    },
    {
      key: "8",
      label: "Chiếu khấu",
      children: (0).toLocaleString(),
    },
    {
      key: "9",
      label: "Tổng cộng",
      children: bookingDataDisplay?.totalPriceBooking?.toLocaleString(),
    },
    {
      key: "10",
      label: "Booking Info",
      span: 2,
      children: (
        <Space direction="vertical" size={"middle"} style={{ width: "100%" }}>
          <Item title="Tên người đặt:" description={userInfo?.data?.fullName} />
          <Item
            title="Email người đặt:"
            description={bookingDataDisplay?.email}
          />
          <Item
            title="Số điện thoại:"
            description={bookingDataDisplay?.phone}
          />
          <Item title="Tên của bé:" description={bookingDataDisplay?.kidName} />
          <Item
            title="Sinh nhật của bé:"
            description={bookingDataDisplay?.kidDOB}
          />
          <Item
            title="Số lượng người tham dự:"
            description={bookingDataDisplay?.participantAmount}
          />
        </Space>
      ),
    },
  ];


  const removeOneService = (id: number) => {
    const newArrayService = services.filter(item => item.service.id !== id)
    setServices(newArrayService);
    const newArrayDataUpgrade = dataUpgrade.filter(item => item.serviceId !== id);
    setDataUpgrade(newArrayDataUpgrade);
    
    const _totalPriceService: number = newArrayService.reduce((accumulator, current) => {
      return accumulator + current.service.pricing * current.count;
    }, 0);
    const _totalPriceBooking: number =
      _totalPriceService +
      Number(bookingDataDisplay?.packageDeco?.pricing) +
      Number(bookingDataDisplay?.packageFood?.pricing)*
      Number(bookingDataDisplay?.participantAmount) +
      Number(bookingDataDisplay?.room?.pricing);
      setTotalPriceService(_totalPriceService);

      setBookingData((prev) => ({
        ...prev,
        dataUpgrade: newArrayDataUpgrade,
        totalPriceService: _totalPriceService,
        totalPriceBooking: _totalPriceBooking,
      }));
      setBookingDataDisplay((prev) => ({
        ...prev,
        dataUpgrade: newArrayService,
        totalPriceService: _totalPriceService,
        totalPriceBooking: _totalPriceBooking,
      }));
    
  }

  return (
    <AuthGuard>
      <div className="container mx-auto mt-10">
        <Box sx={{ width: "100%" }}>
          <Typography.Title className="mb-5">
            Các bước tạo bữa tiệc
          </Typography.Title>
          <Stepper activeStep={activeStep}>
            {steps.map((label, index) => {
              const stepProps: { completed?: boolean } = {};
              const labelProps: {
                optional?: React.ReactNode;
              } = {};
              if (isStepOptional(index)) {
                labelProps.optional = <Typography>Optional</Typography>;
              }
              if (isStepSkipped(index)) {
                stepProps.completed = false;
              }
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Container
                maxWidth="md"
                className="mt-10"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <CheckCircleFilled style={{ color: "green", fontSize: 100 }} />
                <Typography.Title style={{ textAlign: "center" }} level={2}>
                  Đặt bữa tiệc thành công! Hãy kiểm tra thông tin đặt tiệc của
                  bạn ở mục Booking!
                </Typography.Title>
              </Container>

              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Box sx={{ flex: "1 1 auto" }} />
                <Button type="primary" onClick={handleReset}>
                  OK
                </Button>
              </Box>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {activeStep + 1 === 1 ? (
                <div className="container mx-auto">
                  <Typography.Title level={3}>Chọn một ngày</Typography.Title>
                  <Flex align="center" gap={20}>
                    <DatePicker
                      format="YYYY-MM-DD"
                      // disabledDate={disabledDate}
                      // disabledTime={disabledDateTime}
                      // showTime={{ defaultValue: dayjs("00:00:00", "HH:mm:ss") }}
                      // defaultValue={dayjs(dateQuery)}
                      value={dayjs(dateQuery)}
                      onChange={onChange}
                    />
                    <Flex gap={10}>
                      {/* <Typography.Title style={{margin: 0}} level={4}>
                        Ngày được chọn:{" "}
                      </Typography.Title> */}
                      <Typography.Title style={{ margin: 0 }} level={4}>
                        {bookingDataDisplay?.date}
                      </Typography.Title>
                    </Flex>
                  </Flex>

                  <Typography.Title level={3}>
                    Chọn phòng và khung giờ
                  </Typography.Title>
                  <Flex vertical>
                    <Spin spinning={loading} />
                    {roomList && roomList?.length > 0 ? (
                      roomList?.map((room, index: number) => (
                        <RoomCard
                          key={index}
                          room={room}
                          bookingData={bookingData}
                          setBookingData={setBookingData}
                          bookingDataDisplay={bookingDataDisplay}
                          setBookingDataDisplay={setBookingDataDisplay}
                        />
                      ))
                    ) : (
                      <Empty description="Không có dữ liệu" />
                    )}
                  </Flex>
                </div>
              ) : activeStep + 1 === 2 ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    // height: "100vh",
                  }}
                >
                  <ProForm
                    style={{
                      width: "auto",
                      margin: "auto",
                      padding: 40,
                    }}
                    onFinish={async ({
                      kidName,
                      kidDOB,
                      email,
                      phone,
                      participantAmount,
                      reservationAgent,
                    }: {
                      kidName: string;
                      kidDOB: string;
                      email: string;
                      phone: string;
                      reservationAgent: string;
                      participantAmount: number;
                    }) => {
                      console.log(kidName, kidDOB, email, phone);
                      setBookingData((prev) => ({
                        ...prev,
                        kidName,
                        kidDOB,
                        email,
                        phone,
                        reservationAgent,
                        participantAmount: Number(participantAmount),
                      }));
                      setBookingDataDisplay((prev) => ({
                        ...prev,
                        kidName,
                        kidDOB,
                        email,
                        phone,
                        reservationAgent,
                        participantAmount: Number(participantAmount),
                      }));
                      handleNext();
                    }}
                    form={form2}
                    submitter={{ render: false }}
                  >
                    <ProForm.Group>
                      <ProFormText
                        name={"kidName"}
                        label={"Tên của bé"}
                        width={"sm"}
                        placeholder={"Điền tên của bé"}
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng nhập trường này",
                          },
                        ]}
                        initialValue={
                          typeof bookingData?.kidName !== "undefined"
                            ? bookingData?.email
                            : ""
                        }
                      />
                      <ProFormDatePicker
                        name={"kidDOB"}
                        label={"Ngày sinh nhật của bé"}
                        width={"sm"}
                        placeholder={"Điền sinh nhật của bé"}
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng nhập trường này",
                          },
                        ]}
                        initialValue={
                          typeof bookingData?.kidDOB !== "undefined"
                            ? dayjs(bookingData?.kidDOB)
                            : null
                        }
                      />
                      <ProFormDigit
                        name={"participantAmount"}
                        label={"Số lượng người tham gia"}
                        width={"sm"}
                        placeholder={"Số lượng người tham gia"}
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng nhập trường này",
                          },
                          {
                            validator: async (_, value) => {
                              if (value < 1) {
                                throw new Error("Số lượng phải lớn hơn 1!");
                              }
                              if (
                                value >
                                Number(bookingDataDisplay?.room?.capacity)
                              ) {
                                throw new Error(
                                  `Số lượng người tham tối đa là ${bookingDataDisplay?.room?.capacity}!`,
                                );
                              }
                            },
                          },
                        ]}
                        initialValue={
                          typeof bookingData?.participantAmount !== "undefined"
                            ? bookingData?.participantAmount
                            : ""
                        }
                      />
                    </ProForm.Group>
                    <ProForm.Group>
                      <ProFormText
                        name={"reservationAgent"}
                        label={"Tên của bạn"}
                        width={"sm"}
                        placeholder={"Tên của bạn"}
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng nhập trường này",
                          },
                        ]}
                        initialValue={
                          typeof bookingData?.reservationAgent !== "undefined"
                            ? bookingData?.reservationAgent
                            : userInfo?.data?.fullName ?? ""
                        }
                      />
                      <ProFormText
                        name={"email"}
                        label={"Email của bạn"}
                        width={"sm"}
                        placeholder={"Email của bạn"}
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng nhập trường này",
                          },
                          {
                            type: "email",
                            message: "Email không hợp lệ",
                          },
                        ]}
                        initialValue={
                          typeof bookingData?.email !== "undefined"
                            ? bookingData?.email
                            : userInfo?.data?.email ?? ""
                        }
                      />
                      <ProFormText
                        name={"phone"}
                        label={"Số điện thoại của bạn"}
                        width={"sm"}
                        placeholder={"Số điện thoại của bạn"}
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng nhập trường này",
                          },
                          {
                            pattern: /^0[0-9]{9,10}$/,
                            message: "Số điện thoại không hợp lệ",
                          },
                        ]}
                        initialValue={
                          typeof bookingData?.phone !== "undefined"
                            ? bookingData?.phone
                            : userInfo?.data?.phone ?? ""
                        }
                      />
                    </ProForm.Group>
                  </ProForm>
                </div>
              ) : activeStep + 1 === 3 ? (
                <React.Fragment>
                  <Title level={3}>Chọn gói dịch vụ Decor</Title>
                  <div className="mt-10">
                    <PackageDecorList
                      bookingData={bookingData}
                      setBookingData={setBookingData}
                      bookingDataDisplay={bookingDataDisplay}
                      setBookingDataDisplay={setBookingDataDisplay}
                    />
                  </div>
                </React.Fragment>
              ) : activeStep + 1 === 4 ? (
                <React.Fragment>
                  <Title level={3}>Chọn gói dịch vụ Menu Food</Title>
                  <div className="mt-10">
                    <PackageFoodList
                      bookingData={bookingData}
                      setBookingData={setBookingData}
                      bookingDataDisplay={bookingDataDisplay}
                      setBookingDataDisplay={setBookingDataDisplay}
                    />
                  </div>
                </React.Fragment>
              ) : activeStep + 1 === 5 ? (
                <div className="mt-10 w-full">
                  <Title level={3}>Nâng cấp dịch vụ</Title>
                  <Flex gap={10} justify="space-between">
                    <Row style={{ width: 280 * 3 + 50 }} gutter={[16, 16]}>
                      <ServiceCards
                        // bookingData={bookingData}
                        setBookingData={setBookingData}
                        services={services}
                        setServices={setServices}
                        dataUpgrade={dataUpgrade}
                        setDataUpgrade={setDataUpgrade}
                        bookingDataDisplay={bookingDataDisplay}
                        setBookingDataDisplay={setBookingDataDisplay}
                        totalPriceSerivce={totalPriceSerivce}
                        setTotalPriceService={setTotalPriceService}
                        totalPriceBooking={totalPriceBooking}
                        setTotalPriceBooking={setTotalPriceBooking}
                        venueId={venueId}
                      />
                    </Row>
                    <Flex vertical gap={15}>
                      {services?.map((item, index) => {
                        return (
                          <Card key={index}>
                            <Flex gap={20}>
                              <Avatar
                                style={{ width: 50, height: 50 }}
                                src={item?.service?.serviceImgUrl}
                              />
                              <div>
                                <div>
                                  Tên dịch vụ:{" "}
                                  <strong>{item?.service?.serviceName}</strong>
                                </div>
                                <div>
                                  Số lượng: <strong>{item?.count}</strong>
                                </div>
                                <div>
                                  Giá:{" "}
                                  <strong>
                                    {(
                                      item?.service?.pricing * item?.count
                                    ).toLocaleString() + " VNĐ"}
                                  </strong>
                                </div>
                              </div>
                            </Flex>
                            <CloseOutlined
                              onClick={() => removeOneService(item?.service?.id)}
                              style={{
                                position: "absolute",
                                top: -10,
                                right: -10,
                                padding: 4,
                                backgroundColor: "red",
                                borderRadius: 100,
                                color: "white",
                              }}
                            />
                          </Card>
                        );
                      })}
                      {totalPriceSerivce > 0 && (
                        <React.Fragment>
                          {" "}
                          <Divider />
                          <Flex justify="space-between">
                            <div>Tổng cộng:</div>
                            <div>
                              <strong>
                                {totalPriceSerivce.toLocaleString() + "VNĐ"}
                              </strong>
                            </div>
                          </Flex>
                        </React.Fragment>
                      )}
                    </Flex>
                  </Flex>
                </div>
              ) : (
                <Descriptions
                  className="m-5 mt-10"
                  items={items}
                  layout="vertical"
                  bordered
                />
              )}

              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                >
                  Back
                </Button>
                <Box sx={{ flex: "1 1 auto" }} />
                {isStepOptional(activeStep) && (
                  <Button color="inherit" onClick={handleSkip}>
                    Skip
                  </Button>
                )}
                {activeStep === steps.length - 1 ? (
                  <Popconfirm
                    title="Xác nhận đặt tiệc"
                    description="Bạn có chắc chắn muốn đặt bữa tiệc này?"
                    onConfirm={handleFinish}
                    onOpenChange={() => console.log("open change")}
                    okText="Đồng ý"
                    cancelText="Huỷ"
                  >
                    <Button
                      loading={loadingCreatePartyBooking}
                      type="primary"
                      // onClick={
                      //   activeStep + 1 === 5 ? () => form2.submit() : handleNext
                      // }
                    >
                      Finish
                    </Button>
                  </Popconfirm>
                ) : (
                  <Button
                    loading={loadingCreatePartyBooking}
                    type="primary"
                    onClick={
                      activeStep + 1 === 2 ? () => form2.submit() : handleNext
                    }
                  >
                    Next
                  </Button>
                )}
              </Box>
            </React.Fragment>
          )}
        </Box>
      </div>
    </AuthGuard>
  );
}

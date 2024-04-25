// "use client";
// import * as React from "react";
// import {
//   Avatar,
//   Badge,
//   Button,
//   Card,
//   DatePicker,
//   DatePickerProps,
//   Descriptions,
//   DescriptionsProps,
//   Divider,
//   Flex,
//   Form,
//   Popconfirm,
//   Row,
//   Space,
//   Tooltip,
//   Typography,
//   message,
// } from "antd";
// import VenueList from "@/components/booking/VenueList";
// import PackageList from "@/components/booking/PackageList";
// import ThemeList from "@/components/booking/ThemeList";
// import AuthGuard from "../AuthGuard";
// import { useAppDispatch, useAppSelector } from "@/lib/hooks";
// import { getAllVenueCheckSlotByDate } from "@/lib/features/action/venue.action";
// import { BookingRequest, useBookingContext } from "@/context/BookingContext";
// import { CheckCircleFilled, EyeOutlined } from "@ant-design/icons";
// import { getAllService } from "@/lib/features/action/service.action";
// import ServiceCards from "../service-cards";
// import { Box, Container, Step, StepLabel, Stepper } from "@mui/material";
// import { getAllThemeInVenueByVenueId } from "@/lib/features/action/theme.action";
// import { getAllPackageInVenueByVenueId } from "@/lib/features/action/package.action";
// import {
//   ModalForm,
//   ProForm,
//   ProFormDatePicker,
//   ProFormText,
// } from "@ant-design/pro-components";
// import { createPartyBooking } from "@/lib/features/action/partyBooking.action";
// import { ServiceDataResponse } from "@/dtos/response/service.response";
// import { VenueDataResponse } from "@/dtos/response/venue.response";
// import dayjs from "dayjs";
// import { ThemeInVenueDataResponse } from "@/dtos/response/theme.response";
// import { PackageInVenueDataResponse } from "@/dtos/response/package.response";
// import { SlotInVenueDataResponse } from "@/dtos/response/slot.response";
// import ThemeInVenueDetail from "@/components/booking/ThemeInVenueDetail";
// import PackageInVenueDetail from "@/components/booking/PackageInVenueDetail";
// import UpgradeServiceDetail from "@/components/booking/UpgradeServiceDetail";
// import { useRouter } from "next/navigation";
// import { Item } from "@/components/booking/Item";

// const { Title } = Typography;
// const steps = [
//   "Chọn ngày & địa điểm",
//   "Lựa chọn chủ đề",
//   "Lựa chọn gói dịch vụ",
//   "Nâng cấp dịch vụ",
//   "Điền thông tin",
//   "Xác nhận & đặt chỗ",
// ];
// export interface DataUpgradeDisplay {
//   service: ServiceDataResponse;
//   count: number;
// }
// export interface BookingDataDisplay {
//   kidName?: string;
//   kidDOB?: string;
//   email?: string;
//   phone?: string;
//   themeInVenue?: ThemeInVenueDataResponse;
//   packageInVenue?: PackageInVenueDataResponse;
//   slotInVenue?: SlotInVenueDataResponse;
//   dataUpgrade?: DataUpgradeDisplay[] | [];
//   date?: string;
//   totalPriceService?: number;
//   totalPriceBooking?: number;
// }

// const today = new Date();
// const tomorrow = new Date(today);
// tomorrow.setDate(today.getDate() + 1);
// export default function Booking() {
//   const router = useRouter();
//   const [bookingData, setBookingData] = React.useState<BookingRequest | null>(
//     null,
//   );
//   const [bookingDataDisplay, setBookingDataDisplay] =
//     React.useState<BookingDataDisplay | null>(null);
//   const [services, setServices] = React.useState<
//     { service: ServiceDataResponse; count: number }[] | []
//   >([]);
//   const [dataUpgrade, setDataUpgrade] = React.useState<
//     { serviceId: number; count: number }[] | []
//   >([]);
//   const [venue, setVenue] = React.useState<VenueDataResponse | null>(null);
//   const [dateQuery, setDateQuery] = React.useState<string>(
//     dayjs(tomorrow).format("YYYY-MM-DDTHH:mm:ss"),
//   );
//   const [venueList, setVenueList] = React.useState<VenueDataResponse[] | []>(
//     [],
//   );
//   const [totalPriceSerivce, setTotalPriceService] = React.useState(0);
//   const [totalPriceBooking, setTotalPriceBooking] = React.useState(0);

//   const userInfo = useAppSelector((state) => state.auth.userInfo);

//   const loadingCreatePartyBooking = useAppSelector(
//     (state) => state.partyBookingReducer.loading,
//   );

//   const onChange: DatePickerProps["onChange"] = (date, dateString) => {
//     if (date !== null) {
//       const partDate = date.format("YYYY-MM-DD");
//       setDateQuery(date.format("YYYY-MM-DDTHH:mm:ss"));
//       setBookingData((prev) => ({
//         ...prev,
//         date: partDate,
//       }));
//       setBookingDataDisplay((prev) => ({
//         ...prev,
//         date: partDate,
//       }));
//     }
//   };

//   // Dispatch API
//   const dispatch = useAppDispatch();

//   const fetchVenueCheckSlotByDate = async () => {
//     await dispatch(getAllVenueCheckSlotByDate(dateQuery)).then((res: any) => {
//       if (res?.meta?.requestStatus === "fulfilled") {
//         setVenueList(res?.payload?.data);
//       } else {
//         message.error(
//           "Chỉ được đặt lịch trong vòng 6 tiếng kể từ 00:00:00 của ngày chọn",
//         );
//         setVenueList([]);
//       }
//     });
//   };
//   console.log("venueList", JSON.stringify(venueList, null, 2));
//   const fetchAllService = async () => {
//     await dispatch(getAllService());
//   };

//   // ** Hook
//   React.useEffect(() => {
//     fetchVenueCheckSlotByDate();
//     setBookingData((prev) => ({
//       ...prev,
//       date: dateQuery,
//     }));
//     setBookingDataDisplay((prev) => ({
//       ...prev,
//       date: dateQuery,
//     }));
//   }, [dateQuery]);

//   console.log(bookingData);

//   const fetchAllThemeInVenue = async () => {
//     if (venue?.id !== undefined) {
//       await dispatch(getAllThemeInVenueByVenueId(venue?.id)).then((res) => {
//         console.log(JSON.stringify(res, null, 2));
//       });
//     }
//   };
//   const fetchAllPackageInVenue = async () => {
//     if (venue?.id !== undefined) {
//       await dispatch(getAllPackageInVenueByVenueId(venue?.id)).then((res) => {
//         console.log(JSON.stringify(res, null, 2));
//       });
//     }
//   };

//   const createOnePartyBooking = async () => {
//     if (bookingData !== null) {
//       const res = await dispatch(createPartyBooking(bookingData));
//       if (res?.meta?.requestStatus === "fulfilled") {
//         return true;
//       }
//       res?.payload.map((item: any) => {
//         if (item === "Invalid email format") {
//           message.error("Email sai định dạng!");
//         }
//       });
//       return false;
//     }
//   };

//   // Steps component
//   const [activeStep, setActiveStep] = React.useState(0);
//   const [skipped, setSkipped] = React.useState(new Set<number>());

//   const isStepOptional = (step: number) => {
//     return null;
//   };

//   const isStepSkipped = (step: number) => {
//     return skipped.has(step);
//   };

//   const handleFinish = async () => {
//     let newSkipped = skipped;
//     if (isStepSkipped(activeStep)) {
//       newSkipped = new Set(newSkipped.values());
//       newSkipped.delete(activeStep);
//     }

//     if (activeStep + 1 === 6) {
//       const result = await createOnePartyBooking();
//       if (result) {
//         setActiveStep((prevActiveStep) => prevActiveStep + 1);
//         setSkipped(newSkipped);
//       }
//       scrollToTop();
//     }
//   };
//   const handleNext = async () => {
//     let newSkipped = skipped;
//     if (isStepSkipped(activeStep)) {
//       newSkipped = new Set(newSkipped.values());
//       newSkipped.delete(activeStep);
//     }

//     switch (activeStep + 1) {
//       case 1:
//         scrollToTop();
//         if (
//           typeof bookingData?.date !== "undefined" &&
//           typeof bookingData?.slotInVenueId !== "undefined"
//         ) {
//           setActiveStep((prevActiveStep) => prevActiveStep + 1);
//           setSkipped(newSkipped);
//           fetchAllThemeInVenue();
//           scrollToTop();
//         } else {
//           message.error(
//             "Vui lòng tích chọn đầy đủ thông tin trước khi đến bước tiếp theo!",
//           );
//         }

//         break;
//       case 2:
//         scrollToTop();
//         if (typeof bookingData?.themeInVenueId !== "undefined") {
//           setActiveStep((prevActiveStep) => prevActiveStep + 1);
//           setSkipped(newSkipped);
//           fetchAllPackageInVenue();
//           scrollToTop();
//         } else {
//           message.error(
//             "Vui lòng tích chọn đầy đủ thông tin trước khi đến bước tiếp theo!",
//           );
//         }
//         break;
//       case 3:
//         scrollToTop();
//         if (typeof bookingData?.packageInVenueId !== "undefined") {
//           setActiveStep((prevActiveStep) => prevActiveStep + 1);
//           setSkipped(newSkipped);
//           fetchAllService();
//           scrollToTop();
//         } else {
//           message.error(
//             "Vui lòng tích chọn đầy đủ thông tin trước khi đến bước tiếp theo!",
//           );
//         }
//         break;
//       case 4:
//         setActiveStep((prevActiveStep) => prevActiveStep + 1);
//         setSkipped(newSkipped);
//         scrollToTop();
//         if (typeof bookingData?.dataUpgrade === "undefined") {
//           setBookingData((prev) => ({ ...prev, dataUpgrade: [] }));
//           setBookingDataDisplay((prev) => ({ ...prev, dataUpgrade: [] }));
//         }
//         break;
//       case 5:
//         setActiveStep((prevActiveStep) => prevActiveStep + 1);
//         setSkipped(newSkipped);
//         scrollToTop();

//         break;

//       default:
//         break;
//     }
//   };

//   const handleBack = () => {
//     scrollToTop();
//     setActiveStep((prevActiveStep) => prevActiveStep - 1);
//   };

//   const handleSkip = () => {
//     if (!isStepOptional(activeStep)) {
//       // You probably want to guard against something like this,
//       // it should never occur unless someone's actively trying to break something.
//       throw new Error("You can't skip a step that isn't optional.");
//     }

//     setActiveStep((prevActiveStep) => prevActiveStep + 1);
//     setSkipped((prevSkipped) => {
//       const newSkipped = new Set(prevSkipped.values());
//       newSkipped.add(activeStep);
//       return newSkipped;
//     });
//   };

//   const handleReset = () => {
//     // setActiveStep(0);
//     router.push("/booking-history");
//   };
//   console.log(bookingData);
//   console.log(bookingDataDisplay);

//   function scrollToTop() {
//     window.scrollTo(0, 0);

//     return null;
//   }

//   const [form] = Form.useForm();
//   const [form2] = Form.useForm();

//   const items: DescriptionsProps["items"] = [
//     {
//       key: "1",
//       label: "Địa điểm",
//       children: (
//         <Space>
//           <Typography>{venue?.venueName || "venue name"}</Typography>
//           <Tooltip>
//             <a>{venue?.location || "location"}</a>
//           </Tooltip>
//         </Space>
//       ),
//     },
//     {
//       key: "2",
//       label: "Chủ đề",
//       children: (
//         <ModalForm
//           title="Chủ đề đã chọn"
//           trigger={
//             <Button type="primary">
//               <EyeOutlined />
//               Xem chi tiết
//             </Button>
//           }
//         >
//           <ThemeInVenueDetail themeInVenue={bookingDataDisplay?.themeInVenue} />
//         </ModalForm>
//       ),
//     },
//     {
//       key: "3",
//       label: "Gói dịch vụ",
//       children: (
//         <ModalForm
//           title="Gói dịch vụ đã chọn"
//           trigger={
//             <Button type="primary">
//               <EyeOutlined />
//               Xem chi tiết
//             </Button>
//           }
//         >
//           <PackageInVenueDetail
//             packageInVenue={bookingDataDisplay?.packageInVenue}
//           />
//         </ModalForm>
//       ),
//     },
//     {
//       key: "6",
//       label: "Dịch vụ nâng cấp",

//       children: (
//         <ModalForm
//           title="Dịch vụ nâng cấp"
//           trigger={
//             <Button type="primary">
//               <EyeOutlined />
//               Xem chi tiết
//             </Button>
//           }
//         >
//           <UpgradeServiceDetail
//             dataUpgrade={bookingDataDisplay?.dataUpgrade}
//             totalPriceSerivce={bookingDataDisplay?.totalPriceService}
//           />
//         </ModalForm>
//       ),
//     },
//     {
//       key: "4",
//       label: "Thời gian check-in",
//       children: bookingDataDisplay?.slotInVenue?.slot?.timeStart,
//     },
//     {
//       key: "5",
//       label: "Thời gian check-out",

//       children: bookingDataDisplay?.slotInVenue?.slot?.timeEnd,
//     },
//     {
//       key: "7",
//       label: "Số tiền hiện tại",
//       children: bookingDataDisplay?.totalPriceBooking?.toLocaleString(),
//     },
//     {
//       key: "8",
//       label: "Chiếu khấu",
//       children: (0).toLocaleString(),
//     },
//     {
//       key: "9",
//       label: "Tổng cộng",
//       children: bookingDataDisplay?.totalPriceBooking?.toLocaleString(),
//     },
//     {
//       key: "10",
//       label: "Booking Info",
//       span: 1,
//       children: (
//         <Space direction="vertical" size={"middle"}>
//           <Item title="Tên người đặt:" description={userInfo?.data?.fullName} />
//           <Item
//             title="Email người đặt:"
//             description={bookingDataDisplay?.email}
//           />
//           <Item
//             title="Số điện thoại:"
//             description={bookingDataDisplay?.phone}
//           />
//           <Item title="Tên của bé:" description={bookingDataDisplay?.kidName} />
//           <Item
//             title="Sinh nhật của bé:"
//             description={bookingDataDisplay?.kidDOB}
//           />
//         </Space>
//       ),
//     },
//   ];

//   return (
//     <AuthGuard>
//       <div className="container mx-auto mt-10">
//         <Box sx={{ width: "100%" }}>
//           <Typography.Title className="mb-5">
//             Các bước tạo bữa tiệc
//           </Typography.Title>
//           <Stepper activeStep={activeStep}>
//             {steps.map((label, index) => {
//               const stepProps: { completed?: boolean } = {};
//               const labelProps: {
//                 optional?: React.ReactNode;
//               } = {};
//               if (isStepOptional(index)) {
//                 labelProps.optional = <Typography>Optional</Typography>;
//               }
//               if (isStepSkipped(index)) {
//                 stepProps.completed = false;
//               }
//               return (
//                 <Step key={label} {...stepProps}>
//                   <StepLabel {...labelProps}>{label}</StepLabel>
//                 </Step>
//               );
//             })}
//           </Stepper>
//           {activeStep === steps.length ? (
//             <React.Fragment>
//               <Container
//                 maxWidth="md"
//                 className="mt-10"
//                 style={{
//                   display: "flex",
//                   flexDirection: "column",
//                   alignItems: "center",
//                 }}
//               >
//                 <CheckCircleFilled style={{ color: "green", fontSize: 100 }} />
//                 <Typography.Title style={{ textAlign: "center" }} level={2}>
//                   Đặt bữa tiệc thành công! Hãy kiểm tra thông tin đặt tiệc của
//                   bạn ở mục Booking!
//                 </Typography.Title>
//               </Container>

//               <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
//                 <Box sx={{ flex: "1 1 auto" }} />
//                 <Button type="primary" onClick={handleReset}>
//                   OK
//                 </Button>
//               </Box>
//             </React.Fragment>
//           ) : (
//             <React.Fragment>
//               {activeStep + 1 === 1 ? (
//                 <>
//                   <Title level={3}>Chọn một ngày</Title>
//                   <DatePicker
//                     format="YYYY-MM-DD"
//                     // disabledDate={disabledDate}
//                     // disabledTime={disabledDateTime}
//                     // showTime={{ defaultValue: dayjs("00:00:00", "HH:mm:ss") }}
//                     // defaultValue={dayjs(dateQuery)}
//                     value={dayjs(dateQuery)}
//                     onChange={onChange}
//                   />

//                   <div>
//                     <Title level={3}>Lựa chọn địa điểm và khung giờ</Title>
//                     <div className="mt-0">
//                       <VenueList
//                         venueList={venueList}
//                         bookingData={bookingData}
//                         setBookingData={setBookingData}
//                         setVenue={setVenue}
//                         bookingDataDisplay={bookingDataDisplay}
//                         setBookingDataDisplay={setBookingDataDisplay}
//                       />
//                     </div>
//                   </div>
//                 </>
//               ) : activeStep + 1 === 2 ? (
//                 <React.Fragment>
//                   <Title level={3}>Chọn chủ đề</Title>
//                   <div className="mt-10">
//                     <ThemeList
//                       bookingData={bookingData}
//                       setBookingData={setBookingData}
//                       bookingDataDisplay={bookingDataDisplay}
//                       setBookingDataDisplay={setBookingDataDisplay}
//                     />
//                   </div>
//                 </React.Fragment>
//               ) : activeStep + 1 === 3 ? (
//                 <React.Fragment>
//                   <Title level={3}>Chọn gói dịch vụ</Title>
//                   <div className="mt-10">
//                     <PackageList
//                       bookingData={bookingData}
//                       setBookingData={setBookingData}
//                       bookingDataDisplay={bookingDataDisplay}
//                       setBookingDataDisplay={setBookingDataDisplay}
//                     />
//                   </div>
//                 </React.Fragment>
//               ) : activeStep + 1 === 4 ? (
//                 <div className="mt-10 w-full">
//                   <Title level={3}>Nâng cấp dịch vụ</Title>
//                   <Flex gap={10} justify="space-between">
//                     <Row style={{ width: 280 * 3 + 50 }} gutter={[16, 16]}>
//                       <ServiceCards
//                         // bookingData={bookingData}
//                         setBookingData={setBookingData}
//                         services={services}
//                         setServices={setServices}
//                         dataUpgrade={dataUpgrade}
//                         setDataUpgrade={setDataUpgrade}
//                         bookingDataDisplay={bookingDataDisplay}
//                         setBookingDataDisplay={setBookingDataDisplay}
//                         totalPriceSerivce={totalPriceSerivce}
//                         setTotalPriceService={setTotalPriceService}
//                         totalPriceBooking={totalPriceBooking}
//                         setTotalPriceBooking={setTotalPriceBooking}
//                       />
//                     </Row>
//                     <Flex vertical gap={15}>
//                       {services.map((item, index) => {
//                         return (
//                           <Card key={index}>
//                             <Flex gap={20}>
//                               <Avatar
//                                 style={{ width: 50, height: 50 }}
//                                 src={item?.service?.serviceImgUrl}
//                               />
//                               <div>
//                                 <div>
//                                   Tên dịch vụ:{" "}
//                                   <strong>{item?.service?.serviceName}</strong>
//                                 </div>
//                                 <div>
//                                   Số lượng: <strong>{item?.count}</strong>
//                                 </div>
//                                 <div>
//                                   Giá:{" "}
//                                   <strong>
//                                     {(
//                                       item?.service?.pricing * item?.count
//                                     ).toLocaleString() + " VNĐ"}
//                                   </strong>
//                                 </div>
//                               </div>
//                             </Flex>
//                           </Card>
//                         );
//                       })}
//                       {totalPriceSerivce > 0 && (
//                         <React.Fragment>
//                           {" "}
//                           <Divider />
//                           <Flex justify="space-between">
//                             <div>Tổng cộng:</div>
//                             <div>
//                               <strong>
//                                 {totalPriceSerivce.toLocaleString() + "VNĐ"}
//                               </strong>
//                             </div>
//                           </Flex>
//                         </React.Fragment>
//                       )}
//                     </Flex>
//                   </Flex>
//                 </div>
//               ) : activeStep + 1 === 5 ? (
//                 <div
//                   style={{
//                     display: "flex",
//                     justifyContent: "center",
//                     alignItems: "center",
//                     // height: "100vh",
//                   }}
//                 >
//                   <ProForm
//                     style={{
//                       width: "auto",
//                       margin: "auto",
//                       padding: 40,
//                     }}
//                     onFinish={async ({
//                       kidName,
//                       kidDOB,
//                       email,
//                       phone,
//                     }: {
//                       kidName: string;
//                       kidDOB: string;
//                       email: string;
//                       phone: string;
//                     }) => {
//                       console.log(kidName, kidDOB, email, phone);
//                       setBookingData((prev) => ({
//                         ...prev,
//                         kidName,
//                         kidDOB,
//                         email,
//                         phone,
//                       }));
//                       setBookingDataDisplay((prev) => ({
//                         ...prev,
//                         kidName,
//                         kidDOB,
//                         email,
//                         phone,
//                       }));
//                       handleNext();
//                     }}
//                     form={form2}
//                     submitter={{ render: false }}
//                   >
//                     <ProForm.Group>
//                       <ProFormText
//                         name={"kidName"}
//                         label={"Tên của bé"}
//                         width={"sm"}
//                         placeholder={"Điền tên của bé"}
//                         rules={[
//                           {
//                             required: true,
//                             message: "Vui lòng nhập trường này",
//                           },
//                         ]}
//                         initialValue={
//                           typeof bookingData?.kidName !== "undefined"
//                             ? bookingData?.email
//                             : ""
//                         }
//                       />
//                       <ProFormDatePicker
//                         name={"kidDOB"}
//                         label={"Ngày sinh nhật của bé"}
//                         width={"sm"}
//                         placeholder={"Điền sinh nhật của bé"}
//                         rules={[
//                           {
//                             required: true,
//                             message: "Vui lòng nhập trường này",
//                           },
//                         ]}
//                         initialValue={
//                           typeof bookingData?.kidDOB !== "undefined"
//                             ? dayjs(bookingData?.kidDOB)
//                             : null
//                         }
//                       />
//                     </ProForm.Group>
//                     <ProForm.Group>
//                       <ProFormText
//                         name={"email"}
//                         label={"Email của bạn"}
//                         width={"sm"}
//                         placeholder={"Email của bạn"}
//                         rules={[
//                           {
//                             required: true,
//                             message: "Vui lòng nhập trường này",
//                           },
//                           {
//                             type: "email",
//                             message: "Email không hợp lệ",
//                           },
//                         ]}
//                         initialValue={
//                           typeof bookingData?.email !== "undefined"
//                             ? bookingData?.email
//                             : ""
//                         }
//                       />
//                       <ProFormText
//                         name={"phone"}
//                         label={"Số điện thoại của bạn"}
//                         width={"sm"}
//                         placeholder={"Số điện thoại của bạn"}
//                         rules={[
//                           {
//                             required: true,
//                             message: "Vui lòng nhập trường này",
//                           },
//                           {
//                             pattern: /^0[0-9]{9,10}$/,
//                             message: "Số điện thoại không hợp lệ",
//                           },
//                         ]}
//                         initialValue={
//                           typeof bookingData?.phone !== "undefined"
//                             ? bookingData?.phone
//                             : ""
//                         }
//                       />
//                     </ProForm.Group>
//                   </ProForm>
//                 </div>
//               ) : (
//                 <Descriptions
//                   className="m-5 mt-10"
//                   items={items}
//                   layout="vertical"
//                   bordered
//                 />
//               )}

//               <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
//                 <Button
//                   color="inherit"
//                   disabled={activeStep === 0}
//                   onClick={handleBack}
//                 >
//                   Back
//                 </Button>
//                 <Box sx={{ flex: "1 1 auto" }} />
//                 {isStepOptional(activeStep) && (
//                   <Button color="inherit" onClick={handleSkip}>
//                     Skip
//                   </Button>
//                 )}
//                 {activeStep === steps.length - 1 ? (
//                   <Popconfirm
//                     title="Xác nhận đặt tiệc"
//                     description="Bạn có chắc chắn muốn đặt bữa tiệc này?"
//                     onConfirm={handleFinish}
//                     onOpenChange={() => console.log("open change")}
//                     okText="Đồng ý"
//                     cancelText="Huỷ"
//                   >
//                     <Button
//                       loading={loadingCreatePartyBooking}
//                       type="primary"
//                       // onClick={
//                       //   activeStep + 1 === 5 ? () => form2.submit() : handleNext
//                       // }
//                     >
//                       Finish
//                     </Button>
//                   </Popconfirm>
//                 ) : (
//                   <Button
//                     loading={loadingCreatePartyBooking}
//                     type="primary"
//                     onClick={
//                       activeStep + 1 === 5 ? () => form2.submit() : handleNext
//                     }
//                   >
//                     Next
//                   </Button>
//                 )}
//               </Box>
//             </React.Fragment>
//           )}
//         </Box>
//       </div>
//     </AuthGuard>
//   );
// }
import React from "react";

const Page = () => {
  return <div></div>;
};

export default Page;

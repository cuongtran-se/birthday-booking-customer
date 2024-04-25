import { ServiceDataResponse } from "@/dtos/response/service.response";
import { getServiceById } from "@/lib/features/action/service.action";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { PlusOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  Card,
  Col,
  Flex,
  InputNumber,
  Modal,
  Skeleton,
  Typography,
  message,
} from "antd";
import Meta from "antd/es/card/Meta";
import { useEffect, useState } from "react";
import { BookingDataDisplay } from "./booking/[venueId]/page";
import { BookingRequest } from "@/dtos/request/partyBooking.request";
import React from "react";

const ServiceCards = ({
  venueId,
  setBookingData,
  services,
  setServices,
  dataUpgrade,
  setDataUpgrade,
  bookingDataDisplay,
  setBookingDataDisplay,
  totalPriceSerivce,
  setTotalPriceService,
  totalPriceBooking,
  setTotalPriceBooking,
}: {
  venueId: number;
  setBookingData: React.Dispatch<React.SetStateAction<BookingRequest | null>>;
  services: { service: ServiceDataResponse; count: number }[] | [];
  setServices: React.Dispatch<
    React.SetStateAction<
      | []
      | {
          service: ServiceDataResponse;
          count: number;
        }[]
    >
  >;
  dataUpgrade:
    | []
    | {
        serviceId: number;
        count: number;
      }[];
  setDataUpgrade: React.Dispatch<
    React.SetStateAction<
      | {
          serviceId: number;
          count: number;
        }[]
      | []
    >
  >;
  bookingDataDisplay: BookingDataDisplay | null;
  setBookingDataDisplay: React.Dispatch<
    React.SetStateAction<BookingDataDisplay | null>
  >;
  totalPriceSerivce: number;
  setTotalPriceService: React.Dispatch<React.SetStateAction<number>>;
  totalPriceBooking: number;
  setTotalPriceBooking: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const [open, setOpen] = useState(false);
  const [service, setService] = useState<ServiceDataResponse | null>(null);
  const [count, setCount] = useState<number | null>(1);
  // const {
  //   bookingData,
  //   setBookingData,
  //   services,
  //   setServices,
  //   dataUpgrade,
  //   setDataUpgrade,
  // } = useBookingContext();

  const serviceList = useAppSelector(
    (state) => state.serviceReducer.serviceList,
  );

  // Hàm xử lý khi bấm nút OK
  const handleOk = (item: ServiceDataResponse | null, count: number | null) => {
    // Kiểm tra xem dịch vụ có tồn tại trong mảng dataUpgrade không
    if (item !== null && count !== null) {
      if (count > 0) {
        const indexx = dataUpgrade.findIndex(
          (service) => service.serviceId === item.id,
        );
        console.log(indexx);
        if (indexx !== -1) {
          // Nếu tồn tại, cập nhật lại count
          const updatedServices = [...dataUpgrade];
          updatedServices[indexx] = {
            serviceId: updatedServices[indexx].serviceId,
            count,
          };

          setDataUpgrade(updatedServices);
          setBookingData((prev) => ({ ...prev, dataUpgrade: updatedServices }));
        } else {
          setDataUpgrade([...dataUpgrade, { serviceId: item?.id, count }]);
          setBookingData((prev) => ({
            ...prev,
            dataUpgrade: [...dataUpgrade, { serviceId: item?.id, count }],
          }));
        }

        const index = services.findIndex(
          (service) => service.service.id === item.id,
        );
        console.log(index);
        if (index !== -1) {
          // Nếu tồn tại, cập nhật lại count
          const updatedServicesDisplay = [...services];
          updatedServicesDisplay[index] = {
            ...updatedServicesDisplay[index],
            count,
          };

          setServices(updatedServicesDisplay);
          const _totalPriceService: number = updatedServicesDisplay.reduce(
            (accumulator, current) => {
              return accumulator + current.service.pricing * current.count;
            },
            0,
          );
          const _totalPriceBooking: number =
            _totalPriceService +
            Number(bookingDataDisplay?.packageDeco?.pricing) +
            Number(bookingDataDisplay?.packageFood?.pricing)*
            Number(bookingDataDisplay?.participantAmount) +
            Number(bookingDataDisplay?.room?.pricing);
          setTotalPriceService(_totalPriceService);
          setBookingDataDisplay((prev) => ({
            ...prev,
            dataUpgrade: updatedServicesDisplay,
            totalPriceService: _totalPriceService,
            totalPriceBooking: _totalPriceBooking,
          }));
        } else {
          setServices([...services, { service: item, count }]);
          const _totalPriceService: number = [
            ...services,
            { service: item, count },
          ].reduce((accumulator, current) => {
            return accumulator + current.service.pricing * current.count;
          }, 0);
          const _totalPriceBooking: number =
            _totalPriceService +
            Number(bookingDataDisplay?.packageDeco?.pricing) +
            Number(bookingDataDisplay?.packageFood?.pricing)*
            Number(bookingDataDisplay?.participantAmount) +
            Number(bookingDataDisplay?.room?.pricing);
          setTotalPriceService(_totalPriceService);

          setTotalPriceService(_totalPriceService);
          setBookingDataDisplay((prev) => ({
            ...prev,
            dataUpgrade: [...services, { service: item, count }],
            totalPriceService: _totalPriceService,
            totalPriceBooking: _totalPriceBooking,
          }));
        }
      } else {
        message.error("Vui lòng nhập count lớn hơn 0!");
      }
    }

    setOpen(false);
  };

  const removeOneService = (id: number) => {
    const newArrayService = services.filter((item) => item.service.id !== id);
    setServices(newArrayService);
    const newArrayDataUpgrade = dataUpgrade.filter(
      (item) => item.serviceId !== id,
    );
    setDataUpgrade(newArrayDataUpgrade);

    const _totalPriceService: number = newArrayService.reduce(
      (accumulator, current) => {
        return accumulator + current.service.pricing * current.count;
      },
      0,
    );
    const _totalPriceBooking: number =
      _totalPriceService +
      Number(bookingDataDisplay?.packageDeco?.pricing) +
      Number(bookingDataDisplay?.packageFood?.pricing) *
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
  };

  console.log("Upgrade:", dataUpgrade);
  console.log("Services:", services);
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.serviceReducer.loading);
  const serviceById = useAppSelector(
    (state) => state.serviceReducer.serviceByIdList,
  );
  const openAndServiceOptionById = async (id: number) => {
    await dispatch(getServiceById({ venueId, serviceId: id }));
  };

  useEffect(() => {
    if (service !== null) {
      openAndServiceOptionById(service?.id);
    }
  }, [service]);

  return (
    <React.Fragment>
      <Modal
        open={open}
        onCancel={() => setOpen(false)}
        onOk={() => handleOk(service, count)}
      >
        {!loading ? (
          <div>
            <div className="mt-5 bg-cyan-200 p-1">
              <Avatar
                style={{ width: 280, height: 300, borderRadius: 0 }}
                alt="example"
                src={serviceById?.serviceImgUrl || ""}
              />
            </div>

            <Flex className="mt-5 items-center" gap={10}>
              <Typography>Số lượng: </Typography>
              <InputNumber
                size="large"
                defaultValue={1}
                value={count}
                onChange={(e) => setCount(e)}
              />
            </Flex>
          </div>
        ) : (
          <Skeleton active style={{ height: 350 }} />
        )}
      </Modal>
      {serviceList.map((item, index) => (
        <Col key={index} span={8}>
          <Card
            hoverable
            style={{ width: 280, alignItems: "center" }}
            cover={
              <Avatar
                style={{ width: 280, height: 300, borderRadius: 0 }}
                alt="example"
                src={item?.serviceImgUrl || ""}
              />
            }
          >
            <Meta
              title={item?.serviceName || ""}
              description={`Đơn giá: ${item?.pricing?.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}`}
            />

            <Button
              onClick={() => {
                setService(item);
                setOpen(true);
              }}
              type="default"
              className="mt-5 bg-blue-gray-500"
              size="large"
              style={{
                fontWeight: 700,
                backgroundColor: "orange",
                color: "white",
                alignSelf: "center",
              }}
            >
              Thêm{" "}
              <PlusOutlined
                color="white"
                style={{
                  marginLeft: 8,
                  fontWeight: 700,
                  color: "white",
                }}
              />
            </Button>
          </Card>
        </Col>
      ))}
    </React.Fragment>
  );
};

export default ServiceCards;

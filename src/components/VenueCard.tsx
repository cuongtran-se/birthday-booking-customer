// import "./VenueCard.css";
import { blue } from "@ant-design/colors";
import {
  Avatar,
  Button,
  Card,
  Carousel,
  Flex,
  Popover,
  Rate,
  Space,
  Tag,
  Typography,
} from "antd";
import Meta from "antd/es/card/Meta";
import {
  ClockCircleOutlined,
  EyeOutlined,
  PlusCircleOutlined,
  StarFilled,
} from "@ant-design/icons";
import { VenueDataResponse } from "@/dtos/response/venue.response";
import Link from "next/link";
import { ModalForm } from "@ant-design/pro-components";
import PackageDetail from "./booking/PackageDetail";
import { useRouter } from "next/navigation";
import PackageDecorList from "./venue/packageDecorList";
import PackageFoodList from "./venue/packageFoodList";
import ReviewsList from "./venue/ReviewList";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getAllReview } from "@/lib/features/action/review.action";
import React from "react";
const VenueCard = ({ venue }: { venue: VenueDataResponse }) => {
  const {
    venueName,
    venueImgUrl,
    active,
    id,
    venueDescription,
    account,
    city,
    district,
    street,
    ward,
    packageList,
    reviewList,
  } = venue;
  const router = useRouter();
  const dispatch = useAppDispatch();

  const reviewListt = useAppSelector((state) => state.venueReducer.reviewList);
  const loading = useAppSelector((state) => state.venueReducer.loadingReview);

  const [rating, setRating] = React.useState<number>(0);

  const fetchAllReview = async () => {
    if (id !== null) {
      const res = await dispatch(
        getAllReview({ venueId: id, fitler: { rating: rating } }),
      );
    }
  };

  const fetchRefreshAllReview = async () => {
    if (id !== null) {
      if (rating !== 0) {
        setRating(0);
      } else {
        const res = await dispatch(
          getAllReview({ venueId: id, fitler: { rating: 0 } }),
        );
      }
    }
  };

  React.useEffect(() => {
    fetchAllReview();
  }, [rating]);

  const desc = ["Rất tệ", "Tệ", "Bình thường", "Tốt", "Tuyệt vời"];

  return (
    <Card className="shadow-md" style={{ marginTop: 16 }}>
      <Meta
        avatar={<Avatar shape="square" size={256} src={venueImgUrl} />}
        title={
          <Typography.Title level={2} style={{ margin: 0 }}>
            {venueName}
          </Typography.Title>
        }
        description={
          <Space direction="vertical">
            {/* <div>Sức chứa: {capacity}</div> */}
            <div>Địa chỉ: {`${street}, ${ward}, ${district}, ${city}`}</div>
            <div style={{ width: 700 }}>
              <Popover
                content={<div style={{ width: 900 }}>{venueDescription}</div>}
              >
                <Flex style={{ width: "100%" }} gap={3}>
                  <PlusCircleOutlined style={{ color: blue[5] }} />
                  <span className="text-blue-500">Description</span>
                </Flex>
              </Popover>
            </div>
            <Flex gap={10} className="mt-2">
              <ModalForm
                title="Các gói trang trí"
                trigger={
                  <Button
                    style={{ borderColor: "turquoise", color: "turquoise" }}
                    type="default"
                  >
                    Các gói trang trí
                  </Button>
                }
                style={{ padding: 0 }}
                width={1200}
              >
                <PackageDecorList packageDecorList={packageList} />
              </ModalForm>
              <ModalForm
                title="Các gói món ăn"
                trigger={
                  <Button
                    style={{ borderColor: "thistle", color: "thistle" }}
                    type="default"
                  >
                    Các gói món ăn
                  </Button>
                }
                style={{ padding: 0 }}
                width={1200}
              >
                <PackageFoodList packageFoodList={packageList} />
              </ModalForm>
            </Flex>
            <Button
              style={{
                position: "absolute",
                bottom: 20,
                right: 30,
                zIndex: 999,
              }}
              type="primary"
              size="large"
              onClick={() => router.push(`/booking/${id}`)}
            >
              Đặt lịch
            </Button>
            <ModalForm
              title="Các bài đánh giá"
              trigger={
                <Button
                  onClick={() => {
                    fetchAllReview();
                  }}
                  style={{
                    position: "absolute",
                    top: 20,
                    right: 30,
                    zIndex: 999,
                    backgroundColor: "white",
                    fontSize: 28,
                    color: "#ffe234",
                    padding: 0,
                  }}
                  type="text"
                >
                  {reviewList?.length > 0
                    ? (
                        reviewList?.reduce(
                          (total, obj) => total + obj.rating,
                          0,
                        ) / reviewList?.length
                      ).toFixed(1) + " "
                    : "Chưa có đánh giá"}
                  <StarFilled />
                </Button>
              }
              style={{ padding: 0 }}
              width={800}
              submitter={{ render: false }}
            >
              <Flex gap="middle" align="center">
                <Typography.Title style={{ margin: 0 }} level={4}>
                  Lọc theo đánh giá:
                </Typography.Title>
                <Rate tooltips={desc} onChange={setRating} value={rating} />
                {rating ? <span>{desc[rating - 1]}</span> : null}
                <Button onClick={() => fetchRefreshAllReview()}>Làm lại</Button>
              </Flex>
              <ReviewsList
                reviewList={reviewListt}
                setRating={setRating}
                rating={rating}
              />
            </ModalForm>
          </Space>
        }
      />
    </Card>
  );
};

export default VenueCard;

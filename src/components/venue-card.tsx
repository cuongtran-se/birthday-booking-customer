import { VenueDataResponse } from "@/dtos/response/venue.response";
import { CardBody } from "@material-tailwind/react";
import { Button, Card, Carousel, Image, Typography } from "antd";

const VenueCard = ({ venue }: { venue: VenueDataResponse }) => {
  return (
    <div>
      <img
        src={venue?.venueImgUrl ?? ""}
        alt={venue?.venueName ?? ""}
        style={{
          width: "100%",
          height: 450,
          objectFit: "cover",
          borderRadius: "8px",
        }}
      />
      <div
        style={{
          position: "absolute",
          fontSize: 40,
          top: 40,
          right: 50,
          padding: 0,
        }}
      >
        <Typography.Title level={3} style={{ margin: 0, color: 'white' }}>
          {venue?.venueName}
        </Typography.Title>
      </div>
    </div>
  );
};

export default VenueCard;

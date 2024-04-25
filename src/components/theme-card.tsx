import { EyeOutlined } from "@ant-design/icons";
import { ModalForm } from "@ant-design/pro-components";
import { CardBody } from "@material-tailwind/react";
import { Button, Card, Image, Typography } from "antd";
import ThemeDetail from "./booking/ThemeDetail";

const ThemeCard = ({ theme }: { theme: any }) => {
  return (
    <Card className="package-card border">
      <Image
        width={"100%"}
        height={300}
        src={theme?.themeImgUrl || ""}
        alt={theme?.themeName}
        className="object-cover"
        style={{ borderRadius: 16 }}
      />
      <CardBody placeholder="" className="p-0">
        <div className="flex items-center">
          <Typography.Title
            level={4}
            color="blue"
            className="mt-2 text-center font-medium text-gray-500"
          >
            {theme?.themeName}
          </Typography.Title>
        </div>
        {/* <Button className="mt-2">Chi tiết</Button> */}
        <ModalForm
          title="Chi tiết"
          trigger={
            <Button type="default">
              <EyeOutlined />
              Chi tiết
            </Button>
          }
          style={{ padding: 0 }}
          onFinish={async () => {
            return true
          }}
        >
          <ThemeDetail theme={theme} />
        </ModalForm>
      </CardBody>
    </Card>
  );
};

export default ThemeCard;

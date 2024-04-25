import { Flex } from "antd";

export const Item = ({
  title,
  description,
  align,
}: {
  title: string;
  description: string | React.ReactNode;
  align?: any;
}) => {
  return (
    <Flex align={align} gap={100} justify="space-between">
      <div className="flex-1 font-bold">{title}</div>
      <div className="flex-1 text-sm font-normal text-gray-700">
        {description}
      </div>
    </Flex>
  );
};
export const ChildItem = ({
  title,
  description,
}: {
  title: string;
  description: string | React.ReactNode;
}) => {
  return (
    <Flex gap={100} justify="space-between">
      <div className="font-bold text-black">{title}</div>
      <div className="text-sm font-normal text-gray-700">{description}</div>
    </Flex>
  );
};

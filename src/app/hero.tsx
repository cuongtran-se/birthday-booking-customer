"use client";

import Image from "next/image";
import { Typography, Card } from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import { Button } from "antd";

function Hero() {
  const router = useRouter();
  const navigate = () => {
    router.push("/booking");
  };
  return (
    <div className="container mx-auto !flex h-[700px] w-full items-center justify-between">
      <Image
        width={1200}
        height={1200}
        src="https://png.pngtree.com/background/20230317/original/pngtree-birthday-party-balloon-decoration-background-picture-image_2149091.jpg"
        alt="bg-img"
        className="absolute inset-0 h-[750px] w-full"
        // className="absolute inset-0 ml-auto w-[920px] h-[780px] rounded-bl-[100px] object-cover object-center"  rounded-b-[100px]
      />
      <div className="grid grid-cols-12 text-center lg:text-left">
        <Card
          placeholder=""
          className="col-span-full rounded-xl border border-white bg-white/90 p-8 py-10 shadow-lg shadow-black/10 backdrop-blur-sm backdrop-saturate-200 xl:col-span-7"
        >
          <Typography
            placeholder=""
            variant="h1"
            color="blue-gray"
            className="text-3xl !leading-snug lg:max-w-3xl lg:text-5xl"
          >
            Đặt tiệc sinh nhật cho trẻ em với LoveKids!
          </Typography>
          <Typography
            placeholder=""
            variant="lead"
            className="mb-10 mt-6 !text-gray-900"
          >
            LoveKids mang đến cho trẻ em một trải nghiệm tiệc sinh nhật tuyệt
            vời với các hoạt động vui nhộn, trò chơi thú vị và quà tặng ý nghĩa.
            Chúng tôi cam kết mang đến cho các bé những kỷ niệm đáng nhớ trong
            ngày sinh nhật của mình.
          </Typography>
          {/* <div className="mb-0 flex justify-center gap-4 lg:justify-start">
              <Button
                type="primary"
                size="large"
                onClick={navigate}
                color="blue"
              >
                Đặt lịch
              </Button>
            </div> */}
          {/* <div className="grid grid-cols-2 lg:grid-cols-4 items-center justify-between gap-4 lg:justify-start">
              <Image
                width={144}
                height={144}
                className="w-36 grayscale opacity-60"
                src="/logos/logo-pinterest.svg"
                alt="pinterest"
              />
              <Image
                width={144}
                height={144}
                className="w-36 grayscale opacity-60"
                src="/logos/logo-netflix.svg"
                alt="netflix"
              />
              <Image
                width={144}
                height={144}
                className="w-36 grayscale opacity-60"
                src="/logos/logo-coinbase.svg"
                alt="coinbase"
              />
              <Image
                width={144}
                height={144}
                className="w-36 grayscale opacity-60"
                src="/logos/logo-google.svg"
                alt="google"
              />
            </div> */}
        </Card>
      </div>
    </div>
  );
}
export default Hero;

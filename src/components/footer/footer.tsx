import { Typography, Button } from "@material-tailwind/react";
import { Input } from "antd";

const LINKS = [
  {
    title: "Company",
    items: ["About Us", "Careers", "Premium Tools", "Blog"],
  },
  {
    title: "Pages",
    items: ["Login", "Register", "Add List", "Contact"],
  },
  {
    title: "Legal",
    items: ["Terms", "Privacy", "Team", "About Us"],
  },
];

const CURRENT_YEAR = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="px-8 pb-8 pt-24">
      <div className="container mx-auto flex max-w-6xl flex-col">
        <div className="grid !w-full grid-cols-1 lg:grid-cols-3 ">
          <div className="col-span-2 mb-10 flex items-center gap-10 md:gap-36 lg:mb-0">
            {LINKS.map(({ title, items }) => (
              <ul key={title}>
                <Typography
                  placeholder=""
                  variant="h6"
                  color="blue-gray"
                  className="mb-4"
                >
                  {title}
                </Typography>
                {items.map((link) => (
                  <li key={link}>
                    <Typography
                      placeholder=""
                      as="a"
                      href="#"
                      className="py-1 font-normal !text-gray-700 transition-colors hover:!text-gray-900"
                    >
                      {link}
                    </Typography>
                  </li>
                ))}
              </ul>
            ))}
          </div>
          <div className="mt-10">
            <Typography placeholder="" variant="h6" className="mb-3 text-left">
              Subscribe
            </Typography>
            <Typography
              placeholder=""
              className="mb-4 text-base font-normal !text-gray-500"
            >
              Get access to subscriber exclusive deals and be the first who gets
              informed about fresh sales.
            </Typography>
            <Typography
              placeholder=""
              variant="small"
              className="mb-2 text-left font-medium"
            >
              Your Email
            </Typography>
            <div className="mb-3 flex flex-col items-start gap-4 lg:flex-row">
              <div className="w-full justify-center">
                {/* @ts-ignore */}
                <Input placeholder="email ..." size="large" color="gray" />
                <Typography
                  placeholder=""
                  className="mt-3 text-left !text-sm font-medium !text-gray-500"
                >
                  I agree the{" "}
                  <a
                    href="#"
                    className="font-bold underline transition-colors hover:text-gray-900"
                  >
                    Terms and Conditions{" "}
                  </a>
                </Typography>
              </div>
              <Button
                placeholder=""
                color="gray"
                className="w-full lg:w-fit"
                size="md"
              >
                Gửi
              </Button>
            </div>
          </div>
        </div>
        <Typography
          placeholder=""
          color="blue-gray"
          className="mt-16 font-normal !text-gray-700 md:text-center"
        >
          &copy; {CURRENT_YEAR} Made with{" "}
          <a href="https://www.material-tailwind.com" target="_blank">
            LoveKids
          </a>
        </Typography>
      </div>
    </footer>
  );
}

export default Footer;

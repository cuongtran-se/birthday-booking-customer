"use client";;
import { APP_CONSTANTS } from "@/enums/app";
import { auth } from "@/firebase/firebaseConfig";
import {
  getUserInfo,
  login,
  loginWithGoogle,
  register,
} from "@/lib/features/slice/auth.slice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { LockOutlined, UserOutlined, SendOutlined, FacebookOutlined, GoogleOutlined } from "@ant-design/icons";
import { LoginFormPage, ProConfigProvider, ProFormCheckbox, ProFormText } from "@ant-design/pro-components";
import { Divider, Space, Tabs, message, theme } from "antd";
import {
  GoogleAuthProvider,
  User,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import type { CSSProperties } from "react";
import { useEffect, useState } from "react";

type LoginType = "Login" | "Register";

const iconStyles: CSSProperties = {
  color: "rgba(0, 0, 0, 0.2)",
  fontSize: "18px",
  verticalAlign: "middle",
  cursor: "pointer",
};

const Page = () => {
  const [loginType, setLoginType] = useState<LoginType>("Login");
  const { token } = theme.useToken();

  // Call API
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [messageApi, contextHolder] = message.useMessage();
  const success = (text: string) => {
    messageApi.open({
      type: "success",
      content: text,
    });
  };
  const error = (text: string) => {
    messageApi.open({
      type: "error",
      content: text,
    });
  };
  const handleRegisterAccount = async (param: any) => {
    await dispatch(register(param)).then((res) => {
      console.log(JSON.stringify(res, null, 2));
      if (res?.meta?.requestStatus === "fulfilled") {
        success("Đăng ký thành công!");
        setLoginType("Login");
      } else {
        error("Đăng ký thất bại!");
      }
    });
  };

  const pathName = useAppSelector((state) => state.app.pathName);
  type LoginRes = {
    data: {
      token: string;
      role: {
        id: number;
        name: string;
      };
    };
  };
  const handleLoginAccount = async (param: any) => {
    await dispatch(
      login({ username: param?.usernameLogin, password: param?.passwordLogin }),
    ).then((res) => {
      console.log(JSON.stringify(res, null, 2));
      if (res?.meta?.requestStatus === "fulfilled") {
        const data = res?.payload as LoginRes;
        localStorage.setItem(APP_CONSTANTS.ACCESS_TOKEN, data?.data?.token);
        fetchUserInfo();
        success("Đăng nhập thành công!");
        router.push(pathName);
      } else {
        error("Đăng nhập thất bại!");
      }
    });
  };
  const [user, setUser] = useState<User | null>(null);
  const handleLoginWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const response = await signInWithPopup(auth, provider);
      const accessToken = await response.user.getIdToken(true);
      const result = await dispatch(loginWithGoogle(accessToken)).then(
        (res) => {
          if (res?.meta?.requestStatus === "fulfilled") {
            success("Đăng nhập thành công!");
            fetchUserInfo();
            router.push(pathName);
          } else {
            error("Đăng nhập thất bại!");
          }
        },
      );
    } catch (error) {}
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user: User | null) => {
      console.log(JSON.stringify(user, null, 2));
      setUser(user);
    });
    return () => unsub();
  }, [user]);

  const fetchUserInfo = async () => {
    await dispatch(getUserInfo()).then((res) => {
      console.log(JSON.stringify(res, null, 2));
      if (res?.meta?.requestStatus === "fulfilled") {
        success("Lấy thông tin thành công!");
      } else {
        error("Lấy thông tin thất bại!");
      }
    });
  };
  // useEffect(() => {
  //   getUserInfo1();
  // }, []);
  return (
    <div
      className="z-5 container mx-auto mt-5 rounded-md"
      style={{
        backgroundColor: "white",
        height: 900,
      }}
    >
      {contextHolder}
      <LoginFormPage
        backgroundImageUrl="https://mdn.alipayobjects.com/huamei_gcee1x/afts/img/A*y0ZTS6WLwvgAAAAAAAAAAAAADml6AQ/fmt.webp"
        logo="/image/icon.png"
        backgroundVideoUrl="/image/background-authen.mp4"
        title="LoveKids"
        containerStyle={{
          backgroundColor: "rgba(0, 0, 0,0.65)",
          backdropFilter: "blur(4px)",
          borderRadius: 10,
        }}
        subTitle={`Đăng nhập để có trải nghiệm tốt hơn!`}
        submitter={{
          searchConfig: {
            submitText: loginType === "Login" ? "Đăng nhập" : "Đăng ký",
          },
        }}
        action={() => console.log("HAHAHA")}
        onFinish={(formData) =>
          loginType === "Login"
            ? handleLoginAccount(formData)
            : handleRegisterAccount(formData)
        }
        // activityConfig={{
        //   style: {
        //     boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.2)",
        //     color: token.colorTextHeading,
        //     borderRadius: 8,
        //     backgroundColor: "rgba(255,255,255,0.25)",
        //     backdropFilter: "blur(4px)",
        //   },
        //   title: "Đăng nhập",
        //   subTitle: "Đăng nhập",
        //   action: (
        //     <Button
        //       size="large"
        //       style={{
        //         borderRadius: 20,
        //         background: token.colorBgElevated,
        //         color: token.colorPrimary,
        //         width: 120,
        //       }}
        //     >
        //       Submit
        //     </Button>
        //   ),
        // }}

        actions={
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Divider plain>
              <span
                style={{
                  color: token.colorTextPlaceholder,
                  fontWeight: "normal",
                  fontSize: 14,
                }}
              >
                Đăng nhập với
              </span>
            </Divider>
            <Space align="center" size={24}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  height: 40,
                  width: 40,
                  border: "1px solid " + token.colorPrimaryBorder,
                  borderRadius: "50%",
                }}
              >
                <FacebookOutlined style={{ ...iconStyles, color: "#1677FF" }} />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  height: 40,
                  width: 40,
                  border: "1px solid " + token.colorPrimaryBorder,
                  borderRadius: "50%",
                }}
              >
                <GoogleOutlined
                  onClick={handleLoginWithGoogle}
                  style={{ ...iconStyles, color: "#FF6A10" }}
                />
              </div>
              {/* <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  height: 40,
                  width: 40,
                  border: "1px solid " + token.colorPrimaryBorder,
                  borderRadius: "50%",
                }}
              >
                <WeiboOutlined style={{ ...iconStyles, color: "#1890ff" }} />
              </div> */}
            </Space>
          </div>
        }
      >
        <Tabs
          centered
          activeKey={loginType}
          onChange={(activeKey) => setLoginType(activeKey as LoginType)}
        >
          <Tabs.TabPane key={"Login"} tab={"Đăng nhập"} />
          <Tabs.TabPane key={"Register"} tab={"Đăng ký"} />
        </Tabs>
        {loginType === "Login" && (
          <>
            <ProFormText
              name="usernameLogin"
              fieldProps={{
                size: "large",
                prefix: (
                  <UserOutlined
                    style={{
                      color: token.colorText,
                    }}
                    className={"prefixIcon"}
                  />
                ),
              }}
              placeholder={"username"}
              rules={[
                {
                  required: true,
                  message: "Không được để trống",
                },
              ]}
            />
            <ProFormText.Password
              name="passwordLogin"
              fieldProps={{
                size: "large",
                prefix: (
                  <LockOutlined
                    style={{
                      color: token.colorText,
                    }}
                    className={"prefixIcon"}
                  />
                ),
              }}
              placeholder={"password"}
              rules={[
                {
                  required: true,
                  message: "Không được để trống",
                },
              ]}
            />
          </>
        )}
        {loginType === "Register" && (
          <>
            <ProFormText
              fieldProps={{
                size: "large",
                prefix: (
                  <UserOutlined
                    style={{
                      color: token.colorText,
                    }}
                    className={"prefixIcon"}
                  />
                ),
              }}
              name="username"
              placeholder={"username"}
              rules={[
                {
                  required: true,
                  message: "Không được để trống",
                },
                // {
                //   pattern: /^1\d{10}$/,
                //   message: "手机号格式错误！",
                // },
              ]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: "large",
                prefix: (
                  <LockOutlined
                    style={{
                      color: token.colorText,
                    }}
                    className={"prefixIcon"}
                  />
                ),
              }}
              placeholder={"password"}
              rules={[
                {
                  required: true,
                  message: "Không được để trống",
                },
              ]}
            />
            <ProFormText
              fieldProps={{
                size: "large",
                prefix: (
                  <SendOutlined
                    style={{
                      color: token.colorText,
                    }}
                    className={"prefixIcon"}
                  />
                ),
              }}
              name="email"
              placeholder={"email"}
              rules={[
                {
                  required: true,
                  message: "Không được để trống",
                },
                // {
                //   pattern: /^1\d{10}$/,
                //   message: "手机号格式错误！",
                // },
              ]}
            />
            <ProFormText
              fieldProps={{
                size: "large",
                prefix: (
                  <UserOutlined
                    style={{
                      color: token.colorText,
                    }}
                    className={"prefixIcon"}
                  />
                ),
              }}
              name="phone"
              placeholder={"phone"}
              rules={[
                {
                  required: true,
                  message: "Không được để trống",
                },
                // {
                //   pattern: /^1\d{10}$/,
                //   message: "手机号格式错误！",
                // },
              ]}
            />
            <ProFormText
              fieldProps={{
                size: "large",
                prefix: (
                  <UserOutlined
                    style={{
                      color: token.colorText,
                    }}
                    className={"prefixIcon"}
                  />
                ),
              }}
              name="fullName"
              placeholder={"fullname"}
              rules={[
                {
                  required: true,
                  message: "Không được để trống",
                },
                // {
                //   pattern: /^1\d{10}$/,
                //   message: "手机号格式错误！",
                // },
              ]}
            />
            {/* <ProFormCaptcha
              fieldProps={{
                size: "large",
                prefix: (
                  <LockOutlined
                    style={{
                      color: token.colorText,
                    }}
                    className={"prefixIcon"}
                  />
                ),
              }}
              captchaProps={{
                size: "large",
              }}
              placeholder={"请输入验证码"}
              captchaTextRender={(timing, count) => {
                if (timing) {
                  return `${count} ${"获取验证码"}`;
                }
                return "获取验证码";
              }}
              name="captcha"
              rules={[
                {
                  required: true,
                  message: "请输入验证码！",
                },
              ]}
              onGetCaptcha={async () => {
                message.success("获取验证码成功！验证码为：1234");
              }}
            /> */}
          </>
        )}
        <div
          style={{
            marginBlockEnd: 24,
          }}
        >
          <ProFormCheckbox noStyle name="autoLogin">
            Ghi nhớ đăng nhập
          </ProFormCheckbox>
          {/* <a
            style={{
              float: "right",
            }}
          >
            忘记密码
          </a> */}
        </div>
      </LoginFormPage>
    </div>
  );
};

export default function Authen() {
  return (
    <ProConfigProvider dark>
      <Page />
    </ProConfigProvider>
  );
}

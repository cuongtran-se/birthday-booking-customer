"use client";;
// ** React Imports
import {
  useState,
  ElementType,
  ChangeEvent,
  SyntheticEvent,
  useEffect,
} from "react";

// ** MUI Imports
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Alert from "@mui/material/Alert";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import AlertTitle from "@mui/material/AlertTitle";
import IconButton from "@mui/material/IconButton";
import CardContent from "@mui/material/CardContent";
import Button, { ButtonProps } from "@mui/material/Button";

// ** Icons Imports
import Close from "@ant-design/icons/CloseOutlined";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getUserInfo, updateAvatar } from "@/lib/features/slice/auth.slice";
import AuthGuard from "../AuthGuard";
import { Avatar, Flex } from "antd";
import { UserOutlined } from "@ant-design/icons";

const ImgStyled = styled("img")(({ theme }) => ({
  width: 120,
  height: 120,
  marginRight: theme.spacing(6.25),
  borderRadius: theme.shape.borderRadius,
}));

const ButtonStyled = styled(Button)<
  ButtonProps & { component?: ElementType; htmlFor?: string }
>(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    textAlign: "center",
  },
}));

const ResetButtonStyled = styled(Button)<ButtonProps>(({ theme }) => ({
  marginLeft: theme.spacing(4.5),
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    marginLeft: 0,
    textAlign: "center",
    marginTop: theme.spacing(4),
  },
}));
const Account = () => {
  const [openAlert, setOpenAlert] = useState<boolean>(true);
  const [imgSrc, setImgSrc] = useState<string>("");
  const [imgFile, setImgFile] = useState<File | null>(null);

  const onChange = (file: ChangeEvent) => {
    const reader = new FileReader();
    const { files } = file.target as HTMLInputElement;
    if (files && files.length !== 0) {
      reader.onload = () => setImgSrc(reader.result as string);
      setImgFile(files[0]);
      reader.readAsDataURL(files[0]);
      console.log(files)
    }
  };

  // Dispatch Redux
  const dispatch = useAppDispatch();

  const userInfo = useAppSelector((state) => state.auth.userInfo?.data);

  const fetchUserInfo = async () => {
    await dispatch(getUserInfo()).then((res) => {
      console.log(JSON.stringify(res, null, 2));
    });
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const updateAvatarU = async () => {
    await dispatch(updateAvatar(imgFile)).then(async (res) => {
      setImgSrc("");
      setImgFile(null);
      await fetchUserInfo();
      console.log(JSON.stringify(res, null, 2));
    });
  };

  return (
    <AuthGuard>
      <div className="container mx-auto mt-10 rounded-xl shadow-lg">
        <CardContent>
          <form>
            <Grid container spacing={7}>
              <Grid item xs={12} sx={{ marginTop: 4.8, marginBottom: 3 }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Flex vertical gap={5}>
                    <Avatar
                      src={userInfo?.avatarUrl}
                      srcSet={imgSrc}
                      shape="square"
                      size={128}
                      icon={<UserOutlined />}
                    />
                    {imgFile !== null && (
                      <Button onClick={updateAvatarU} variant="contained">
                        Upload
                      </Button>
                    )}
                  </Flex>

                  <Box sx={{ ml: 5 }}>
                    <ButtonStyled
                      component="label"
                      variant="outlined"
                      htmlFor="account-settings-upload-image"
                    >
                      Choose PHOTO
                      <input
                        hidden
                        type="file"
                        onChange={onChange}
                        accept="image/png, image/jpeg"
                        id="account-settings-upload-image"
                      />
                    </ButtonStyled>
                    <ResetButtonStyled
                      color="error"
                      variant="outlined"
                      onClick={() => {
                        setImgSrc("");
                        setImgFile(null);
                      }}
                    >
                      Reset
                    </ResetButtonStyled>
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Username"
                  placeholder="username"
                  value={userInfo?.username || ""}
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Name"
                  placeholder="fullname"
                  value={userInfo?.fullName || ""}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type="email"
                  label="Email"
                  placeholder="example123@gmail.com"
                  value={userInfo?.email || ""}
                />
              </Grid>
              {/* <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Role</InputLabel>
              <Select label="Role" defaultValue="admin">
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="author">Author</MenuItem>
                <MenuItem value="editor">Editor</MenuItem>
                <MenuItem value="maintainer">Maintainer</MenuItem>
                <MenuItem value="subscriber">Subscriber</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select label="Status" defaultValue="active">
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
                <MenuItem value="pending">Pending</MenuItem>
              </Select>
            </FormControl>
          </Grid> */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type="phone"
                  label="Phone Number"
                  placeholder="0123xxxxxx"
                  value={userInfo?.phone || ""}
                />
              </Grid>

              {openAlert ? (
                <Grid item xs={12} sx={{ mb: 3 }}>
                  <Alert
                    severity="warning"
                    sx={{ "& a": { fontWeight: 400 } }}
                    action={
                      <IconButton
                        size="small"
                        color="inherit"
                        aria-label="close"
                        onClick={() => setOpenAlert(false)}
                      >
                        <Close />
                      </IconButton>
                    }
                  >
                    <AlertTitle>
                      Your email is not confirmed. Please check your inbox.
                    </AlertTitle>
                    <Link
                      href="/"
                      onClick={(e: SyntheticEvent) => e.preventDefault()}
                    >
                      Resend Confirmation
                    </Link>
                  </Alert>
                </Grid>
              ) : null}

              <Grid item xs={12}>
                <Button variant="contained" sx={{ marginRight: 3.5 }}>
                  Save Changes
                </Button>
                <Button type="reset" variant="outlined" color="secondary">
                  Reset
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </div>
    </AuthGuard>
  );
};
export default Account;

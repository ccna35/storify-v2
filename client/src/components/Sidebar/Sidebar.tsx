import { Box, Link, Stack } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import { useContext, useState } from "react";
import { UserContext } from "../../hooks/UserContext";
import axios from "axios";
import { API_URL } from "../../env";
import { LoadingButton } from "@mui/lab";

const SidebarMenuItems = [
  { id: 1, name: "Dashboard", path: "/" },
  { id: 2, name: "Add Product", path: "/new-product" },
  { id: 3, name: "Products", path: "/products" },
  { id: 4, name: "Profile", path: "/profile" },
  { id: 5, name: "Settings", path: "/settings" },
];

const Sidebar = () => {
  const { updateUserInfo } = useContext(UserContext);

  const navigate = useNavigate();
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");

  const handleLogout = async () => {
    setStatus("loading");
    try {
      const res = await axios.get(API_URL + "users/logout");
      console.log(res);
      updateUserInfo(null);
      localStorage.removeItem("user");
      setStatus("idle");
      navigate("/login");
    } catch (error) {
      setStatus("error");
    }
  };
  return (
    <Stack direction="column" spacing={4}>
      <Box
        sx={{
          border: "1px solid lightgray",
          borderRadius: 2,
        }}
      >
        <Stack direction="column">
          {SidebarMenuItems.map(({ id, name, path }) => {
            return (
              <Link
                key={id}
                component={NavLink}
                to={path}
                sx={{
                  p: 2,
                  textDecoration: "none",
                  transition: "background-color 500ms",
                  fontWeight: 500,
                  "&:hover": {
                    backgroundColor: "#f8f9fa",
                  },
                  "&.active": {
                    backgroundColor: "#800f2f1a",
                  },
                }}
              >
                {name}
              </Link>
            );
          })}
        </Stack>
      </Box>
      <LoadingButton
        loading={status === "loading"}
        loadingPosition="start"
        variant="contained"
        startIcon={<LogoutIcon />}
        onClick={handleLogout}
      >
        Sign out
      </LoadingButton>
    </Stack>
  );
};

export default Sidebar;

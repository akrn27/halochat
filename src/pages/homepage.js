import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { useDispatch } from "react-redux";
import { getAllPosts } from "../features/auth/authSlice";
import { Box, Button, Typography } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";

const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [posts, setPosts] = useState("");

  const getMe = async () => {
    try {
      const token = Cookies.get("user_token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(
        "https://paace-f178cafcae7b.nevacloud.io/api/user/me",
        config
      );
      // console.log(response);
    } catch (error) {
      console.log(error);
      navigate("/");
    }
  };
  useEffect(() => {
    getMe();
  }, []);

  const getPosts = async () => {
    const token = Cookies.get("user_token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await dispatch(getAllPosts({ config }));
    console.log("res => ", response.payload.data.data);
    setPosts(response.payload.data.data);
  };
  useEffect(() => {
    getPosts();
  }, []);

  return (
    <Layout>
      <Box>
        {posts &&
          posts?.map((post, i) => (
            <Box
              sx={{
                display: "flex",
                gap: "10px",
                marginBottom: "10px",
                padding: "4px",
              }}
            >
              <PersonIcon sx={{ fontSize: "50px" }} />
              <Box>
                <Box sx={{ display: "flex", gap: "4px" }}>
                  <Typography sx={{ fontWeight: "800" }}>
                    @{post.user.name}
                  </Typography>
                  <Typography sx={{ color: "#616161" }}>
                    {new Date(post.created_at).toLocaleDateString("en-US")}
                  </Typography>
                </Box>
                <Typography sx={{ fontWeight: "600" }}>
                  {post.description}
                </Typography>

                <Box sx={{ display: "flex", gap: "3px", alignItems: "center" }}>
                  {post.is_like_post ? (
                    <ThumbUpAltIcon />
                  ) : (
                    <ThumbUpOffAltIcon />
                  )}
                  <Typography>{post.likes_count}</Typography>
                  <Button
                    variant="text"
                    sx={{ color: "black", fontWeight: "600" }}
                  >
                    Reply
                  </Button>
                </Box>
              </Box>
            </Box>
          ))}
      </Box>
    </Layout>
  );
};

export default HomePage;

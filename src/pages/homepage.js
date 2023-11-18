import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { useDispatch } from "react-redux";
import { getAllPosts } from "../features/auth/authSlice";
import { Box, Typography } from "@mui/material";
import {format, parse} from 'date-fns'

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
    const token = Cookies.get('user_token')
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }

    const response = await dispatch(getAllPosts({config}))
    console.log('res => ', response.payload.data.data)
    setPosts(response.payload.data.data)
  }
  useEffect(() => {
    getPosts()
  }, [])

  return (
    <Layout>
      <Box>
        {posts && posts?.map((post, i) => (
          <Typography>@{post.user.name} {new Date(post.created_at).toLocaleDateString("en-US")}</Typography>
        ))}
      </Box>
    </Layout>
  );
};

export default HomePage;

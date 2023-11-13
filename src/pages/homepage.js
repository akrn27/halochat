import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

const HomePage = () => {
  const navigate = useNavigate();

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
      console.log(response);
    } catch (error) {
      console.log(error);
      navigate("/");
    }
  };
  useEffect(() => {
    getMe();
  }, []);

  return (
    <Layout>
      <div>HomePage</div>
    </Layout>
  );
};

export default HomePage;

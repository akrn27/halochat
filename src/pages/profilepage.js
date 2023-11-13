import React from "react";
import Layout from "../components/Layout";
import { Divider, Grid, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useSelector } from "react-redux";
import { authSelectors } from "../features/auth/authSlice";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const ProfilePage = () => {
  const auth = useSelector(authSelectors.selectAll);

  console.log(auth);
  return (
    <Layout>
      <Typography
        variant="h5"
        sx={{
          paddingLeft: "15px",
          paddingTop: "15px",
          display: "flex",
          flexDirection: "row",
        }}
      >
        User Profile
      </Typography>
      <Divider variant="inset" />
      <Grid container spacing={2} sx={{ padding: "15px" }}>
        <Grid item xs={12} md={12}>
          <Grid container>
            <Grid item xs={12} md={4}>
              <Paper
                sx={{
                  padding: "10px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "5px",
                  alignItems: "center",
                }}
              >
                <AccountCircleIcon sx={{ fontSize: "80px" }} />
                <Typography sx={{ fontWeight: "600" }}>
                  {auth[0]?.data.data.name}
                </Typography>
                <Divider />
                <Typography sx={{ color: "#9EB384" }}>
                  Status: Active
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={8}>
              <Paper
                sx={{
                  padding: "10px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "5px",
                  height: '100%'
                }}
              >
                <Box>
                  <Typography sx={{color: '#bdbdbd'}}>User Profile</Typography>
                  <Box sx={{display: 'flex', justifyContent: 'space-between', marginTop: '5px'}}>
                    <Typography>Email: {auth[0]?.data.data.email}</Typography>
                    <Typography>Hobby: {auth[0]?.data.data.hobby}</Typography>
                    <Typography>Phone: {auth[0]?.data.data.phone}</Typography>
                  </Box>
                </Box>
                <Box>
                  <Typography sx={{color: '#bdbdbd'}}>User Posts</Typography>
                  <Box sx={{display: 'flex', justifyContent: 'space-between', marginTop: '5px'}}>
                    <Typography>Posts: 0</Typography>
                  </Box>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box>
            <Paper>
              <Typography>awd</Typography>
            </Paper>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box>
            <Typography>Profile</Typography>
          </Box>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default ProfilePage;

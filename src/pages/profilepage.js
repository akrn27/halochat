import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  FormControl,
  Grid,
  Input,
  InputLabel,
  Paper,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useDispatch } from "react-redux";
import {
  createPost,
  deletePostById,
  getAllPosts,
  getMe,
} from "../features/auth/authSlice";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SendIcon from "@mui/icons-material/Send";
import Cookies from "js-cookie";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const [myposts, setMyPosts] = useState("");
  const [allMyPosts, setAllMyPosts] = useState("");
  const [isLoading, setIsLoading] = useState("");
  const [description, setDescription] = useState("");

  const getMyInfo = async () => {
    const token = Cookies.get("user_token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await dispatch(getMe({ config }));
    setMyPosts(response.payload?.data.data);
    // console.log(response)
  };
  useEffect(() => {
    getMyInfo();
  }, []);
  // console.log('Myposts => ', myposts)

  const getPosts = async () => {
    const token = Cookies.get("user_token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await dispatch(getAllPosts({ config }));
    // console.log('resp => ', response.payload?.data.data)
    setAllMyPosts(response.payload?.data.data);
    setIsLoading(response.payload.status);
  };
  useEffect(() => {
    getPosts();
  }, []);

  const handleDelete = async (id) => {
    const token = Cookies.get("user_token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    await dispatch(deletePostById({ id, config }));
    getPosts();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = Cookies.get("user_token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    await dispatch(createPost({ description, config }));
    setDescription("");
    getPosts();
  };

  const filteredGetPosts =
    allMyPosts && allMyPosts.filter((res) => res.users_id === myposts.id);
  // console.log(filteredGetPosts)

  return (
    <Layout>
      {isLoading !== 200 ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <CircularProgress size={100} loading={isLoading} />
        </Box>
      ) : (
        <>
          <Typography
            variant="h5"
            sx={{
              paddingLeft: "15px",
              paddingTop: "15px",
              display: "flex",
              flexDirection: "row",
              fontWeight: "700",
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
                      {myposts.name}
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
                      height: "100%",
                    }}
                  >
                    <Box>
                      <Typography sx={{ color: "#bdbdbd", fontWeight: "600" }}>
                        User Profile
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginTop: "5px",
                        }}
                      >
                        <Typography>Email: {myposts.email}</Typography>
                        <Typography>Hobby: {myposts.hobby}</Typography>
                        <Typography>Phone: {myposts.phone}</Typography>
                      </Box>
                    </Box>
                    <Box>
                      <Typography sx={{ color: "#bdbdbd", fontWeight: "600" }}>
                        User Posts
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginTop: "5px",
                        }}
                      >
                        <Typography>
                          Posts: {filteredGetPosts.length}
                        </Typography>
                      </Box>
                    </Box>
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={7}>
              {filteredGetPosts.length > 0 ? (
                <Box>
                  <Paper>
                    <Typography>Your Posts</Typography>
                    {filteredGetPosts &&
                      filteredGetPosts.map((post, i) => (
                        <Card sx={{ minWidth: 275 }}>
                          <CardContent>
                            <Typography
                              sx={{ fontSize: 14 }}
                              color="text.secondary"
                              gutterBottom
                            >
                              {post.user.name}'s Post
                            </Typography>
                            <Typography
                              variant="h5"
                              component="div"
                            ></Typography>
                            <Typography color="text.secondary">
                              {post.user.email}
                            </Typography>
                            <Typography variant="body2">
                              {post.description}
                            </Typography>
                            <Box
                              sx={{
                                display: "flex",
                                gap: "5px",
                                marginTop: "8px",
                              }}
                            >
                              <Button variant="contained" color="success">
                                Edit
                              </Button>
                              <Button
                                type="button"
                                onClick={() => handleDelete(post.id)}
                                variant="contained"
                                color="error"
                              >
                                Delete
                              </Button>
                            </Box>
                          </CardContent>
                        </Card>
                      ))}
                  </Paper>
                </Box>
              ) : (
                <Paper>
                  <Typography>
                    Your post is empty please upload it first🥺
                  </Typography>
                </Paper>
              )}
            </Grid>
            <Grid item xs={12} md={5}>
              <form
                onSubmit={handleSubmit}
                sx={{ width: "100%"}}
              >
                <InputLabel htmlFor="my-input">Share your thought</InputLabel>
                <Input
                  required
                  id="my-input"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  aria-describedby="my-helper-text"
                  sx={{width: '100%'}}
                />
                <Button
                  type="submit"
                  variant="contained"
                  endIcon={<SendIcon />}
                  sx={{
                    marginTop: '10px',
                    width: "100%",
                    backgroundColor: "black",
                    ":hover": { backgroundColor: "#383838" },
                  }}
                >
                  Add Post
                </Button>
              </form>
            </Grid>
          </Grid>
        </>
      )}
    </Layout>
  );
};

export default ProfilePage;

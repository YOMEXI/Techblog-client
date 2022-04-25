import { Avatar, Box, CardActions, CardMedia, Grid } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";
import { useAppSelector } from "../../shared/components/redux/hooks";

const UserInfo = () => {
  //
  const router = useRouter();

  const username = router.query.username;

  const { data: user } = useSWR(username ? `/api/auth/${username}` : "");
  console.log(user);
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 2,
      }}
    >
      <Grid item lg={8} md={8} sm={10} xs={11}>
        <img
          height="190"
          width="190"
          src={user?.imgUrl ? user?.imgUrl : "/img/avatar.png"}
        />
        <CardActions className="userinfo">{user?.username}</CardActions>
        <CardActions className="userinfo">{user?.email}</CardActions>
      </Grid>
    </Box>
  );
};

export default UserInfo;

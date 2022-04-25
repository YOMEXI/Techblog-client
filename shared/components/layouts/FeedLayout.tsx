import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import useSWR, { useSWRConfig } from "swr";

import FeedCard from "./appLayout/FeedCard";

const FeedLayout = ({}) => {
  const { data: feed } = useSWR("/api/feed?page=0&count=2");
  return (
    <>
      <Grid container spacing={2} className="feedLayout">
        {feed &&
          feed?.map((feed: any, i: any) => {
            return <FeedCard feed={feed} key={i} />;
          })}
      </Grid>
    </>
  );
};

export default FeedLayout;

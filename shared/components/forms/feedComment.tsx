import {
  Grid,
  Typography,
  Box,
  Container,
  CardContent,
  Avatar,
  CardActions,
  Card,
  CardMedia,
  Link,
} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";

import React from "react";
import { useRouter } from "next/router";
import { useAppSelector } from "../redux/hooks";

interface Card {
  id: number;
  email: string;
  title: string;
  updatedAt: Date;
  comment: any[];
  likes: any[];
  body: string;
  imgUrl: string;
  author: any;
  category: string;
}

const FeedCommentCard = ({ comment }: any) => {
  const router = useRouter();

  const { user } = useAppSelector((state) => state.auth);
  console.log(comment);
  return (
    <>
      <Grid container>
        <Grid item lg={3} md={2}></Grid>
        <Grid item lg={5} md={6} sm={8} xs={11}>
          <Container>
            <Card sx={{ maxWidth: "100%", marginTop: 4 }}>
              {/* <Typography
                component="span"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                Comments
              </Typography> */}
              {comment &&
                comment?.map((comment: any, i: any) => (
                  <div className="feedcardContainer" key={i}>
                    <CardContent className=" feedbox-2">
                      <Typography gutterBottom variant="h5" component="div">
                        <Typography className="feedAvatar" component="span">
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "space-around",
                              alignItems: "center",
                            }}
                          >
                            <Avatar
                              alt="Remy Sharp"
                              src="/img/home.jpg"
                              sx={{ marginRight: 1 }}
                            />
                            <Typography>{comment?.user?.username}</Typography>
                          </Box>
                        </Typography>
                      </Typography>

                      <CardActions>
                        <Link
                          href={`/feed/${comment?.id}`}
                          underline="none"
                          style={{ color: "white" }}
                        >
                          {comment?.body}
                        </Link>
                      </CardActions>
                    </CardContent>
                  </div>
                ))}
            </Card>
          </Container>
        </Grid>
      </Grid>
    </>
  );
};

export default FeedCommentCard;

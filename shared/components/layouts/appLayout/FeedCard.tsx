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
import { likeFeed } from "../../../utils";
import { useAppSelector } from "../../redux/hooks";
import CommentForm from "../../forms/commentForm";

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

const FeedCard = ({ feed }: any) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { user } = useAppSelector((state) => state.auth);
  //
  const router = useRouter();

  const feedId = Number(router.query.id);

  const liked = feed?.likes?.includes(feedId);

  return (
    <>
      <Grid container item lg={5} md={5} sm={10} xs={11}>
        <Container>
          <Card sx={{ maxWidth: "100%", marginTop: 4 }}>
            {feed && (
              <div className="feedcardContainer">
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
                          src={`${feed?.author?.imgUrl}`}
                          sx={{ marginRight: 1 }}
                        />
                        <Typography>
                          <Link
                            href={`/auth/${feed?.author?.username}`}
                            underline="none"
                            style={{ color: "white" }}
                          >
                            {feed?.author?.username}
                          </Link>
                        </Typography>
                      </Box>
                      <Box>{feed?.category}</Box>
                    </Typography>
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    className="feedtitle"
                  >
                    {feed?.title}
                  </Typography>
                  {router.pathname === "/feed/[id]" && (
                    <CardMedia
                      component="img"
                      height="194"
                      image={feed?.imgUrl}
                    />
                  )}
                  <CardActions>
                    <Link
                      href={`/feed/${feed?.id}`}
                      underline="none"
                      style={{ color: "white" }}
                    >
                      {router.pathname === "/feed/[id]" && feed.body}
                      {router.pathname != "/feed/[id]" &&
                        feed?.body?.substring(0, 25)}
                      ...
                    </Link>
                  </CardActions>
                  <Box className="likeCommentSection">
                    <span className="likeCommentSectionSpan">
                      <span
                        onClick={() => likeFeed(feed?.id, feedId, liked, user)}
                      >
                        {liked ? (
                          <ThumbUpIcon
                            className="pointer likeCommentSectionIcon"
                            style={{ color: "red" }}
                          />
                        ) : (
                          <ThumbUpIcon className="pointer likeCommentSectionIcon" />
                        )}
                      </span>

                      <span className="likeCommentSectionSpanFeed">
                        {feed?.likes?.length}
                        <span style={{ marginLeft: "10px" }}>Likes</span>
                      </span>
                    </span>
                    <span className="likeCommentSectionSpan">
                      <span>
                        <ChatBubbleIcon
                          className="pointer likeCommentSectionIcon"
                          onClick={handleOpen}
                        />
                      </span>

                      <span className="likeCommentSectionSpanFeed">
                        {feed?.comments?.length}{" "}
                        <span style={{ marginLeft: "10px" }}>Comments</span>
                      </span>
                    </span>
                  </Box>
                  <CommentForm
                    handleOpen={handleOpen}
                    handleClose={handleClose}
                    open={open}
                    setOpen={setOpen}
                  />
                </CardContent>
              </div>
            )}
          </Card>
        </Container>
      </Grid>
    </>
  );
};

export default FeedCard;

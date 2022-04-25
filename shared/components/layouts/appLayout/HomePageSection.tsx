import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import React from "react";
import { useAppSelector } from "../../redux/hooks";

const HomePageSection = () => {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <Grid>
      <Container>
        <Card sx={{ maxWidth: "100%", marginTop: 4 }}>
          <CardMedia
            component="img"
            height="140"
            image="/img/home.jpg"
            alt=""
          />
          <CardContent className="centerwithFlex ">
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              className="homepagecard"
            >
              Lets Discuss Tech
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              className="homepagecard2"
            >
              Discover stories, issues, and expertise from tech writers on any
              topic.
            </Typography>
            <CardActions>
              {user && (
                <Link href="/feed/createFeed">
                  <Button size="small" variant="contained">
                    Create Feed
                  </Button>
                </Link>
              )}
              <Button size="small">Learn More</Button>
            </CardActions>
          </CardContent>
        </Card>
      </Container>
    </Grid>
  );
};

export default HomePageSection;

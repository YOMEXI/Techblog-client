import {
  Avatar,
  Box,
  Container,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import { toast } from "react-toastify";
import { useAppSelector } from "../../redux/hooks";

const CategorySelect = () => {
  const router = useRouter();
  const { user }: any = useAppSelector((state) => state.auth);

  //
  const viewCategory = (category: string) => {
    if (!user) {
      return toast.error("Please Login");
    }
    return router.push(`/feed/category/${category}`);
  };

  //
  return (
    <Container>
      <Grid container>
        <Grid item lg={4} md={4} sm={5} xs={6}>
          <ListItemButton>
            <ListItemText
              primary="Cloud Devops"
              className="categoryselect"
              onClick={() => viewCategory("Cloud Devops")}
            />
          </ListItemButton>
        </Grid>
        <Grid item lg={4} md={4} sm={5} xs={6}>
          <ListItemButton>
            <ListItemText
              primary="Programming Tools"
              className="categoryselect"
              onClick={() => viewCategory("Programming Tools")}
            />
          </ListItemButton>
        </Grid>
        <Grid item lg={4} md={4} sm={5} xs={6}>
          <ListItemButton>
            <ListItemText
              primary="Data Science"
              className="categoryselect"
              onClick={() => viewCategory("Data Science")}
            />
          </ListItemButton>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CategorySelect;

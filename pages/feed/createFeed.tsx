import React, { ChangeEvent, FormEvent, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";

import { useRouter } from "next/router";

const CreateFeed = () => {
  const [category, setCategory] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [forms, setforms] = useState<any>({
    body: "",
    image: "",
    form: new FormData(),
    title: "",
  });
  ////
  const router = useRouter();
  const { body, image, form, title } = forms;

  ////
  const handleChange = (name: string) => (event: any) => {
    setCategory(event.target.value);
    form.set(name, event.target.value);
  };

  let multipleHandleChange = (name: string) => (e: any) => {
    const value = name === "image" ? e.target.files[0] : e.target.value;
    form.set(name, value as Blob);
    setforms({ ...forms, [name]: value });
  };

  const Submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);
      const { data } = await axios.post(`/api/cloudinary/upload`, form);
      console.log(data);
      toast.success(data.msg);
      setTimeout(() => {
        router.push("/");
      }, 3000);
      setLoading(false);
    } catch (error: any) {
      toast.success(error);
      setLoading(false);
    }

    setforms({
      body: "",
      image: "",
      form: null,
      title: "",
    });
  };

  return (
    <>
      {loading && (
        <h3 className="centerwithFlex">
          <CircularProgress color="primary" />
        </h3>
      )}
      <form onSubmit={Submit}>
        <Grid container className="centerwithFlex" sx={{ marginTop: 5 }}>
          <Grid item lg={7} md={10} sm={10} xs={11} className="feedcard">
            <h3>Create Feed</h3>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={category}
                name=""
                label="category"
                onChange={handleChange("category")}
              >
                <MenuItem value="Cloud Devops">Cloud Devops</MenuItem>
                <MenuItem value="Programming Tools">Programming Tools</MenuItem>
                <MenuItem value="Data Science">Data Science</MenuItem>
              </Select>
            </FormControl>
            <TextField
              id="outlined-multiline-static"
              label="Title"
              value={title}
              variant="outlined"
              onChange={multipleHandleChange("title")}
              name=""
            />
            <TextField
              id="outlined-multiline-static"
              label="Body"
              multiline
              rows={4}
              value={body}
              variant="outlined"
              onChange={multipleHandleChange("body")}
              name=""
            />
            <Box sx={{ marginTop: 4 }}>
              <Button variant="contained" component="label" color="primary">
                {" "}
                <input
                  type="file"
                  onChange={multipleHandleChange("image")}
                  name=""
                />
              </Button>
            </Box>
            <Box sx={{ marginTop: 4 }}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled
              >
                Submit
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default CreateFeed;

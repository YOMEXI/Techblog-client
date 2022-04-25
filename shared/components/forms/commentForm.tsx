import * as React from "react";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { TextField, Box } from "@mui/material";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";
import { useAppSelector } from "../redux/hooks";

const style = {
  position: "absolute" as "absolute",
  top: "20%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70%",
  bgcolor: "white",
  border: "2px dotted #000",
  boxShadow: 24,
  p: 4,
};

export default function CommentForm({
  handleOpen,
  handleClose,
  open,
  setOpen,
}: any) {
  const router = useRouter();
  const { user } = useAppSelector((state) => state.auth);
  //
  const [body, setBody] = React.useState("");
  const [loading, setloading] = React.useState(false);
  const id = router.query.id;
  //

  //

  const Submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setloading(true);
    const { data } = await axios.post(id ? `/api/comment/${id}` : "", { body });
    setloading(false);
    toast.success(data.msg);
    setBody("");
  };

  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <form onSubmit={Submit}>
          <Box sx={style}>
            <Typography
              id="keep-mounted-modal-title"
              variant="h6"
              component="span"
            >
              Create Comment
            </Typography>
            <Typography
              id="keep-mounted-modal-description"
              sx={{ mt: 2 }}
              component="span"
            >
              <TextField
                multiline
                rows={4}
                style={{ width: "100%" }}
                value={body}
                onChange={(e: any) => setBody(e.target.value)}
              />
            </Typography>
            <Box sx={{ marginTop: 4 }} className="centerwithFlex">
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={!user}
              >
                Submit
              </Button>
            </Box>
          </Box>
        </form>
      </Modal>{" "}
    </div>
  );
}

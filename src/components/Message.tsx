// components/GlobalMessage.tsx

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Snackbar } from "@mui/material";
import {
  selectFuseMessageState,
  selectFuseMessageOptions,
  hideMessage,
} from "../../store/Message";
import { styled } from "@mui/material/styles";
import ClearIcon from "@mui/icons-material/Clear";
import { amber, blue, green, red } from "@mui/material/colors";
import IconButton from "@mui/material/IconButton";
import SnackbarContent from "@mui/material/SnackbarContent";
import Typography from "@mui/material/Typography";
import { memo } from "react";
interface FuseMessageProps {
  variant: "success" | "warning" | "error" | "info";
}
const StyledSnackbar = styled(Snackbar)(({ variant }: any) => ({
  "& .FuseMessage-content": {
    ...(variant === "success" && {
      backgroundColor: green[600],
      color: "#FFFFFF",
    }),

    ...(variant === "error" && {
      backgroundColor: red[600],
      color: "#FFFFFF",
    }),

    ...(variant === "info" && {
      backgroundColor: blue[600],
      color: "#FFFFFF",
    }),

    ...(variant === "warning" && {
      backgroundColor: amber[600],
      color: "#FFFFFF",
    }),
  },
}));

const variantIcon = {
  success: "check_circle",
  warning: "warning",
  error: "error_outline",
  info: "info",
};

function FuseMessage() {
  const dispatch = useDispatch();
  const state = useSelector(selectFuseMessageState);
  const options = useSelector(selectFuseMessageOptions);

  return (
    <StyledSnackbar
      // theme="any"
      {...options}
      open={state}
      onClose={() => dispatch(hideMessage())}
      ContentProps={{
        variant: "outlined",
        // headlineMapping: {
        //   body1: "div",
        //   body2: "div",
        // },
      }}
    >
      <SnackbarContent
        className="FuseMessage-content"
        message={
          <div className="flex items-center">
            <Typography className="mx-8">{options.message}</Typography>
          </div>
        }
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            onClick={() => dispatch(hideMessage())}
            size="large"
          >
            <ClearIcon />
          </IconButton>,
        ]}
      />
    </StyledSnackbar>
  );
}

export default memo(FuseMessage);

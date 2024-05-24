// components/GlobalMessage.tsx

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Snackbar } from "@mui/material";
import {
  selectFuseMessageState,
  selectFuseMessageOptions,
  hideMessage,
} from "../../store/Message";
import { styled, useTheme } from "@mui/material/styles";
import ClearIcon from "@mui/icons-material/Clear";
import { amber, blue, green } from "@mui/material/colors";
import IconButton from "@mui/material/IconButton";
import SnackbarContent from "@mui/material/SnackbarContent";
import Typography from "@mui/material/Typography";
import { memo } from "react";
interface FuseMessageProps {
  variant: "success" | "warning" | "error" | "info";
  theme: any;
}
const StyledSnackbar = styled(Snackbar)(
  ({ theme, variant }: FuseMessageProps) => ({
    "& .FuseMessage-content": {
      ...(variant === "success" && {
        backgroundColor: green[600],
        color: "#FFFFFF",
      }),

      ...(variant === "error" && {
        backgroundColor: theme.palette.error.dark,
        color: theme.palette.getContrastText(theme.palette.error.dark),
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
  })
);

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
            {/* {variantIcon[options?.variant] && (
              <FuseSvgIcon color="inherit">
                {variantIcon[options.variant]}
              </FuseSvgIcon>
            )} */}
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

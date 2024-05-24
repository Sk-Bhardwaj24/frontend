import React from "react";
import { useAppSelector } from "../../../../store/hooks";
import { Container, Typography } from "@mui/material";

const Profile = () => {
  const user = useAppSelector((state) => state.auth.user);
  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Profile Page
      </Typography>
      <Typography variant="h5" component="h1" gutterBottom>
        Username : {user?.username}
      </Typography>
      <Typography variant="h5" component="h1" gutterBottom>
        Email : {user?.email}
      </Typography>
    </Container>
  );
};

export default Profile;

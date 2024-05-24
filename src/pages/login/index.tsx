import React, { useState } from "react";
import { login, loginUser } from "../../../store/Auth";
import { TextField, Button, Container, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useAppDispatch } from "../../../store/hooks";

const Login: React.FC = () => {
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = await dispatch(loginUser({ username, password }));

    if (data?.payload?.user?.email) {
      router.push("/secure/dashboard");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Typography component="h1" variant="h5">
        Login
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Email / Username"
          autoFocus
          value={username}
          onChange={(e) => setusername(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" fullWidth variant="contained" color="primary">
          Login
        </Button>
      </form>
    </Container>
  );
};

export default Login;

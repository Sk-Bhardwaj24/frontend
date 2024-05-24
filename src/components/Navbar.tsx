import React from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/Auth";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import styles from "../styles/Navbar.module.scss";
import { RootState } from "../../store";
import { useRouter } from "next/router";

const Navbar: React.FC = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await dispatch(logout());
    router.push("/");
  };

  return (
    <AppBar position="static" className={styles.navbar}>
      <Toolbar>
        {isAuthenticated ? (
          <>
            <Link href="/secure/dashboard">
              <p className={styles.navlink}>Dashboard</p>
            </Link>
            <Link href="/secure/profile">
              <p className={styles.navlink}>Profile</p>
            </Link>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Typography variant="h6">
              <Link href="/">
                <p className={styles.navlink}>Home</p>
              </Link>
            </Typography>
            <Link href="/login">
              <p className={styles.navlink}>Login</p>
            </Link>
            <Link href="/register">
              <p className={styles.navlink}>Register</p>
            </Link>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

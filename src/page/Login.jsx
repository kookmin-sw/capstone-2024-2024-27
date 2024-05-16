import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Alert from "@material-ui/lab/Alert";
import { api } from "../utils/api";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#3376cd",
    "&:hover": {
      backgroundColor: "#82c2ff",
    },
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: "10px",
  },
}));

export default function Login({
  onLoginSuccess,
  onSignUpClick,
  signUpSuccess,
}) {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorText, setErrorText] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("http://52.79.82.218:8000/user/login", {
        email,
        password,
      });
      const { accessToken } = response.data;
      localStorage.setItem("accessToken", accessToken);
      onLoginSuccess();
    } catch (error) {
      console.error("Login error:", error);
      setErrorText(`Error code: ${error.response.data.message}, Login failed.`);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form className={classes.form} onSubmit={handleLogin}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Log In
          </Button>
          <Grid container>
            <Grid item xs></Grid>
            <Grid item>
              <Link href="#" variant="body2" onClick={onSignUpClick}>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
          <div className="error__alert" style={{ marginTop: "20px" }}>
            {signUpSuccess && (
              <Alert
                variant="outlined"
                severity="success"
                onClose={() => setSignUpSuccess(false)}
              >
                Sign up success!
              </Alert>
            )}
            {errorText && (
              <Alert
                variant="outlined"
                severity="error"
                onClose={() => setErrorText("")}
              >
                {errorText}
              </Alert>
            )}
          </div>
        </form>
      </div>
    </Container>
  );
}

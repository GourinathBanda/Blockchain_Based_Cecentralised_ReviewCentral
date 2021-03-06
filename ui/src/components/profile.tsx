import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { Link } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
// import { gql, useMutation } from '@apollo/client';
import { useCookies } from "react-cookie";
import AppBar from './appbar';
import { gql, useQuery, useReactiveVar } from '@apollo/client';

const USER = gql`
  query User {
    user {
        firstName
        middleName
        lastName
        email
        number
    }
  }
`;
// const REGISTER = gql`
//   mutation CreateUser($firstName: String!, $middleName: String!, $lastName: String!, $email: String!, $password: String!, $number: String!) {
//     createUser(input: {
//       firstName: $firstName,
//       middleName: $middleName,
//       lastName: $lastName,
//       email: $email,
//       password: $password,
//       number: $number})
//     }
// `;



function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Review Central
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


function Register() {
  const classes = useStyles();
  // const [_, setCookie] = useCookies(["user"]);

  // const [register] = useMutation(REGISTER, {
  //   onCompleted(data) {
  //     // localStorage.setItem("token",data.createUser)
  //     setCookie("user", data.createUser, {      
  //       path: "/",
  //       // secure: true
  //       sameSite: 'strict'
  //     });
  //   }
  // });

  const { loading, error, data } = useQuery(USER);
  console.log(data)

  const handleSubmit = (event: any) => {
    event.preventDefault()
    // register({
    //   variables: {
    //     firstName: event.target.firstName.value,
    //     middleName: "",
    //     lastName: event.target.lastName.value,
    //     email: event.target.email.value,
    //     password: event.target.password.value,
    //     number: event.target.number.value
    //   }
    // })
    console.log("update data")
  }

  if(loading) {
    return (
      <div>
        <AppBar/>
        <div>Loading ...</div>  
      </div>
    )
  }

  return (
    <div>
      <AppBar />
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Hey User Name
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                value={data.user.firstName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="MiddleName"
                label="Middle Name"
                name="middleName"
                autoComplete="mname"
                value={data.user.middleName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                value={data.user.lastName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={data.user.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="number"
                label="Phone Number"
                name="number"
                autoComplete="number"
                value={data.user.number}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/login" variant="body2">
              Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
    </div>
  );
}

export default Register
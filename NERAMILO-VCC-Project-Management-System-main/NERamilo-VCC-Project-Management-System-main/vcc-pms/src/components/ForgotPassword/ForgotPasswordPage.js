import React, {useState} from "react";
import { Link } from "react-router-dom";
import { Container, Paper, Grid, TextField, Button, Typography } from "@mui/material";
import { useNavigate} from "react-router-dom";
import { emailVerify } from '../../actions/auth';
import Logo from "./Logo";
import useStyles from './styles';
import { motion } from "framer-motion";
import { RootStyle, HeadingStyle, ContentStyle, fadeInUp } from "./styles2";

const initialState = { email: ''};

const ForgotPasswordPage = () => {

    const classes = useStyles();
    const navigate = useNavigate();
    const [formData, setFormData] = useState(initialState);

    const handleSubmit = (e) => {
        e.preventDefault();
        emailVerify(formData, navigate)
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

  return (
    <RootStyle>
      <Container maxWidth="sm">
        <ContentStyle>
          <HeadingStyle component={motion.div} {...fadeInUp}>
            <Logo />
          </HeadingStyle>
          <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
            <form className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Grid container spacing={1}>
                    <>
                    <Grid xs={10} md={12}>
                        <Typography align="center"><strong>Verify Email</strong></Typography>
                        <TextField name="email" label="Enter Email" variant="outlined" required fullWidth="true" onChange={handleChange} type="text" autoFocus xs={6}/>
                    </Grid>
                    <Grid xs={10} md={12}> 
                    </Grid>
                    </>
                </Grid>
                <Button type="submit" fullWidth="true" variant="contained" color="primary" className="classes.submit">Send to Email</Button>
            </form>
            <Button component={Link} to="/loginpage" color="secondary">Log In?</Button>
            </Paper>
            </Container>
        </ContentStyle>
      </Container>
    </RootStyle>
    
  );
};

export default ForgotPasswordPage;
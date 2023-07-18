import React, {useState} from "react";
import { Link } from "react-router-dom";
import { Container, Paper, Grid, TextField, InputAdornment, IconButton, Button } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useDispatch } from 'react-redux';
import { useNavigate} from "react-router-dom";
import { signin } from '../../actions/auth';
import Logo from "./Logo";
import useStyles from './styles';
import { motion } from "framer-motion";
import { RootStyle, HeadingStyle, ContentStyle, fadeInUp } from "./styles2";

const initialState = { username: '', password: '' };

const Login = () => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);
    const [formData, setFormData] = useState(initialState);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(signin(formData, navigate))
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
                        <TextField name="username" label="Enter Username" variant="outlined" required fullWidth="true" onChange={handleChange} type="text" autoFocus xs={6}/>
                    </Grid>
                    <Grid xs={10} md={12}>
                    <TextField name="password" label='Enter Password' variant="outlined" fullWidth="true" required type={showPassword ? "text" : "password"} onChange={handleChange} 
                        InputProps={{
                            endAdornment: (
                            <InputAdornment position="end">
                                <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword}>
                                {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                </IconButton>
                            </InputAdornment>
                            )
                        }}
                    />   
                    </Grid>
                    </>
                </Grid>
                <Button type="submit" fullWidth="true" variant="contained" color="primary" className="classes.submit">Sign In</Button>
            </form>
            <Button component={Link} to="/forgotpasswordpage" color="secondary">Forgot Password?</Button>
            </Paper>
            </Container>
        </ContentStyle>
      </Container>
    </RootStyle>
    
  );
};

export default Login;
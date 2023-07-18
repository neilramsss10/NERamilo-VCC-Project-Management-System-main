import { AUTH } from '../constants/actionTypes';
import * as api from "../api";

export const signin = (formData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.signIn(formData);
        dispatch({ type: AUTH, data });
        navigate('/');
    } catch (error) {
        alert("Wrong credentials! Please try again.")
    }
}

export const emailVerify = async (formData, navigate) => {
    try {
      await api.emailVerify(formData);
      alert("Please check your email for verification.");
      navigate('/loginpage');
    } catch (error) {
      alert("User email does not exist!")
    }
  }

export const changePass = async (formData, email, navigate) => {
  try {
    await api.changePass(formData, email);
    alert("Passwords have been changed! Please login again");
    navigate('/loginpage');
  } catch (error) {
    alert("Error changing password, please try again!")
  }
}
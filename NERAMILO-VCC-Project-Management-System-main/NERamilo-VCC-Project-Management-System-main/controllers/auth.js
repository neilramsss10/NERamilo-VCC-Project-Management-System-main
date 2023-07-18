import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv'; 
import pool from '../db.js';
import nodemailer from 'nodemailer';
dotenv.config();

export const signin = async (req, res) => {
    const { username, password } = req.body;
    try {
        const existingUser = await pool.query(`SELECT * FROM users WHERE username= $1;`, [username])
        const user = existingUser.rows;
        if (user.length === 0) {
            res.status(400).json({
            error: "User not found!",
        });
        return;
        }
        else {
            bcrypt.compare(password, user[0].password, (err, result) => {
                if (err) {
                    res.status(500).json({
                    error: "Server error",
                });
                return;
                } else if (result === true) {
                    const token = jwt.sign({username: user[0].username, id: user[0].users_id },process.env.JWT_SECRET, {expiresIn: "1h"} );
                    res.status(200).json({
                        message: "User signed in!",
                        result: existingUser,
                        token: token,
                    });

                }
                else {
                    if (result != true)
                        res.status(400).json({
                            error: "Wrong credentials!",
                        });
                        return;
                    }
                })
            }
        } catch (err) {
            console.log(err);
            res.status(500).json({
            error: "Something went wrong!",
            });
         };
        return;
    };

export const emailverify = async (req, res) => {
    const { email } = req.body;
    const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    
    if (user.rows.length === 0) {
        return res.status(400).json({ message: 'Invalid email address' });
    }
    
    const timestamp = Date.now();
    const uniqueString = `${email}_${timestamp}`;
    const payload = { uniqueString };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    
    let link;
    if (process.env.NODE_ENV === 'production') {
        link = `${process.env.APP_URL}changepasswordpage?redirect=true&email=${email}&token=${token}`;
    } else {
        link = `http://localhost:3000/changepasswordpage?redirect=true&email=${email}&token=${token}`;
    }
    
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
    });
    
    const mailOptions = {
        from: process.env.SMTP_USER,
        to: email,
        subject: 'Verify your email',
        html: `<p>Hi,</p><p>Click <a href="${link}">here</a> to change your password.</p>`,
    };
    
    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to send email' });
        }
    };

export const changepass = async (req, res) => {
    const { formData, email } = req.body;
    const password = formData.password;
    const userEmail = email.email;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    let updatePassword;
    try {
        updatePassword = await pool.query("UPDATE users SET password = $1 WHERE email = $2", [hashedPassword, userEmail]);
        res.status(200).json({ message: 'Password updated successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error changing password!' });
    }
}


/* export const signup  =  async (req, res) => {
    const { is_admin, role, username, password } =  req.body;
    console.log(req.body);
    try {
    const  data  =  await pool.query(`SELECT * FROM users WHERE username= $1;`, [username]);
    const  arr  =  data.rows;
    if (arr.length  !=  0) {
    return  res.status(400).json({
    error: "Email already there, No need to register again.",
    });
    }
    else {
    bcrypt.hash(password, 10, (err, hash) => {
    if (err)
    res.status(err).json({
    error: "Server error",
    });
    const  user  = {
    is_admin,
    role,
    username,
    password: hash,
    };
    var  flag  =  1; //Declaring a flag
    
    Inserting data into the database
    
    pool.query(`INSERT INTO users (is_admin, role, username, password) VALUES ($1,$2,$3,$4);`, [user.is_admin, user.role, user.username, user.password], (err) => {
    
    if (err) {
    flag  =  0; //If user is not inserted is not inserted to database assigning flag as 0/false.
    console.error(err);
    return  res.status(500).json({
    error: "Database error"
    })
    }
    else {
    flag  =  1;
    res.status(200).send({ message: 'User added to database, not verified' });
    }
    })
    if (flag) {
    const token  = jwt.sign( //Signing a jwt token
    {
    username: user.username
    },
    process.env.ACCESS_TOKEN_SECRET
    );
    };
    });
    }
    }
    catch (err) {
    console.log(err);
    res.status(500).json({
    error: "Database error while registring user!", //Database connection error
    });
    };
    } */
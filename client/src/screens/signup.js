import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {Link,useHistory} from 'react-router-dom'

const useStyles = makeStyles({
  root: {
    maxWidth: "500px",
    margin: "50px auto"
  },
  content: {
    textAlign: "center",
    padding: "10%"
  },
  text: {
    marginTop: "10%"
  }
})

export default function Signup() {
  const classes = useStyles();
  const [username,setUser] = useState("")
  const [password,setPass] = useState("")
  const [email,setMail] = useState("")
  let history = useHistory()

  const PostData = () => {
    fetch("http://localhost:5000/signup",{
      method:"post",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        name:username,
        password,
        email
      })
    }).then(res=>res.json())
    .then((data=>{
      console.log(data.message)
      if(data.message === "New Account Created!"){
        history.push('/signin')
      }
    }))
  }

  return (
    <Card className={classes.root}>
      <CardContent className={classes.content}>
        <Typography variant="h4" >Create Account</Typography>
        <div className={classes.text}>
          <TextField
            id="username"
            label="Username"
            value={username}
            onChange={e => setUser(e.target.value)}
            fullWidth={true}
          />
        </div>
        <div className={classes.text}>
          <TextField
            id="email"
            label="Email Id"
            value={email}
            onChange={e => setMail(e.target.value)}
            fullWidth={true}
          />
        </div>
        <div className={classes.text}>
          <TextField
            id="password"
            label="Password"
            type="password"
            value={password}
            onChange={e => setPass(e.target.value)}
            fullWidth={true}
          />
        </div>
        <div className={classes.text}>
          <Button variant="contained" color="primary" onClick={()=>PostData()}>
            Sign up
          </Button>
        </div>
        <div className={classes.text}>
          <Link to="/signin">Already have an account?</Link>
        </div>
      </CardContent>
    </Card>
  );
}

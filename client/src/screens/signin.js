import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {Link, useHistory} from 'react-router-dom'

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
  const [password,setPass] = useState("")
  const [email,setMail] = useState("")
  let history = useHistory()

  const PostData = () => {
    fetch("http://localhost:5000/signin",{
      method:"post",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        password,
        email
      })
    }).then(res=>res.json())
    .then((data=>{
      console.log(data)
      if(data.error){
        return console.log(data.error)
      }
      localStorage.setItem("jwt",data.token)
      localStorage.setItem("user",JSON.stringify(data.user))
      history.push("/")
    }))
  }

  return (
    <Card className={classes.root}>
      <CardContent className={classes.content}>
        <Typography variant="h4" >Login</Typography>
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
            Sign in
          </Button>
        </div>
        <div className={classes.text}>
            <Link to="/signup">Don't have an account?</Link>
        </div>
      </CardContent>
    </Card>
  );
}

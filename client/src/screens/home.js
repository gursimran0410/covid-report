import React,{useEffect, useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import {useHistory} from 'react-router-dom'


const useStyles = makeStyles((theme) => ({
    root: {
      textAlign: "center",
      padding: "2.5%",
      margin: "20px auto",
      maxWidth: "600px",
      backgroundColor: "#ffefa0"
    },
    gcard: {
    },
    tablecard: {
        maxWidth: "1300px",
        margin: "20px auto"
    },
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    button: {
        position: "absolute"
    }
  }))

const Home = () => {
    const [gcase,setGdata] = useState({})
    const [ccase,setCdata] = useState([])
    const [msg,setMsg] = useState("")
    const classes = useStyles()
    const history = useHistory()

    const logout = () => {
        localStorage.clear()
        window.location.reload(false)
    }
       
    useEffect(() => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${localStorage.getItem("jwt")}`);
        var requestOptions = {
            method: 'GET',
            headers: myHeaders
        }
        fetch("http://localhost:5000/protected",requestOptions)
        .then(response => response.json())
        .then(result => {
            if(result.error === "You Must Be Logged In!"){
                history.push('/signin')
            }
            setGdata(result.Global)
            setCdata(result.Countries)
        })
        .catch(error => console.log('error', error))
    },[])

    return(
        <div>
            <Button variant="contained" color="primary" className={classes.button} onClick={() => logout()}>Log Out</Button>
            <Card className={classes.root}>
                <Typography variant="h4" >Global Cases</Typography>
                <CardContent className={classes.gcard}>
                    <h4>Active Cases</h4>    
                    <div>{JSON.stringify(gcase.TotalConfirmed - gcase.TotalDeaths - gcase.TotalRecovered)}</div>
                </CardContent>
                <CardContent className={classes.gcard}>
                    <h4>Total Cases</h4>    
                    <div>{JSON.stringify(gcase.TotalConfirmed)}</div>
                </CardContent>
                <CardContent className={classes.gcard}>
                    <h4>Total Deaths</h4>    
                    <div>{JSON.stringify(gcase.TotalDeaths)}</div>
                </CardContent>
            </Card>
            <Card className={classes.tablecard}>
                <TableContainer component={Paper}>
                    <Table stickyHeader aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell><Typography variant="h5">Country</Typography></TableCell>
                                <TableCell align="center"><Typography variant="h5">Active&nbsp;Cases</Typography></TableCell>
                                <TableCell align="center"><Typography variant="h5">Total&nbsp;Cases</Typography></TableCell>
                                <TableCell align="center"><Typography variant="h5">Recovered</Typography></TableCell>
                                <TableCell align="center"><Typography variant="h5">Deaths</Typography></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {ccase.map((row) => (
                                <TableRow key={row.CountryCode}>
                                    <TableCell component="th" scope="row" >
                                        {row.Country}
                                    </TableCell>
                                    <TableCell align="center">{row.TotalConfirmed - row.TotalRecovered - row.TotalDeaths}</TableCell>
                                    <TableCell align="center">{row.TotalConfirmed}</TableCell>
                                    <TableCell align="center">{row.TotalRecovered}</TableCell>
                                    <TableCell align="center">{row.TotalDeaths}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>
        </div>
    )
}

export default Home
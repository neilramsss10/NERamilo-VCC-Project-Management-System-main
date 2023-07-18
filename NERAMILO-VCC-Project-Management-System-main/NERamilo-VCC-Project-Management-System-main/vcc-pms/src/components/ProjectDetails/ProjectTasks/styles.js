import { makeStyles } from '@mui/styles';

export default makeStyles(() => ({
    mainContainer: {
      display: 'flex',
      alignItems: 'center',
    },
    actionDiv: {
      textAlign: 'center',
    },
    appBar: {
      borderRadius: 0,
      margin: '5px 0px',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      width: 350,
    },
    heading: {
      fontFamily: 'monospace',
      fontWeight: 600,
      fontSize: 25,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    paper: {
      height: 650,
      width: 350,
      backgroundColor: "white"
    },
  }));
import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
      heading: {
      borderRadius: 0,
      margin: '5px 59px',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      width: 250,
      fontFamily: 'rockwell',
      fontWeight: 600,
      fontSize: 30
      },
      gridContainer: {
        [theme.breakpoints.down('xs')]: {
          flexDirection: 'column-reverse',
        },  
      },
      box: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
      },
}));
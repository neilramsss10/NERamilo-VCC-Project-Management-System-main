import { makeStyles } from '@mui/styles';

export default makeStyles((theme  ) => ({
      heading: {
      borderRadius: 0,
      margin: '5px 59px 20px',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      width: 250,
      fontFamily: 'rockwell',
      fontWeight: 600,
      fontSize: 30,
      },
      appBarSearch: {
        borderRadius: 0,
        marginBottom: '1rem',
        display: 'flex',
        padding: '16px',
      },
      pagination: {
        borderRadius: 0,
        marginTop: '1rem',
        padding: '16px',
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
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      },
}));
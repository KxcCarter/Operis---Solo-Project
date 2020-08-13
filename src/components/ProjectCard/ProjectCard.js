import React from 'react';
// from 'Cooler Card' - trying to get the cool mouseover action
import cx from 'clsx';
import { useSoftRiseShadowStyles } from '@mui-treasury/styles/shadow/softRise';

//
import { connect, useDispatch } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { useHistory } from 'react-router-dom';

// --- Material-UI
import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid, Paper, Typography, Button } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  card: {
    width: 300,
    padding: 5,
    margin: 5,
  },
  cells: {
    padding: 3,
  },
  image: {
    justify: 'flex-start',
    alignItems: 'flex-start',
  },
  body: {
    direction: 'row',
    justify: 'flex-start',
    alignItems: 'center',
    padding: 5,
    margin: 5,
  },
}));

const ProjectCard = (props) => {
  const dispatch = useDispatch();
  const cardStyles = useStyles();
  //
  // This causes the little lift on hover, but it disables the card elevation look.
  const shadowStyles = useSoftRiseShadowStyles();

  //

  const history = useHistory();

  const handleClick = () => {
    // dispatch({ type: 'GET_PROJECT_DETAILS', payload: props.id });

    history.push(`/projectDetails/${props.id}`);
  };

  return (
    <Paper
      variant="outlined"
      elevation={3}
      className={cx(cardStyles.card, shadowStyles.root)}
    >
      <Typography variant="h5">{props.title}</Typography>
      <Grid container>
        <Grid item sm={6} className={cardStyles.cells}>
          <img src={props.image} alt="THIS IS ALT TEXT! WOW!"></img>
        </Grid>
        <Grid item sm={6} className={cardStyles.cells}>
          <Typography variant="body1">{props.description}</Typography>
        </Grid>
      </Grid>

      {/* <Typography variant="h4">{props.title}</Typography>
            <Typography variant="body1">{props.description}</Typography>
            <Box className={cardStyles.image}>
              <img src={props.image} alt="THIS IS ALT TEXT! WOW!"></img>
            </Box> */}

      <Grid container spacing={3} justify="space-between">
        <Grid item sm={8}>
          <Box ml={1}>
            <Typography variant="subtitle1">
              {toString(props.isCompleted)}
            </Typography>
            <Typography variant="subtitle1">
              {toString(props.isStaffed)}
            </Typography>
          </Box>
        </Grid>
        <Grid item sm={3}>
          <Button size="small" variant="contained" onClick={handleClick}>
            Open Project
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};
export default connect(mapStoreToProps)(ProjectCard);

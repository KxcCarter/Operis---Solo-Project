import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { useDispatch } from 'react-redux';

// --- Material-UI
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Box, Grid, Paper, Typography } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  card: {
    width: 180,
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
  const cardStyles = useStyles();

  return (
    <Grid item xs={12} sm={4}>
      <div className="clickableContainer">
        <Paper elevation={3}>
          <Box className={cardStyles.card}>
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
            <Typography variant="subtitle1">
              {toString(props.isCompleted)}
            </Typography>
          </Box>
        </Paper>
      </div>
    </Grid>
  );
};
export default connect(mapStoreToProps)(ProjectCard);

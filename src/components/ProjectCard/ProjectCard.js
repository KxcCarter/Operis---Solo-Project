import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { useHistory } from 'react-router-dom';

// --- Material-UI
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
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
  const cardStyles = useStyles();
  const history = useHistory();

  const handleClick = () => {
    history.push(`/projectDetails/${props.id}`);
  };

  return (
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
        </Box>
      </Paper>
    </div>
  );
};
export default connect(mapStoreToProps)(ProjectCard);

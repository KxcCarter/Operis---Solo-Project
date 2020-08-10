import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { useDispatch } from 'react-redux';

// --- Material-UI
import Container from '@material-ui/core/Container';
import { Box, Grid, Paper, Typography } from '@material-ui/core';

const TestCard = (props) => {
  const dispatch = useDispatch();
  //   const fireDispatch = dispatch({ type: 'GET_PROJECTS' });

  useEffect(dispatch({ type: 'GET_PROJECTS' }), []);

  return (
    <Box>
      <Paper>
        <Typography variant="h4">THIS IS THE TITLE</Typography>
        <Typography variant="body1">THIS IS THE DESCRIPTION</Typography>
        {/* <img src={blaBLAH} alt="THIS IS ALT TEXT"></img> */}
        <Typography variant="subtitle1">THIS IS A NOTE</Typography>
      </Paper>
    </Box>
  );
};
export default connect(mapStoreToProps)(TestCard);

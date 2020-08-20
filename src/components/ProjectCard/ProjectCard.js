import React, { useState } from 'react';
// from 'Cooler Card' - trying to get the cool mouseover action
import cx from 'clsx';
import { useSoftRiseShadowStyles } from '@mui-treasury/styles/shadow/softRise';

//
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { useHistory } from 'react-router-dom';

// --- Material-UI
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  Checkbox,
  CircularProgress,
} from '@material-ui/core';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

const useStyles = makeStyles(() => ({
  card: {
    width: '95%',
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
  // This causes the little lift on hover, but it disables the card elevation look.
  const shadowStyles = useSoftRiseShadowStyles();
  //
  const [checked, setChecked] = useState(false);

  const handleClick = () => {
    history.push(`/projectDetails/${props.id}`);
  };

  const statusYes = '#00a819';
  const statusNo = '#b60c0c';

  return (
    <>
      {!props.id && <CircularProgress />}
      {props.id && (
        <Paper
          variant="outlined"
          elevation={3}
          className={cx(cardStyles.card, shadowStyles.root)}
        >
          <Box display="flex" justifyContent="space-between">
            <Typography variant="h5">{props.title}</Typography>
            <Checkbox
              size="small"
              checked={checked}
              onChange={() => setChecked(!checked)}
            />
          </Box>
          <Grid container>
            <Grid item sm={6} className={cardStyles.cells}>
              <img src={props.image} alt={props.title}></img>
            </Grid>
            <Grid item sm={6} className={cardStyles.cells}>
              <Typography align="left" variant="body1">
                {props.description.substring(0, 120)} ...
              </Typography>
            </Grid>
          </Grid>

          <Grid container spacing={3} justify="space-between">
            <Grid item sm={8}>
              <Box align="left">
                <Typography variant="subtitle1">
                  <FiberManualRecordIcon
                    fontSize="small"
                    htmlColor={props.isCompleted ? statusYes : statusNo}
                  />
                  Completion Status
                </Typography>

                <Typography variant="subtitle1">
                  <FiberManualRecordIcon
                    fontSize="small"
                    htmlColor={props.isStaffed ? statusYes : statusNo}
                  />
                  Staffing Status
                </Typography>
              </Box>
            </Grid>
            <Grid item sm={3}>
              <Button variant="text" onClick={handleClick}>
                <OpenInNewIcon />
              </Button>
            </Grid>
          </Grid>
        </Paper>
      )}
    </>
  );
};
export default connect(mapStoreToProps)(ProjectCard);

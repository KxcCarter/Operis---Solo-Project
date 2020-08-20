import React from 'react';
import { connect } from 'react-redux';
import LogOutButton from '../../components/LogOutButton/LogOutButton';
import mapStoreToProps from '../../redux/mapStoreToProps';
import styles from './UserPage.module.css';
import { Box } from '@material-ui/core';

// this could also be written with destructuring parameters as:
// const UserPage = ({ user }) => (
// and then instead of `props.user.username` you could use `user.username`
const UserPage = (props) => {
  return (
    <div>
      {/* <Box className={styles.imageContainer}>
        <div className={styles.imageText}>OPERIS</div>
      </Box> */}
      <h1 id="welcome">Welcome, {props.store.user.username}!</h1>
      <p>Your ID is: {props.store.user.id}</p>
      <LogOutButton className="log-in" />
    </div>
  );
};

// this allows us to use <App /> in index.js
export default connect(mapStoreToProps)(UserPage);

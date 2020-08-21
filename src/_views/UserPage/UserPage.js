import React from 'react';
import { connect } from 'react-redux';
import LogOutButton from '../../components/LogOutButton/LogOutButton';
import mapStoreToProps from '../../redux/mapStoreToProps';

const UserPage = (props) => {
  return (
    <div>
      <h1 id="welcome">Welcome, {props.store.user.username}!</h1>
      <p>Your ID is: {props.store.user.id}</p>
      <LogOutButton className="log-in" />
    </div>
  );
};

export default connect(mapStoreToProps)(UserPage);

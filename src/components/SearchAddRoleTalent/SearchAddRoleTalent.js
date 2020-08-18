import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  paper: {
    marginRight: theme.spacing(2),
  },
}));

export default function SearchAddRoleTalent(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [list, setList] = useState([]);
  const anchorRef = React.useRef(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    setList(
      props.talentPool.filter((el) => el.name.includes(event.target.value))
    );
    setOpen(true);
  };

  const clickAway = () => {
    setSearchQuery('');
    // setList([]);
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <TextField
          id="outlined-basic"
          size="small"
          value={searchQuery}
          label="Search for talent"
          variant="outlined"
          autoComplete="off"
          onBlur={clickAway}
          onChange={handleSearch}
        />

        <MenuList>
          {list.slice(0, 5).map((item, index) => {
            return (
              <MenuItem
                key={item.id}
                onClick={props.handleTalentAssign(item.id)}
              >
                {item.name}
              </MenuItem>
            );
          })}
        </MenuList>
      </Paper>
    </div>
  );
}

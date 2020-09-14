import React from 'react';

import { Typography } from '@material-ui/core';

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

const InfoPage = () => (
  <div className="grid">
    <div className="grid-col grid-col_8">
      <Typography variant="h6">
        Operis - <em>from the Latin "work"</em> - is a project managment
        application geared toward filmmakers.
      </Typography>
      <br></br>
      <Typography variant="body1">
        Users can create projects starting with something as simple as just a
        title. From there they can add more details to their project, such as a
        description, notes, and even a custom image from either their computer
        or from the web.
      </Typography>
      <br></br>
      <Typography variant="body1">
        Each project can be assigned project roles, such as director, writer, or
        producer. Users can then assign people to those roles by searching
        through their talent pool. Users can also add people to their talent
        pool via the Talent Pool page.
      </Typography>
      <br></br>
      <Typography variant="body1">
        Projects can also have tasks associated with them, which the user can
        edit, mark as complete, or delete.
      </Typography>
    </div>
  </div>
);

export default InfoPage;

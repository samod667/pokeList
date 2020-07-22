import React from "react";

import classes from './Pagination.module.css'

export default function ({ next, prev, show }) {
  return (
    <div className={classes.Pagination}>
      {show !== null && (
        <button className={classes.Button} onClick={prev}>
          Previous
        </button>
      )}

      <button className={classes.Button} onClick={next}>
        Next
      </button>
    </div>
  );
}

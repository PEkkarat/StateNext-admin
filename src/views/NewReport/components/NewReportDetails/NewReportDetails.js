import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  // CardHeader,
  CardContent,
  CardActions,
  Divider,
  Button,
  TextField,
  Typography,

} from '@material-ui/core';
import { Grid } from '@material-ui/core';
import UploadButtons from './components/UploadButtons';

const useStyles = makeStyles(theme => ({
  root: {},
  row: {
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1)
  },
  Button: {
    justifyContent: "end"
  },
}));

const NewReportDetails = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const [values, setValues] = useState({
    password: '',
    confirm: ''
  });

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <form>

        <CardContent>
          {/* <TextField
            fullWidth
            label="Password"
            name="password"
            onChange={handleChange}
            type="password"
            value={values.password}
            variant="outlined"
          /> */}
          
          <Grid
            container
            spacing={4}
          >
            <Grid
              item
              md={12}
              xs={12}
            >
              <Typography
                variant="h5">
                เรื่องร้องเรียน / ข้อเสนอแนะ
              </Typography>
            </Grid>

            <Grid
              item
              md={12}
              xs={12}
            >
              <TextField fullWidth multiline
                rows="4" id="outlined-multiline-static"
                label="ให้ข้อเสนอแนะ หรือแชร์ประสบการณ์ของคุณกับเรา อะไรที่ดี อะไรที่น่าจะดีกว่านี้ ?.."
                variant="outlined" />

            </Grid>
          </Grid>

          <Grid
            item
            md={12}
            xs={12}
          >
            <CardActions>
              <UploadButtons />
            </CardActions>

          </Grid>

        </CardContent>
        <Divider />
        <CardActions>

          <Button
            color="primary"
            variant="outlined"
          >
            ส่ง
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};

NewReportDetails.propTypes = {
  className: PropTypes.string
};

export default NewReportDetails;

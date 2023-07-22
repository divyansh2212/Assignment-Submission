import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import isEmail from 'validator/lib/isEmail';
import isMobilePhone from 'validator/lib/isMobilePhone';

import {
  TextField,
  Button,
  Container,
  Grid,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';

const FirstPage: React.FC<{ setCompletedSteps: React.Dispatch<React.SetStateAction<boolean>> }> = ({ setCompletedSteps }) => {
  const history = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    email: '',
  });

  useEffect(() => {
    try {
      const data = localStorage.getItem("data");
      setCompletedSteps(false);
      if (data) {
        const parsedData = JSON.parse(data);
        setFormData(parsedData);
      }
    } catch (error) {
      console.log(error)
    }
  }, []);


  useEffect(() => {
    setTimeout(() => {
      const data = JSON.stringify(formData);
      localStorage.setItem("data", data);
    }, 10);
  }, [formData]);

  const [errors, setErrors] = useState({
    name: '',
    phoneNumber: '',
    email: '',
  });

  const [showPopup, setShowPopup] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const newErrors: { [key: string]: string } = {};

    if (formData.name.trim() === '') {
      newErrors.name = 'Name is required';
      setShowPopup(true)
      return
    }
    if (formData.email.trim() === '' || isEmail(formData.email) === false) {
      newErrors.email = 'Email is required';
      setShowPopup(true)
      return
    }
    if (formData.phoneNumber.trim() === '' || isMobilePhone(formData.phoneNumber) === false) {
      newErrors.phoneNumber = 'Phone number is required';
      setShowPopup(true)
      return
    }

    localStorage.setItem('userDetails', JSON.stringify(formData));
    setCompletedSteps(true);
    history('/second');
  };

  return (
    <Container>
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12}>
          <Typography variant="h1" align="center">
            Welcome to the First Page!
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              error={Boolean(errors.name)}
              helperText={errors.name}
              fullWidth
              required
            />
            <TextField
              label="Phone Number"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              error={Boolean(errors.phoneNumber)}
              helperText={errors.phoneNumber}
              fullWidth
              required
            />
            <TextField
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              error={Boolean(errors.email)}
              helperText={errors.email}
              fullWidth
              required
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Continue to Second Page
            </Button>
          </form>
        </Grid>
      </Grid>

      <Dialog open={showPopup} onClose={() => setShowPopup(false)}>
        <DialogTitle>Invalid Form Submission</DialogTitle>
        <DialogContent>
          <Typography>Please fill the valid details for proceeding to the second page.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowPopup(false)} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default FirstPage;

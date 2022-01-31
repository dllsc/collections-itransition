import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { axiosInstance } from '../../axios-instance';
import { ErrorMessage } from '@hookform/error-message';
import { appHistory } from '../../utils/history.utils';
import { Button, TextField } from '@mui/material';
import './registration.component.css';

type RegistrationForm = {
  email: string,
  password: string,
  repeatPassword: string;
  fullName: string;
};


export default function Registration() {
  const { register, handleSubmit, formState: { errors }, getValues, setError } = useForm<RegistrationForm>();
  const onSubmit: SubmitHandler<RegistrationForm> = data => {
    axiosInstance
      .post('auth/registration', data)
      .then(e => e.statusText === 'Created' && appHistory.push('/login')).catch(error => {
      if (error.response) {
        setError('email', { type: error, message: error.response.data.message });
      }
    });
  };

  const [pressed, setPressed] = useState(false);

  const REQUIRE_MESSAGE = 'This is required';

  const icon = pressed ? <Visibility/> : <VisibilityOff/>;

  const optionsPassword = <span
    onMouseDown={() => setPressed(true)}
    onMouseUp={() => setPressed(false)}>
          {icon}
        </span>;

  const marginBottom = 15;

  return (<div className="registration">
      <form onSubmit={handleSubmit(onSubmit)}
            className="registration__form">

        <h1 className="registration__header">Registration</h1>

        <TextField
          {...register('email', {
            pattern: { value: /$^|.+@.+..+/, message: 'invalid' },
            required: REQUIRE_MESSAGE,
          })}
          style={{ marginBottom }}
          label="email"
          error={!!errors.email}
          helperText={<ErrorMessage errors={errors}
                                    name="email"/>}
        />


        <TextField style={{ marginBottom }}
                   {...register('fullName', { required: REQUIRE_MESSAGE })}
                   label="fullName"
                   error={!!errors.fullName}
                   helperText={<ErrorMessage errors={errors}
                                             name="fullName"/>}/>


        <TextField style={{ marginBottom }}  {...register('password', { required: REQUIRE_MESSAGE })}
                   label="Password"
                   type={pressed ? 'text' : 'password'}
                   InputProps={{ endAdornment: optionsPassword }}
                   error={!!errors.password}
                   helperText={<ErrorMessage errors={errors}
                                             name="password"/>}
        />


        <TextField style={{ marginBottom }}  {...register('repeatPassword', {
          validate: v => v === getValues().password || 'The passwords do not match',
          required: REQUIRE_MESSAGE,
        })}
                   label="repeatPassword"
                   type={pressed ? 'text' : 'password'}
                   InputProps={{ endAdornment: optionsPassword }}
                   error={!!errors.repeatPassword}
                   helperText={<ErrorMessage errors={errors}
                                             name="repeatPassword"/>}
        />


        <Button color={'primary'}
                variant={'outlined'}
                className="registration__button"
                type="submit">REGISTER</Button>

      </form>
    </div>
  );
}

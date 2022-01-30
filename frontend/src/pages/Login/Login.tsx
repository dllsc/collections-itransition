import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { MatButton } from '../imports-material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { axiosInstance } from '../../axios-instance';
import { ErrorMessage } from '@hookform/error-message';
import { appHistory } from '../../utils/history.utils';
import { saveCredentialItems } from '../../utils/login.utils';
import { TextField } from '@mui/material';
import './login.component.css';

type RegistrationForm = {
  email: string,
  password: string,
  repeatPassword: string;
  fullName: string;
};

interface IToken {
  accessToken: string;
  userId: number;
}

const marginBottom = 15;

export default function Login() {
  const { register, handleSubmit, formState: { errors }, setError } = useForm<RegistrationForm>();
  const onSubmit: SubmitHandler<RegistrationForm> = data => {
    console.log(data);
    axiosInstance
      .post<IToken>('auth/login', data)
      .then(result => saveLoginDataAndGoToCollections(result.data.accessToken, result.data.userId)).catch(error => {
      console.log(error);
      if (error.response) {
        setError('email', { type: error, message: error.response.data.message });
      }
    });
  };

  function saveLoginDataAndGoToCollections(token: string, userId: number) {
    saveCredentialItems(token, userId);
    appHistory.push('/collection/all/0/0');
  }

  const [pressed, setPressed] = useState(false);
  const icon = pressed ? <Visibility/> : <VisibilityOff/>;
  const optionsPassword = <span onMouseDown={() => setPressed(true)}
                                onMouseUp={() => setPressed(false)}>
          {icon}
        </span>;

  const REQUIRE_MESSAGE = 'This is required';


  return <div className="login">
    <form onSubmit={handleSubmit(onSubmit, () => {})}
          className="login__form">
      <h1 className="login__button">Login</h1>

      <TextField {...register('email', {
        pattern: { value: /$^|.+@.+..+/, message: 'invalid' },
        required: REQUIRE_MESSAGE,
      })}
                 style={{ marginBottom }}
                 label="Email"
                 name="email"
                 error={!!errors.email}
                 helperText={<ErrorMessage errors={errors}
                                           name="email"/>}
      />


      <TextField {...register('password', { required: REQUIRE_MESSAGE })}
                 label="Password"
                 name="password"
                 type={pressed ? 'text' : 'password'}
                 InputProps={{ endAdornment: optionsPassword }}
                 style={{ marginBottom }}
                 error={!!errors.password}
                 helperText={<ErrorMessage errors={errors}
                                           name="password"/>
                 }
      />

      <MatButton className="login__button"
                 variant={'outlined'}
                 type="submit">Login</MatButton>

    </form>
  </div>;
}

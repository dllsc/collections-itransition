import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { MatButton, MatInput } from '../imports-material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { axiosInstance } from '../../axios-instance';
import { ErrorMessage } from '@hookform/error-message';
import { appHistory } from '../../utils/history.utils';
import { saveCredentialItems } from '../../utils/login.utils';

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


export default function Login() {
  const { register, handleSubmit, formState: { errors }, setError, getValues } = useForm<RegistrationForm>();
  const onSubmit: SubmitHandler<RegistrationForm> = data => {
    axiosInstance
      .post<IToken>('auth/login', data)
      .then(result => saveLoginDataAndGoToCollections(result.data.accessToken, result.data.userId)).catch(error => {
      if (error.response) {
        setError('email', { type: error, message: error.response.data.message })
      }
    });
  };

  function saveLoginDataAndGoToCollections(token: string, userId: number) {
    saveCredentialItems(token, userId);
    appHistory.push('/collection/read/0/10');
  }
  const [pressed, setPressed] = useState(false);
  const icon = pressed ? <Visibility/> : <VisibilityOff/>;
  const optionsPassword = <span onMouseDown={() => setPressed(true)}
                                onMouseUp={() => setPressed(false)}>
          {icon}
        </span>;

  const REQUIRE_MESSAGE = 'This is required';


  return (

    <form onSubmit={handleSubmit(onSubmit)}
          className="form">
      <h1>Login</h1>

      <MatInput {...register('email', {
        pattern: { value: /$^|.+@.+..+/, message: 'invalid' },
        required: REQUIRE_MESSAGE,
      })}
                label="email"
                name="email"
      />
      <ErrorMessage errors={errors} name="email" as="p"/>


      <MatInput {...register('password', { required: REQUIRE_MESSAGE })}
                label="password"
                name="password"
                type={pressed ? 'text' : 'password'}
                InputProps={{ endAdornment: optionsPassword }}
      />
      <ErrorMessage errors={errors} name="password" as="p"/>

      <MatButton type="submit">Login</MatButton>

    </form>
  );
}

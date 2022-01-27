import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { MatButton, MatInput } from '../imports-material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { axiosInstance } from '../../axios-instance';
import { ErrorMessage } from '@hookform/error-message';
import { appHistory } from '../../utils/history.utils';

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
        setError('email', { type: error, message: error.response.data.message })
      }})
  };

  const [pressed, setPressed] = useState(false);

  const REQUIRE_MESSAGE = 'This is required';

  const icon = pressed ? <Visibility/> : <VisibilityOff/>;


  const optionsPassword = <span
    onMouseDown={() => setPressed(true)}
    onMouseUp={() => setPressed(false)}>
          {icon}
        </span>;
  return (
    <form onSubmit={handleSubmit(onSubmit)}
          className="form">

      <h1>Registration</h1>

      <MatInput {...register('email', {
        pattern: { value: /$^|.+@.+..+/, message: 'invalid' },
        required: REQUIRE_MESSAGE
      })}
                label="email"
      />
      <ErrorMessage errors={errors} name="email" as="p"/>

      <MatInput {...register('fullName', { required: REQUIRE_MESSAGE })}
                label="fullName"/>
      <ErrorMessage errors={errors} name="fullName" as="p"/>

      <MatInput {...register('password', { required: REQUIRE_MESSAGE })}
                label="Password"
                type={pressed ? 'text' : 'password'}
                InputProps={{ endAdornment: optionsPassword }}
      />
      <ErrorMessage errors={errors} name="password" as="p"/>

      <MatInput {...register('repeatPassword', {
        validate: v => v === getValues().password || 'The passwords do not match',
        required: REQUIRE_MESSAGE,
      })}
                label="repeatPassword"
                type={pressed ? 'text' : 'password'}
                InputProps={{ endAdornment: optionsPassword }}
      />
      <ErrorMessage errors={errors} name="repeatPassword" as="p"/>

      <MatButton type="submit">REGISTER</MatButton>

    </form>
  );
}

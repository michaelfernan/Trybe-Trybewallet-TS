import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUserEmail } from '../redux/actions';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateEmail = () => {
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!isValid) {
      setEmailError('Email inválido');
    } else {
      setEmailError('');
    }
  };

  const validatePassword = () => {
    if (password.length < 6) {
      setPasswordError('A senha deve ter pelo menos 6 caracteres');
    } else {
      setPasswordError('');
    }
  };

  const handleLogin = () => {
    if (isValidEmail && isValidPassword) {
      dispatch(setUserEmail(email));
      navigate('/carteira');
    }
  };

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidPassword = password.length >= 6;
  const isButtonDisabled = !isValidEmail || !isValidPassword;

  return (
    <div>
      <h1>Login</h1>
      <input
        type="email"
        data-testid="email-input"
        value={ email }
        onChange={ (e) => {
          setEmail(e.target.value);
          setEmailError('');
        } }
        onBlur={ validateEmail }
      />
      {emailError && <p>{emailError}</p>}
      <input
        type="password"
        data-testid="password-input"
        value={ password }
        onChange={ (e) => {
          setPassword(e.target.value);
          setPasswordError('');
        } }
        onBlur={ validatePassword }
      />
      {passwordError && <p>{passwordError}</p>}
      <button
        type="button"
        onClick={ handleLogin }
        disabled={ isButtonDisabled }
      >
        Entrar
      </button>
    </div>
  );
}

export default Login;

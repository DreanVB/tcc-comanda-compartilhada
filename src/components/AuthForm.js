import React, { useState } from 'react';
import loginIcon from '../assets/login.png';
import './AuthForm.css';


function AuthForm({onLogin}) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleToggleForm = () => {
    setIsLogin(!isLogin);
    setEmail('');
    setPassword('');
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(email, password);
  }


  return (
    <div className="auth-form-container">
      <div className={`panel`}>
        <div className="side-panel">
          <div className="icon-animated-container">
            <img src={loginIcon} alt="Login Icon" className="icon-animated" />
          </div>
          <h2>{"Bem - vindo"}</h2>
          <p>{"Acesse sua conta agora"}</p>
        </div>
        <div className="form-panel">
          <h2>{"ENTRAR"}</h2>
          <form onSubmit={handleSubmit}>
            <label>
              <i className="icon email-icon"></i>
              <input
                type="email"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
            <label>
              <i className="icon password-icon"></i>
              <input
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
            <button type="submit" className="submit-btn">
              {"Entrar"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AuthForm;

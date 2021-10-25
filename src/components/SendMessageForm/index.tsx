import { useContext, useEffect, useState } from 'react';
import { VscGithubInverted, VscSignOut } from 'react-icons/vsc';
import { AuthContext } from '../../contexts/auth';
import { api } from '../../services/api';
import styles from './style.module.scss';
import { useAlert } from 'react-alert'

export function SendMessageForm(){

 

  const {user, signOut} = useContext(AuthContext);

  const [message, setMessage] = useState('');
  const alert = useAlert()
  

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if(message.trim()){
      try{
        await api.post('/messages', {message});
        setMessage('');
        alert.removeAll();
        alert.success('Mensagem enviada com sucesso!',{
          
        })
      }catch(err){
        console.log('Oh look, an alert!')
      }
  }else{
    alert.show('Preencha uma mensagem');
  }
}
  return (
    <div className={styles.sendMessegeFormWrapper}>
      <button className={styles.signOutButton} onClick={signOut}>
        <VscSignOut size="32"/>
      </button>

      <header className={styles.userInformation}>
        <div className={styles.userImage}>
          <img src={user?.avatar_url} alt={user?.name}/>
        </div>
        <strong className={styles.userName}>{user?.name}</strong>
        <span className={styles.userGithub}>
            <VscGithubInverted size="16"/>
            {user?.login}
        </span>
      </header>

      <form onSubmit={handleSubmit} className={styles.sendMessegeForm}>
        <label htmlFor="message">
          Mensagem
        </label>
        <textarea name="message" id="message" placeholder="Mensagem" onChange={e => setMessage(e.target.value)} value={message}> </textarea>
        <button type="submit">Enviar mensagem</button>
      </form>
    </div>
  )
}
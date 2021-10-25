import { useContext } from 'react';
import { LoginBox } from './components/LoginBox';
import { MessageList } from './components/MesssageList';
import { SendMessageForm } from './components/SendMessageForm';
import { AuthContext } from './contexts/auth';
import style from './styles/App.module.scss';




function App() {

  const {user} = useContext(AuthContext);
  return (
    <main className={`${style.contentWraper} ${!!user ? style.contentSigned : '' }`}>
      <MessageList></MessageList>
      {!!user ? <SendMessageForm></SendMessageForm> : <LoginBox></LoginBox>}
    </main>
  )
}

export {App}

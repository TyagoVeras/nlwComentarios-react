import styles from "./styles.module.scss";
import { VscGithubInverted } from "react-icons/vsc";
import { AuthContext } from "../../contexts/auth";
import { useContext } from "react";

export function LoginBox() {

  const {url} = useContext(AuthContext);
  return (
    <div className={styles.loginWraper}>
      <strong>Faça o login</strong>
      <a href={url} className={styles.linkLoginWraper}>
        <VscGithubInverted size="22" className={styles.iconLogin} />
        Entrar com o github
      </a>
    </div>
  );
}

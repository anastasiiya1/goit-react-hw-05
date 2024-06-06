import { TbError404 } from "react-icons/tb";
import css from './NotFoundPage.module.css';

function NotFoundPage() {
  return (
    <div className={css.container}>
      <TbError404 className={css.icon} />
      <p className={css.message}>Oops, it seems that this page does not exist</p>
    </div>
  );
}

export default NotFoundPage;
import styles from "./Message.module.css";
import PropTypes from "prop-types";

function Message({ message }) {
  Message.propTypes = {
    message: PropTypes.string,
  };
  return (
    <p className={styles.message}>
      <span role="img">👋</span> {message}
    </p>
  );
}

export default Message;

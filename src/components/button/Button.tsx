import { ButtonProps } from "@/interfaces";
import styles from './button.module.scss'

const Button = ({ text, id, disabled = true, type = 'button' }: ButtonProps) => {
  return (
    <button disabled={disabled} className={`${styles.button} ${disabled ? styles.button__disabled : ''}`}>
      <div className={`${disabled ? styles.button__disabled_text : styles.button__text}`}>{text}</div>
      <div className="ArrowRight w-6 h-6 relative" />
    </button>
  )
}

export default Button;

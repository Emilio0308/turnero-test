export interface ButtonProps {
  text: string| JSX.Element,
  disabled: boolean,
  type: "button" | "submit" | "reset" | undefined;
  id?: string,
}

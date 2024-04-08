export interface ButtonProps {
  text: string,
  disabled: boolean,
  type: "button" | "submit" | "reset" | undefined;
  id?: string,
}

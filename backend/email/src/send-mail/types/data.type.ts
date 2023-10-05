export type SendData = {
  to: string;
  subject: string;
  template: string;
  text: string;
  additionalText?: string;
}
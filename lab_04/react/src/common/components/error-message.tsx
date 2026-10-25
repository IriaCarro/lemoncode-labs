interface ErrorMessageProps {
  children: string;
}

export function ErrorMessage({ children }: ErrorMessageProps) {
  return <p role="alert">{children}</p>;
}

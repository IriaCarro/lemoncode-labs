interface LoadingMessageProps {
  children: string;
}

export function LoadingMessage({ children }: LoadingMessageProps) {
  return <p role="status">{children}</p>;
}

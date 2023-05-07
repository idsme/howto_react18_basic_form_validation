export function FormInputError({ errorMessage }: { errorMessage: string }) {
  return (
    <div
      style={{
        color: "red",
      }}
    >
      {errorMessage}
    </div>
  );
}

import { SignInButton } from "@clerk/clerk-react";

type Props = {
  itemLabel: string;
};

export function AuthRequiredMessage({ itemLabel }: Props) {
  return (
    <section
      style={{
        marginTop: "2rem",
        padding: "1rem",
        border: "1px solid #ddd",
        borderRadius: "8px",
        backgroundColor: "#f8f8f8",
      }}
    >
      <h2>Sign in required</h2>
      <p>You must be logged in to create a new {itemLabel}.</p>
      <SignInButton mode="modal">
        <button type="button">Log in</button>
      </SignInButton>
    </section>
  );
}
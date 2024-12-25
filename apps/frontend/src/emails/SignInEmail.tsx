import {
  Html,
  Text,
  Heading,
  Container,
  Button,
  Hr,
  render,
} from "@react-email/components";

export type TSignInEmail = {
  url: string;
};

export default function SignInEmail({ url = "#" }: TSignInEmail) {
  return (
    <Html lang="en" style={{ fontFamily: "sans-serif" }}>
      <Container
        style={{
          padding: "56px",
          border: "1px solid black",
        }}
      >
        <Heading as="h2">Sign in to the app</Heading>
        <Hr />
        <Text>To sign in press the button below</Text>
        <Hr />
        <Button
          href={url}
          style={{
            padding: "8px",
            border: "2px solid blue",
            backgroundColor: "blue",
            color: "white",
            borderRadius: "4px",
          }}
        >
          Sign in
        </Button>
      </Container>
    </Html>
  );
}

export async function renderToHTML(props: TSignInEmail, plainText?: boolean) {
  return await render(<SignInEmail {...props} />, { plainText });
}

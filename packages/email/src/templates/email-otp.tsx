import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Tailwind,
  Text,
} from '@react-email/components';

interface EmailOTPTemplateProps {
  loginCode?: string;
}

export const EmailOTPTemplate = ({ loginCode }: EmailOTPTemplateProps) => (
  <Tailwind>
    <Html>
      <Head />
      <Body className="bg-white font-sans">
        <Preview>Your login verification code</Preview>
        <Container className="px-3">
          <Heading className="my-10 font-bold text-2xl text-zinc-800">
            Login
          </Heading>
          <Text className="mb-3.5 text-sm text-zinc-900">
            Copy and paste this temporary login code:
          </Text>
          <code className="inline-block w-11/12 rounded border border-gray-300 bg-gray-100 p-4 text-gray-800">
            {loginCode}
          </code>
          <Text className="mt-3.5 mb-4 text-sm text-zinc-500">
            If you didn&apos;t try to login, you can safely ignore this email.
          </Text>
          <Img
            alt="Coordinize's Logo"
            height="32"
            src={
              'https://rg7ysodw5o.ufs.sh/f/HNPoq5Qqdz35KyXCE4MQbgvyZ6z4LukWd5fhroJmOFxRPsq1'
            }
            width="32"
          />
          <Text className="mt-3 mb-6 text-xs text-zinc-500 leading-5">
            <Link
              className="text-sm text-zinc-600 underline"
              href="https://coordinize.tech"
              target="_blank"
            >
              Coordinize
            </Link>
            , an async communication tool
            <br />
            for modern teams.
          </Text>
        </Container>
      </Body>
    </Html>
  </Tailwind>
);

export default EmailOTPTemplate;

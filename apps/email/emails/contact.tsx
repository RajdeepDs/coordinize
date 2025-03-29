import { ContactTemplate } from "@coordinize/email/templates/contact";

const ExampleContactEmail = () => (
  <ContactTemplate
    name="Jane Smith"
    email="jane.smith@example.com"
    message="I'm interested in your services."
  />
);

export default ExampleContactEmail;

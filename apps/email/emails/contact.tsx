import { ContactTemplate } from "@coordinize/email/templates/contact";

const ExampleContactEmail = () => (
  <ContactTemplate
    email="jane.smith@example.com"
    message="I'm interested in your services."
    name="Jane Smith"
  />
);

export default ExampleContactEmail;

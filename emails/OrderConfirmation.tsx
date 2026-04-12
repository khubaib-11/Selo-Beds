import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Hr,
} from "@react-email/components";

interface OrderEmailProps {
  customerName: string;
  orderId: string;
  totalAmount: number;
  customerNotes?: string;
}

export const OrderConfirmationEmail = ({
  customerName,
  orderId,
  totalAmount,
  customerNotes,
}: OrderEmailProps) => (
  <Html>
    <Head />
    <Preview>Your Selo Beds order has been received!</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>BETTER SLEEP IS ON THE WAY</Heading>
        <Text style={text}>Hi {customerName},</Text>
        <Text style={text}>
          Thank you for choosing Selo Beds. We&apos;ve received your order and
          our team is getting it ready for its journey to your bedroom.
        </Text>
        <Section style={orderInfo}>
          <Text style={details}>
            Order ID: {orderId.slice(-12).toUpperCase()}
          </Text>
          <Text style={details}>Total: £{totalAmount.toFixed(2)}</Text>
          {customerNotes && (
            <Text style={details}>
              Delivery Note: &quot;{customerNotes}&quot;
            </Text>
          )}
        </Section>
        <Hr style={hr} />
        <Text style={footer}>Selo Beds - Premium Comfort, Hand-Delivered.</Text>
      </Container>
    </Body>
  </Html>
);

// Styles
const main = {
  backgroundColor: "#ffffff",
  fontFamily: "system-ui, sans-serif",
};
const container = { padding: "20px", margin: "0 auto", maxWidth: "600px" };
const h1 = {
  fontSize: "24px",
  fontWeight: "900",
  letterSpacing: "1px",
  textAlign: "center" as const,
};
const text = { fontSize: "16px", lineHeight: "26px" };
const orderInfo = {
  padding: "24px",
  backgroundColor: "#f9f9f9",
  borderRadius: "12px",
};
const details = { margin: "0", fontSize: "14px", color: "#666" };
const hr = { borderColor: "#cccccc", margin: "20px 0" };
const footer = {
  color: "#8898aa",
  fontSize: "12px",
  textAlign: "center" as const,
};

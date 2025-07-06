import { container, footer, h1, logo, main } from '../css/styles';
import {
  Body,
  Container,
  Head,
  Html,
  Row,
  Section,
  Text,
  Link,
  Img,
} from '@react-email/components';
import * as React from 'react';

interface MailBodyProps {
  children: React.ReactNode;
}

// text over environment variables
const emailTexts = {
  text1: process.env.EMAIL_FOOTER_T1 || 'Docmost, All Rights Reserved',
  link1: process.env.EMAIL_FOOTER_LINK_URL1 || '',
  linktext1: process.env.EMAIL_FOOTER_LINK_TEXT1 || '',
  link2: process.env.EMAIL_FOOTER_LINK_URL2 || '',
  linktext2: process.env.EMAIL_FOOTER_LINK_TEXT2 || '',
};

export function MailBody({ children }: MailBodyProps) {
  return (
    <Html>
      <Head />
      <Body style={main}>
        <MailHeader />
        <Container style={container}>{children}</Container>
        <MailFooter />
      </Body>
    </Html>
  );
}

export function MailHeader() {
  const logoUrl = process.env.EMAIL_LOGO_URL;
  
  return (
    <Section style={logo}>
      {logoUrl && (
        <Img
          src={logoUrl}
          width="auto"
          height="100"
          style={{ margin: '0 auto' }}
        />
      )}
    </Section>
  );
}

export function MailFooter() {
  return (
    <Section style={footer}>
      <Row>
        <Text style={{ textAlign: 'center', color: '#706a7b' }}>
          {emailTexts.text1}
          <br/>
          <Link href={emailTexts.link1}>
            {emailTexts.linktext1}
          </Link>{' | '}
          <Link href={emailTexts.link2}>
            {emailTexts.linktext2}
          </Link>
        </Text>
      </Row>
    </Section>
  );
}

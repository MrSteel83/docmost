import { Button, Link, Section, Text } from '@react-email/components';
import * as React from 'react';
import { button, content, paragraph, h1 } from '../css/styles';
import { MailBody } from '../partials/partials';

interface Props {
  username: string;
  resetLink: string;
}

// text over environment variables
const emailTexts = {
  text1: process.env.EMAIL_PW_FORGOT_T1 || 'Password reset requested',
  text2: process.env.EMAIL_PW_FORGOT_T2 || 'Hi ',
  text3: process.env.EMAIL_PW_FORGOT_T3 || 'We received a request from you to reset your password.',
  text4: process.env.EMAIL_PW_FORGOT_T4 || 'Password reset',
  text5: process.env.EMAIL_PW_FORGOT_T5 || 'If you did not request a password reset, please ignore this email.'
};

export const ForgotPasswordEmail = ({ username, resetLink }: Props) => {
  return (
    <MailBody>
      <Section style={content}>
        <Text style={h1}>{emailTexts.text1}</Text>
        <Text style={paragraph}>{emailTexts.text2}{username},</Text>
        <Text style={paragraph}>
          {emailTexts.text3}
        </Text>
        <Button href={resetLink} style={button}>
          {emailTexts.text4}
        </Button>
        <Text style={paragraph}>
          {emailTexts.text5}
        </Text>
      </Section>
    </MailBody>
  );
};

export default ForgotPasswordEmail;

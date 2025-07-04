import { Button, Link, Section, Text } from '@react-email/components';
import * as React from 'react';
import { button, content, paragraph } from '../css/styles';
import { MailBody } from '../partials/partials';

interface Props {
  username: string;
  resetLink: string;
}

// text over environment variables
const emailTexts = {
  text1: process.env.EMAIL_PW_FORGOT_T1 || 'Hi ',
  text2: process.env.EMAIL_PW_FORGOT_T2 || 'We received a request from you to reset your password.',
  text3: process.env.EMAIL_PW_FORGOT_T3 || ' Click here to set a new password',
  text4: process.env.EMAIL_PW_FORGOT_T4 || 'If you did not request a password reset, please ignore this email.'
};

export const ForgotPasswordEmail = ({ username, resetLink }: Props) => {
  return (
    <MailBody>
      <Section style={content}>
        <Text style={paragraph}>{emailTexts.text1}{username},</Text>
        <Text style={paragraph}>
          {emailTexts.text2}
        </Text>
          <Link href={resetLink}>{emailTexts.text3}</Link>
        <Text style={paragraph}>
          {emailTexts.text4}
        </Text>
      </Section>
    </MailBody>
  );
};

export default ForgotPasswordEmail;

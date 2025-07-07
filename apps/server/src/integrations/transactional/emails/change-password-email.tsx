import { Section, Text } from '@react-email/components';
import * as React from 'react';
import { content, paragraph, h1 } from '../css/styles';
import { MailBody } from '../partials/partials';

interface Props {
  username?: string;
}

// text over environment variables
const emailTexts = {
  text1: process.env.EMAIL_PW_CHANGED_T1 || 'Password changed successfully',
  text2: process.env.EMAIL_PW_CHANGED_T2 || 'Hi ',
  text3: process.env.EMAIL_PW_CHANGED_T3 || 'This is a confirmation that your password has been changed.',
};

export const ChangePasswordEmail = ({ username }: Props) => {
  return (
    <MailBody>
      <Section style={content}>
        <Text style={h1}>{emailTexts.text1}</Text>
        <Text style={paragraph}>{emailTexts.text2}{username},</Text>
        <Text style={paragraph}>
          {emailTexts.text3}
        </Text>
      </Section>
    </MailBody>
  );
};

export default ChangePasswordEmail;

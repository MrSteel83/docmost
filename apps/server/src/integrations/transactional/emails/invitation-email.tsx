import { Section, Text, Button } from '@react-email/components';
import * as React from 'react';
import { button, content, paragraph, h1 } from '../css/styles';
import { MailBody } from '../partials/partials';

interface Props {
  inviteLink: string;
}

// text over environment variables
const emailTexts = {
  text1: process.env.EMAIL_IN_SEND_T1 || 'Your invitation',
  text2: process.env.EMAIL_IN_SEND_T2 || 'Hi there,',
  text3: process.env.EMAIL_IN_SEND_T3 || 'You have been invited to Docmost.',
  text4: process.env.EMAIL_IN_SEND_T4 || 'Please click the button below to accept this invitation.',
  text5: process.env.EMAIL_IN_SEND_T5 || 'Accept Invite'
};

export const InvitationEmail = ({ inviteLink }: Props) => {
  return (
    <MailBody>
      <Section style={content}>
        <Text style={h1}>{emailTexts.text1}</Text>
        <Text style={paragraph}>{emailTexts.text2}</Text>
        <Text style={paragraph}>{emailTexts.text3}</Text>
        <Text style={paragraph}>{emailTexts.text4}</Text>
      </Section>
      <Section
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          paddingLeft: '15px',
          paddingBottom: '15px',
        }}
      >
        <Button href={inviteLink} style={button}>
          {emailTexts.text5}
        </Button>
      </Section>
    </MailBody>
  );
};

export default InvitationEmail;

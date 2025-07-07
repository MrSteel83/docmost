import { Section, Text } from '@react-email/components';
import * as React from 'react';
import { content, paragraph, h1 } from '../css/styles';
import { MailBody } from '../partials/partials';

interface Props {
  invitedUserName: string;
  invitedUserEmail: string;
}

// text over environment variables
const emailTexts = {
  text1: process.env.EMAIL_IN_ACCEPTED_T1 || 'Invitation accepted',
  text2: process.env.EMAIL_IN_ACCEPTED_T2 || 'has accepted your invitation, and is now a member of the workspace.'
};

export const InvitationAcceptedEmail = ({
  invitedUserName,
  invitedUserEmail,
}: Props) => {
  return (
    <MailBody>
      <Section style={content}>
        <Text style={h1}>{emailTexts.text1}</Text>
        <Text style={paragraph}>
          {invitedUserName} ({invitedUserEmail}) {emailTexts.text2}
        </Text>
      </Section>
    </MailBody>
  );
};

export default InvitationAcceptedEmail;

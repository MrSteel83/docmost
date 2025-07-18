import * as React from "react";
import * as z from "zod";

import { useForm, zodResolver } from "@mantine/form";
import {
  Container,
  Title,
  TextInput,
  Button,
  PasswordInput,
  Box,
  Stack,
  Flex,
  Anchor,
} from "@mantine/core";
import { useParams, useSearchParams } from "react-router-dom";
import { IRegister } from "@/features/auth/types/auth.types";
import useAuth from "@/features/auth/hooks/use-auth";
import classes from "@/features/auth/components/auth.module.css";
import { useGetInvitationQuery } from "@/features/workspace/queries/workspace-query.ts";
import { useRedirectIfAuthenticated } from "@/features/auth/hooks/use-redirect-if-authenticated.ts";
import { useTranslation } from "react-i18next";
import { useCustomLinks } from "../../CustomLinksContext.tsx";
import SsoLogin from "@/ee/components/sso-login.tsx";


const formSchema = z.object({
  name: z.string().trim().min(1),
  password: z.string().min(8),
});

type FormValues = z.infer<typeof formSchema>;

export function InviteSignUpForm() {
  const { t } = useTranslation();
  const params = useParams();
  const [searchParams] = useSearchParams();
  const links = useCustomLinks();
  const formLinks = links.filter(link => link.visibleIn.includes("form"));

  const { data: invitation, isError } = useGetInvitationQuery(
    params?.invitationId,
  );
  const { invitationSignup, isLoading } = useAuth();
  useRedirectIfAuthenticated();

  const form = useForm<FormValues>({
    validate: zodResolver(formSchema),
    initialValues: {
      name: "",
      password: "",
    },
  });

  async function onSubmit(data: IRegister) {
    const invitationToken = searchParams.get("token");

    await invitationSignup({
      invitationId: invitation.id,
      name: data.name,
      password: data.password,
      token: invitationToken,
    });
  }

  if (isError) {
    return <div>{t("invalid invitation link")}</div>;
  }

  if (!invitation) {
    return <div></div>;
  }

  return (
    <>
    <Container size={420} className={classes.container}>
      <Box p="xl" className={classes.containerBox}>
        <Box mb="md" style={{ textAlign: "center" }}>
            <img
              src="form_logo.png"
              height={140}
              style={{ objectFit: "contain" }}
            />
          </Box>
        
        <Title order={2} ta="center" fw={500} mb="md">
          {t("Join the workspace")}
        </Title>

        <SsoLogin />

        {!invitation.enforceSso && (
          <Stack align="stretch" justify="center" gap="xl">
            <form onSubmit={form.onSubmit(onSubmit)}>
              <TextInput
                id="name"
                type="text"
                label={t("Name")}
                placeholder={t("enter your full name")}
                variant="filled"
                {...form.getInputProps("name")}
              />

              <TextInput
                id="email"
                type="email"
                label={t("Email")}
                value={invitation.email}
                disabled
                variant="filled"
                mt="md"
              />

              <PasswordInput
                label={t("Password")}
                placeholder={t("Your password")}
                variant="filled"
                mt="md"
                {...form.getInputProps("password")}
              />
              <Button type="submit" fullWidth mt="xl" loading={isLoading}>
                {t("Sign Up")}
              </Button>
            </form>
          </Stack>
        )}
      </Box>
    </Container>
    {formLinks.length > 0 && (
      <Box mt="md" mb="lg" style={{ textAlign: "center" }}>
        <Flex justify="center" wrap="wrap" gap="xs">
          {formLinks.map((link) => (
            <Anchor key={link.url} href={link.url} target="_blank" size="xs" c="dimmed">
              {link.label}
            </Anchor>
          ))}
        </Flex> 
      </Box>
    )}
    </>
  );
}

import * as z from "zod";
import { useForm, zodResolver } from "@mantine/form";
import useAuth from "@/features/auth/hooks/use-auth";
import { ILogin } from "@/features/auth/types/auth.types";
import {
  Container,
  Title,
  TextInput,
  Button,
  PasswordInput,
  Box,
  Anchor,
  Group,
  Flex,
} from "@mantine/core";
import classes from "./auth.module.css";
import { useRedirectIfAuthenticated } from "@/features/auth/hooks/use-redirect-if-authenticated.ts";
import { Link } from "react-router-dom";
import APP_ROUTE from "@/lib/app-route.ts";
import { useTranslation } from "react-i18next";
import SsoLogin from "@/ee/components/sso-login.tsx";
import { useWorkspacePublicDataQuery } from "@/features/workspace/queries/workspace-query.ts";
import { Error404 } from "@/components/ui/error-404.tsx";
import React from "react";
import { useCustomLinks } from "../../CustomLinksContext.tsx";

export function LoginForm() {
  const { t } = useTranslation();
  const { signIn, isLoading } = useAuth();
  const links = useCustomLinks();
  const formLinks = links.filter(link => link.visibleIn.includes("form"));
  
  useRedirectIfAuthenticated();
  const {
    data,
    isLoading: isDataLoading,
    isError,
    error,
  } = useWorkspacePublicDataQuery();

  const formSchema = z.object({
    email: z
      .string()
      .min(1, { message: t("email is required") })
      .email({ message: t("Invalid email address") }),
    password: z.string().min(1, { message: t("Password is required") }),
  });
  
  const form = useForm<ILogin>({
    validate: zodResolver(formSchema),
    initialValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: ILogin) {
    await signIn(data);
  }

  if (isDataLoading) {
   return null;
  }

  if (isError && error?.["response"]?.status === 404) {
    return <Error404 />;
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
          {t("Login")}
        </Title>

        <SsoLogin />

        {!data?.enforceSso && (
          <>
            <form onSubmit={form.onSubmit(onSubmit)}>
              <TextInput
                id="email"
                type="email"
                label={t("Email")}
                placeholder="email@example.com"
                variant="filled"
                {...form.getInputProps("email")}
              />

              <PasswordInput
                label={t("Password")}
                placeholder={t("Your password")}
                variant="filled"
                mt="md"
                {...form.getInputProps("password")}
              />

              <Group justify="flex-end" mt="sm">
                <Anchor
                  to={APP_ROUTE.AUTH.FORGOT_PASSWORD}
                  component={Link}
                  underline="never"
                  size="sm"
                >
                  {t("Forgot your password?")}
                </Anchor>
              </Group>

              <Button type="submit" fullWidth mt="md" loading={isLoading}>
                {t("Sign In")}
              </Button>
            </form>
          </>
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

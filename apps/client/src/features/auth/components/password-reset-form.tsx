import * as z from "zod";
import { useForm, zodResolver } from "@mantine/form";
import useAuth from "@/features/auth/hooks/use-auth";
import { IPasswordReset } from "@/features/auth/types/auth.types";
import { Flex, Anchor, Box, Button, Container, PasswordInput, Title } from "@mantine/core";
import classes from "./auth.module.css";
import { useRedirectIfAuthenticated } from "@/features/auth/hooks/use-redirect-if-authenticated.ts";
import { useTranslation } from "react-i18next";
import { useCustomLinks } from "../../CustomLinksContext.tsx";

const formSchema = z.object({
  newPassword: z
    .string()
    .min(8, { message: "Password must contain at least 8 characters" }),
});

interface PasswordResetFormProps {
  resetToken?: string;
}

export function PasswordResetForm({ resetToken }: PasswordResetFormProps) {
  const { t } = useTranslation();
  const { passwordReset, isLoading } = useAuth();
  const links = useCustomLinks();
  const formLinks = links.filter(link => link.visibleIn.includes("form"));
  useRedirectIfAuthenticated();

  const form = useForm<IPasswordReset>({
    validate: zodResolver(formSchema),
    initialValues: {
      newPassword: "",
    },
  });

  async function onSubmit(data: IPasswordReset) {
    await passwordReset({
      token: resetToken,
      newPassword: data.newPassword,
    });
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
          {t("Password reset")}
        </Title>

        <form onSubmit={form.onSubmit(onSubmit)}>
          <PasswordInput
            label={t("New password")}
            placeholder={t("Your new password")}
            variant="filled"
            mt="md"
            {...form.getInputProps("newPassword")}
          />

          <Button type="submit" fullWidth mt="xl" loading={isLoading}>
            {t("Set password")}
          </Button>
        </form>
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

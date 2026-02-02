"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { skillSchema } from "@/modules/skills/skills.schema";

import { Button } from "@workspace/ui/components";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@workspace/ui/components/field";
import { Input } from "@workspace/ui/components/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@workspace/ui/components/input-group";
import { useTranslation } from "@workspace/ui/hooks";

const formSchema = skillSchema;

interface UploadSkillsProps {
  handleSubmit: (data: z.infer<typeof formSchema>) => void;
}
export function UploadSkills({ handleSubmit }: UploadSkillsProps) {
  const { t } = useTranslation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      desc: "",
      githubUrl: "",
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    handleSubmit(data);
  }

  return (
    <div className="w-full ">
      <form
        className="  w-full  "
        id="form-rhf-demo"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FieldGroup>
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-rhf-demo-title">
                  {t("library.addSkills.skillsName")}
                </FieldLabel>
                <Input
                  {...field}
                  id="form-rhf-demo-title"
                  aria-invalid={fieldState.invalid}
                  placeholder={t("library.addSkills.skillsNamePlaceholder")}
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError
                    className=" text-error "
                    errors={[fieldState.error]}
                  />
                )}
              </Field>
            )}
          />
          <Controller
            name="githubUrl"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-rhf-demo-title">
                  {t("library.addSkills.githubUrl")}
                </FieldLabel>
                <Input
                  {...field}
                  id="form-rhf-demo-title"
                  aria-invalid={fieldState.invalid}
                  placeholder={t("library.addSkills.githubUrlPlaceholder")}
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError
                    className=" text-error "
                    errors={[fieldState.error]}
                  />
                )}
              </Field>
            )}
          />
          <Controller
            name="desc"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-rhf-demo-description">
                  {t("library.addSkills.skillsDesc")}
                </FieldLabel>
                <InputGroup>
                  <InputGroupTextarea
                    {...field}
                    id="form-rhf-demo-description"
                    placeholder={t("library.addSkills.skillsDescPlaceholder")}
                    rows={6}
                    className="min-h-24 resize-none"
                    aria-invalid={fieldState.invalid}
                  />
                  <InputGroupAddon align="block-end">
                    <InputGroupText className="tabular-nums">
                      {field.value?.length ?? 0}/500
                    </InputGroupText>
                  </InputGroupAddon>
                </InputGroup>

                {fieldState.invalid && (
                  <FieldError
                    className=" text-error "
                    errors={[fieldState.error]}
                  />
                )}
              </Field>
            )}
          />
        </FieldGroup>
      </form>

      <Field className="mt-4" orientation="horizontal">
        <Button type="button" variant="outline" onClick={() => form.reset()}>
          Reset
        </Button>
        <Button type="submit" form="form-rhf-demo">
          Submit
        </Button>
      </Field>
    </div>
  );
}

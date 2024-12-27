"use client";

import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import Box from "@mui/material/Box";
import { Button, Stack, TextField } from "@mui/material";
export function Example() {
  const { control, register, watch } = useForm({
    defaultValues: {
      tracks: [] as { qwe: string; ewq: string }[],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "tracks",
  });

  const formValue = watch();

  return (
    <Box p={2} pt={0}>
      <Button variant="contained" onClick={() => append({ qwe: "", ewq: "" })}>
        +
      </Button>
      <Button variant="contained" onClick={() => remove(-1)}>
        -
      </Button>
      <Stack component="form" gap={2} mt={2}>
        {fields.map((field, index) => (
          <Stack flexDirection="row" key={field.id}>
            <TextField {...register(`tracks.${index}.qwe`)} />
            <TextField {...register(`tracks.${index}.ewq`)} />
            <Button variant="contained" onClick={() => remove(index)}>
              -
            </Button>
          </Stack>
        ))}
      </Stack>
      <pre>{JSON.stringify(formValue, null, 4)}</pre>
    </Box>
  );
}

import { useState } from "react";

export type ValidationResult =
  | { ok: true }
  | { ok: false; messages: string[] };

export function useFormInput(initialValue = "") {
  const [value, setValue] = useState(initialValue);
  const [messages, setMessages] = useState<string[]>([]);

  function validate(validator: (v: string) => ValidationResult): ValidationResult {
    const result = validator(value);
    setMessages(result.ok ? [] : result.messages);
    return result;
  }

  return {
    value,
    setValue: (v: string) => {
      setValue(v);
      setMessages([]);
    },
    messages,
    setMessages,
    validate,
  };
}
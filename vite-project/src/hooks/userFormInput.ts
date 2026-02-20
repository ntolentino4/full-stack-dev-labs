import { useState } from "react";

/**
 * Form input should manage the following
 *  - current value
 *  - current messages 
 *  - validation via a callback function
 */
export type ValidationResult =
  | { isValid: true }
  | { isValid: false; errors: string[] };

export function useFormInput(initialValue = "") {
  const [value, setValue] = useState<string>(initialValue);
  const [messages, setMessages] = useState<string[]>([]);

  function validate(validatorFn: (v: string) => ValidationResult): ValidationResult {
    const result = validatorFn(value);
    setMessages(result.isValid ? [] : result.errors);
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
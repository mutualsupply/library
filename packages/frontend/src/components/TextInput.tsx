import { InputHTMLAttributes } from "react"
import { useFormContext } from "react-hook-form"
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form"
import { Input } from "./ui/input"

interface TextInputProps
  extends Pick<InputHTMLAttributes<HTMLInputElement>, "type"> {
  name: string
  label?: string
  placeholder?: string
  description?: string
}

const TextInput = ({
  name,
  label,
  placeholder,
  description,
  type = "text",
}: TextInputProps) => {
  const form = useFormContext()
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Input type={type} placeholder={placeholder} {...field} />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default TextInput

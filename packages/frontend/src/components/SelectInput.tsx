import { Select } from "@radix-ui/react-select"
import { useEffect } from "react"
import { useFormContext } from "react-hook-form"
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form"
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select"

interface SelectItem {
  key: string
  name: string
}

interface SelectInputProps {
  name: string
  label?: string
  placeholder?: string
  description?: string
  items: Array<SelectItem>
  defaultValue?: string
}

const SelectInput = ({
  name,
  label,
  placeholder,
  description,
  items,
  defaultValue,
}: SelectInputProps) => {
  const form = useFormContext()
  useEffect(() => {
    if (defaultValue) {
      form.setValue(name, defaultValue)
    }
  }, [])
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Select
              onValueChange={(value) => field.onChange(value)}
              defaultValue={placeholder ? undefined : defaultValue}
              value={field.value}
            >
              <SelectTrigger>
                <SelectValue placeholder={placeholder || defaultValue} />
              </SelectTrigger>
              <SelectContent>
                {items.map((item) => (
                  <SelectItem key={item.key} value={item.key}>
                    {item.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default SelectInput

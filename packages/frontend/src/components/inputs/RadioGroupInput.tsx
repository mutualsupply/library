import { useFormContext } from "react-hook-form"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"

interface RadioGroupInputProps {
  name: string
  items: { value: string; label: string; disabled?: boolean }[]
}

export default function RadioGroupInput({ name, items }: RadioGroupInputProps) {
  const form = useFormContext()
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="space-y-3">
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="flex flex-col space-y-1"
            >
              {items.map((item) => (
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem
                      value={item.value}
                      disabled={item.disabled}
                    />
                  </FormControl>
                  <FormLabel className="font-normal text-base">
                    {item.label}
                  </FormLabel>
                </FormItem>
              ))}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

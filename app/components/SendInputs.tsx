import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FieldError } from "react-hook-form";

export default function SendInputs({
  placeholder,
  register,
  id,
  label,
  errors,
}: {
  id: string;
  label: string;
  placeholder: string;
  register: any;
  errors: FieldError | undefined;
}) {
  return (
    <>
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        placeholder={placeholder}
        {...register}
        autoComplete="off"
      />
      {errors && <div className="text-red-500 text-xs">{errors.message}</div>}
    </>
  );
}

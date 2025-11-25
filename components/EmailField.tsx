import React from "react";
import FormFieldWrapper, {
  FormFieldWrapperProps,
  InputProps,
} from "./FormFieldWrapper";
import { MdMailOutline } from "react-icons/md";

export default function EmailField({
  as = "input",
  placeholder = "Type in your Email Address",
  ...rest
}: InputProps) {
  return (
    <FormFieldWrapper
      as="input"
      type="email"
      placeholder="Type in your Email Address"
      iconLeft={<MdMailOutline />}
      {...rest}
    />
  );
}

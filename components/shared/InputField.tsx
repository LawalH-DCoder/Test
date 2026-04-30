// components/ui/custom-input-field.tsx
'use client';

import {
  Controller,
  Control,
  FieldValues,
  Path,
  ControllerRenderProps,
  FieldPath,
} from 'react-hook-form';
import { memo, ReactNode, useState } from 'react';
import Image from 'next/image';
import { Eye, EyeOff } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
  FieldContent,
} from '@/components/ui/field';
import { FormFieldType } from '@/types';

type Option = string | { label: string; value: string };
type OptionArray = Option[] | readonly Option[];

interface CustomProps<T extends FieldValues> {
  control?: Control<T>;
  fieldType: FormFieldType;
  name: Path<T>;
  label?: ReactNode;
  placeholder?: string;
  disabled?: boolean;
  children?: ReactNode;
  icon?: ReactNode;
  options?: OptionArray;
  iconSrc?: string;
  iconAlt?: string;
  dateFormat?: string;
  showTimeSelect?: boolean;
  className?: string;
  inputClassName?: string;
  labelClassName?: string;
  description?: ReactNode;
  min?: number;
  max?: number;
  step?: number;
  testId?: string;
  // For uncontrolled components
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onBlur?: () => void;
}

interface RenderFieldProps<T extends FieldValues> {
  field?: ControllerRenderProps<T, FieldPath<T>>;
  props: CustomProps<T>;
}

const InputWrapper = ({ className, children }: { className?: string; children: ReactNode }) => (
  <div
    className={cn(
      'input-wrapper bg-gray-50 border border-[#F1F1F1] text-[#616161] px-4 rounded-[8px] h-[45px] overflow-hidden flex items-center gap-x-4 focus-within:border-primary transition-colors duration-200',
      className,
    )}
  >
    {children}
  </div>
);

const RenderField = <T extends FieldValues>({ field, props }: RenderFieldProps<T>) => {
  const {
    fieldType,
    disabled,
    placeholder,
    options,
    className,
    inputClassName,
    labelClassName,
    icon,
    iconSrc,
    iconAlt,
    min,
    max,
    step,
    value: externalValue,
    onChange: externalOnChange,
    onKeyPress,
    onBlur: externalOnBlur,
  } = props;

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => setIsPasswordVisible((prev) => !prev);

  const renderIcon = () =>
    typeof iconSrc === 'string' ? (
      <Image src={iconSrc} height={24} width={24} alt={iconAlt || 'icon'} />
    ) : (
      icon
    );

  // Common props for all input types
  const commonProps = {
    disabled,
    placeholder,
    className:
      inputClassName ||
      'w-full h-full bg-gray-50 text-[var(--color-text-secondary)] text-[14px] outline-none',
    'data-testid': props.testId,
  };

  // Handle controlled vs uncontrolled
  const getInputProps = () => {
    if (field) {
      return {
        ...field,
        ...commonProps,
        onChange: externalOnChange
          ? (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
              field.onChange(event);
              externalOnChange(event);
            }
          : field.onChange,
      };
    }

    return {
      ...commonProps,
      value: externalValue,
      onChange: externalOnChange,
      onKeyPress,
      onBlur: externalOnBlur,
    };
  };

  const getTextareaProps = () => {
    const baseProps = getInputProps();
    return {
      ...baseProps,
      className:
        'w-full px-3 py-2 text-[12px] min-h-[9rem] border border-input_border dark:border-neutral-800 rounded-[8px] bg-input_bg dark:bg-transparent overflow-y-auto resize-none text-[var(--color-text-dark)] dark:text-white placeholder:text-[var(--color-placeholder)] dark:placeholder:text-neutral-400 placeholder:font-normal outline-none focus:border-[var(--color-success)] transition-colors duration-200',
    };
  };

  switch (fieldType) {
    case FormFieldType.INPUT:
      return inputClassName ? (
        <input {...getInputProps()} type="text" />
      ) : (
        <InputWrapper className={className}>
          <input {...getInputProps()} type="text" />
          {renderIcon()}
        </InputWrapper>
      );

    case FormFieldType.EMAIL:
      return inputClassName ? (
        <input type="email" {...getInputProps()} />
      ) : (
        <InputWrapper className={className}>
          <input type="email" {...getInputProps()} />
          {renderIcon()}
        </InputWrapper>
      );

    case FormFieldType.PASSWORD:
      return (
        <div className="relative">
          <input
            type={isPasswordVisible ? 'text' : 'password'}
            {...getInputProps()}
            data-testid={props.testId}
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#76777d] hover:text-[#6366F1] transition-colors focus:outline-none"
          >
            <span className="material-symbols-outlined">
              {isPasswordVisible ? 'visibility_off' : 'visibility'}
            </span>
          </button>
        </div>
      );

    case FormFieldType.PHONE_INPUT:
      return (
        <InputWrapper className={className}>
          <input type="tel" {...getInputProps()} />
        </InputWrapper>
      );

    case FormFieldType.NUMBER:
      return (
        <InputWrapper className={className}>
          <input type="number" min={min} max={max} step={step} {...getInputProps()} />
          {renderIcon()}
        </InputWrapper>
      );

    case FormFieldType.DATE:
      return (
        <InputWrapper className={className}>
          <input type="date" {...getInputProps()} />
          {renderIcon()}
        </InputWrapper>
      );

    case FormFieldType.TEXTAREA:
      return <textarea {...getTextareaProps()} data-testid={props.testId} />;

    case FormFieldType.SELECT:
      return (
        <InputWrapper className={className}>
          {field ? (
            <Select onValueChange={field.onChange} value={field.value || ''} disabled={disabled}>
              <SelectTrigger
                data-testid={props.testId}
                className="w-full border-none bg-none h-12 p-0 dark:border-neutral-800 rounded-lg text-left dark:bg-transparent focus:ring-0 focus:ring-none"
              >
                <SelectValue placeholder={placeholder || 'Select an option...'} />
              </SelectTrigger>
              <SelectContent>
                {options?.map((option) => {
                  const value = typeof option === 'string' ? option : option.value;
                  const label = typeof option === 'string' ? option : option.label;
                  return (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          ) : (
            <Select
              onValueChange={(value) => {
                if (externalOnChange) {
                  const event = {
                    target: { value },
                  } as React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;
                  externalOnChange(event);
                }
              }}
              value={externalValue || ''}
              disabled={disabled}
            >
              <SelectTrigger
                data-testid={props.testId}
                className="w-full text-[13px] border-none bg-none h-12 p-0 dark:border-neutral-800 rounded-lg text-left dark:bg-transparent focus:ring-0 focus:ring-none"
              >
                <SelectValue placeholder={placeholder || 'Select an option...'} />
              </SelectTrigger>
              <SelectContent>
                {options?.map((option) => {
                  const value = typeof option === 'string' ? option : option.value;
                  const label = typeof option === 'string' ? option : option.label;
                  return (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          )}
        </InputWrapper>
      );

    default:
      return null;
  }
};

const CustomFormField = <T extends FieldValues>(props: CustomProps<T>) => {
  const { control, label, name, description, className, labelClassName } = props;

  if (control) {
    return (
      <Controller
        control={control}
        name={name}
        render={({ field, fieldState }) => (
          <Field className={className}>
            {label && (
              <FieldLabel>
                <span
                  className={
                    labelClassName ||
                    'field-label text-sm font-semibold text-[#191c1e] block ml-1 capitalize '
                  }
                >
                  {label}
                </span>
              </FieldLabel>
            )}
            <FieldContent>
              <RenderField field={field} props={props} />
              {description && <FieldDescription>{description}</FieldDescription>}
              {fieldState.error && <FieldError>{fieldState.error.message}</FieldError>}
            </FieldContent>
          </Field>
        )}
      />
    );
  }

  // Uncontrolled component (without react-hook-form)
  return (
    <Field className={className}>
      {label && (
        <FieldLabel>
          <span
            className={
              labelClassName ||
              'text-[13px] capitalize font-[300] text-[var(--color-heading)] dark:text-white'
            }
          >
            {label}
          </span>
        </FieldLabel>
      )}
      <FieldContent>
        <RenderField props={props} />
        {description && <FieldDescription>{description}</FieldDescription>}
      </FieldContent>
    </Field>
  );
};

export default memo(CustomFormField) as typeof CustomFormField;

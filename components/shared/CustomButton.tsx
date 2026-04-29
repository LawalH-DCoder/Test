"use client";

import * as React from "react";
import { Button as ShadcnButton } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CustomButtonProps extends React.ComponentProps<typeof ShadcnButton> {
  title?: string;
  icon?: React.ReactNode;
  sideIcon?: React.ReactNode;
  iconPosition?: 'left' | 'right' | 'center';
  isLoading?: boolean;
  showIcon?: boolean;
  textClassName?: string;
  onPress?: () => void;
  testId?: string;
}

const Button = React.forwardRef<HTMLButtonElement, CustomButtonProps>(
  (
    {
      title,
      icon,
      sideIcon,
      iconPosition = "left",
      isLoading = false,
      showIcon = false,
      textClassName,
      onPress,
      children,
      className,
      ...props
    },
    ref,
  ) => {
    const { testId, ...rest } = props;

    return (
      <ShadcnButton
        ref={ref}
        type={props.type || 'button'}
        onClick={(e) => {
          if (isLoading) return;
          props.onClick?.(e);
          onPress?.();
        }}
        disabled={isLoading || props.disabled}
        aria-busy={isLoading}
        aria-disabled={isLoading || props.disabled}
        data-testid={testId}
        className={cn(
          'group flex items-center justify-center gap-2 h-[45px] text-[12px] rounded-[8px] bg-primary_one_600',
          iconPosition === 'right' && 'flex-row-reverse',
          iconPosition === 'center' && 'justify-center',
          sideIcon && 'pl-4 border border-gray-200',
          className,
        )}
        {...rest}
      >
        {/* Side Icon */}
        {sideIcon && (
          <span className="transition-transform group-hover:scale-110 group-hover:rotate-6">
            {sideIcon}
          </span>
        )}

        {/* Icon / Loader */}
        <span className="flex items-center justify-center w-5 h-5">
          {isLoading ? (
            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            showIcon && icon
          )}
        </span>

        {/* Text */}
        {title ? (
          <span className={cn('font-medium text-sm', textClassName)}>{title}</span>
        ) : (
          children
        )}
      </ShadcnButton>
    );
  },
);

Button.displayName = "Button";

export default React.memo(Button);

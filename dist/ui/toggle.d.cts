import * as class_variance_authority_types from 'class-variance-authority/types';
import * as React from 'react';
import * as TogglePrimitive from '@radix-ui/react-toggle';
import { VariantProps } from 'class-variance-authority';

declare const toggleVariants: (props?: ({
    variant?: "default" | "outline" | null | undefined;
    size?: "default" | "sm" | "lg" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
declare function Toggle({ className, variant, size, ...props }: React.ComponentProps<typeof TogglePrimitive.Root> & VariantProps<typeof toggleVariants>): React.JSX.Element;

export { Toggle, toggleVariants };

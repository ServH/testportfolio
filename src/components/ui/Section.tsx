import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  variant?: 'default' | 'alternate';
}

export const Section = forwardRef<HTMLElement, SectionProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    const variantClasses = {
      default: 'bg-white dark:bg-gray-900',
      alternate: 'bg-gray-50 dark:bg-gray-800',
    };

    return (
      <section
        ref={ref}
        className={cn(
          'py-16 md:py-24',
          variantClasses[variant],
          className
        )}
        {...props}
      />
    );
  }
);

Section.displayName = 'Section';

export interface SectionContainerProps extends HTMLAttributes<HTMLDivElement> {}

export const SectionContainer = forwardRef<HTMLDivElement, SectionContainerProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('container mx-auto px-4 md:px-6', className)}
        {...props}
      />
    );
  }
);

SectionContainer.displayName = 'SectionContainer';

export interface SectionHeaderProps extends HTMLAttributes<HTMLDivElement> {}

export const SectionHeader = forwardRef<HTMLDivElement, SectionHeaderProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('text-center mb-12 md:mb-16', className)}
        {...props}
      />
    );
  }
);

SectionHeader.displayName = 'SectionHeader';

export interface SectionTitleProps extends HTMLAttributes<HTMLHeadingElement> {}

export const SectionTitle = forwardRef<HTMLHeadingElement, SectionTitleProps>(
  ({ className, ...props }, ref) => {
    return (
      <h2
        ref={ref}
        className={cn('text-3xl md:text-4xl font-serif font-bold', className)}
        {...props}
      />
    );
  }
);

SectionTitle.displayName = 'SectionTitle';

export interface SectionSubtitleProps extends HTMLAttributes<HTMLHeadingElement> {}

export const SectionSubtitle = forwardRef<HTMLHeadingElement, SectionSubtitleProps>(
  ({ className, ...props }, ref) => {
    return (
      <h3
        ref={ref}
        className={cn('text-xl md:text-2xl font-serif font-semibold mt-2', className)}
        {...props}
      />
    );
  }
);

SectionSubtitle.displayName = 'SectionSubtitle';

export interface SectionDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {}

export const SectionDescription = forwardRef<HTMLParagraphElement, SectionDescriptionProps>(
  ({ className, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={cn('max-w-3xl mx-auto text-gray-600 dark:text-gray-300 mt-4', className)}
        {...props}
      />
    );
  }
);

SectionDescription.displayName = 'SectionDescription';

export interface SectionContentProps extends HTMLAttributes<HTMLDivElement> {}

export const SectionContent = forwardRef<HTMLDivElement, SectionContentProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('mt-8', className)}
        {...props}
      />
    );
  }
);

SectionContent.displayName = 'SectionContent';

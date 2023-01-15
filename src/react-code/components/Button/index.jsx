import { PrimaryButton } from './PrimaryButton'
import { SecondaryGrayButton } from './SecondaryGrayButton'

export const Button = ({
  size,
  hierarchy,
  icon,
  destructive,
  state,
  disabled,
  iconLeading,
  iconTrailing,
  iconVariant,
  children,
  ...rest
}) => {
  if (hierarchy === 'primary') {
    return (
      <PrimaryButton
        size={size}
        icon={icon}
        destructive={destructive}
        state={state}
        disabled={disabled}
        iconLeading={iconLeading}
        iconTrailing={iconTrailing}
        iconVariant={iconVariant}
        {...rest}
      >
        {children}
      </PrimaryButton>
    )
  }
  if (hierarchy === 'secondary') {
    return (
      <SecondaryGrayButton
        size={size}
        icon={icon}
        destructive={destructive}
        state={state}
        disabled={disabled}
        iconLeading={iconLeading}
        iconTrailing={iconTrailing}
        iconVariant={iconVariant}
        {...rest}
      >
        {children}
      </SecondaryGrayButton>
    )
  }

  return null
}

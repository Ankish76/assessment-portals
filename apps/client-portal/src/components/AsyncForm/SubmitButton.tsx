import React from "react";
import { useForm } from "react-final-form";
import { FormSubscription } from "final-form";

type SubmitButtonWrapProps = {
  id?: string;
  formComponentName?: string;
  showLoading?: boolean;
  submitting?: boolean;
  disableOnSubmitSuccess?: boolean;
  iconLoading?: boolean;
  disbableIfInvalid?: boolean;
  submitAfter?: (callback: () => Promise<any> | undefined) => void;
  pt?: number;
  pb?: number;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type">;

type SubmitButtonProps = {
  loading?: boolean;
  iconLoading?: boolean;
  size?: "small" | "medium" | "large";
  pt?: number;
  pb?: number;
  variant?: "contained" | "outlined" | "text"; 
  fullWidth?: boolean; 
  sx?: string; 
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type">;

const SubmitButton: React.FC<SubmitButtonProps> = ({
  loading,
  disabled,
  children,
  iconLoading,
  size = "large",
  variant = "contained",
  color = "primary",
  fullWidth = true,
  sx,
  pt,
  pb,
  ...rest
}) => {
  const buttonClasses = `px-4 py-2 border rounded-md focus:outline-none ${
    loading
      ? "bg-gray-300 text-gray-600 cursor-not-allowed"
      : `bg-blue-500 text-white`
  } ${sx}`;

  return (
    <div className={`submit-button-wrapper pt-${pt || 4} pb-${pb || 2}`}>
      <button
        type="button"
        className={buttonClasses}
        disabled={loading || disabled}
        onClick={() => undefined}
        {...rest}
      >
        {loading ? (iconLoading ? children : "...Submitting") : children}
      </button>
    </div>
  );
};

const SubmitButtonWrap: React.FC<SubmitButtonWrapProps> = ({
  formComponentName,
  showLoading,
  submitting: propSubmitting,
  disbableIfInvalid,
  disableOnSubmitSuccess = true,
  submitAfter,
  ...rest
}) => {
  const [checking, setChecking] = React.useState(false);
  const [subscription, setSubscription] = React.useState<FormSubscription>({});
  const { submit, subscribe } = useForm(formComponentName);

  React.useEffect(() => {
    return subscribe(
      ({
        submitting,
        submitSucceeded,
        invalid,
        submitFailed,
        hasSubmitErrors,
        hasValidationErrors,
        dirtySinceLastSubmit,
        modifiedSinceLastSubmit,
      }) => {
        setChecking(false);
        setSubscription({
          submitting,
          submitSucceeded,
          invalid,
          submitFailed,
          hasSubmitErrors,
          hasValidationErrors,
          dirtySinceLastSubmit,
          modifiedSinceLastSubmit,
        });
      },
      {
        submitting: true,
        submitSucceeded: true,
        invalid: true,
        submitFailed: true,
        hasSubmitErrors: true,
        hasValidationErrors: true,
        dirtySinceLastSubmit: true,
        modifiedSinceLastSubmit: true,
      }
    );
  }, [subscribe]);

  const handleSubmit = React.useCallback(() => {
    if (submitAfter) {
      setChecking(true);
      submitAfter(() => submit());
    } else {
      submit();
    }
  }, [submitAfter, submit]);

  const {
    submitting,
    submitSucceeded,
    invalid,
    submitFailed,
    hasSubmitErrors,
    hasValidationErrors,
    dirtySinceLastSubmit,
    modifiedSinceLastSubmit,
  } = subscription;

  const error =
    !submitting &&
    submitFailed &&
    (hasSubmitErrors || hasValidationErrors) &&
    !(dirtySinceLastSubmit || modifiedSinceLastSubmit);

  return (
    <SubmitButton
      {...rest}
      loading={
        !error &&
        (checking ||
          ((propSubmitting || submitting) && !showLoading && !submitSucceeded))
      }
      disabled={
        error ||
        rest.disabled ||
        (disbableIfInvalid && invalid) ||
        propSubmitting ||
        submitting ||
        checking ||
        (submitSucceeded && disableOnSubmitSuccess)
      }
      onClick={handleSubmit}
    />
  );
};

export default SubmitButtonWrap;

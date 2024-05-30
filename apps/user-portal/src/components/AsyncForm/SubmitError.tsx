import React from "react";
import { useForm } from "react-final-form";
import { FormSubscription } from "final-form";

type SubmitErrorProps = {
  formComponentName?: string;
} & React.HTMLAttributes<HTMLDivElement>;

const SubmitError: React.FC<SubmitErrorProps> = ({
  formComponentName,
  ...rest
}) => {
  const [subscription, setSubscription] = React.useState<FormSubscription>({});
  const { subscribe } = useForm(formComponentName);

  React.useEffect(() => {
    return subscribe(
      ({
        submitting,
        hasValidationErrors,
        submitFailed,
        hasSubmitErrors,
        dirtySinceLastSubmit,
        modifiedSinceLastSubmit,
      }) => {
        setSubscription({
          submitting,
          hasValidationErrors,
          submitFailed,
          hasSubmitErrors,
          dirtySinceLastSubmit,
          modifiedSinceLastSubmit,
        });
      },
      {
        submitting: true,
        hasValidationErrors: true,
        submitFailed: true,
        hasSubmitErrors: true,
        dirtySinceLastSubmit: true,
        modifiedSinceLastSubmit: true,
      }
    );
  }, [subscribe]);

  const {
    submitting,
    hasValidationErrors,
    submitFailed,
    hasSubmitErrors,
    dirtySinceLastSubmit,
    modifiedSinceLastSubmit,
  } = subscription;

  const error =
    !submitting &&
    submitFailed &&
    (hasSubmitErrors || hasValidationErrors) &&
    !(dirtySinceLastSubmit || modifiedSinceLastSubmit);

  if (error) {
    return (
      <div {...rest}>
        <p className="py-2 text-red-500">
          Please check your form and try again.
        </p>
      </div>
    );
  }

  return null;
};

export default SubmitError;

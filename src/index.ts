import invariant from 'invariant';
import { InferType, ObjectSchema, ValidationError } from 'yup';
import Field from './Field';
import FieldArray from './FieldArray';
import FormComponent from './Form';
import Submit from './FormSubmit';
import Message from './Message';
import Summary from './Summary';
import config from './config';
import useField from './useField';
import useFormValues from './useFormValues';
import useFieldArray from './useFieldArray';
import errToJSON from './utils/errToJSON';
import useEventHandlers, { useMergedHandlers } from './utils/useEventHandlers';
import useFormSubmit from './useFormSubmit';
import useErrors from './useErrors';
import useTouched from './useTouched';

export type Form = typeof FormComponent;

export type FieldArrayHelpers = import('./useFieldArray').FieldArrayHelpers;
export type FieldArrayMeta = import('./useFieldArray').FieldArrayMeta;
export type UseFieldArrayOptions = import('./useFieldArray').UseFieldArrayOptions;

export type FieldMeta = import('./useField').FieldMeta;
export type RenderFieldProps = import('./useField').RenderFieldProps;
export type UseFieldOptions = import('./useField').UseFieldOptions;

export type JsonError = import('./utils/errToJSON').JsonError;
export type FieldProps = import('./Field').FieldProps;
export type InjectedFieldProps = import('./Field').InjectedFieldProps;
export type MessageProps = import('./Message').MessageProps;
export type FormProps<
  TSchema extends ObjectSchema,
  TValue = InferType<TSchema>
> = import('./Form').FormProps<TSchema, TValue>;

interface Statics {
  Field: typeof Field;
  FieldArray: typeof FieldArray;
  Message: typeof Message;
  Summary: typeof Summary;
  Submit: typeof Submit;
  setDefaults: (defaults: any) => void;
  toErrors: (err: ValidationError) => ReturnType<typeof errToJSON>;
}

const statics: Statics = {
  Field,
  FieldArray,
  Message,
  Summary,
  Submit,
  setDefaults(defaults = {}) {
    Object.assign(config, defaults);
  },
  toErrors(err: ValidationError) {
    invariant(
      err && err.name === 'ValidationError',
      '`toErrors()` only works with ValidationErrors.',
    );
    return errToJSON(err);
  },
};

export {
  statics,
  useEventHandlers,
  useMergedHandlers,
  useField,
  useFieldArray,
  useFormSubmit,
  useFormValues,
  useErrors,
  useTouched,
};

export type ReactFormal = typeof FormComponent &
  Statics & {
    statics: Statics;
  };

export default Object.assign(FormComponent, statics, {
  statics,
}) as ReactFormal;

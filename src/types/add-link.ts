export interface LinkData {
  text: string;
  url: string;
}

export interface AddLinkTranslations {
  title: string;
  labelText: string;
  labelUrl: string;
  save: string;
  cancel: string;
  errorTextRequired: string;
  errorTextMaxlength: string;
  errorUrlRequired: string;
  errorUrlInvalid: string;
  errorUrlMaxlength: string;
}

export interface AddLinkBoxProps {
  isOpen: boolean;
  onSave: (data: LinkData) => void;
  onCancel: () => void;
  initialText?: string;
  initialUrl?: string;
  translations: AddLinkTranslations;
}

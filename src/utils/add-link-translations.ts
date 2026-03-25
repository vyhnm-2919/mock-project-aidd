import type { Locale } from "@/types/auth";
import type { AddLinkTranslations } from "@/types/add-link";

export const addLinkTranslations: Record<Locale, AddLinkTranslations> = {
  vi: {
    title: "Thêm đường dẫn",
    labelText: "Nội dung",
    labelUrl: "URL",
    save: "Lưu",
    cancel: "Hủy",
    errorTextRequired: "Vui lòng nhập nội dung",
    errorTextMaxlength: "Nội dung không được vượt quá 100 ký tự",
    errorUrlRequired: "Vui lòng nhập URL",
    errorUrlInvalid: "URL không hợp lệ",
    errorUrlMaxlength: "URL không được vượt quá 2048 ký tự",
  },
  en: {
    title: "Add link",
    labelText: "Content",
    labelUrl: "URL",
    save: "Save",
    cancel: "Cancel",
    errorTextRequired: "Please enter content",
    errorTextMaxlength: "Content must not exceed 100 characters",
    errorUrlRequired: "Please enter a URL",
    errorUrlInvalid: "Invalid URL",
    errorUrlMaxlength: "URL must not exceed 2048 characters",
  },
};

import { LocalStorageKey } from "../models/localStorageKey";

export const LocalStorageService = {
  getPreference(preferenceType: LocalStorageKey): boolean {
    const localPreference = localStorage.getItem(preferenceType);
    if (localPreference) return localPreference === "true";

    const defaultValue = preferenceType === LocalStorageKey.SOUND;
    localStorage.setItem(preferenceType, defaultValue ? "true" : "false");
    return defaultValue;
  },
  setPreference(preferenceType: LocalStorageKey, newValue: boolean) {
    localStorage.setItem(preferenceType, newValue ? "true" : "false");
  },
};

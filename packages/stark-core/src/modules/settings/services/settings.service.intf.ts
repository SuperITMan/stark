import { InjectionToken } from "@angular/core";

/**
 * Name of the Settings service, in case injection is needed
 */
export const starkSettingsServiceName = "StarkSettingsService";
/**
 * {@link https://v7.angular.io/api/core/InjectionToken|InjectionToken} used to provide the {@link StarkSettingsService}
 */
export const STARK_SETTINGS_SERVICE: InjectionToken<StarkSettingsService> = new InjectionToken<StarkSettingsService>(
	starkSettingsServiceName
);

/**
 * Service that allows the manipulation of application settings, some of which can be persisted.
 */
export interface StarkSettingsService {
	/**
	 * Initialize the settings based on the default settings defined following this order:
	 *
	 * 1.- Persisted language settings
	 * 2.- If no persisted language found, AppConfig settings are taken
	 */
	initializeSettings(): void;

	/**
	 * Persist the language currently set as preferred language.
	 * When the application starts, the persisted language is retrieved (if set)
	 */
	persistPreferredLanguage(): void;

	/**
	 * Gets the preferredLanguage setting
	 *
	 * @returns The id of the preferred language
	 */
	getPreferredLanguage(): string;

	/**
	 * Sets the preferredLanguage setting (not persisted)
	 *
	 * @param language - Id of the preferred language
	 */
	setPreferredLanguage(language: string): void;
}

import { ActionReducerMap, createFeatureSelector, createSelector, MemoizedSelector } from "@ngrx/store";
import { StarkSettings } from "../entities";
import { StarkSettingsActions } from "../actions";
import { settingsReducer } from "./settings.reducer";

/**
 * Defines the part of the state assigned to the {@link StarkSettingsModule}
 */
export interface StarkSettingsState {
	/**
	 * State corresponding to the {@link StarkSettingsModule}
	 */
	settings: StarkSettings;
}

/**
 * Reducers assigned to the each property of the {@link StarkSettingsModule}'s state
 */
export const starkSettingsReducers: ActionReducerMap<StarkSettingsState, StarkSettingsActions> = {
	/**
	 * Reducer assigned to the state's `settings` property
	 */
	settings: settingsReducer
};

/**
 * NGRX Selector for the {@link StarkSettingsModule}'s state
 */
export const selectStarkSettings: MemoizedSelector<object, StarkSettings> = createSelector(
	createFeatureSelector<StarkSettingsState>("StarkSettings"),
	(state: StarkSettingsState) => state.settings
);

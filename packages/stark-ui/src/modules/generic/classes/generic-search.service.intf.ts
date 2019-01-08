import { Observable } from "rxjs";
import { StarkSearchState } from "../classes/search-state.entity.intf";

export interface StarkGenericSearchService<T, E> {
	/**
	 * Prepares everything that is needed for creating a new item
	 */
	createNew?(): void;

	/**
	 * Fetch the current search state from Redux
	 * @returns The Redux search state
	 */
	getSearchState(): Observable<StarkSearchState<E>>;

	/**
	 * Reset the current search state in Redux
	 */
	resetSearchState(): void;

	/**
	 * Performs the search with the given criteria
	 * @param criteria - The search criteria
	 * @returns The search results
	 */
	search(criteria: E): Observable<T[]>;
}

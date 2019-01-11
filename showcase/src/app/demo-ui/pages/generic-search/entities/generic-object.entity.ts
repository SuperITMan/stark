import { StarkResource } from "@nationalbankbelgium/stark-core";
import { autoserialize } from "cerialize";

export class GenericObject implements StarkResource {
	@autoserialize
	public uuid: string;

	@autoserialize
	public year: number;

	@autoserialize
	public hero: string;

	@autoserialize
	public movie: string;
}

import { ApplicationRef, ComponentRef, NgModuleRef } from "@angular/core";
import { createNewHosts } from "@angularclass/hmr";

/**
 * Configure HMR
 * Code based on: https://github.com/angular/angular-cli/wiki/stories-configure-hmr
 * Reference: https://github.com/PatrickJS/angular-hmr
 *
 */
export const bootstrapHmr = (module: any, bootstrap: () => Promise<NgModuleRef<any>>) => {
	if (ENV === "development") {
		console.log("Bootstrapping HMR");
		let ngModule: NgModuleRef<any>;
		module.hot.accept();
		bootstrap().then(
			(mod: NgModuleRef<any>) => {
				ngModule = mod;
			}
		).catch((error: any) => console.error(error));

		module.hot.dispose(() => {
			const appRef: ApplicationRef = ngModule.injector.get(ApplicationRef);
			const elements: any[] = appRef.components.map((c: ComponentRef<any>) => c.location.nativeElement);
			const makeVisible: () => void = createNewHosts(elements);
			ngModule.destroy();
			makeVisible();
		});
	}
};

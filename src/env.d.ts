/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
	readonly SITE_URI: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}

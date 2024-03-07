// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: User;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}

	type User = {
		id: number;
		name: string;
		phone: string;
		role: 'ADMIN' | 'USER';
	} | null;
}

export {};

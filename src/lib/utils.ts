import { browser } from '$app/environment';
import { PUBLIC_BASE_URL } from '$env/static/public';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { cubicOut } from 'svelte/easing';
import type { TransitionConfig } from 'svelte/transition';

/**
 * Enforce error safe API request.
 *
 * @param method - The HTTP method for the request.
 * @param resource - The resource path for the request.
 * @param data - Optional data to send with the request.
 * @returns A promise that resolves to a tuple containing the error message (if any) and the response data.
 *
 * @example
 * ```typescript
 * const [err, user] = await api('GET', `users/${userID}`);
 * if (err) {
 *     console.error('Error:', err);
 * } else {
 *     console.log('Selected user:', user);
 * }
 * ```
 */
export async function api(
	method: string,
	resource: string,
	data?: Record<string, unknown>
): Promise<[string | null, any]> {
	const base = browser ? `${window.location.origin}/api` : `${PUBLIC_BASE_URL}/api`;

	try {
		const res = await fetch(`${base}/${resource}`, {
			method,
			headers: {
				'content-type': 'application/json'
			},
			body: data && JSON.stringify(data)
		});

		if (!res.ok) {
			return [`${res.statusText} (${res.status})`, undefined];
		}

		return [null, await res.json()];
	} catch (error: any) {
		return [error?.message, undefined];
	}
}

// schadcn-svelte utils
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

type FlyAndScaleParams = {
	y?: number;
	x?: number;
	start?: number;
	duration?: number;
};

export const flyAndScale = (
	node: Element,
	params: FlyAndScaleParams = { y: -8, x: 0, start: 0.95, duration: 150 }
): TransitionConfig => {
	const style = getComputedStyle(node);
	const transform = style.transform === 'none' ? '' : style.transform;

	const scaleConversion = (valueA: number, scaleA: [number, number], scaleB: [number, number]) => {
		const [minA, maxA] = scaleA;
		const [minB, maxB] = scaleB;

		const percentage = (valueA - minA) / (maxA - minA);
		const valueB = percentage * (maxB - minB) + minB;

		return valueB;
	};

	const styleToString = (style: Record<string, number | string | undefined>): string => {
		return Object.keys(style).reduce((str, key) => {
			if (style[key] === undefined) return str;
			return str + `${key}:${style[key]};`;
		}, '');
	};

	return {
		duration: params.duration ?? 200,
		delay: 0,
		css: (t) => {
			const y = scaleConversion(t, [0, 1], [params.y ?? 5, 0]);
			const x = scaleConversion(t, [0, 1], [params.x ?? 0, 0]);
			const scale = scaleConversion(t, [0, 1], [params.start ?? 0.95, 1]);

			return styleToString({
				transform: `${transform} translate3d(${x}px, ${y}px, 0) scale(${scale})`,
				opacity: t
			});
		},
		easing: cubicOut
	};
};
'use server';

import { COOKIE_KEY } from '@/constants/app';
import { cookies } from 'next/headers';

export async function hasCookie(key: COOKIE_KEY) {
	try {
		const cookieStore = await cookies();
		return cookieStore.has(key);
	} catch {
		return false;
	}
}

export async function getCookie<T>(key: COOKIE_KEY): Promise<T | null> {
	try {
		const cookieStore = await cookies();

		const data = cookieStore.get(key)?.value || null;
		return data ? JSON.parse(data) : null;
	} catch {
		return null;
	}
}

export async function setCookie(key: COOKIE_KEY, value: any, expired?: number) {
	try {
		const cookieStore = await cookies();

		cookieStore.set(key, JSON.stringify(value), {
			expires: expired,
		});
		return true;
	} catch {
		return false;
	}
}

export async function deleteCookie(key: COOKIE_KEY | COOKIE_KEY[]) {
	try {
		const cookieStore = await cookies();

		if (typeof key === 'string') {
			cookieStore.delete(key);
		} else {
			key.forEach((k) => {
				cookieStore.delete(k);
			});
		}
		return true;
	} catch {
		return false;
	}
}

export async function getAllCookies() {
	try {
		const cookieStore = await cookies();

		return cookieStore.getAll();
	} catch {
		return null;
	}
}

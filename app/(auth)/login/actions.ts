"use server";

import { createClient } from "@/utils/supabase/server";

export type LoginState = {
	success: null | boolean;
	message?: string;
};

export async function login(previousState: LoginState, formData: FormData) {
	const supabase = await createClient();

	const email = formData.get("email") as string;

	const { error } = await supabase.auth.signInWithOtp({
		email,
		options: {
			emailRedirectTo: "https://app-amigo-secreto.vercel.app/auth/confirm",
		},
	});

	if (error) {
		return {
			success: false,
			message: error.message,
		};
	}

	return {
		success: true,
		message: "Email enviado",
	};
}

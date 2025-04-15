"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader, MessageCircle } from "lucide-react";
import { useActionState } from "react";
import { type LoginState, login } from "../actions";

export default function LoginForm() {
	const [state, formAction, pending] = useActionState<LoginState, FormData>(
		login,
		{
			success: null,
			message: "",
		},
	);

	return (
		<Card className="mx-auto max-w-sm w-full">
			<CardHeader>
				<CardTitle className="text-2xl">Login</CardTitle>
				<CardDescription>
					Digite seu email para receber um link de login.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<form action={formAction}>
					<div className="grid gap-4">
						<div className="space-y-2">
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								type="email"
								name="email"
								placeholder="jhon@doe.com"
								required
							/>
						</div>

						{state.success === true && (
							<Alert className="text-muted-foreground">
								<MessageCircle className="size-4 !text-green-600" />
								<AlertTitle className="text-foreground">
									Email enviado
								</AlertTitle>
								<AlertDescription>
									Confira seu inbox para acessar o link de login.
								</AlertDescription>
							</Alert>
						)}

						{state.success === false && (
							<Alert className="text-muted-foreground">
								<MessageCircle className="size-4 !text-primary" />
								<AlertTitle className="text-foreground">Erro!</AlertTitle>
								<AlertDescription>
									Ocorreu um erro ao enviar o link de login. Por favor, entre em
									contato com o suporte.
								</AlertDescription>
							</Alert>
						)}

						<Button type="submit" className="w-full" disabled={pending}>
							{pending && <Loader className="animate-spin size-4" />}
							Login
						</Button>
					</div>
				</form>
			</CardContent>
		</Card>
	);
}

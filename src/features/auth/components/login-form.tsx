'use client';

import { useState } from 'react';
import { Controller,useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import Link from 'next/link';
import { z } from 'zod';
import { EyeIcon, EyeOffIcon, LoaderCircleIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Field, FieldDescription, FieldGroup, FieldLabel } from '@/components/ui/field';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';

const loginSchema = z.object({
  email: z.email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

type LoginSchema = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(data: LoginSchema) {
    await authClient.signIn.email(
      { email: data.email, password: data.password, callbackURL: "/" },
      {
        onSuccess: () => {
          router.push("/");
        },
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
      }
    );
  }


  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Welcome back</CardTitle>
        <CardDescription>Enter your credentials to sign in</CardDescription>
      </CardHeader>

      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent>
            <div className='grid gap-6'>
                <div className= "flex flex-col gap-4">
                    <Button variant="outline" className="w-full">
                        
                        Sign in with Google
                    </Button>
                    <Button variant="outline" className="w-full">
                        Sign in with github
                    </Button>
                </div>

                <FieldGroup className=''>
            <Controller
            name="email"
            control={control}
            render={({field, fieldState}) => (
                <Field data-invalid={!!errors.email}>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        autoComplete="email"
                        aria-invalid={!!errors.email}
                        {...field}
                    />
                </Field>
            )} 
            />
            
           <Controller
           name="password"
           control={control}
           render={({field, fieldState}) => (
            <Field data-invalid={!!errors.password}>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                
                <div className="relative flex items-center">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  aria-invalid={!!errors.password}
                  className="pr-10"
                  {...register('password')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 text-muted-foreground hover:text-foreground"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <EyeOffIcon className="size-4" />
                  ) : (
                    <EyeIcon className="size-4" />
                  )}
                </button>
              
                </div>
            </Field>
           )}
           />
          </FieldGroup>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting && (
              <LoaderCircleIcon data-icon="inline-start" className="animate-spin" />
            )}
            Sign in
          </Button>
          <div className="text-center text-sm">
          Don&apos;t have an account?{' '}
            <Link href="/sign-up" className="text-foreground underline underline-offset-4 hover:no-underline">
              Sign up
            </Link>
          </div>
            </div>
        </CardContent>
      </form>
    </Card>
  );
}

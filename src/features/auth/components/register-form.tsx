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
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';

const registerSchema = z.object({
  email: z.email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string().min(8, 'Password must be at least 8 characters'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
})


type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    }
  });

  async function onSubmit(data: RegisterFormValues) {
    
      await authClient.signUp.email({
        name: data.email,
        email: data.email,
        password: data.password,
        callbackURL: "/"
      },
      {
        onSuccess: () => {
          router.push("/");
        },
        onError: (ctx) => {
          toast.error(ctx.error.message);
        }
      }
    ) 
  }


  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>Enter your details to create an account</CardDescription>
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
                    {fieldState.invalid && (
                      <FieldError errors={fieldState.error?.message ? [{message: fieldState.error.message}] : undefined} />
                    )}
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
                  autoComplete="new-password"
                  aria-invalid={!!errors.password}
                  className="pr-10"
                  {...field}
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
                {fieldState.invalid && (
                  <FieldError errors={fieldState.error?.message ? [{message: fieldState.error.message}] : undefined} />
                )}
                
            </Field>
           )}
           />
           <Controller
           name="confirmPassword"
           control={control}
           render={({field, fieldState}) => (
            <Field data-invalid={!!errors.confirmPassword}>
                <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
                
                <Input
                  id="confirmPassword"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  autoComplete="confirm-password"
                  aria-invalid={!!errors.confirmPassword}
                  className="pr-10"
                  {...field}
                />
                {errors.confirmPassword && (
                  <FieldError errors={[{message: errors.confirmPassword.message}]} />
                )}
            </Field>
           )}
           />
          </FieldGroup>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting && (
              <LoaderCircleIcon data-icon="inline-start" className="animate-spin" />
            )}
            Create account
          </Button>
          <div className="text-center text-sm">
          Already have an account?{' '}
            <Link href="/login" className="text-foreground underline underline-offset-4 hover:no-underline">
              Login
            </Link>
          </div>
            </div>
        </CardContent>
      </form>
    </Card>
  );
}

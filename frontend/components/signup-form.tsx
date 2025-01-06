import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from 'next/image'
import Link from 'next/link'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import { signUpUser } from '@/service/authservice'
import { FormLogin } from '@/types/FormLogin.type'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { Loader2 } from 'lucide-react'

type signUpForm = {
  name: string,
} & FormLogin

export function SignupForm() {
  const { toast } = useToast()
  const router = useRouter()

  const { isPending, mutate } = useMutation({
    mutationFn: (signupData: signUpForm) => signUpUser(signupData),
    onError: (error) => {
      toast({
        title: 'Algo deu errado!',
        description: 'Verifique seu email e senha e tente novamente.',
        variant: 'destructive',
      })

      console.error(error)
    },
    onSuccess: async (success) => {
      toast({
        title: `Olá, ${success.user.name}! Você já pode fazer seu login!`,
        variant: 'default',
      })

      router.push('/login')
    }
  })

  const formSchema = z.object({
    email: z.string()
      .nonempty({ message: "Email is required." })
      .email({ message: "Invalid email address." }),
    
    password: z.string()
      .nonempty({ message: "Password is required." })
      .min(6, { message: "Password must be at least 6 characters." }),
  
    name: z.string()
      .nonempty({ message: "Name is required." })
      .min(2, { message: "Name must be at least 2 characters." }),
  
    confirm_password: z.string()
      .nonempty({ message: "Confirm password is required." })
      .min(6, { message: "Password must be at least 6 characters." })
      .superRefine((values, ctx) => {
        if (values.confirm_password !== values.password) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Passwords don't match",
            path: ["confirm_password"],
          });
        }
      }),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirm_password: "",
      name: ""
    }
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (values.confirm_password !== values.password) {
      form.setError('confirm_password', { type: 'manual', message: "Passwords don't match" })

      return 
    }

    mutate(values)
  }

  return (
    <div className={cn("flex flex-col gap-6")}>
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          <Form {...form}>
            <form className="p-6 md:p-8" onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold">Create your account</h1>
                  <small className="text-balance text-muted-foreground">
                    Fill in the fields below to create your account
                  </small>
                </div>
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="your@email.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input type='password' placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="confirm_password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm password</FormLabel>
                        <FormControl>
                          <Input type='confirm_password' placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {isPending ? (
                  <>
                    <Button disabled>
                      <Loader2 className="animate-spin" />
                      Please wait...
                    </Button>
                  </>

                ) : (
                  <Button type="submit" className="w-full" disabled={isPending}>
                    Create Account
                  </Button>
                )}
                <div className="text-center text-sm">
                  Do you have an account?{" "}
                  <Link href="/login" className="underline underline-offset-4">
                    Go to Login
                  </Link>
                </div>
              </div>
            </form>
          </Form>
          <div className="relative hidden bg-muted md:block">
            <Image
              src="/images/login-image.png"
              alt="Image"
              className="absolute h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
              width={1000}
              height={1000}
              priority
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  )
}

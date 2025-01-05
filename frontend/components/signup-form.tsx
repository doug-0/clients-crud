import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from 'next/image'
import Link from 'next/link'

type SignupFormProps = React.ComponentProps<"div"> & {
  register: (formData: FormData) => void;
};

export function SignupForm({
  className,
  register,
  ...props
}: SignupFormProps) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" action={register}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Create your account</h1>
                <small className="text-balance text-muted-foreground">
                  Fill in the fields below to create your account
                </small>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Name</Label>
                <Input
                  id="name"
                  type="name"
                  placeholder="Your Name"
                  name='name'
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  name='email'
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input id="password" type="password" name='password' required />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="confirm_password">Confirm your password</Label>
                </div>
                <Input id="confirm_password" type="password" name='confirm_password' required />
              </div>
              <Button type="submit" className="w-full">
                Create Account
              </Button>
              <div className="text-center text-sm">
                Do you have an account?{" "}
                <Link href="/login" className="underline underline-offset-4">
                  Go to Login
                </Link>
              </div>
            </div>
          </form>
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

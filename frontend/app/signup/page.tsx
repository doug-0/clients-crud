import { SignupForm } from '@/components/signup-form';

export default function Signup() {
  const registerUser = async (formData: FormData) => {
    'use server'

    console.log('register', formData.get('name'), formData.get('email'), formData.get('password'), formData.get('confirm_password'))
  }

  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <SignupForm register={registerUser} />
      </div>
    </div>
  );
}

/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { validateToken } from '@/service/authservice';
import { useToast } from './use-toast';

export const useAuth = () => {
  const router = useRouter();
  const token = localStorage.getItem('token');
  const { toast } = useToast()

  const { data, isLoading } = useQuery({
    queryKey: ['validateToken'],
    queryFn: () => validateToken(token),
  });

  useEffect(() => {
    if (data?.status === 401) {
      router.push('/login');

      toast({
        title: `Parece que você não está logado!`,
        description: 'Primeiro faça seu login.',
        variant: 'default',
      })

      return
    }
  }, [data, router]);

  return { loading: isLoading, isAuthenticated: data?.status !== 401 };
};

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { toast } from 'sonner';
import { auth } from '@/firebase/client';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import FormField from '@/components/FormField';
import { signIn, signUp } from '@/lib/actions/auth.action';

const authFormSchema = (type: FormType) => {
  return z.object({
    name: type === 'sign-up' ? z.string().min(3) : z.string().optional(),
    email: z.email(),
    password: z.string().min(6),
  });
};

const AuthForm = ({ type }: { type: FormType }) => {
  const router = useRouter();
  const formSchema = authFormSchema(type);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { email, name, password } = values;
    // const auth = getAuth();
    try {
      if (type === 'sign-in') {
        const userCredentials = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        const idToken = await userCredentials.user.getIdToken();

        if (!idToken) {
          toast.success('No es posible iniciar sesiónmb');
          return;
        }
        await signIn({
          email,
          idToken,
        });
        toast.success('Sesion iniciada correctamente');
        router.push('/');
      } else {
        const userCredentials = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const result = await signUp({
          uid: userCredentials.user.uid,
          name: name!,
          email,
          password,
        });
        if (!result?.success) {
          toast.error(result?.message);
          return;
        }
        toast.success('Registro completado. Por favor inicia sesion');
        router.push('/sign-in');
      }
    } catch (e) {
      toast.error(`Ha habido un error ${e}`);
    }
  };

  const isSignIn = type === 'sign-in';

  return (
    <div className='card-border lg:min-w-[566px]'>
      <div className='flex flex-col gap-6 card py-14 px-10'>
        <div className='flex flex-row gap-2 justify-center'>
          <Image src='logo.svg' alt='logo' height={32} width={38} />
          <h2 className='text-primary-100'>Babel Entrevistas</h2>
        </div>
        <h3 className='text-center'>Practica entrevistas con IA</h3>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='w-full space-y-6 mt-4 form'
          >
            {!isSignIn && (
              <FormField
                control={form.control}
                name='name'
                label='Nombre'
                placeholder='Introduce nombre'
              />
            )}
            <FormField
              control={form.control}
              name='email'
              label='Email'
              placeholder='Introduce email'
            />
            <FormField
              control={form.control}
              name='password'
              label='Contraseña'
              placeholder='Introduce contraseña'
              type='password'
            />
            <Button className='btn' type='submit'>
              {isSignIn ? 'Iniciar sesión' : 'Registrarse'}
            </Button>
          </form>
        </Form>

        <p className='text-center'>
          {isSignIn ? '¿No tienes cuenta?' : 'Ya tengo cuenta'}
          <Link
            href={!isSignIn ? '/sign-in' : '/sign-up'}
            className='font-bold text-user-primary ml-1'
          >
            {!isSignIn ? 'Iniciar sesión' : 'Registro'}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;

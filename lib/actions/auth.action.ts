'use server';

import { auth, db } from '@/firebase/admin';
import { FirebaseError } from 'firebase/app';
import { cookies } from 'next/headers';

const ONE_WEEK = 60 * 60 * 24 * 7;

export async function signUp(params: SignUpParams) {
  const { uid, name, email } = params;
  try {
    const userRecord = await db.collection('users').doc(uid).get();
    if (userRecord.exists) {
      return {
        success: false,
        message: 'Usuario existente. Por favor inica sesión',
      };
    }

    await db.collection('users').doc(uid).set({
      name,
      email,
    });

    return {
      success: true,
      message: 'Usario creado correctamente. Inicia sesión',
    };
  } catch (e: unknown) {
    console.error('Error creando usuario', e);
    const error = e as FirebaseError;
    if (error.code === '/auth/email-already-exist') {
      return {
        success: false,
        message: 'Este email ya existe',
      };
    }
    return {
      success: false,
      message: 'Error al crear cuenta',
    };
  }
}

export async function setSessionCookie(idToken: string) {
  const cookieStore = await cookies();

  const sessionCookie = await auth.createSessionCookie(idToken, {
    expiresIn: ONE_WEEK * 1000,
  });

  cookieStore.set('session', sessionCookie, {
    maxAge: ONE_WEEK,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  });

  return {
    success: false,
    message: 'Error al crear cuenta',
  };
}

export async function signIn(params: SignInParams) {
  const { email, idToken } = params;

  try {
    const userRecord = await auth.getUserByEmail(email);

    if (!userRecord) {
      return {
        success: false,
        message: 'Usuario no existente. Crea una cuenta',
      };
    }
    await setSessionCookie(idToken);
  } catch (e: unknown) {
    console.error('Error creando usuario', e);
    return {
      success: false,
      message: 'Error al iniciar sesión',
    };
  }
}

export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('session')?.value;
  if (!sessionCookie) return null;
  try {
    const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);
    const userRecord = await db
      .collection('users')
      .doc(decodedClaims.uid)
      .get();
    if (!userRecord.exists) return null;
    return {
      ...userRecord.data(),
      id: userRecord.id,
    } as User;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function isAuthenticated() {
  const user = await getCurrentUser();
  return !!user;
}



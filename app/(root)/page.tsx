import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import InterviewCard from '@/components/InterviewCard';
import {
  getCurrentUser,
  getInterviewByUserId,
  getLatestInterviews,
} from '@/lib/actions/auth.action';

const HomePage = async () => {
  const user = await getCurrentUser();

  const [userInterviews, latestInterviews] = await Promise.all([
    await getInterviewByUserId(user?.id!),
    await getLatestInterviews({ userId: user?.id! }),
  ]);

  const hasPastInterviews = userInterviews?.length > 0;
  const hasUpcomingInterviews = latestInterviews?.length > 0;

  return (
    <>
      <section className='card-cta'>
        <div className='flex flex-col gap-6 max-w-lg'>
          <h2>
            Prepárate para entrevistas práctica y feedback potenciados por IA.
          </h2>
          <p className='text-lg'>
            Pratica entrevistas reales y recibe feedback al sintante
          </p>

          <Button asChild className='btn-primary max-sm:w-full'>
            <Link href='/interview'>Empieza una Entrevista</Link>
          </Button>
        </div>
        <Image
          src='/robot.png'
          alt='robo-dude'
          width={400}
          height={400}
          className='max-sm:hidden'
        />
      </section>
      <section className='flex flex-col gap-6 mt-8'>
        <h2>Tus entrevistas</h2>

        <div className='interviews-section'>
          {hasPastInterviews ? (
            userInterviews?.map((interview) => (
              <InterviewCard {...interview} key={interview.id} />
            ))
          ) : (
            <p>Aún no has realizado ninguna entrevista</p>
          )}
        </div>
      </section>

      <section className='flex flex-col gap-6 mt-8'>
        <h2>Realiza una entrevista</h2>

        <div className='interviews-section'>
           {hasUpcomingInterviews ? (
            latestInterviews?.map((interview) => (
              <InterviewCard {...interview} key={interview.id} />
            ))
          ) : (
            <p>No hay entrevistas disponibles</p>
          )}
        </div>
      </section>
    </>
  );
};

export default HomePage;

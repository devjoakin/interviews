'use server';

import { feedbackSchema } from '@/constants';
import { db } from '@/firebase/admin';
import { google } from '@ai-sdk/google';
import { generateObject } from 'ai';

export async function getInterviewByUserId(
  userId: string
): Promise<Interview[] | null> {
  const interviews = await db
    .collection('interviews')
    .where('userId', '==', userId)
    .orderBy('createdAt', 'desc')
    .get();

  return interviews.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Interview[];
}

export async function getLatestInterviews(
  params: GetLatestInterviewsParams
): Promise<Interview[] | null> {
  const { userId, limit = 20 } = params;
  const interviews = await db
    .collection('interviews')
    .orderBy('createdAt', 'desc')
    .where('finalized', '==', true)
    .where('userId', '!=', userId)
    .limit(limit)
    .get();

  return interviews.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Interview[];
}

export async function getInterviewById(id: string): Promise<Interview | null> {
  const interview = await db.collection('interviews').doc(id).get();
  return interview.data() as Interview | null;
}

export async function createFeedback(params: CreateFeedbackParams) {
  const { interviewId, userId, transcript, feedbackId } = params;

  try {
    const formattedTranscript = transcript
      .map(
        (sentence: { role: string; content: string }) =>
          `- ${sentence.role}: ${sentence.content}\n`
      )
      .join();

    const { object } = await generateObject({
      model: google('gemini-2.0-flash-001'),
      providerOptions: {
        google: {
          structuredOutputs: true,
        },
      },
      schema: feedbackSchema,
      prompt: `
       Eres un entrevistador de IA que analiza una entrevista simulada. Tu tarea es evaluar al candidato en base a categorías estructuradas. Sé minucioso y detallado en tu análisis. No seas indulgente con el candidato. Si hay errores o áreas de mejora, indícalos.
       Transcripción:
      ${formattedTranscript}

      Por favor, califica al candidato de 0 a 100 en las siguientes áreas.  
      No añadas categorías distintas a las proporcionadas, solo puntúa en las siguientes:  
        
      Cada categoría debe ser un objeto con el nombre de la categoría, la puntuación y un comentario:  
      - **Habilidades de Comunicación**: Claridad, articulación, respuestas estructuradas.  
      - **Conocimientos Técnicos**: Comprensión de conceptos clave para el puesto.  
      - **Resolución de Problemas**: Capacidad para analizar problemas y proponer soluciones.  
      - **Compatibilidad Cultural y con el Puesto**: Alineación con los valores de la empresa y el rol.  
      - **Confianza y Claridad**: Seguridad en las respuestas, participación y claridad.  
        Provide a summary of strengths, areas for improvement, and a final assessment of the candidate.

      Proporciona un resumen de fortalezas, áreas de mejora y una evaluación final del candidato.  
        `,
      system:
        'Eres un entrevistador profesional que analiza una entrevista simulada. Tu tarea es evaluar al candidato en base a categorías estructuradas.',
    });
    console.log('Generated feedback object:', object);
    const feedback = {
      interviewId: interviewId,
      userId: userId,
      totalScore: object.totalScore,
      categoryScores: object.categoryScores,
      strengths: object.strengths,
      areasForImprovement: object.areasForImprovement,
      finalAssessment: object.finalAssessment,
      createdAt: new Date().toISOString(),
    };
    await db.collection('feedback').add(feedback);

    return {
      success: true,
      feedbackId: feedbackId,
    };
  } catch (error) {
    console.log('Error guardando feedback', error);
    return {
      success: false,
      feedbackId: feedbackId,
    };
  }
}

export async function getFeedbackByInterviewId(
  params: GetFeedbackByInterviewIdParams
): Promise<Feedback | null> {
  const { interviewId, userId } = params;
  const feedback = await db
    .collection('feedback')
    .where('interviewId', '==', interviewId)
    .where('userId', '==', userId)
    .limit(1)
    .get();

  if (feedback.empty) return null;
  const feedbackDoc = feedback.docs[0];

  return {
    id: feedbackDoc.id,
    ...feedbackDoc.data(),
  } as Feedback;
}

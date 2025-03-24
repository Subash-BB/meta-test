import React from 'react'
import { resumeHelper } from '@/helpers/resumeHelpers'
import ResumePage from '@/components/ResumePage'
export async function generateMetadata({ params }: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const res = await fetch(`https://dev-api.elevateresume.ai/resume/${id}`)
  if (res.status !== 200) {
    return {
      title: '404 - Page not found',
      description: 'The page you are looking for does not exist.',
      status: 404,
    };
  } else {
    const resume: any = await res.json()
    const title = resume?.name ? `${resume.name} - ${resume.title} Resume` : 'Resume';
    const description = resume?.summary || 'Professional Resume';
    const imageUrl = resume?.illustration_image || '';
    const url = `https://elevateresume-dev.netlify.app/resume/${id}`;
    return {
      title,
      description,
      openGraph: {
        title,
        description,
        images: imageUrl ? [{ url: imageUrl }] : [],
        url,
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: imageUrl ? [imageUrl] : [],
      },
      alternates: {
        canonical: url,
      },
      other: {
        'application/ld+json': JSON.stringify({
          '@context': 'https://schema.org/',
          '@type': 'Person',
          name: resume?.name,
          description,
          jobTitle: resume?.title,
          skills: resume?.skills,
          url,
        }),
      }
    }
  }
}
async function page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const res = await fetch(`https://dev-api.elevateresume.ai/resume/${id}`)
  if (res.status !== 200) {
    return <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">404</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300">Page not found</p>
    </div>
  }
  const resume: any = await res.json()
  return (
    <ResumePage resume={resume} />
  )
}

export default page
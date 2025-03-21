import React from 'react'
export async function generateMetadata({ params }: {
    params: Promise<{ id: string }>
  }) {
    const { id } = await params
    const res = await fetch(`https://dev-api.elevateresume.ai/resume/${id}`)
    const resume:any = await res.json()
    const title = resume?.name ? `${resume.name} - ${resume.title} Resume` : 'Resume';
  const description = resume?.summary || 'Professional Resume';
  const imageUrl = resume?.illustration_image || '';
  const url = `https://yourdomain.com/resume/${id}`;
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
async function page({params}:{params:Promise<{id:string}>}) {
  const {id} = await params
  return (
    <div>page</div>
  )
}

export default page
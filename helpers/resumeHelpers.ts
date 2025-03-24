import html2canvas from "html2canvas";
import { Linkedin, Instagram } from "lucide-react";

export const resumeHelper = {
  resumeToSlides: (resume: any) => {
    const newSlides: any[] = [
      {
        type: 'profile',
        content: {
          name: resume.name,
          role: resume.title,
          image: resume.illustration_image,
          profile_image: resume.picture || resume.illustration_image
        },
        background: 'bg-gradient-to-br from-gray-900 to-black'
      },
      {
        type: 'summary',
        content: {
          title: 'SUMMARY:',
          points: [
            resume.summary
          ],
          // skills: resume.skills
        },
        background: 'bg-gradient-to-br from-blue-900 to-purple-900'
      }
    ]
    let skillObject: any = {
      type: 'skills',
      content: {
        skills: []
      },
      background: 'bg-gradient-to-br from-blue-900 to-purple-900'
    };
    resume.skills.forEach((skill: any, index: number) => {
      skillObject.content.skills.push(skill);
      if (skillObject.content.skills.length === 10) {
        newSlides.push(skillObject);
        skillObject = {
          type: 'skills',
          content: {
            skills: []
          },
          background: 'bg-gradient-to-br from-blue-900 to-purple-900'
        };
      } else if (index === resume.skills.length - 1) {
        newSlides.push(skillObject);
      }
    })
    // work experience
    if (resume.work_experience.length > 0) {
      let workExperienceObject: any = {
        type: 'experience',
        content: {
          title: 'WORK EXPERIENCE:',
          points: [],
          projects: []
        },
        background: 'bg-gradient-to-br from-indigo-900 to-blue-900'
      }
      resume.work_experience.forEach((experience: any, index: number) => {
        if (experience.projects.length > 0) {
          workExperienceObject.content.points.push(`${experience.company_name} - ${experience.start_date} - ${experience?.end_date || 'Present'} - ${experience.role}`);
          experience.projects.forEach((project: any, index: number) => {
            workExperienceObject.content.projects.push(project);
            if (workExperienceObject.content.projects.length === 2) {
              newSlides.push(workExperienceObject);
              workExperienceObject = {
                type: 'experience',
                content: {
                  title: 'WORK EXPERIENCE:',
                  points: [],
                  projects: []
                },
                background: 'bg-gradient-to-br from-indigo-900 to-blue-900'
              }
            } else if (index === experience.projects.length - 1) {
              newSlides.push(workExperienceObject);
              workExperienceObject = {
                type: 'experience',
                content: {
                  title: 'WORK EXPERIENCE:',
                  points: [],
                  projects: []
                },
                background: 'bg-gradient-to-br from-indigo-900 to-blue-900'
              }
            }
          })
        } else {
          workExperienceObject.content.points.push(`${experience.company_name} - ${experience.start_date} - ${experience?.end_date || 'Present'} - ${experience.role}`);
          if (workExperienceObject.content.points.length === 4) {
            newSlides.push(workExperienceObject);
            workExperienceObject = {
              type: 'experience',
              content: {
                title: 'WORK EXPERIENCE:',
                points: [],
                projects: []
              },
              background: 'bg-gradient-to-br from-indigo-900 to-blue-900'
            }
          } else if (index === resume.work_experience.length - 1) {
            newSlides.push(workExperienceObject);
          }
        }
      })
    }
    // projects
    if (resume.projects.length > 0) {

      let projectObject: any = {
        type: 'projects',
        content: {
          projects: []
        },
        background: 'bg-gradient-to-br from-red-900 via-purple-900 to-indigo-900'
      }
      resume.projects.forEach((project: any, index: number) => {
        projectObject.content.projects.push(`${project.project_name}`);
        if (projectObject.content.projects.length === 2) {
          newSlides.push(projectObject);
          projectObject = {
            type: 'projects',
            content: {
              projects: []
            },
            background: 'bg-gradient-to-br from-red-900 via-purple-900 to-indigo-900'
          }
        } else if (index === resume.projects.length - 1) {
          newSlides.push(projectObject);
        }
      })
    }
    // education
    if (resume.education.length > 0) {
      let educationObject: any = {
        type: 'education',
        content: {
          title: 'EDUCATION SUMMARY:',
          points: []
        },
        background: 'bg-gradient-to-br from-purple-900 to-indigo-900'
      }
      resume.education.forEach((education: any, index: number) => {
        educationObject.content.points.push(`${education.education_name} - ${education.institution_name} - ${education.start_year} - ${education.end_year || 'Present'}`);
        if (educationObject.content.points.length === 5) {
          newSlides.push(educationObject);
          educationObject = {
            type: 'education',
            content: {
              title: 'EDUCATION SUMMARY:',
              points: []
            },
            background: 'bg-gradient-to-br from-purple-900 to-indigo-900'
          }
        } else if (index === resume.education.length - 1) {
          newSlides.push(educationObject);
        }
      })
    }
    // certifications
    if (resume.certifications.length > 0) {
      let certificationObject: any = {
        type: 'certifications',
        content: {
          title: 'CERTIFICATIONS:',
          points: []
        },
        background: 'bg-gradient-to-br from-purple-900 to-indigo-900'
      }
      resume.certifications.forEach((certification: any, index: number) => {
        certificationObject.content.points.push(`${certification.certification_name}${certification.platform ? ` - ${certification.platform}` : ''}`);
        if (certificationObject.content.points.length === 5) {
          newSlides.push(certificationObject);
          certificationObject = {
            type: 'certifications',
            content: {
              title: 'CERTIFICATIONS:',
              points: []
            },
            background: 'bg-gradient-to-br from-purple-900 to-indigo-900'
          }
        } else if (index === resume.certifications.length - 1) {
          newSlides.push(certificationObject);
        }
      })
    }
    newSlides.push({
      type: 'cta',
      content: {
        title: 'Summarise and share your profile on social media as carousels.',
        subtitle: 'Get noticed by top recruiters',
        cta: 'Visit - elevateresume.ai now',
        shareButtons: [
          {
            icon: Linkedin,
            label: 'Share on LinkedIn',
            onClick: () => {
              const url = 'https://www.linkedin.com/sharing/share-offsite/?url=' + encodeURIComponent(`https://elevateresume.vercel.app/resume/${resume.id}`);
              window.open(url, '_blank', 'width=600,height=600');
            }
          },
          {
            icon: Instagram,
            label: 'Share on Instagram',
            onClick: () => {
              const link = document.createElement('a');
              link.download = 'resume-carousel.pdf';
              link.href = '/resume-carousel.pdf';
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }
          }
        ]
      },
      background: 'bg-gradient-to-br from-red-900 via-purple-900 to-indigo-900'
    })
    return newSlides;
  },
  generateNewSlides: (slide: any, name: string, role: string, targetDiv: any) => {
    const innerHtml = document.createElement('div');
    innerHtml.className = "slide fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50";

    const content = `
          <div class="w-full max-w-2xl mx-4 relative overflow-hidden rounded-xl">
            <div class="${slide.background}">
              <div class="min-h-[500px] p-8 relative z-10">
                <div class="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/50 to-transparent pointer-events-none z-[-1]"></div>

                ${slide.type === 'profile' ? `
                  <div class="text-center">
                    <div class="h-48 -mx-8 -mt-8 mb-8">
                      <img src="${slide.content.image}" alt="" class="w-full h-full object-cover">
                    </div>
                    <div class="-mt-24 mb-8 flex justify-center items-center">
                      <img 
                        src="${slide.content.profile_image}"
                        alt="${slide.content.name}"
                        class="w-32 h-32 rounded-full border-4 border-white dark:border-gray-800 object-cover"
                      >
                    </div>
                    <h2 class="text-4xl font-bold mb-2 text-white tracking-tight uppercase">${slide.content.name}</h2>
                    <p class="text-2xl text-gray-200">${slide.content.role}</p>
                  </div>
                ` : ''}

                ${slide.type === 'summary' ? `
                  <div class="relative z-10">
                    <h3 class="text-3xl font-bold text-red-400 mb-6">${slide.content.title}</h3>
                    <ul class="mb-8 space-y-3">
                      ${slide.content.points.map((point: string, index: number) => `
                        <li key="${index}" class="text-gray-200 text-lg">${point}</li>
                      `).join('')}
                    </ul>
                  </div>
                ` : ''}

                ${slide.type === 'skills' ? `
                  <div>
                    <h4 class="text-2xl font-semibold text-red-400 mb-4">SKILLS:</h4>
                    <div class="grid grid-cols-2 gap-4">
                      ${slide.content.skills.map((skill: string, index: number) => `
                        <div key="${index}" class="text-gray-200 text-lg bg-black bg-opacity-30 rounded-lg px-4 py-2 flex items-center justify-start"><p>${skill}</p></div>
                      `).join('')}
                    </div>
                  </div>
                ` : ''}

                ${slide.type === 'experience' ? `
                  <div>
                    ${slide.content.points.length > 0 ? `
                      <h3 class="text-3xl font-bold text-red-400 mb-6">${slide.content.title}</h3>
                      <ul class="space-y-4">
                        ${slide.content.points.map((point: string, index: number) => `
                          <li key="${index}" class="text-gray-200 text-lg bg-black bg-opacity-30 rounded-lg px-4 py-3">${point}</li>
                        `).join('')}
                      </ul>
                    ` : ''}
                    
                    ${slide.content.projects.length > 0 ? `
                      <div class="mt-4">
                        <h4 class="text-2xl font-semibold text-red-400 mb-4">PROJECTS:</h4>
                        <ul class="space-y-4">
                          ${slide.content.projects.map((project: string, index: number) => `
                            <li key="${index}" class="text-gray-200 text-lg bg-black bg-opacity-30 rounded-lg px-4 py-3">${project}</li>
                          `).join('')}
                        </ul>
                      </div>
                    ` : ''}
                  </div>
                ` : ''}

                ${slide.type === 'projects' ? `
                  <div>
                    <h4 class="text-2xl font-semibold text-red-400 mb-4">PROJECTS:</h4>
                    <ul class="space-y-4">
                      ${slide.content.projects.map((project: string, index: number) => `
                        <li key="${index}" class="text-gray-200 text-lg bg-black bg-opacity-30 rounded-lg px-4 py-3">${project}</li>
                      `).join('')}
                    </ul>
                  </div>
                ` : ''}

                ${slide.type === 'education' ? `
                  <div class="relative z-10">
                    <h3 class="text-3xl font-bold text-red-400 mb-6">${slide.content.title}</h3>
                    <ul class="space-y-4">
                      ${slide.content.points.map((point: string, index: number) => `
                        <li key="${index}" class="text-gray-200 text-lg bg-black bg-opacity-30 rounded-lg px-4 py-3">${point}</li>
                      `).join('')}
                    </ul>
                  </div>
                ` : ''}

                ${slide.type === 'achievements' ? `
                  <div>
                    <h3 class="text-3xl font-bold text-red-400 mb-6">${slide.content.title}</h3>
                    <p class="text-gray-200 text-lg leading-relaxed bg-black bg-opacity-30 rounded-lg px-4 py-3">${slide.content.description}</p>
                  </div>
                ` : ''}

                ${slide.type === 'certifications' ? `
                  <div>
                    <h3 class="text-3xl font-bold text-red-400 mb-6">${slide.content.title}</h3>
                    <ul class="space-y-4">
                      ${slide.content.points.map((point: string, index: number) => `
                        <li key="${index}" class="text-gray-200 text-lg bg-black bg-opacity-30 rounded-lg px-4 py-3">${point}</li>
                      `).join('')}
                    </ul>
                  </div>
                ` : ''}

                ${slide.type === 'cta' ? `
                  <div class="text-center space-y-8">
                    <h3 class="text-3xl font-bold text-white">${slide.content.title}</h3>
                    <div class="text-7xl">😊</div>
                    <p class="text-2xl text-gray-200 mb-8">${slide.content.subtitle}</p>

                    <div class="flex flex-col items-center space-y-4">
                      <p class="text-xl text-gray-200 mb-4">Share your profile</p>
                      <div class="flex space-x-4">
                        ${slide.content.shareButtons?.map((button: any, index: number) => `
                          <button
                            key="${index}"
                            onclick="${button.onClick}"
                            class="flex items-center space-x-2 px-6 py-3 bg-white bg-opacity-10 hover:bg-opacity-20 rounded-full transition-all duration-200"
                          >
                            <svg class="w-5 h-5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${button.icon}</svg>
                            <span class="text-white">${button.label}</span>
                          </button>
                        `).join('')}
                      </div>
                    </div>

                    <p class="text-red-400 text-xl font-semibold bg-black bg-opacity-30 inline-block px-6 py-3 rounded-full mt-8">
                      ${slide.content.cta}
                    </p>
                  </div>
                ` : ''}
              </div>

              <div class="bg-black bg-opacity-50 backdrop-blur-sm text-white py-4 px-6 flex justify-between items-center">
                ${slide.type !== 'profile' ? `
                  <div>
                    <span class="text-red-400 font-bold">${name}</span>
                    <span class="ml-2 text-gray-200">${role}</span>
                  </div>
                ` : '<div></div>'}
                <div class="text-sm text-gray-300">ElevateResume.ai</div>
              </div>
            </div>
          </div>
        `
    innerHtml.innerHTML = content;
    targetDiv.appendChild(innerHtml);
    return targetDiv;
  },
  downloadSlides: async (slides: any[]) => {
    const slidesContainer = document.createElement('div');
    slidesContainer.style.position = 'absolute';
    slidesContainer.style.opacity = '0';
    slidesContainer.style.left = '-9999px';  // Move off-screen
    document.body.appendChild(slidesContainer);  // Add to DOM

    slides.forEach((slide, index) => {
      if (index !== slides.length - 1) {
        resumeHelper.generateNewSlides(slide, slides[0].content.name, slides[0].content.role, slidesContainer);
      }
    });

    // Wait for a brief moment to ensure DOM elements are rendered
    await new Promise(resolve => setTimeout(resolve, 100));

    const slideDivs = slidesContainer.querySelectorAll('.slide');
    // const pdf = new jsPDF();
    for (let i = 0; i < slideDivs.length; i++) {
      const slideDiv = slideDivs[i];
      const slideNumber = i + 1;

      try {
        const canvas = await html2canvas(slideDiv as HTMLElement, {
          logging: false,
          useCORS: true,
          allowTaint: true
        });

        const dataURL = canvas.toDataURL('image/png');
        // if (i > 0) {
        //   pdf.addPage(); // Add a new page for subsequent slides
        // }

        // Get page dimensions
        // const pageWidth = pdf.internal.pageSize.getWidth();
        // const pageHeight = pdf.internal.pageSize.getHeight();

        // Set white background for the page
        // pdf.setFillColor(255, 255, 255);
        // pdf.rect(0, 0, pageWidth, pageHeight, 'F');

        // Calculate image dimensions to fit the page while maintaining aspect ratio
        // const imgWidth = pageWidth - 20; // Add margin
        // const imgHeight = (canvas.height * imgWidth) / canvas.width;

        // Calculate x and y coordinates to center the image
        // const x = (pageWidth - imgWidth) / 2;
        // const y = (pageHeight - imgHeight) / 2;

        // Add the centered image to the PDF
        // pdf.addImage(dataURL, 'PNG', x, y, imgWidth, imgHeight);

        const a = document.createElement('a');
        a.href = dataURL;
        a.download = `slide-${slideNumber}.png`;
        a.click();
      } catch (error) {
        console.error(`Error converting slide ${slideNumber} to image:`, error);
      }
    }
    // pdf.save(`${slides[0].content.name}-${slides[0].content.role}-resume.pdf`);
    // Clean up
    document.body.removeChild(slidesContainer);
  }
}
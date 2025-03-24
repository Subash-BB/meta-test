import html2canvas from "html2canvas-pro";
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
    innerHtml.className = "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50";

    const content = `
          <div class="slide" style="width: 100%; max-width: 42rem; margin-left: 1rem; margin-right: 1rem; position: relative; overflow: hidden; border-radius: 0.75rem;">
            <div class="${slide.background}" style="min-height: 500px;">
              <div style="min-height: 500px; padding: 2rem; position: relative; z-index: 10;">
                <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(to top, rgba(0,0,0,0.5), transparent); pointer-events: none; z-index: -1;"></div>

                ${slide.type === 'profile' ? `
                  <div style="text-align: center;">
                    <div style="height: 12rem; margin: -2rem -2rem 2rem -2rem;">
                      <img src="${slide.content.image}" alt="" style="width: 100%; height: 100%; object-fit: cover;">
                    </div>
                    <div style="margin-top: -6rem; margin-bottom: 2rem; display: flex; justify-content: center; align-items: center;">
                      <img 
                        src="${slide.content.profile_image}"
                        alt="${slide.content.name}"
                        style="width: 8rem; height: 8rem; border-radius: 9999px; border: 4px solid white; object-fit: cover;"
                      >
                    </div>
                    <h2 style="font-size: 2.25rem; font-weight: bold; margin-bottom: 0.5rem; color: white; letter-spacing: -0.025em; text-transform: uppercase;">${slide.content.name}</h2>
                    <p style="font-size: 1.5rem; color: rgb(229, 231, 235);">${slide.content.role}</p>
                  </div>
                ` : ''}

                ${slide.type === 'summary' ? `
                  <div style="position: relative; z-index: 10;">
                    <h3 style="font-size: 1.875rem; font-weight: bold; color: #ff6b6b; margin-bottom: 1.5rem;">${slide.content.title}</h3>
                    <ul style="margin-bottom: 2rem;">
                      ${slide.content.points.map((point: string, index: number) => `
                        <li key="${index}" style="color: rgb(229, 231, 235); font-size: 1.125rem; margin-top: 0.75rem;">${point}</li>
                      `).join('')}
                    </ul>
                  </div>
                ` : ''}

                ${slide.type === 'skills' ? `
                  <div>
                    <h4 style="font-size: 1.5rem; font-weight: 600; color: #ff6b6b; margin-bottom: 1rem;">SKILLS:</h4>
                    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem;">
                      ${slide.content.skills.map((skill: string, index: number) => `
                        <div key="${index}" style="color: rgb(229, 231, 235); font-size: 1.125rem; background: rgba(0,0,0,0.3); border-radius: 0.5rem; padding: 0.5rem 1rem; display: flex; align-items: center; justify-content: flex-start;"><p>${skill}</p></div>
                      `).join('')}
                    </div>
                  </div>
                ` : ''}

                ${slide.type === 'experience' ? `
                  <div>
                    ${slide.content.points.length > 0 ? `
                      <h3 style="font-size: 1.875rem; font-weight: bold; color: #ff6b6b; margin-bottom: 1.5rem;">${slide.content.title}</h3>
                      <ul style="margin-bottom: 1rem;">
                        ${slide.content.points.map((point: string, index: number) => `
                          <li key="${index}" style="color: rgb(229, 231, 235); font-size: 1.125rem; background: rgba(0,0,0,0.3); border-radius: 0.5rem; padding: 0.75rem 1rem; margin-bottom: 1rem;">${point}</li>
                        `).join('')}
                      </ul>
                    ` : ''}
                    
                    ${slide.content.projects.length > 0 ? `
                      <div style="margin-top: 1rem;">
                        <h4 style="font-size: 1.5rem; font-weight: 600; color: #ff6b6b; margin-bottom: 1rem;">PROJECTS:</h4>
                        <ul>
                          ${slide.content.projects.map((project: string, index: number) => `
                            <li key="${index}" style="color: rgb(229, 231, 235); font-size: 1.125rem; background: rgba(0,0,0,0.3); border-radius: 0.5rem; padding: 0.75rem 1rem; margin-bottom: 1rem;">${project}</li>
                          `).join('')}
                        </ul>
                      </div>
                    ` : ''}
                  </div>
                ` : ''}

                ${slide.type === 'projects' ? `
                  <div>
                    <h4 style="font-size: 1.5rem; font-weight: 600; color: #ff6b6b; margin-bottom: 1rem;">PROJECTS:</h4>
                    <ul>
                      ${slide.content.projects.map((project: string, index: number) => `
                        <li key="${index}" style="color: rgb(229, 231, 235); font-size: 1.125rem; background: rgba(0,0,0,0.3); border-radius: 0.5rem; padding: 0.75rem 1rem; margin-bottom: 1rem;">${project}</li>
                      `).join('')}
                    </ul>
                  </div>
                ` : ''}

                ${slide.type === 'education' ? `
                  <div style="position: relative; z-index: 10;">
                    <h3 style="font-size: 1.875rem; font-weight: bold; color: #ff6b6b; margin-bottom: 1.5rem;">${slide.content.title}</h3>
                    <ul>
                      ${slide.content.points.map((point: string, index: number) => `
                        <li key="${index}" style="color: rgb(229, 231, 235); font-size: 1.125rem; background: rgba(0,0,0,0.3); border-radius: 0.5rem; padding: 0.75rem 1rem; margin-bottom: 1rem;">${point}</li>
                      `).join('')}
                    </ul>
                  </div>
                ` : ''}

                ${slide.type === 'achievements' ? `
                  <div>
                    <h3 style="font-size: 1.875rem; font-weight: bold; color: #ff6b6b; margin-bottom: 1.5rem;">${slide.content.title}</h3>
                    <p style="color: rgb(229, 231, 235); font-size: 1.125rem; line-height: 1.75; background: rgba(0,0,0,0.3); border-radius: 0.5rem; padding: 0.75rem 1rem;">${slide.content.description}</p>
                  </div>
                ` : ''}

                ${slide.type === 'certifications' ? `
                  <div>
                    <h3 style="font-size: 1.875rem; font-weight: bold; color: #ff6b6b; margin-bottom: 1.5rem;">${slide.content.title}</h3>
                    <ul>
                      ${slide.content.points.map((point: string, index: number) => `
                        <li key="${index}" style="color: rgb(229, 231, 235); font-size: 1.125rem; background: rgba(0,0,0,0.3); border-radius: 0.5rem; padding: 0.75rem 1rem; margin-bottom: 1rem;">${point}</li>
                      `).join('')}
                    </ul>
                  </div>
                ` : ''}

                ${slide.type === 'cta' ? `
                  <div style="text-align: center;">
                    <h3 style="font-size: 1.875rem; font-weight: bold; color: white; margin-bottom: 2rem;">${slide.content.title}</h3>
                    <div style="font-size: 4.5rem; margin: 2rem 0;">😊</div>
                    <p style="font-size: 1.5rem; color: rgb(229, 231, 235); margin-bottom: 2rem;">${slide.content.subtitle}</p>

                    <div style="display: flex; flex-direction: column; align-items: center;">
                      <p style="font-size: 1.25rem; color: rgb(229, 231, 235); margin-bottom: 1rem;">Share your profile</p>
                      <div style="display: flex; gap: 1rem;">
                        ${slide.content.shareButtons?.map((button: any, index: number) => `
                          <button
                            key="${index}"
                            onclick="${button.onClick}"
                            style="display: flex; align-items: center; gap: 0.5rem; padding: 0.75rem 1.5rem; background: rgba(255,255,255,0.1); border-radius: 9999px; transition: all 0.2s;"
                          >
                            <svg style="width: 1.25rem; height: 1.25rem; color: white;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${button.icon}</svg>
                            <span style="color: white;">${button.label}</span>
                          </button>
                        `).join('')}
                      </div>
                    </div>

                    <p style="color: #ff6b6b; font-size: 1.25rem; font-weight: 600; background: rgba(0,0,0,0.3); display: inline-block; padding: 0.75rem 1.5rem; border-radius: 9999px; margin-top: 2rem;">
                      ${slide.content.cta}
                    </p>
                  </div>
                ` : ''}
              </div>

              <div style="background: rgba(0,0,0,0.5); backdrop-filter: blur(4px); color: white; padding: 1rem 1.5rem; display: flex; justify-content: space-between; align-items: center;">
                ${slide.type !== 'profile' ? `
                  <div>
                    <span style="color: #ff6b6b; font-weight: bold;">${name}</span>
                    <span style="margin-left: 0.5rem; color: rgb(229, 231, 235);">${role}</span>
                  </div>
                ` : '<div></div>'}
                <div style="font-size: 0.875rem; color: rgb(209, 213, 219);">ElevateResume.ai</div>
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
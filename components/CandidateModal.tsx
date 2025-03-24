import React from 'react';
import { ChevronLeft, ChevronRight, X, Linkedin, Instagram } from 'lucide-react';

interface CandidateModalProps {
  slides?: any[];
  slideLoading?: boolean;
  isOpen: boolean;
  onClose: () => void;
  currentSlide: number;
  onPrevious: () => void;
  onNext: () => void;
}

const DefaultSlides = [
  {
    type: 'profile',
    content: {
      name: 'SREEKANTH S',
      role: 'AI/ML Student',
      image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&h=300&fit=crop'
    },
    background: 'bg-gradient-to-br from-gray-900 to-black'
  },
  {
    type: 'summary',
    content: {
      title: 'SUMMARY:',
      points: [
        'Detail-oriented with strong problem-solving skills',
        'Quick learning ability in AI ML'
      ],
      skills: [
        'Python C',
        'Power BI',
        'MATLAB R',
        'V Scikit-Learn',
        'Blender 3d',
        'Odoo pg',
        'Flutter',
        'Admin Tensorflow'
      ]
    },
    background: 'bg-gradient-to-br from-blue-900 to-purple-900'
  },
  {
    type: 'experience',
    content: {
      title: 'WORK EXPERIENCE:',
      description: 'Front-end and Back-End Developer at SOULOCAL RETAIL VENTURES PVT LTD, working on developing E-commerce retailer Mobile Application and Odoo models linking products from retailers to online retail shop.'
    },
    background: 'bg-gradient-to-br from-indigo-900 to-blue-900'
  },
  {
    type: 'education',
    content: {
      title: 'EDUCATION SUMMARY:',
      points: [
        'MSc in AI ML from Coimbatore Institute of Technology - CGPA of 7.83',
        '12th (HSC) - 76.6%',
        '10th - 93.2%'
      ]
    },
    background: 'bg-gradient-to-br from-purple-900 to-indigo-900'
  },
  {
    type: 'achievements',
    content: {
      title: 'ACHIEVEMENTS SUMMARY:',
      description: 'Presented project "Enhancing Intrusion Detection Systems using Optimization approaches" at ASI'
    },
    background: 'bg-gradient-to-br from-red-900 to-purple-900'
  },
  {
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
            const url = 'https://www.linkedin.com/sharing/share-offsite/?url=' + encodeURIComponent(window.location.href);
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
  }
];

export default function CandidateModal({ slides, slideLoading, isOpen, onClose, currentSlide, onPrevious, onNext }: CandidateModalProps) {
  if (!isOpen) return null;

  const slide = slides && slides[currentSlide] ? slides[currentSlide] : DefaultSlides[currentSlide];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      {slideLoading && slides && slides.length > 0 ? (
        <div className="flex justify-center mt-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white"></div>
        </div>
      ) : (
        <div className="w-full max-w-2xl mx-4 relative overflow-hidden rounded-xl">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-opacity-50 bg-gray-900/50  hover:bg-gray-900/30 z-20"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          <div className={`relative ${slide.background}`}>
            {currentSlide > 0 && (
              <button
                onClick={onPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/20 bg-opacity-20 hover:bg-black/30 backdrop-blur-sm z-20 group"
              >
                <ChevronLeft className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
              </button>
            )}

            {currentSlide < (slides && slides.length - 1 || DefaultSlides.length - 1) && (
              <button
                onClick={onNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/20 bg-opacity-20 hover:bg-black/30 backdrop-blur-sm z-20 group"
              >
                <ChevronRight className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
              </button>
            )}

            <div className="min-h-[500px] p-8 relative z-10">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/50 to-transparent pointer-events-none z-[-1]" />

              {slide.type === 'profile' && (
                <div className="text-center">
                  <div className="h-48 -mx-8 -mt-8 mb-8">
                    <img src={slide.content.image} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="-mt-24 mb-8 flex justify-center items-center">
                    <img
                      src={slide.content.profile_image}
                      alt={slide.content.name}
                      className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-800 object-cover"
                    />
                  </div>
                  <h2 className="text-4xl font-bold mb-2 text-white tracking-tight uppercase">{slide.content.name}</h2>
                  <p className="text-2xl text-gray-200">{slide.content.role}</p>
                </div>
              )}

              {slide.type === 'summary' && (
                <div className="relative z-10">
                  <h3 className="text-3xl font-bold text-red-400 mb-6">{slide.content.title}</h3>
                  <ul className="mb-8 space-y-3">
                    {slide.content.points.map((point: string, index: number) => (
                      <li key={index} className="text-gray-200 text-lg">{point}</li>
                    ))}
                  </ul>
                  {/* <h4 className="text-2xl font-semibold text-red-400 mb-4">SKILLS:</h4>
                <div className="grid grid-cols-2 gap-4">
                  {slide.content.skills.map((skill: string, index: number) => (
                    <div key={index} className="text-gray-200 text-lg bg-black bg-opacity-30 rounded-lg px-4 py-2">{skill}</div>
                  ))}
                </div> */}
                </div>
              )}
              {
                slide.type === 'skills' && (
                  <div>
                    <h4 className="text-2xl font-semibold text-red-400 mb-4">SKILLS:</h4>
                    <div className="grid grid-cols-2 gap-4">
                      {slide.content.skills.map((skill: string, index: number) => (
                        <div key={index} className="text-gray-200 text-lg bg-black/30 bg-opacity-30 rounded-lg px-4 py-2">{skill}</div>
                      ))}
                    </div>
                  </div>
                )
              }

              {slide.type === 'experience' && (
                <div>
                  {slide.content.points.length > 0 && (
                    <>
                      <h3 className="text-3xl font-bold text-red-400 mb-6">{slide.content.title}</h3>
                      <ul className="space-y-4">
                        {slide.content.points.map((point: string, index: number) => (
                          <li key={index} className="text-gray-200 text-lg bg-black/30 bg-opacity-30 rounded-lg px-4 py-3">{point}</li>
                        ))}
                      </ul>
                    </>
                  )}
                  {slide.content.projects.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-2xl font-semibold text-red-400 mb-4">PROJECTS:</h4>
                      <ul className="space-y-4">
                        {slide.content.projects.map((project: string, index: number) => (
                          <li key={index} className="text-gray-200 text-lg bg-black/30 bg-opacity-30 rounded-lg px-4 py-3">{project}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
              {slide.type === 'projects' && (
                <div>
                  <h4 className="text-2xl font-semibold text-red-400 mb-4">PROJECTS:</h4>
                  <ul className="space-y-4">
                    {slide.content.projects.map((project: string, index: number) => (
                      <li key={index} className="text-gray-200 text-lg bg-black/30 bg-opacity-30 rounded-lg px-4 py-3">{project}</li>
                    ))}
                  </ul>
                </div>
              )}
              {slide.type === 'education' && (
                <div className="relative z-10">
                  <h3 className="text-3xl font-bold text-red-400 mb-6">{slide.content.title}</h3>
                  <ul className="space-y-4">
                    {slide.content.points.map((point: string, index: number) => (
                      <li key={index} className="text-gray-200 text-lg bg-black/30 bg-opacity-30 rounded-lg px-4 py-3">{point}</li>
                    ))}
                  </ul>
                </div>
              )}

              {slide.type === 'achievements' && (
                <div>
                  <h3 className="text-3xl font-bold text-red-400 mb-6">{slide.content.title}</h3>
                  <p className="text-gray-200 text-lg leading-relaxed bg-black/30 bg-opacity-30 rounded-lg px-4 py-3">{slide.content.description}</p>
                </div>
              )}
              {slide.type === 'certifications' && (
                <div>
                  <h3 className="text-3xl font-bold text-red-400 mb-6">{slide.content.title}</h3>
                  <ul className="space-y-4">
                    {slide.content.points.map((point: string, index: number) => (
                      <li key={index} className="text-gray-200 text-lg bg-black/30 bg-opacity-30 rounded-lg px-4 py-3">{point}</li>
                    ))}
                  </ul>
                </div>
              )}
              {slide.type === 'cta' && (
                <div className="text-center space-y-8">
                  <h3 className="text-3xl font-bold text-white">{slide.content.title}</h3>
                  <div className="text-7xl">😊</div>
                  <p className="text-2xl text-gray-200 mb-8">{slide.content.subtitle}</p>

                  <div className="flex flex-col items-center space-y-4">
                    <p className="text-xl text-gray-200 mb-4">Share your profile</p>
                    <div className="flex space-x-4">
                      {slide.content.shareButtons?.map((button: any, index: number) => (
                        <button
                          key={index}
                          onClick={button.onClick}
                          className="flex items-center space-x-2 px-6 py-3 bg-white/10 bg-opacity-10 hover:bg-white/20 rounded-full transition-all duration-200"
                        >
                          <button.icon className="w-5 h-5 text-white" />
                          <span className="text-white">{button.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <p className="text-red-400 text-xl font-semibold bg-black/30 bg-opacity-30 inline-block px-6 py-3 rounded-full mt-8">
                    {slide.content.cta}
                  </p>
                </div>
              )}
            </div>

            <div className="bg-black/50 bg-opacity-50 backdrop-blur-sm text-white py-4 px-6 flex justify-between items-center">
              {slide.type !== 'profile' ? (
                <div>
                  <span className="text-red-400 font-bold">{slides && slides[0]?.content?.name || DefaultSlides[0]?.content?.name}</span>
                  <span className="ml-2 text-gray-200">{slides && slides[0]?.content?.role || DefaultSlides[0]?.content?.role}</span>
                </div>
              ) : <div></div>}
              <div className="text-sm text-gray-300">ElevateResume.ai</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
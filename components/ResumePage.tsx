'use client'

import { resumeHelper } from '@/helpers/resumeHelpers'
import { useState } from 'react';
import CandidateCard from './CandidateCard';
import CandidateModal from './CandidateModal';
import { ClipboardCopy } from 'lucide-react';

export default function ResumePage({ resume }: { resume: any }) {
  const slides = resumeHelper.resumeToSlides(resume)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const handleCardClick = () => {
    setCurrentSlide(0);
    setIsModalOpen(true);
  };

  const handlePrevious = () => {
    setCurrentSlide(prev => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide(prev => Math.min(slides.length - 1, prev + 1));
  };
  const handleCopyToClipboard = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    alert('Link copied to clipboard');
  }
  return <div>
    <div className='flex flex-col items-center justify-center mt-10 px-4'>
      {slides.length > 0 && (
        <div className="w-full max-w-[500px] mx-auto px-4 sm:px-0">
          <CandidateCard
            name={resume?.name}
            title={resume?.title}
            summary={resume?.summary || ''}
            picture={resume?.picture}
            illustration_image={resume?.illustration_image}
            creation={resume?.creation}
            onClick={handleCardClick}
          />
          <div className='flex flex-col sm:flex-row gap-4 items-center justify-center mt-10'>
            <button className='copy-btn flex gap-2 w-full sm:w-auto bg-blue-500 text-white px-4 py-2 rounded-md' onClick={handleCopyToClipboard}>
              <ClipboardCopy />
            </button>

          </div>
        </div>
      )}
      <CandidateModal
        slides={slides}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        currentSlide={currentSlide}
        onPrevious={handlePrevious}
        onNext={handleNext}
      />
    </div>
  </div>
}
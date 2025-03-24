import React from 'react';

interface CandidateCardProps {
  name: string;
  title: string;
  summary: string;
  picture?: string;
  illustration_image?: string;
  creation?: Date;
  onClick: () => void;
}

export default function CandidateCard({ name, title, summary, picture, illustration_image, creation, onClick }: CandidateCardProps) {
  const formattedCreation = () => {
    if (creation) {
      return new Date(creation).toLocaleDateString('en-GB');
    }
    return '';
  }
  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg transition-transform hover:scale-105 cursor-pointer"
      onClick={onClick}
    >
      <div className="h-48 overflow-hidden">
        <img src={illustration_image} alt="" className="w-full h-full object-cover" />
      </div>
      <div className="relative px-6 pb-6">
        <div className="flex justify-between items-center">
          <div className="-mt-12">
            <img
              src={picture || illustration_image}
              alt={name}
              className="w-24 h-24 rounded-full border-4 border-white dark:border-gray-800 object-cover"
            />
          </div>
          <img
            src="/logo-small.png"
            alt="elevateresume.ai"
            className="w-8 h-8"
          />
        </div>
        <div className="mt-4">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white uppercase">{name}</h3>
          <p className="text-gray-600 dark:text-gray-400 line-clamp-1">{title}</p>
          <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm line-clamp-2">{summary}</p>
          <p className="mt-2 text-gray-400 dark:text-gray-400 text-xs">{formattedCreation()}</p>
        </div>
        <img
          src="/logo-small.png"
          alt="elevateresume.ai"
          className="absolute bottom-6 right-6 w-8 h-8 opacity-50"
        />
      </div>
    </div>
  );
}
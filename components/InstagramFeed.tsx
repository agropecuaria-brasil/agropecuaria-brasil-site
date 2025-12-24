import React from 'react';
import { Instagram, Heart, MessageCircle, ExternalLink } from 'lucide-react';
import { useContent } from '../hooks/useContent';

const InstagramFeed: React.FC = () => {
  const { settings } = useContent();

  // Garante que usamos os posts do Sanity ou um array vazio, limitando a 4 itens
  const posts = settings.instagramPosts?.slice(0, 4) || [];

  if (posts.length === 0) return null;

  return (
    <section className="py-16 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col items-center justify-center text-center mb-10">
          <div className="w-16 h-16 bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] rounded-2xl flex items-center justify-center text-white shadow-lg mb-4 transform rotate-3 hover:rotate-0 transition-transform duration-300">
            <Instagram size={36} />
          </div>
          
          <h2 className="text-xl md:text-2xl font-medium text-gray-500 mb-1">
            Siga-nos no Instagram
          </h2>
          
          <a 
            href={settings.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-2xl md:text-4xl font-extrabold text-[#264788] hover:text-[#24902C] transition-colors font-['Montserrat'] tracking-tight flex items-center gap-2"
          >
            @agropecuaria.brasilsc
            <ExternalLink size={20} className="opacity-50" />
          </a>
        </div>

        {/* Grid de Fotos */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
          {posts.map((post, index) => (
            <a 
              key={index}
              href={post.link || settings.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block aspect-square overflow-hidden rounded-xl bg-gray-100"
              aria-label={post.caption || "Ver post no Instagram"}
            >
              <img 
                src={post.image} 
                alt={post.caption || "Post Instagram Agropecuária Brasil"} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              
              {/* Overlay Hover Effect */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-6 text-white backdrop-blur-[2px]">
                <div className="flex items-center gap-2 font-bold">
                  <Heart size={24} fill="white" />
                </div>
                <div className="flex items-center gap-2 font-bold">
                   <MessageCircle size={24} fill="white" />
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Botão Mobile (opcional, só aparece se tiver link) */}
        <div className="mt-8 text-center md:hidden">
            <a 
              href={settings.instagramUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#264788] border-b-2 border-[#E5C808] pb-0.5"
            >
                Ver Perfil Completo &rarr;
            </a>
        </div>

      </div>
    </section>
  );
};

export default InstagramFeed;
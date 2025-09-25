import React from 'react'
import Image from 'next/image'

const Hilight = () => {
  return (
    <section className="w-full px-4 pb-10 pt-6 md:px-6">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex gap-2">
          {['Beauty Products','Product Pitch','Tech Demo','Crypto Explainer'].map((chip)=> (
            <span key={chip} className="cursor-pointer rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80 hover:bg-white/10">{chip}</span>
          ))}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {[
          {
            title: 'CINEMATIC STORYTELLING',
            subtitle: 'Step Into a Mysterious World With a Futuristic Character',
            img: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop'
          },
          {
            title: 'PRODUCT SHOWCASE',
            subtitle: 'Professional Video for Your Organic Food Business',
            img: 'https://images.unsplash.com/photo-1503602642458-232111445657?q=80&w=1600&auto=format&fit=crop'
          },
          {
            title: 'CAMERA MOVEMENT',
            subtitle: 'Dance Class Recorded From Above With Motion',
            img: 'https://images.unsplash.com/photo-1520975922215-c8a54f1e4a3b?q=80&w=1600&auto=format&fit=crop'
          }
        ].map((card)=> (
          <article key={card.title} className="group overflow-hidden rounded-xl border border-white/10 bg-white/5">
            <div className="relative aspect-[16/9] w-full">
              <Image src={card.img} alt={card.title} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition-transform duration-300 group-hover:scale-[1.03]" />
            </div>
            <div className="p-4">
              <p className="mb-1 line-clamp-1 text-xs text-white/60">{card.subtitle}</p>
              <h3 className="font-semibold tracking-wide text-white">{card.title}</h3>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Hilight

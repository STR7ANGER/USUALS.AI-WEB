import React from 'react'
import Image from 'next/image'

const Template = () => {
  return (
    <section className="w-full px-4 pb-16 pt-8 md:px-6">
      <h2 className="mb-4 text-2xl font-extrabold tracking-wide text-yellow-400">TEMPLATES</h2>
      <div className="grid grid-cols-4 gap-4">
        {[
          
          'https://images.unsplash.com/photo-1503602642458-232111445657?q=80&w=1200&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=1200&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=1200&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1200&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1200&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1495567720989-cebdbdd97913?q=80&w=1200&auto=format&fit=crop',

          
        ].map((src)=> (
          <div key={src} className="overflow-hidden rounded-xl border border-white/10 bg-white/5">
            <div className={'relative aspect-[16/9] w-full'}>
              <Image src={src} alt="Template" fill sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Template

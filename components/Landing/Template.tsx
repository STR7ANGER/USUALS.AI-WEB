import React from 'react'
import Image from 'next/image'

const Template = () => {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-16 pt-8 md:px-6">
      <h2 className="mb-4 text-2xl font-extrabold tracking-wide text-yellow-400">TEMPLATES</h2>
      <div className="columns-1 gap-4 sm:columns-2 lg:columns-4 [column-fill:_balance]
      *:mb-4">
        {[
          'https://images.unsplash.com/photo-1520975922215-c8a54f1e4a3b?q=80&w=1200&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1503602642458-232111445657?q=80&w=1200&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=1200&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=1200&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1200&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1482192505345-5655af888cc4?q=80&w=1200&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1200&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1519985176271-adb1088fa94c?q=80&w=1200&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1526178617660-1b1b3c8945b2?q=80&w=1200&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=1200&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1495567720989-cebdbdd97913?q=80&w=1200&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1500534314209-9e3a8eaa1c9a?q=80&w=1200&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1517817748496-59b9b3b9f2d2?q=80&w=1200&auto=format&fit=crop'
        ].map((src)=> (
          <div key={src} className="break-inside-avoid overflow-hidden rounded-xl border border-white/10 bg-white/5">
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

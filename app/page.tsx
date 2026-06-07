
import HeroBg from '@/components/HeroBg';
import Collection from '@/Sections/Collection';
import OurConcept from '@/Sections/OurConcept';
import React from 'react';

const page = () => {
  return (
    <main>
      <HeroBg />

      <section className="relative z-10 flex min-h-screen w-full items-center justify-start">
        <div className="mx-auto flex h-full w-full max-w-[1400px] items-center text-accent">
          <p className="w-2/3 max-w-[450px] px-2.5 text-start text-2xl font-bold uppercase sm:w-full sm:text-3xl md:text-5xl">
            You&apos;ll soon meet the person meant for you
          </p>
        </div>
      </section>

      <section id='other' className="relative z-20  bg-accent">

          <OurConcept/>
          <Collection/>

      </section>
    </main>

  );
};

export default page;

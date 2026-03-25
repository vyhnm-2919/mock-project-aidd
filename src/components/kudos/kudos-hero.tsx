import Image from "next/image";

interface KudosHeroProps {
  tagline: string;
}

export function KudosHero({ tagline }: KudosHeroProps): React.ReactElement {
  return (
    <section className="relative w-full h-auto min-h-[320px] md:min-h-[400px] xl:h-[512px] flex flex-col items-center justify-center overflow-hidden">
      <Image
        src="/images/kudos/kv-background.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background: "linear-gradient(25deg, #00101A 14.74%, rgba(0, 19, 32, 0) 47.8%)",
        }}
      />
      <div className="relative z-10 flex flex-col items-center gap-6 px-6">
        <p className="font-montserrat text-2xl md:text-[30px] xl:text-[36px] font-bold leading-tight xl:leading-[44px] text-[#FFEA9E] text-center">
          {tagline}
        </p>
        <Image
          src="/images/kudos/kudos-logo.svg"
          alt="KUDOS"
          width={593}
          height={104}
          sizes="(max-width: 768px) 300px, (max-width: 1024px) 450px, 593px"
          className="w-[300px] md:w-[450px] xl:w-[593px] h-auto"
        />
      </div>
    </section>
  );
}

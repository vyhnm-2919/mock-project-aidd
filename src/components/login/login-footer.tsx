interface LoginFooterProps {
  copyright: string;
}

export function LoginFooter({ copyright }: LoginFooterProps) {
  return (
    <footer
      className="absolute bottom-0 w-full flex items-center justify-center px-6 py-6 md:px-20 xl:px-[90px] xl:py-10 border-t border-[#2E3940] z-50"
      aria-label="Footer"
    >
      <p className="font-montserrat text-sm md:text-base font-bold leading-5 md:leading-6 text-white text-center">
        {copyright}
      </p>
    </footer>
  );
}

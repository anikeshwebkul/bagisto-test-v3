import {MainProvider} from "./MainProvider";

interface AppWrapperProps {
  children: React.ReactNode;
  className?: string;
}

 function AppWrapper({ children }: AppWrapperProps) {
  return (
        <div className="mx-auto min-h-[calc(100vh-580px)] w-full max-w-screen-2xl px-[15px] xss:px-7.5">
          <MainProvider>
            {children}
          </MainProvider>
        </div>
  );
}

export { AppWrapper };

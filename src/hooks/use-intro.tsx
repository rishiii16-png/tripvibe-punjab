import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";

type IntroContextValue = {
  isIntroLoading: boolean;
  setIntroLoading: (value: boolean) => void;
  startIntro: () => void;
  endIntro: () => void;
};

const IntroContext = createContext<IntroContextValue | null>(null);

export function IntroProvider({ children }: { children: ReactNode }) {
  const [isIntroLoading, setIntroLoading] = useState(false);

  const startIntro = useCallback(() => setIntroLoading(true), []);
  const endIntro = useCallback(() => setIntroLoading(false), []);

  return (
    <IntroContext.Provider
      value={{ isIntroLoading, setIntroLoading, startIntro, endIntro }}
    >
      {children}
    </IntroContext.Provider>
  );
}

const noop = () => {};
const fallback: IntroContextValue = {
  isIntroLoading: false,
  setIntroLoading: noop,
  startIntro: noop,
  endIntro: noop,
};

export function useIntro() {
  const ctx = useContext(IntroContext);
  return ctx ?? fallback;
}

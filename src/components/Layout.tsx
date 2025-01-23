import React from "react";

interface LayoutProps {
  title?: string;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ title, children }) => {
  React.useEffect(() => {
    document.title = title ? `${title} | Indrive` : "Indrive";
  }, [title]);

  return (
    <>
      <meta
        name="description"
        content="Indrive - Aplikasi terbaik untuk kebutuhan Anda"
      />
      {children}
    </>
  );
};

export default Layout;

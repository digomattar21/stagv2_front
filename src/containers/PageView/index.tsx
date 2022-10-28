interface PageViewProps {
  children?: any;
}

function PageView({ children }: PageViewProps) {
  return <div className="w-screen h-screen box-border">{children}</div>;
}

export default PageView;

interface PageViewProps {
  children?: any;
}

function PageView({ children }: PageViewProps) {
  return (
    <div className="w-screen h-screen box-border bg-gray-800 overflow-x-hidden">
      {children}
    </div>
  );
}

export default PageView;

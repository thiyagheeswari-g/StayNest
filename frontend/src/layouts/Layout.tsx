const Layout = ({ children }: Props) => {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <Hero />
        <div className="container mx-auto">
          <SearchBar />
        </div>
        <div className="container mx-auto py-10 flex-1">{children}</div>
        <Footer />
      </div>
    );
  };
